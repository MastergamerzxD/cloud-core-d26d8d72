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

    // Build proper API URL with authentication in query string
    // Virtualizor API expects auth params in URL, not POST body
    let baseUrl = apiUrl.trim().replace(/\/$/, "");
    if (!baseUrl.includes("index.php")) {
      baseUrl = baseUrl + "/index.php";
    }

    // Build URL with query parameters for authentication
    const queryParams = new URLSearchParams({
      api: "json",
      apikey: apiKey,
      apipass: apiPass,
      act: "ostemplates",
    });

    // If plan_id provided, add it to get plan-specific templates
    if (planId) {
      queryParams.set("plid", planId.toString());
    }

    // Try HTTP directly (port 4084) to avoid SSL issues
    let httpUrl = baseUrl;
    if (httpUrl.startsWith("https://")) {
      httpUrl = httpUrl.replace("https://", "http://").replace(":4085", ":4084");
    }

    const fullUrl = `${httpUrl}?${queryParams.toString()}`;
    console.log("Fetching OS templates from:", fullUrl.replace(apiPass, "***"));

    let data: any = null;
    let lastError: Error | null = null;

    try {
      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });

      const responseText = await response.text();
      console.log("Raw response (first 500 chars):", responseText.substring(0, 500));

      // Check if response is HTML (error page or login page)
      if (responseText.trim().startsWith("<!DOCTYPE") || responseText.trim().startsWith("<html") || responseText.trim().startsWith("<")) {
        console.error("Received HTML instead of JSON - likely authentication failed or wrong endpoint");
        lastError = new Error("API returned HTML. Check credentials and ensure API access is enabled.");
      } else {
        data = JSON.parse(responseText);
        console.log("Virtualizor OS templates response:", JSON.stringify(data).substring(0, 500));
      }
    } catch (error: any) {
      console.error("Fetch error:", error.message);
      lastError = error;
    }

    if (!data) {
      return new Response(
        JSON.stringify({ 
          error: lastError?.message || "Failed to connect to Virtualizor", 
          templates: [],
          hint: "Ensure API credentials are correct and HTTP access (port 4084) is enabled."
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
