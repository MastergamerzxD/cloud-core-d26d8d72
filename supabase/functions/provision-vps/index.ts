import { createClient } from "https://esm.sh/@supabase/supabase-js@2.93.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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

    // Build proper Virtualizor API URL with authentication in query string
    // Virtualizor API expects auth params in URL, not POST body
    let baseUrl = apiUrl.trim().replace(/\/$/, "");
    if (!baseUrl.includes("index.php")) {
      baseUrl = baseUrl + "/index.php";
    }

    // Use HTTP directly (port 4084) to avoid SSL certificate issues
    let httpUrl = baseUrl;
    if (httpUrl.startsWith("https://")) {
      httpUrl = httpUrl.replace("https://", "http://").replace(":4085", ":4084");
    }

    // Build URL with query parameters for authentication
    const queryParams = new URLSearchParams({
      api: "json",
      apikey: apiKey,
      apipass: apiPass,
      act: "addvs",
    });

    const fullApiUrl = `${httpUrl}?${queryParams.toString()}`;

    // Prepare POST body for VPS creation parameters
    const vpsParams = new URLSearchParams({
      plid: product.virtualizor_plan_id.toString(),
      hostname: order.hostname || `vps-${order.order_number}`,
      osid: order.os_template || "297",
      rootpass: rootPassword,
      addvps: "1",
    });

    console.log("Calling Virtualizor API:", fullApiUrl.replace(apiPass, "***"));
    console.log("VPS Params:", Object.fromEntries(vpsParams.entries()));

    let virtualizorData: any = null;
    let lastError: Error | null = null;

    try {
      const virtualizorResponse = await fetch(fullApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
        },
        body: vpsParams.toString(),
      });

      const responseText = await virtualizorResponse.text();
      console.log("Raw response (first 500 chars):", responseText.substring(0, 500));

      // Check if response is HTML (error page)
      if (responseText.trim().startsWith("<!DOCTYPE") || responseText.trim().startsWith("<html") || responseText.trim().startsWith("<")) {
        console.error("Received HTML instead of JSON - authentication failed or wrong endpoint");
        lastError = new Error("API returned HTML. Check credentials and ensure API access is enabled.");
      } else {
        virtualizorData = JSON.parse(responseText);
        console.log("Virtualizor response:", JSON.stringify(virtualizorData));
      }
    } catch (error: any) {
      console.error("Fetch error:", error.message);
      lastError = error;
    }

    if (!virtualizorData && lastError) {
      await supabase
        .from("orders")
        .update({ 
          notes: `Provisioning failed: ${lastError.message}` 
        })
        .eq("id", order_id);

      return new Response(
        JSON.stringify({ 
          error: "Cannot connect to Virtualizor. Check API URL and credentials.",
          details: lastError.message
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
