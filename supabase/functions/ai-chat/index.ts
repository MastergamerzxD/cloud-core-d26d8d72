import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function getWebsiteContext(supabaseAdmin: any) {
  const [pagesRes, postsRes, announcementsRes, settingsRes] = await Promise.all([
    supabaseAdmin.from("pages").select("title, slug, content, seo_title, seo_description").eq("status", "published").limit(20),
    supabaseAdmin.from("blog_posts").select("title, slug, excerpt, content, tags, status").eq("status", "published").order("created_at", { ascending: false }).limit(20),
    supabaseAdmin.from("announcements").select("title, description, status").eq("status", "active"),
    supabaseAdmin.from("site_settings").select("key, value"),
  ]);

  const pages = (pagesRes.data || []).map((p: any) => `Page: "${p.title}" (/${p.slug})\nSEO: ${p.seo_title || ""} | ${p.seo_description || ""}\nContent: ${(p.content || "").slice(0, 500)}`).join("\n\n");
  const posts = (postsRes.data || []).map((p: any) => `Blog: "${p.title}" (/${p.slug})\nExcerpt: ${p.excerpt || ""}\nTags: ${(p.tags || []).join(", ")}`).join("\n\n");
  const announcements = (announcementsRes.data || []).map((a: any) => `Announcement: ${a.title} - ${a.description || ""}`).join("\n");
  const settings = (settingsRes.data || []).map((s: any) => `${s.key}: ${s.value || ""}`).join("\n");

  return `=== WEBSITE KNOWLEDGE BASE ===

ABOUT: Cloud on Fire is a premium VPS hosting company based in India offering Pro VPS, Budget VPS, game server hosting, and DDoS protection services.

WEBSITE PAGES:
${pages || "No pages published yet."}

BLOG POSTS:
${posts || "No blog posts yet."}

ACTIVE ANNOUNCEMENTS:
${announcements || "No active announcements."}

SITE SETTINGS:
${settings || "No custom settings."}

CONTACT: Visit /contact for contact information.
PRODUCTS: Pro VPS (/pro-vps), Budget VPS (/budget-vps), DDoS Protection (/ddos-protection)
INFRASTRUCTURE: /infrastructure for datacenter info`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, mode, prompt } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const websiteContext = await getWebsiteContext(supabaseAdmin);

    let systemPrompt = "";

    if (mode === "generate_page") {
      systemPrompt = `You are an AI content generator for Cloud on Fire, a premium VPS hosting company in India.
Generate a complete website page based on the user's request. Return ONLY valid JSON with this exact structure:
{"title":"Page Title","slug":"page-slug","seo_title":"SEO Title (max 60 chars)","seo_description":"Meta description (max 160 chars)","content":"<h2>Section</h2><p>Content with HTML formatting...</p>"}
Use professional hosting industry language. Include multiple sections with h2/h3 headings, paragraphs, and lists.
${websiteContext}`;
    } else if (mode === "generate_blog") {
      systemPrompt = `You are an AI blog content generator for Cloud on Fire, a premium VPS hosting company in India.
Generate a complete blog post based on the user's request. Return ONLY valid JSON with this exact structure:
{"title":"Blog Title","slug":"blog-slug","content":"<h2>Section</h2><p>Content with HTML formatting...</p>","meta_description":"Meta description (max 160 chars)","tags":["tag1","tag2"],"excerpt":"Brief excerpt (1-2 sentences)"}
Write engaging, SEO-optimized content about VPS hosting, cloud computing, gaming servers, etc.
${websiteContext}`;
    } else if (mode === "public") {
      systemPrompt = `You are Cloud on Fire's AI assistant, helping visitors learn about our VPS hosting services.
You are friendly, professional, and concise. Answer questions using ONLY the website knowledge below.
If you don't know something, say "I don't have that information, but you can contact us at /contact for help."
Never make up pricing, features, or information not in your knowledge base.

${websiteContext}`;
    } else {
      // Admin assistant mode
      systemPrompt = `You are Cloud on Fire's Admin AI Assistant. You help administrators manage the website.
You can:
- Answer questions about website content
- Suggest SEO improvements
- Help draft content
- Provide analytics insights
- Suggest page/blog improvements

When asked to generate content, be detailed and professional. Use HTML formatting for rich content.
Always base your answers on the actual website data below.

${websiteContext}`;
    }

    const allMessages = [
      { role: "system", content: systemPrompt },
      ...(prompt ? [{ role: "user", content: prompt }] : messages || []),
    ];

    // For generation modes, don't stream - return complete JSON
    if (mode === "generate_page" || mode === "generate_blog") {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: allMessages,
          stream: false,
        }),
      });

      if (!response.ok) {
        const status = response.status;
        if (status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        throw new Error(`AI gateway error: ${status}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || "";
      
      // Try to parse JSON from the response
      let parsed;
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
      } catch {
        parsed = null;
      }

      return new Response(JSON.stringify({ content, parsed }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Streaming mode for chat
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: allMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error(`AI gateway error: ${status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
