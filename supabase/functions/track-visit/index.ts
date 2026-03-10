import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Search engine crawler patterns - always allowed
const CRAWLER_PATTERNS = [
  /googlebot/i, /googlebot-image/i, /googlebot-mobile/i,
  /google-inspectiontool/i, /adsbot-google/i, /mediapartners-google/i,
  /bingbot/i, /msnbot/i, /duckduckbot/i, /applebot/i,
  /yandexbot/i, /baiduspider/i, /slurp/i, /facebot/i,
  /twitterbot/i, /linkedinbot/i, /pinterest/i,
];

// Known bot/suspicious patterns (for detection logging only)
const BOT_PATTERNS = [
  /curl\//i, /wget\//i, /python-requests/i, /scrapy/i, /httpclient/i,
  /java\//i, /okhttp/i, /go-http-client/i, /headlesschrome/i,
  /phantomjs/i, /selenium/i, /puppeteer/i, /playwright/i,
  /scraper/i,
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { session_id, page, referrer, screen_width, user_agent } = await req.json();
    if (!session_id) throw new Error("session_id required");

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               req.headers.get("cf-connecting-ip") ||
               req.headers.get("x-real-ip") ||
               "unknown";

    // --- Check MANUALLY blocked IP (admin-initiated only) ---
    const { data: blocked } = await supabaseAdmin
      .from("blocked_ips")
      .select("id, is_permanent, expires_at")
      .eq("ip_address", ip);

    if (blocked && blocked.length > 0) {
      const now = new Date();
      const isBlocked = blocked.some((b: any) => {
        if (b.is_permanent) return true;
        if (b.expires_at && new Date(b.expires_at) > now) return true;
        return false;
      });
      if (isBlocked) {
        return new Response(JSON.stringify({ blocked: true, message: "Access restricted" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // --- Check MANUALLY blocked country ---
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

    if (country_code) {
      const { data: blockedCountry } = await supabaseAdmin
        .from("blocked_countries")
        .select("id")
        .eq("country_code", country_code)
        .maybeSingle();
      if (blockedCountry) {
        await supabaseAdmin.from("security_logs").insert({
          event_type: "country_blocked", ip_address: ip,
          details: `Blocked country (manual rule): ${country} (${country_code})`,
          country,
        });
        return new Response(JSON.stringify({ blocked: true, message: "Access restricted" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // --- Passive monitoring: detect crawlers and bots, log only, never block ---
    const ua = user_agent || "";
    const isCrawler = CRAWLER_PATTERNS.some((p) => p.test(ua));
    const isBot = !isCrawler && BOT_PATTERNS.some((p) => p.test(ua));

    if (isCrawler) {
      await supabaseAdmin.from("security_logs").insert({
        event_type: "crawler_detected", ip_address: ip,
        details: `Search engine crawler: ${ua.substring(0, 150)}`,
        page, country,
      });
    } else if (isBot || !ua) {
      await supabaseAdmin.from("security_logs").insert({
        event_type: "bot_detected", ip_address: ip,
        details: `Bot/script detected: ${(ua || "empty user-agent").substring(0, 150)}`,
        page, country,
      });
    }

    // --- Passive rate monitoring (log high activity, never block) ---
    // No automatic rate limiting or IP banning

    // --- Device/browser parsing ---
    let device_type = "desktop";
    if (screen_width && screen_width < 768) device_type = "mobile";
    else if (screen_width && screen_width < 1024) device_type = "tablet";

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

    // --- Upsert session ---
    const { data: existing } = await supabaseAdmin
      .from("visitor_sessions")
      .select("id")
      .eq("session_id", session_id)
      .maybeSingle();

    if (existing) {
      await supabaseAdmin.from("visitor_sessions")
        .update({ current_page: page, last_seen_at: new Date().toISOString() })
        .eq("session_id", session_id);
    } else {
      await supabaseAdmin.from("visitor_sessions").insert({
        session_id, ip_address: ip, city, country, country_code,
        latitude, longitude, device_type, browser, os,
        current_page: page, referrer: referrer || null,
      });
    }

    // --- Update visitor log ---
    const { data: existingLog } = await supabaseAdmin
      .from("visitor_logs")
      .select("id, pages_visited")
      .eq("session_id", session_id)
      .maybeSingle();

    if (existingLog) {
      const pages = existingLog.pages_visited || [];
      if (!pages.includes(page)) pages.push(page);
      await supabaseAdmin.from("visitor_logs")
        .update({ pages_visited: pages, session_end: new Date().toISOString() })
        .eq("session_id", session_id);
    } else {
      await supabaseAdmin.from("visitor_logs").insert({
        session_id, ip_address: ip, country, device_type, browser, os,
        pages_visited: [page], session_start: new Date().toISOString(),
        session_end: new Date().toISOString(),
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("track-visit error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
