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
  // Common Virtualizor ports
  if (base.startsWith("https://") && base.includes(":4085")) {
    urls.push(base.replace("https://", "http://").replace(":4085", ":4084"));
  }
  if (base.startsWith("http://") && base.includes(":4084")) {
    urls.push(base.replace("http://", "https://").replace(":4084", ":4085"));
  }

  // Dedupe
  return Array.from(new Set(urls));
}

async function tryVirtualizorJson(url: string, options: RequestInit) {
  const res = await fetch(url, options);
  const text = await res.text();

  // Virtualizor returns a login HTML page if auth fails.
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

interface OsTemplatesRequest {
  plan_id?: number;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get optional plan_id from request body
    let planId: number | undefined;
    try {
      const body = await req.json();
      planId = body?.plan_id;
    } catch {
      // No body or invalid JSON - that's fine
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
      return new Response(
        JSON.stringify({ error: "Virtualizor API not configured", templates: [] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const baseUrls = buildBaseUrls(apiUrl);

    // Virtualizor admin API has multiple variants in the wild.
    // We'll try the common ones to avoid “Login” HTML pages.
    const apiModes: Array<"1" | "json"> = ["1", "json"];
    const methods: Array<"GET" | "POST"> = ["POST", "GET"]; // POST first (more common in Virtualizor)

    let data: any = null;
    let debug: { url: string; error: string; raw?: string }[] = [];

    for (const baseUrl of baseUrls) {
      for (const apiMode of apiModes) {
        const query = new URLSearchParams({
          api: apiMode,
          apikey: apiKey,
          apipass: apiPass,
          act: "ostemplates",
        });
        if (planId) query.set("plid", planId.toString());

        const url = `${baseUrl}?${query.toString()}`;

        for (const method of methods) {
          console.log("Virtualizor ostemplates try:", url.replace(apiPass, "***"), method);

          try {
            const result = await tryVirtualizorJson(url, {
              method,
              headers: {
                "Accept": "application/json",
                ...(method === "POST" ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
              },
              body: method === "POST" ? "" : undefined,
            });

            if (result.ok) {
              data = result.json;
              break;
            } else {
              debug.push({ url: url.replace(apiPass, "***"), error: result.error, raw: result.raw });
            }
          } catch (e: any) {
            debug.push({ url: url.replace(apiPass, "***"), error: e?.message || String(e) });
          }
        }

        if (data) break;
      }
      if (data) break;
    }

    if (!data) {
      return new Response(
        JSON.stringify({
          error: "Unable to fetch OS templates from Virtualizor",
          templates: [],
          hint: "Virtualizor returned the login page (HTML) for all attempts. This usually means the API key/pass is not a Master/Admin API key, or API access is restricted by IP.",
          debug: debug.slice(0, 3),
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (data.error) {
      return new Response(
        JSON.stringify({ error: data.error, templates: [] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse OS templates from response
    // Virtualizor returns oslist with nested structure
    const templates: Array<{ id: string; name: string; category: string }> = [];
    
    const oslist = data.oslist || data.ostemplates || {};
    
    for (const [category, oses] of Object.entries(oslist)) {
      if (typeof oses === "object" && oses !== null) {
        for (const [osId, osInfo] of Object.entries(oses as Record<string, any>)) {
          const name = typeof osInfo === "string" ? osInfo : osInfo?.name || osInfo?.distro || osId;
          templates.push({
            id: osId,
            name: name,
            category: category,
          });
        }
      }
    }

    return new Response(
      JSON.stringify({ templates, raw: data }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching OS templates:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch OS templates", templates: [] }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
