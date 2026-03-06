import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// --- TOTP Implementation using Web Crypto ---

function base32Encode(buffer: Uint8Array): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0;
  let value = 0;
  let output = "";
  for (let i = 0; i < buffer.length; i++) {
    value = (value << 8) | buffer[i];
    bits += 8;
    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31];
  }
  return output;
}

function base32Decode(input: string): Uint8Array {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const cleanInput = input.replace(/=+$/, "").toUpperCase();
  let bits = 0;
  let value = 0;
  const output: number[] = [];
  for (let i = 0; i < cleanInput.length; i++) {
    const idx = alphabet.indexOf(cleanInput[i]);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return new Uint8Array(output);
}

async function hmacSha1(key: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw", key, { name: "HMAC", hash: "SHA-1" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, data);
  return new Uint8Array(sig);
}

async function generateTOTP(secret: string, timeStep = 30): Promise<string> {
  const key = base32Decode(secret);
  const time = Math.floor(Date.now() / 1000 / timeStep);
  const timeBytes = new Uint8Array(8);
  let t = time;
  for (let i = 7; i >= 0; i--) {
    timeBytes[i] = t & 0xff;
    t = t >>> 8;
  }
  const hmac = await hmacSha1(key, timeBytes);
  const offset = hmac[hmac.length - 1] & 0xf;
  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);
  return String(code % 1000000).padStart(6, "0");
}

async function verifyTOTP(secret: string, token: string): Promise<boolean> {
  // Check current and ±1 time step for clock drift
  for (const offset of [0, -1, 1]) {
    const key = base32Decode(secret);
    const time = Math.floor(Date.now() / 1000 / 30) + offset;
    const timeBytes = new Uint8Array(8);
    let t = time;
    for (let i = 7; i >= 0; i--) {
      timeBytes[i] = t & 0xff;
      t = t >>> 8;
    }
    const hmac = await hmacSha1(key, timeBytes);
    const off = hmac[hmac.length - 1] & 0xf;
    const code =
      ((hmac[off] & 0x7f) << 24) |
      ((hmac[off + 1] & 0xff) << 16) |
      ((hmac[off + 2] & 0xff) << 8) |
      (hmac[off + 3] & 0xff);
    if (String(code % 1000000).padStart(6, "0") === token) return true;
  }
  return false;
}

function generateSecret(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return base32Encode(bytes);
}

// Simple XOR encryption with a key for storing secrets
function xorEncrypt(text: string, key: string): string {
  const result: number[] = [];
  for (let i = 0; i < text.length; i++) {
    result.push(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(String.fromCharCode(...result));
}

function xorDecrypt(encoded: string, key: string): string {
  const decoded = atob(encoded);
  const result: number[] = [];
  for (let i = 0; i < decoded.length; i++) {
    result.push(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return String.fromCharCode(...result);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const encryptionKey = serviceKey.substring(0, 32);

    const authHeader = req.headers.get("authorization");
    const supabaseClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader || "" } },
    });
    const serviceClient = createClient(supabaseUrl, serviceKey);

    // Verify user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action, code: totpCode, userId } = await req.json();

    // For verify action, allow checking another user's TOTP (used during login)
    const targetUserId = action === "verify" && userId ? userId : user.id;

    if (action === "setup") {
      const secret = generateSecret();
      const encrypted = xorEncrypt(secret, encryptionKey);

      // Store but don't enable yet
      await serviceClient.from("totp_secrets").upsert({
        user_id: user.id,
        encrypted_secret: encrypted,
        is_enabled: false,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });

      const otpauthUrl = `otpauth://totp/CloudOnFire:${user.email}?secret=${secret}&issuer=CloudOnFire&digits=6&period=30`;

      return new Response(JSON.stringify({ secret, otpauthUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "enable") {
      // Verify the code first
      const { data: totp } = await serviceClient
        .from("totp_secrets")
        .select("encrypted_secret")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!totp) {
        return new Response(JSON.stringify({ error: "Setup required first" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const secret = xorDecrypt(totp.encrypted_secret, encryptionKey);
      const valid = await verifyTOTP(secret, totpCode);

      if (!valid) {
        return new Response(JSON.stringify({ error: "Invalid code. Please try again." }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await serviceClient.from("totp_secrets").update({
        is_enabled: true, updated_at: new Date().toISOString(),
      }).eq("user_id", user.id);

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "disable") {
      await serviceClient.from("totp_secrets").delete().eq("user_id", user.id);
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "verify") {
      const { data: totp } = await serviceClient
        .from("totp_secrets")
        .select("encrypted_secret, is_enabled")
        .eq("user_id", targetUserId)
        .maybeSingle();

      if (!totp || !totp.is_enabled) {
        return new Response(JSON.stringify({ valid: true, twoFactorEnabled: false }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const secret = xorDecrypt(totp.encrypted_secret, encryptionKey);
      const valid = await verifyTOTP(secret, totpCode || "");

      return new Response(JSON.stringify({ valid, twoFactorEnabled: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "status") {
      const { data: totp } = await serviceClient
        .from("totp_secrets")
        .select("is_enabled")
        .eq("user_id", user.id)
        .maybeSingle();

      return new Response(JSON.stringify({ enabled: totp?.is_enabled || false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "check_user") {
      // Check if a user has 2FA enabled (used before login)
      const { data: totp } = await serviceClient
        .from("totp_secrets")
        .select("is_enabled")
        .eq("user_id", targetUserId)
        .maybeSingle();

      return new Response(JSON.stringify({ twoFactorEnabled: totp?.is_enabled || false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
