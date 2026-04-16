import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const STATIC_KNOWLEDGE = `
═══ CLOUD ON FIRE — CORE COMPANY KNOWLEDGE BASE ═══

COMPANY OVERVIEW:
- Company Name: Cloud on Fire
- Industry: VPS Hosting, Cloud Infrastructure, Game Server Hosting, DDoS Protection
- Headquarters: India
- Website: https://cloudonfire.in
- Founded: 2024
- Launch Date: 15th April 2026 (NOW LIVE)
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
   - CPU: Intel Xeon Platinum series processors (8168 / 8173M) — high-frequency cores with strong single-core performance
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
- Processors: Intel Xeon Platinum series (8168 / 8173M)
- Storage: NVMe Gen4 SSDs
- Network: 1 Gbps uplinks, premium peering
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

    if (mode === "generate_seo") {
      systemPrompt = `You are an expert SEO specialist for Cloud on Fire, India's leading VPS hosting company.
Generate comprehensive SEO metadata based on the user's input (keyword, audience, topic).
Return ONLY valid JSON (no markdown fences) with this exact structure:
{"meta_title":"Under 60 chars, keyword-rich","meta_description":"Under 160 chars, compelling with CTA","og_title":"Open Graph title under 60 chars","og_description":"OG description under 160 chars","twitter_description":"Twitter card description under 160 chars","slug_suggestions":["slug-1","slug-2","slug-3"],"keywords":["keyword1","keyword2","keyword3","keyword4","keyword5"]}

SEO Best Practices:
- Meta title: 50-60 characters, primary keyword near the start
- Meta description: 150-160 characters, include a call-to-action
- Use natural language, avoid keyword stuffing
- Include brand name "Cloud on Fire" where appropriate
- Target Indian hosting market keywords

${fullContext}`;
    } else if (mode === "analyze_seo") {
      systemPrompt = `You are an SEO auditor analyzing a webpage for Cloud on Fire.
Analyze the provided page content and current SEO settings, then return a detailed score and recommendations.
Return ONLY valid JSON (no markdown fences) with this exact structure:
{"score":85,"max_score":100,"checks":[{"name":"Meta Title Length","status":"pass|warn|fail","detail":"Explanation","suggestion":"Fix suggestion if needed"},{"name":"Meta Description Length","status":"pass|warn|fail","detail":"Explanation","suggestion":"Fix suggestion if needed"},{"name":"Keyword Presence","status":"pass|warn|fail","detail":"Explanation","suggestion":""},{"name":"Content Length","status":"pass|warn|fail","detail":"Explanation","suggestion":""},{"name":"Structured Data","status":"pass|warn|fail","detail":"Explanation","suggestion":""},{"name":"Heading Structure","status":"pass|warn|fail","detail":"Explanation","suggestion":""},{"name":"Image Alt Text","status":"pass|warn|fail","detail":"Explanation","suggestion":""},{"name":"Internal Links","status":"pass|warn|fail","detail":"Explanation","suggestion":""}],"optimized_title":"Suggested better title under 60 chars","optimized_description":"Suggested better description under 160 chars","missing_elements":["list of missing SEO elements"],"recommendations":["actionable recommendation 1","actionable recommendation 2","actionable recommendation 3"]}

Scoring criteria:
- Meta title: 50-60 chars = pass, 40-70 chars = warn, else fail (15 pts)
- Meta description: 150-160 chars = pass, 120-170 chars = warn, else fail (15 pts)
- Keyword presence in title & description (15 pts)
- Content length > 300 words = pass (10 pts)
- Structured data present (15 pts)
- Proper heading hierarchy (10 pts)
- Alt text on images (10 pts)
- Internal links present (10 pts)

${fullContext}`;
    } else if (mode === "suggest_keywords") {
      systemPrompt = `You are an SEO keyword research expert for Cloud on Fire, an Indian VPS hosting company.
Given a seed keyword, generate comprehensive keyword suggestions.
Return ONLY valid JSON (no markdown fences) with this exact structure:
{"seed_keyword":"the input keyword","long_tail":["long tail keyword 1","long tail keyword 2","long tail keyword 3","long tail keyword 4","long tail keyword 5"],"high_intent":["high intent keyword 1","high intent keyword 2","high intent keyword 3","high intent keyword 4","high intent keyword 5"],"related":["related phrase 1","related phrase 2","related phrase 3","related phrase 4","related phrase 5"],"questions":["question keyword 1","question keyword 2","question keyword 3"]}

Focus on:
- Indian hosting market context
- VPS, cloud, game hosting, DDoS protection niches
- Commercial intent keywords
- Question-based keywords for FAQ/featured snippets

${fullContext}`;
    } else if (mode === "generate_schema") {
      systemPrompt = `You are a structured data expert generating JSON-LD schema markup.
Based on the page type and content provided, generate appropriate schema markup.
Return ONLY valid JSON (no markdown fences) with this exact structure:
{"schemas":[{"type":"Organization|Article|FAQ|Product|WebPage|BreadcrumbList","name":"Schema name","json_ld":{"@context":"https://schema.org","@type":"...complete schema object..."}}],"recommendations":["recommendation about schema usage 1","recommendation 2"]}

Guidelines:
- Generate schemas appropriate for the page type
- Use real Cloud on Fire data from the knowledge base
- Include all required and recommended properties
- Follow Google's structured data guidelines

