import { createClient } from "https://esm.sh/@supabase/supabase-js@2.93.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function buildBaseUrls(rawUrl: string): string[] {
  let base = rawUrl.trim().replace(/\/$/, "");
  if (!base.includes("index.php")) base = `${base}/index.php`;

  const urls: string[] = [base];
  if (base.startsWith("https://") && base.includes(":4085")) {
    urls.push(base.replace("https://", "http://").replace(":4085", ":4084"));
  }
  if (base.startsWith("http://") && base.includes(":4084")) {
    urls.push(base.replace("http://", "https://").replace(":4084", ":4085"));
  }
  return Array.from(new Set(urls));
}

async function tryVirtualizorJson(url: string, options: RequestInit) {
  const res = await fetch(url, options);
  const text = await res.text();
  const trimmed = text.trim();
  if (trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html") || trimmed.startsWith("<")) {
    return { ok: false as const, error: `HTML_RESPONSE_${res.status}`, raw: trimmed.slice(0, 500) };
  }
  try {
    const json = JSON.parse(text);
    return { ok: true as const, json };
  } catch {
    return { ok: false as const, error: `INVALID_JSON_${res.status}`, raw: trimmed.slice(0, 500) };
  }
}

interface ProvisionRequest {
  order_id: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    // Create admin client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request
    const { order_id } = (await req.json()) as ProvisionRequest;

    if (!order_id) {
      return new Response(
        JSON.stringify({ error: "Order ID is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch order with product details
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*, products(*)")
      .eq("id", order_id)
      .single();

    if (orderError || !order) {
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if order is paid
    if (order.status !== "paid") {
      return new Response(
        JSON.stringify({ error: "Order must be paid before provisioning" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get Virtualizor settings
    const { data: settings } = await supabase
      .from("admin_settings")
      .select("setting_key, setting_value")
      .in("setting_key", ["virtualizor_api_url", "virtualizor_api_key", "virtualizor_api_pass"]);

    const settingsMap: Record<string, string> = {};
    settings?.forEach((s) => {
      settingsMap[s.setting_key] = s.setting_value || "";
    });

    const apiUrl = settingsMap["virtualizor_api_url"];
    const apiKey = settingsMap["virtualizor_api_key"];
    const apiPass = settingsMap["virtualizor_api_pass"];

    if (!apiUrl || !apiKey || !apiPass) {
      // Update order status to reflect configuration issue
      await supabase
        .from("orders")
        .update({ status: "provisioning", notes: "Awaiting Virtualizor configuration" })
        .eq("id", order_id);

      return new Response(
        JSON.stringify({ error: "Virtualizor API not configured", requires_config: true }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const product = order.products;
    if (!product?.virtualizor_plan_id) {
      return new Response(
        JSON.stringify({ error: "Product has no Virtualizor plan linked" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update order to provisioning status
    await supabase
      .from("orders")
      .update({ status: "provisioning" })
      .eq("id", order_id);

    // Generate random password for the VPS
    const generatePassword = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
      let password = "";
      for (let i = 0; i < 16; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    };

    const rootPassword = generatePassword();

    const baseUrls = buildBaseUrls(apiUrl);
    const apiModes: Array<"1" | "json"> = ["1", "json"];

    const vpsParams = new URLSearchParams({
      plid: product.virtualizor_plan_id.toString(),
      hostname: order.hostname || `vps-${order.order_number}`,
      osid: order.os_template || "297",
      rootpass: rootPassword,
      addvps: "1",
    });

    console.log("VPS Params:", Object.fromEntries(vpsParams.entries()));

    let virtualizorData: any = null;
    const debug: { url: string; error: string; raw?: string }[] = [];

    for (const baseUrl of baseUrls) {
      for (const apiMode of apiModes) {
        const query = new URLSearchParams({
          api: apiMode,
          apikey: apiKey,
          apipass: apiPass,
          act: "addvs",
        });

        const url = `${baseUrl}?${query.toString()}`;
        console.log("Virtualizor addvs try:", url.replace(apiPass, "***"));

        try {
          const result = await tryVirtualizorJson(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Accept": "application/json",
            },
            body: vpsParams.toString(),
          });

          if (result.ok) {
            virtualizorData = result.json;
            break;
          } else {
            debug.push({ url: url.replace(apiPass, "***"), error: result.error, raw: result.raw });
          }
        } catch (e: any) {
          debug.push({ url: url.replace(apiPass, "***"), error: e?.message || String(e) });
        }
      }
      if (virtualizorData) break;
    }

    if (!virtualizorData) {
      await supabase
        .from("orders")
        .update({
          notes:
            "Provisioning failed: Virtualizor API returned login HTML for all attempts. Check Master/Admin API key/pass and IP allowlist.",
        })
        .eq("id", order_id);

      return new Response(
        JSON.stringify({
          error:
            "Cannot provision: Virtualizor API rejected credentials (login HTML). Please verify Master/Admin API credentials and IP restrictions.",
          debug: debug.slice(0, 3),
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (virtualizorData.error) {
      // Log the error and update order
      await supabase
        .from("orders")
        .update({ 
          notes: `Provisioning failed: ${JSON.stringify(virtualizorData.error)}` 
        })
        .eq("id", order_id);

      return new Response(
        JSON.stringify({ 
          error: "Failed to provision VPS", 
          details: virtualizorData.error 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract VPS details from response
    const vpsId = virtualizorData.vs_info?.vpsid || virtualizorData.vpsid;
    const ipAddress = virtualizorData.ips?.[0] || virtualizorData.vs_info?.ips?.[0] || null;

    // Calculate expiry date based on billing cycle
    const expiresAt = new Date();
    switch (order.billing_cycle) {
      case "quarterly":
        expiresAt.setMonth(expiresAt.getMonth() + 3);
        break;
      case "yearly":
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        break;
      default:
        expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    // Create VPS instance record
    const { data: vpsInstance, error: vpsError } = await supabase
      .from("vps_instances")
      .insert({
        order_id: order.id,
        user_id: order.user_id,
        product_id: order.product_id,
        hostname: order.hostname,
        os_template: order.os_template,
        ip_address: ipAddress,
        virtualizor_vps_id: vpsId ? parseInt(vpsId) : null,
        status: "running",
        expires_at: expiresAt.toISOString(),
        panel_username: "root",
        panel_password_hash: rootPassword, // In production, this should be hashed
      })
      .select()
      .single();

    if (vpsError) {
      console.error("Error creating VPS instance:", vpsError);
    }

    // Update order to active
    await supabase
      .from("orders")
      .update({ status: "active" })
      .eq("id", order_id);

    return new Response(
      JSON.stringify({
        success: true,
        message: "VPS provisioned successfully",
        vps: {
          id: vpsInstance?.id,
          hostname: order.hostname,
          ip_address: ipAddress,
          virtualizor_vps_id: vpsId,
          root_password: rootPassword, // Only returned once at provisioning
        },
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Provisioning error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Map our OS template names to Virtualizor OS IDs
// These IDs vary by Virtualizor installation, common defaults are used
function mapOsTemplate(template: string): string {
  const osMap: Record<string, string> = {
    "ubuntu-22.04": "297",
    "ubuntu-20.04": "288",
    "debian-12": "308",
    "debian-11": "298",
    "centos-9": "305",
    "almalinux-9": "301",
    "rocky-9": "302",
    "windows-2022": "310",
  };
  return osMap[template] || "297"; // Default to Ubuntu 22.04
}
