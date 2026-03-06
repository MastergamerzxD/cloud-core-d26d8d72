import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { session_id, page, referrer, screen_width, user_agent } = await req.json();
    if (!session_id) throw new Error("session_id required");

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Detect device type from screen width
    let device_type = "desktop";
    if (screen_width && screen_width < 768) device_type = "mobile";
    else if (screen_width && screen_width < 1024) device_type = "tablet";

    // Parse browser and OS from user agent
    const ua = user_agent || "";
    let browser = "Unknown";
    if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Edg")) browser = "Edge";
    else if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Safari")) browser = "Safari";
    else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";

    let os = "Unknown";
    if (ua.includes("Windows")) os = "Windows";
    else if (ua.includes("Mac OS")) os = "macOS";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

    // Get IP from headers
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               req.headers.get("cf-connecting-ip") ||
               req.headers.get("x-real-ip") ||
               "unknown";

    // Geo lookup using free API
    let city = "Unknown", country = "Unknown", country_code = "", latitude = 0, longitude = 0;
    try {
      const geoResp = await fetch(`http://ip-api.com/json/${ip}?fields=city,country,countryCode,lat,lon`);
      if (geoResp.ok) {
        const geo = await geoResp.json();
        if (geo.city) city = geo.city;
        if (geo.country) country = geo.country;
        if (geo.countryCode) country_code = geo.countryCode;
        if (geo.lat) latitude = geo.lat;
        if (geo.lon) longitude = geo.lon;
      }
    } catch {}

    // Check if session exists
    const { data: existing } = await supabaseAdmin
      .from("visitor_sessions")
      .select("id")
      .eq("session_id", session_id)
      .maybeSingle();

    if (existing) {
      // Update existing session
      await supabaseAdmin
        .from("visitor_sessions")
        .update({
          current_page: page,
          last_seen_at: new Date().toISOString(),
        })
        .eq("session_id", session_id);
    } else {
      // Insert new session
      await supabaseAdmin
        .from("visitor_sessions")
        .insert({
          session_id,
          ip_address: ip,
          city,
          country,
          country_code,
          latitude,
          longitude,
          device_type,
          browser,
          os,
          current_page: page,
          referrer: referrer || null,
        });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("track-visit error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
