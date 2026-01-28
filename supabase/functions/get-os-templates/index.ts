import { createClient } from "https://esm.sh/@supabase/supabase-js@2.93.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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

    // Build proper API URL
    let fullApiUrl = apiUrl.trim();
    if (!fullApiUrl.includes("index.php")) {
      fullApiUrl = fullApiUrl.replace(/\/$/, "") + "/index.php";
    }

    // Fetch OS templates from Virtualizor
    // Reference: https://virtualizor.com/admin-api/list-os-templates
    const params = new URLSearchParams({
      api: "json",
      apikey: apiKey,
      apipass: apiPass,
      act: "ostemplates",
    });

    // If plan_id provided, add it to get plan-specific templates
    if (planId) {
      params.set("plid", planId.toString());
    }

    console.log("Fetching OS templates from Virtualizor");

    const response = await fetch(fullApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();
    console.log("Virtualizor OS templates response:", JSON.stringify(data).substring(0, 500));

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
