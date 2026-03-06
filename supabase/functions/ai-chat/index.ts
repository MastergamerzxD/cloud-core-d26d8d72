import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ── Static knowledge base (always available, never changes per request) ──
const STATIC_KNOWLEDGE = `
═══ CLOUD ON FIRE — CORE COMPANY KNOWLEDGE BASE ═══

COMPANY OVERVIEW:
- Company Name: Cloud on Fire
- Industry: VPS Hosting, Cloud Infrastructure, Game Server Hosting, DDoS Protection
- Headquarters: India
- Website: https://cloudonfire.in
- Founded: 2024
- Launch Date: 15th April 2026
- Tagline: India's #1 High-Performance VPS Hosting Provider
- Mission: To provide enterprise-grade VPS hosting with unmatched performance, security, and support at affordable prices for Indian businesses, developers, and gamers.

CONTACT INFORMATION:
- Support Email: hello@cloudonfire.com
- Phone: +91 8766215705
- Support Hours: 24/7
- Response Time: Under 15 minutes for Pro VPS customers
- Contact Page: /contact

─── PRODUCTS & SERVICES ───

1. PRO VPS (/pro-vps)
   - Target: Gamers, game server hosts, high-traffic websites, mission-critical applications
   - CPU: Dedicated AMD EPYC 7003 series cores (no shared/oversold)
   - Storage: NVMe Gen4 SSDs for maximum I/O
   - DDoS Protection: Enterprise-grade, always-on, never suspended under attack
   - Network: Premium low-latency network across India
   - Use Cases: Minecraft servers, Rust servers, ARK servers, FiveM (GTA V) servers, CS2 servers, Valheim, web apps, databases
   - Support: Priority 24/7 with < 15 min response
   - Uptime SLA: 99.9%

2. BUDGET VPS (/budget-vps)
   - Target: Developers, small businesses, students, personal projects
   - Affordable entry-level VPS hosting
   - Good for: Small websites, development/staging environments, testing, light workloads, learning
   - NVMe storage included
   - DDoS protection included
   - 24/7 support

3. DDOS PROTECTION (/ddos-protection)
   - Enterprise-grade Layer 3/4 DDoS mitigation
   - Capacity: Up to 1 Tbps scrubbing
   - Always-on protection (no manual activation needed)
   - ML-based real-time threat detection
   - Pro VPS servers are NEVER suspended under DDoS attacks
   - Multi-layer filtering pipeline

4. GAME SERVER HOSTING
   - Optimized for popular multiplayer games
   - Supported games: Minecraft (Java & Bedrock), Rust, ARK: Survival Evolved, FiveM (GTA V), CS2, Valheim, Terraria, and more
   - Low-latency Indian infrastructure
   - One-click game server deployment
   - DDoS protection included

─── INFRASTRUCTURE (/infrastructure) ───
- Primary Data Center: Yotta NM1, Navi Mumbai, India
- Certification: Tier-3+ certified facility
- Processors: AMD EPYC 7003 series
- Storage: NVMe Gen4 SSDs
- Network: 10 Gbps+ uplinks, premium peering
- DDoS Scrubbing: 1 Tbps capacity
- Power: Redundant power with UPS and diesel generators
- Cooling: Precision cooling systems
- Security: 24/7 physical security, biometric access

─── WHY CLOUD ON FIRE (/why-us) ───
- Indian Infrastructure: Servers physically located in India for lowest latency
- No Overselling: Dedicated resources, not shared/oversold
- Enterprise DDoS Protection: Included free on all plans
- NVMe Storage: All plans use fast NVMe SSDs
- 24/7 Expert Support: Real humans, not bots
- Transparent Pricing: No hidden fees
- 99.9% Uptime SLA: Guaranteed availability

─── ABOUT US (/about) ───
Cloud on Fire was founded in 2024 with the vision of providing world-class VPS hosting infrastructure in India. The company addresses the gap in the Indian market for high-performance, DDoS-protected hosting at affordable prices.

─── OTHER WEBSITE PAGES ───
- Homepage (/) — Overview of all services, pricing previews, trust signals
- Compare VPS (/compare) — Side-by-side comparison of Pro VPS vs Budget VPS
- FAQ (/faq) — Frequently asked questions about services, billing, support
- Blog (/blog) — Technical articles, tutorials, industry news
- Media Gallery (/media) — Company images and resources
- Status Page (/status) — Real-time service status
- Terms of Service (/terms) — Legal terms
- Privacy Policy (/privacy) — Data privacy information

─── FAQ HIGHLIGHTS ───
Q: How can I contact support?
A: Email hello@cloudonfire.com or call +91 8766215705. Pro VPS gets priority support with < 15 min response.

Q: Are servers located in India?
A: Yes, all servers are in Yotta's Tier-3+ certified data center in Navi Mumbai, India.

Q: Do you offer DDoS protection?
A: Yes, enterprise-grade DDoS protection is included on all plans. Pro VPS servers are never suspended under attack.

Q: What payment methods do you accept?
A: Details available on the website. Contact hello@cloudonfire.com for payment questions.

Q: Can I upgrade my VPS plan?
A: Yes, you can upgrade anytime. Contact support for assistance.
`;