${fullContext}`;
    } else if (mode === "page_seo_optimize") {
      systemPrompt = `You are an SEO optimizer for Cloud on Fire web pages.
Analyze the given page content and generate optimized SEO metadata.
Return ONLY valid JSON (no markdown fences) with this exact structure:
{"meta_title":"Optimized title under 60 chars","meta_description":"Optimized description under 160 chars","keywords":"comma, separated, keywords","og_title":"Open Graph title","og_description":"OG description","schema_suggestions":["Organization","Article","FAQ"],"improvements":["specific improvement 1","specific improvement 2","specific improvement 3"]}

Best practices:
- Primary keyword at the start of the title
- Compelling meta description with CTA
- 5-8 relevant keywords
- Schema types appropriate for content

${fullContext}`;
    } else if (mode === "og_image_suggestions") {
      systemPrompt = `You are a social media optimization expert for Cloud on Fire.
Generate OG image text suggestions for social sharing.
Return ONLY valid JSON (no markdown fences) with this exact structure:
{"suggestions":[{"headline":"Bold headline for OG image","subtext":"Supporting text","style":"professional|bold|minimal|playful"},{"headline":"Alternative headline","subtext":"Supporting text","style":"professional|bold|minimal|playful"},{"headline":"Third option","subtext":"Supporting text","style":"professional|bold|minimal|playful"}],"tips":["tip about OG images 1","tip 2"]}

${fullContext}`;
    } else if (mode === "seo_audit") {
      systemPrompt = `You are an SEO auditor for Cloud on Fire's entire website.
Analyze all pages and settings to find SEO issues.
Return ONLY valid JSON (no markdown fences) with this exact structure:
{"issues":[{"severity":"critical|warning|info","page":"page name or path","issue":"description of the issue","fix":"how to fix it"}],"overall_score":75,"summary":"Brief summary of SEO health"}

Check for:
- Missing meta titles or descriptions
- Duplicate titles across pages
- Short descriptions (under 120 chars)
- Missing keywords
- Pages without structured data
- Missing OG images

${fullContext}`;
    } else if (mode === "generate_page") {
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
      systemPrompt = `You are an expert SEO blog writer for Cloud on Fire, India's leading VPS hosting company.
Generate a complete, fully SEO-optimized blog post based on the user's request.
Return ONLY valid JSON (no markdown fences) with this exact structure:
{"title":"Blog Title","slug":"blog-slug","content":"<h2>Section</h2><p>Rich HTML content...</p>","meta_title":"SEO title under 60 chars with primary keyword","meta_description":"Under 160 chars with CTA","tags":["tag1","tag2","tag3"],"excerpt":"1-2 sentence summary for listing page"}

MANDATORY SEO RULES — follow every one:

1. HEADING STRUCTURE:
   - The blog title becomes the H1 (rendered by the template, do NOT include h1 in content)
   - Use 3-5 <h2> subheadings in content, each addressing a subtopic
   - Use <h3> for sub-points under h2 when needed
   - Primary keyword MUST appear in at least one h2

2. KEYWORD OPTIMIZATION:
   - Extract the primary keyword from the title
   - Place primary keyword in the first paragraph naturally
   - Use the keyword in at least one h2 heading
   - Use 2-3 related long-tail keywords throughout
   - Do NOT keyword-stuff — keep it natural and readable

3. INTERNAL LINKS (CRITICAL — minimum 3):
   - ALWAYS include these internal links woven naturally into the content:
     <a href="https://cloudonfire.com">Cloud on Fire</a>
     <a href="https://cloudonfire.com/vps-plans">VPS Hosting India</a>
     <a href="https://cloudonfire.com/gaming-vps">Gaming VPS</a>
     <a href="https://cloudonfire.com/minecraft-hosting-india">Minecraft Hosting India</a>
     <a href="https://cloudonfire.com/ddos-protection">DDoS Protection</a>
   - Pick 3-5 relevant links from above based on the blog topic
   - Use descriptive anchor text like "Cloud on Fire VPS hosting" not "click here"

4. CONTENT QUALITY:
   - Write 800-1500 words of genuinely helpful, informative content
   - Use short paragraphs (2-3 sentences max)
   - Include bullet points or numbered lists where appropriate
   - Add practical tips, examples, or actionable advice
   - Keep tone professional yet approachable
   - NO fluff, filler, or repetitive sentences

5. META FIELDS:
   - meta_title: Under 60 chars, primary keyword near start, include "Cloud on Fire" if space allows
   - meta_description: 150-160 chars, compelling with a CTA like "Learn more" or "Get started"
   - slug: Clean URL-friendly slug derived from title (lowercase, hyphens, no stop words)
   - excerpt: 1-2 sentences that summarize the post for the blog listing page
   - tags: 3-5 relevant tags

6. READABILITY:
   - Use <strong> for key terms occasionally
   - Break up walls of text with subheadings every 150-200 words
   - End with a clear conclusion or CTA paragraph mentioning Cloud on Fire

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

    // Non-streaming for generation/analysis modes
    const nonStreamingModes = ["generate_page", "generate_blog", "generate_seo", "analyze_seo", "suggest_keywords", "generate_schema", "page_seo_optimize", "og_image_suggestions", "seo_audit"];
    if (nonStreamingModes.includes(mode)) {
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