async function getDynamicContent(supabaseAdmin: any) {
  const [pagesRes, postsRes, announcementsRes, settingsRes] = await Promise.all([
    supabaseAdmin.from("pages").select("title, slug, content, seo_title, seo_description").eq("status", "published").limit(30),
    supabaseAdmin.from("blog_posts").select("title, slug, excerpt, content, tags, meta_description, author_name, publish_date").eq("status", "published").order("created_at", { ascending: false }).limit(30),
    supabaseAdmin.from("announcements").select("title, description, status").eq("status", "active"),
    supabaseAdmin.from("site_settings").select("key, value"),
  ]);

  // Extract full page content (up to 1000 chars each for richer context)
  const pages = (pagesRes.data || []).map((p: any) =>
    `─ CMS Page: "${p.title}" (URL: /page/${p.slug})\n  SEO Title: ${p.seo_title || p.title}\n  Description: ${p.seo_description || "N/A"}\n  Content:\n  ${stripHtml(p.content || "").slice(0, 1000)}`
  ).join("\n\n");

  const posts = (postsRes.data || []).map((p: any) =>
    `─ Blog Post: "${p.title}" (URL: /blog/${p.slug})\n  Author: ${p.author_name || "Cloud on Fire"}\n  Date: ${p.publish_date || "N/A"}\n  Excerpt: ${p.excerpt || "N/A"}\n  Tags: ${(p.tags || []).join(", ") || "N/A"}\n  Meta: ${p.meta_description || "N/A"}\n  Content:\n  ${stripHtml(p.content || "").slice(0, 800)}`
  ).join("\n\n");

  const announcements = (announcementsRes.data || []).map((a: any) =>
    `─ ${a.title}: ${a.description || "No details"}`
  ).join("\n");

  const settings = (settingsRes.data || []).reduce((acc: Record<string, string>, s: any) => {
    acc[s.key] = s.value || "";
    return acc;
  }, {});

  return `
═══ DYNAMIC WEBSITE CONTENT (Live from CMS) ═══

CUSTOM SITE SETTINGS:
${Object.entries(settings).map(([k, v]) => `- ${k}: ${v}`).join("\n") || "No custom settings configured."}

PUBLISHED CMS PAGES (${pagesRes.data?.length || 0}):
${pages || "No custom pages published yet."}

PUBLISHED BLOG POSTS (${postsRes.data?.length || 0}):
${posts || "No blog posts published yet."}

ACTIVE ANNOUNCEMENTS:
${announcements || "No active announcements."}
`;
}

// Strip HTML tags for cleaner context
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
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

    const dynamicContent = await getDynamicContent(supabaseAdmin);
    const fullContext = STATIC_KNOWLEDGE + "\n" + dynamicContent;

    let systemPrompt = "";

    if (mode === "generate_page") {
      systemPrompt = `You are an expert content writer for Cloud on Fire, India's leading VPS hosting company.
Generate a complete, professional website page based on the user's request.
Return ONLY valid JSON (no markdown fences) with this exact structure:
{"title":"Page Title","slug":"page-slug","seo_title":"SEO Title under 60 chars","seo_description":"Meta description under 160 chars","content":"<h2>Section</h2><p>Rich HTML content...</p>"}

Guidelines:
- Use professional hosting industry language
- Include 3-5 sections with h2 headings
- Add bullet points, feature lists, and CTAs
- Reference real Cloud on Fire products and infrastructure
- Mention contact info (hello@cloudonfire.com, +91 8766215705) where appropriate

${fullContext}`;
    } else if (mode === "generate_blog") {
      systemPrompt = `You are an expert blog writer for Cloud on Fire, India's leading VPS hosting company.
Generate a complete, SEO-optimized blog post based on the user's request.
Return ONLY valid JSON (no markdown fences) with this exact structure:
{"title":"Blog Title","slug":"blog-slug","content":"<h2>Section</h2><p>Rich HTML content...</p>","meta_description":"Under 160 chars","tags":["tag1","tag2"],"excerpt":"1-2 sentence summary"}

Guidelines:
- Write engaging, informative content (800-1500 words)
- Use h2/h3 subheadings for structure
- Include practical tips and actionable advice
- Reference Cloud on Fire products naturally
- Optimize for SEO with relevant keywords

${fullContext}`;
    } else if (mode === "public") {
      systemPrompt = `You are Cloud on Fire's friendly AI assistant on the public website.

YOUR IDENTITY: You are "Cloud on Fire Assistant" — a helpful, knowledgeable AI that assists website visitors.

CRITICAL RULES:
1. ONLY answer using the knowledge base provided below. Never invent, guess, or hallucinate information.
2. For contact questions → ALWAYS say: "You can reach us at hello@cloudonfire.com or call +91 8766215705"
3. For product questions → Describe actual Cloud on Fire products from the knowledge base with specific details.
4. For pricing questions → Only share pricing if explicitly stated in the knowledge base. Otherwise say pricing details are available on the website or by contacting support.
5. If you genuinely cannot find the answer → Say: "I don't have that specific information right now. Please contact us at hello@cloudonfire.com or call +91 8766215705 and our team will be happy to help!"
6. NEVER say "I'm just an AI" or "I don't have access." Instead, redirect to contact info.
7. Keep responses concise: 2-4 sentences for simple questions, more for detailed product inquiries.
8. Use a warm, professional tone. You represent Cloud on Fire.
9. When asked "who are you" → Say you're Cloud on Fire's AI assistant, here to help with questions about VPS hosting services.

${fullContext}`;
    } else {
      systemPrompt = `You are Cloud on Fire's Admin AI Assistant — a powerful tool for website administrators.

CAPABILITIES:
- Answer questions about all website content (pages, blogs, announcements, settings)
- Suggest SEO improvements based on current page content
- Help draft and improve content
- Analyze website structure and suggest improvements
- Provide actionable recommendations

RULES:
- Base all answers on the actual website data provided below
- When suggesting improvements, be specific and actionable
- Use HTML formatting when generating content
- Reference actual page URLs and content

${fullContext}`;
    }

    const allMessages = [
      { role: "system", content: systemPrompt },
      ...(prompt ? [{ role: "user", content: prompt }] : messages || []),
    ];

    // Non-streaming for generation modes
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

    // Streaming for chat modes
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
