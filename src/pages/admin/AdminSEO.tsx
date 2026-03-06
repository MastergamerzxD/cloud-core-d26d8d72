import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Globe, Share2, Code2, MapPin, FileText, Sparkles, Eye, EyeOff, ChevronDown, ChevronUp, RotateCcw, Type, ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AISEOGenerator,
  AIKeywordSuggestions,
  AISEOScore,
  AISchemaGenerator,
  AIOGImageSuggestions,
  AISEOAudit,
  AIPageSEOButton,
} from "@/components/admin/AISEOTools";

// Hardcoded defaults from page components — the "live" values when no admin override is set
const PAGE_SEO_DEFAULTS: Record<string, { title: string; description: string; keywords: string }> = {
  home: {
    title: "Cloud on Fire – Best VPS Hosting Company in India | Gaming VPS from ₹299/mo",
    description: "India's #1 high-performance VPS hosting provider. Gaming VPS from ₹299/month with enterprise DDoS protection up to 1Tbps, NVMe Gen4 storage, Yotta data centers, and 99.9% uptime. Best hosting company in India for Minecraft, FiveM, CS2, and web hosting.",
    keywords: "best VPS hosting company in India, best hosting company in India, best game hosting company in India, gaming VPS India, cheap VPS India, DDoS protected VPS, cloud server India, game server hosting, Minecraft server hosting India, FiveM server hosting, CS2 server India, budget VPS, Delhi VPS hosting, Mumbai VPS, NVMe VPS India, Cloud on Fire, best VPS provider India, Indian VPS hosting",
  },
  pro_vps: {
    title: "Pro VPS India – Best Gaming VPS Server Hosting | From ₹299/mo | Cloud on Fire",
    description: "Best gaming VPS in India from ₹299/month. Dedicated CPU cores, premium DDoS protection (never suspended), NVMe Gen4 storage. Perfect for Minecraft, FiveM, CS2, GTA V, Rust servers. Cloud on Fire Pro VPS.",
    keywords: "best gaming VPS India, pro VPS hosting, Minecraft server hosting India, FiveM server India, CS2 server hosting, GTA V server, dedicated VPS India, game server hosting India, high performance VPS, Cloud on Fire Pro VPS, best game hosting company India, Rust server India",
  },
  budget_vps: {
    title: "Budget VPS India – Cheapest VPS Hosting | From ₹499/mo | Cloud on Fire",
    description: "Cheapest VPS hosting in India from ₹499/month. DDoS protection included, NVMe storage, unlimited bandwidth. Best affordable VPS for websites, WordPress, Discord bots, and development. Cloud on Fire Budget VPS.",
    keywords: "cheapest VPS India, budget VPS hosting, affordable VPS India, WordPress VPS India, development server, Discord bot hosting, website VPS India, cheap cloud server India, best budget hosting India, Cloud on Fire Budget VPS",
  },
  compare: {
    title: "Compare VPS Plans India – Pro vs Budget VPS Hosting | Cloud on Fire",
    description: "Compare Cloud on Fire Pro VPS vs Budget VPS plans side-by-side. Detailed comparison of CPU, RAM, DDoS protection, pricing, and features. Find the best VPS hosting plan in India for your needs.",
    keywords: "VPS comparison India, Pro VPS vs Budget VPS, best VPS plan India, gaming VPS comparison, VPS features comparison, Cloud on Fire plans, VPS hosting plans India",
  },
  ddos: {
    title: "DDoS Protection India – Enterprise Anti-DDoS VPS Hosting | Cloud on Fire",
    description: "Best DDoS protected VPS hosting in India. Enterprise-grade Layer 4 DDoS mitigation up to 1Tbps. Pro VPS never suspended under attack. Real-time ML-based threat monitoring. Cloud on Fire.",
    keywords: "DDoS protection India, anti-DDoS VPS hosting, DDoS mitigation India, protected VPS hosting, Layer 4 DDoS protection, 1Tbps DDoS protection, DDoS protected game server India, best DDoS protection hosting",
  },
  infrastructure: {
    title: "VPS Infrastructure India – Yotta Tier-3+ Data Centers Delhi & Mumbai | Cloud on Fire",
    description: "Cloud on Fire operates from Yotta's Tier-3+ certified data centers in Delhi & Mumbai. AMD EPYC 7003 processors, NVMe Gen4 storage, 10Gbps+ network, 1Tbps DDoS scrubbing. Best VPS infrastructure in India.",
    keywords: "Yotta data center India, VPS infrastructure India, AMD EPYC VPS, NVMe Gen4 VPS, Delhi data center, Mumbai data center, Tier 3 data center India, enterprise VPS hardware, best VPS infrastructure",
  },
  about: {
    title: "About Cloud on Fire – Best VPS Hosting Company in India | Our Story",
    description: "Cloud on Fire is India's performance-focused VPS hosting company. Enterprise-grade infrastructure accessible to developers and businesses. Founded to deliver the best hosting experience in India.",
    keywords: "about Cloud on Fire, best VPS hosting company India, Indian hosting provider, VPS company India, Cloud on Fire story, who is Cloud on Fire",
  },
  why_us: {
    title: "Why Cloud on Fire – Best VPS Hosting Provider in India | Performance & Reliability",
    description: "Why Cloud on Fire is the best VPS hosting provider in India. Performance engineering, enterprise DDoS protection, 24/7 expert support, transparent INR pricing, and infrastructure built for Indian developers.",
    keywords: "why Cloud on Fire, best VPS provider India, most reliable VPS hosting India, VPS support India, transparent VPS pricing INR, best hosting provider India, Cloud on Fire advantages",
  },
  faq: {
    title: "VPS Hosting FAQ India – Questions Answered | Cloud on Fire",
    description: "Find answers to frequently asked questions about Cloud on Fire VPS hosting in India. Pro VPS vs Budget VPS, DDoS protection, billing, payment methods, server specs, and support.",
    keywords: "VPS FAQ India, VPS hosting questions, DDoS protection FAQ, VPS billing, Cloud on Fire FAQ, best VPS FAQ, gaming VPS FAQ",
  },
  contact: {
    title: "Contact Cloud on Fire – VPS Hosting Support India | 24/7 Expert Help",
    description: "Contact Cloud on Fire for VPS hosting support, sales inquiries, or technical questions. 24/7 support with under 15 minute response for Pro VPS. Best hosting support in India.",
    keywords: "Cloud on Fire contact, VPS support India, hosting support, sales inquiry, technical support India, 24/7 VPS support",
  },
  blog: {
    title: "Blog – VPS Hosting News, Tutorials & Guides | Cloud on Fire India",
    description: "Latest news, tutorials, and expert guides about VPS hosting in India, cloud infrastructure, DDoS protection, gaming server optimization, and more from Cloud on Fire.",
    keywords: "VPS hosting blog India, Cloud on Fire blog, hosting tutorials, DDoS protection guides, gaming server tips, cloud infrastructure news",
  },
  media: {
    title: "Media Gallery - Cloud on Fire",
    description: "Browse our media gallery including product images, infrastructure photos, and more.",
    keywords: "",
  },
  status: {
    title: "Service Status – Cloud on Fire VPS Hosting India | System Uptime",
    description: "Check the real-time status of Cloud on Fire VPS hosting services. System uptime monitoring for Pro VPS, Budget VPS, DDoS protection, and control panel.",
    keywords: "Cloud on Fire status, VPS uptime India, hosting status page, server status",
  },
};

const PAGE_SEO_KEYS = [
  { page: "Home", prefix: "home", path: "/" },
  { page: "Pro VPS", prefix: "pro_vps", path: "/pro-vps" },
  { page: "Budget VPS", prefix: "budget_vps", path: "/budget-vps" },
  { page: "Compare VPS", prefix: "compare", path: "/compare" },
  { page: "DDoS Protection", prefix: "ddos", path: "/ddos-protection" },
  { page: "Infrastructure", prefix: "infrastructure", path: "/infrastructure" },
  { page: "About Us", prefix: "about", path: "/about" },
  { page: "Why Cloud on Fire", prefix: "why_us", path: "/why-us" },
  { page: "FAQ", prefix: "faq", path: "/faq" },
  { page: "Contact", prefix: "contact", path: "/contact" },
  { page: "Blog", prefix: "blog", path: "/blog" },
  { page: "Media Gallery", prefix: "media", path: "/media" },
  { page: "Status", prefix: "status", path: "/status" },
];

export default function AdminSEO() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedPages, setExpandedPages] = useState<string[]>([]);
  const initialLoadDone = useRef(false);
  const { toast } = useToast();

  useEffect(() => {
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;

    supabase.from("site_settings").select("*").then(({ data }) => {
      const map: Record<string, string> = {};
      (data || []).forEach((s: any) => { map[s.key] = s.value || ""; });
      setSettings(map);
      setLoading(false);
    });
  }, []);

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const allKeys = [
        "site_meta_title", "site_meta_description", "og_image",
        "org_name", "org_legal_name", "org_founding_year", "org_description",
        "org_email", "org_phone", "org_address_street", "org_address_city",
        "org_address_state", "org_address_zip", "org_address_country",
        "org_logo_url", "org_facebook", "org_twitter", "org_linkedin", "org_instagram",
        "google_site_verification", "bing_site_verification",
        "default_og_locale", "twitter_handle",
        ...PAGE_SEO_KEYS.flatMap(p => [
          `seo_${p.prefix}_title`,
          `seo_${p.prefix}_description`,
          `seo_${p.prefix}_keywords`,
          `seo_${p.prefix}_og_image`,
        ]),
      ];

      const upserts = allKeys.map(key => ({
        key,
        value: settings[key] || "",
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from("site_settings").upsert(upserts, { onConflict: "key" });
      if (error) throw error;
      toast({ title: "SEO settings saved!", description: "Changes will apply on next page load for visitors." });
    } catch (err: any) {
      toast({ title: "Error saving", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  if (loading) return <AdminLayout><div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></AdminLayout>;

  const Field = ({ label, k, placeholder, multi }: { label: string; k: string; placeholder?: string; multi?: boolean }) => (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      {multi ? (
        <Textarea value={settings[k] || ""} onChange={(e) => updateSetting(k, e.target.value)} placeholder={placeholder} rows={3} />
      ) : (
        <Input value={settings[k] || ""} onChange={(e) => updateSetting(k, e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );

  const handleApplyGlobalSEO = (data: any) => {
    if (data.meta_title) updateSetting("site_meta_title", data.meta_title);
    if (data.meta_description) updateSetting("site_meta_description", data.meta_description);
    toast({ title: "AI SEO applied to global settings!" });
  };

  const handleApplyPageSEO = (prefix: string, data: { title: string; description: string; keywords: string }) => {
    if (data.title) updateSetting(`seo_${prefix}_title`, data.title);
    if (data.description) updateSetting(`seo_${prefix}_description`, data.description);
    if (data.keywords) updateSetting(`seo_${prefix}_keywords`, data.keywords);
    toast({ title: "AI SEO applied!", description: "Review and save to persist changes." });
  };

  const togglePage = (prefix: string) => {
    setExpandedPages(prev => prev.includes(prefix) ? prev.filter(p => p !== prefix) : [...prev, prefix]);
  };

  const expandAll = () => setExpandedPages(PAGE_SEO_KEYS.map(p => p.prefix));
  const collapseAll = () => setExpandedPages([]);

  const getLiveTitle = (prefix: string) => settings[`seo_${prefix}_title`] || PAGE_SEO_DEFAULTS[prefix]?.title || "Not set";
  const getLiveDescription = (prefix: string) => settings[`seo_${prefix}_description`] || PAGE_SEO_DEFAULTS[prefix]?.description || "Not set";
  const getLiveKeywords = (prefix: string) => settings[`seo_${prefix}_keywords`] || PAGE_SEO_DEFAULTS[prefix]?.keywords || "";
  const hasOverride = (prefix: string) => !!(settings[`seo_${prefix}_title`] || settings[`seo_${prefix}_description`] || settings[`seo_${prefix}_keywords`]);

  const resetToDefault = (prefix: string) => {
    updateSetting(`seo_${prefix}_title`, "");
    updateSetting(`seo_${prefix}_description`, "");
    updateSetting(`seo_${prefix}_keywords`, "");
    toast({ title: "Reset to defaults", description: "Save to apply changes." });
  };

  const titleLenStatus = (title: string) => {
    if (!title) return { color: "text-red-500", text: "Missing" };
    if (title.length < 30) return { color: "text-yellow-500", text: "Too short" };
    if (title.length > 60) return { color: "text-yellow-500", text: "Too long" };
    return { color: "text-green-500", text: "Good" };
  };
  const descLenStatus = (desc: string) => {
    if (!desc) return { color: "text-red-500", text: "Missing" };
    if (desc.length < 70) return { color: "text-yellow-500", text: "Too short" };
    if (desc.length > 160) return { color: "text-yellow-500", text: "Too long" };
    return { color: "text-green-500", text: "Good" };
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">SEO & Meta Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">Control search engine visibility, structured data, and social sharing across your entire site.</p>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save All
          </Button>
        </div>

        <Tabs defaultValue="global" className="space-y-6">
          <TabsList className="bg-muted/50 border border-border flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="global" className="gap-2"><Globe className="h-4 w-4" />Global SEO</TabsTrigger>
            <TabsTrigger value="meta" className="gap-2"><Type className="h-4 w-4" />Meta Titles & Images</TabsTrigger>
            <TabsTrigger value="pages" className="gap-2"><FileText className="h-4 w-4" />Per-Page SEO</TabsTrigger>
            <TabsTrigger value="schema" className="gap-2"><Code2 className="h-4 w-4" />Schema / Structured Data</TabsTrigger>
            <TabsTrigger value="social" className="gap-2"><Share2 className="h-4 w-4" />Social & Verification</TabsTrigger>
            <TabsTrigger value="ai" className="gap-2"><Sparkles className="h-4 w-4" />AI SEO Assistant</TabsTrigger>
          </TabsList>

          {/* Global SEO */}
          <TabsContent value="global" className="space-y-6 max-w-3xl">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Default Meta Tags</CardTitle>
                <CardDescription>Fallback meta tags used when pages don't have custom SEO set. These appear in Google search results.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field label="Default Meta Title" k="site_meta_title" placeholder="Cloud on Fire - Best VPS Hosting India" />
                <Field label="Default Meta Description" k="site_meta_description" placeholder="India's #1 VPS hosting..." multi />
                <Field label="Default OG Image URL" k="og_image" placeholder="https://cloudonfire.com/og-image.jpg" />
              </CardContent>
            </Card>
            <AISEOGenerator onApply={handleApplyGlobalSEO} />
            <AISEOScore pageTitle="Global Site" metaTitle={settings.site_meta_title} metaDescription={settings.site_meta_description} />
          </TabsContent>

          {/* ── Meta Titles & Images Tab ── */}
          <TabsContent value="meta" className="space-y-6 max-w-5xl">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Type className="h-5 w-5" />Page Meta Titles</CardTitle>
                <CardDescription>Edit the meta title for every page. Titles appear in browser tabs, Google results, and social shares. Use AI to optimize each one.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-0 divide-y divide-border">
                {PAGE_SEO_KEYS.map((page) => {
                  const currentTitle = settings[`seo_${page.prefix}_title`] || "";
                  const liveTitle = currentTitle || PAGE_SEO_DEFAULTS[page.prefix]?.title || "Not set";
                  const status = titleLenStatus(liveTitle);
                  const isCustom = !!currentTitle;

                  return (
                    <div key={page.prefix} className="py-4 space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <div className="shrink-0 w-36">
                          <span className="text-sm font-semibold text-foreground">{page.page}</span>
                          <span className="block text-xs text-muted-foreground font-mono">{page.path}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-xs font-medium ${status.color}`}>{liveTitle.length}c · {status.text}</span>
                          {isCustom ? <Badge variant="default" className="text-xs">Custom</Badge> : <Badge variant="outline" className="text-xs">Default</Badge>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={currentTitle}
                          onChange={(e) => updateSetting(`seo_${page.prefix}_title`, e.target.value)}
                          placeholder={PAGE_SEO_DEFAULTS[page.prefix]?.title || `Meta title for ${page.page}`}
                          className="flex-1"
                        />
                        <AIPageSEOButton
                          pageName={page.page}
                          metaTitle={liveTitle}
                          metaDescription={settings[`seo_${page.prefix}_description`] || PAGE_SEO_DEFAULTS[page.prefix]?.description || ""}
                          keywords={settings[`seo_${page.prefix}_keywords`] || PAGE_SEO_DEFAULTS[page.prefix]?.keywords || ""}
                          onApply={(data) => handleApplyPageSEO(page.prefix, data)}
                        />
                        {isCustom && (
                          <Button variant="ghost" size="icon" className="shrink-0 h-10 w-10" onClick={() => updateSetting(`seo_${page.prefix}_title`, "")} title="Reset to default">
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {/* SERP mini-preview */}
                      <div className="p-2 rounded bg-muted/20 border border-border">
                        <p className="text-blue-400 text-sm font-medium truncate">{liveTitle}</p>
                        <p className="text-green-500 text-xs font-mono">https://cloudonfire.com{page.path}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Per-page OG Images */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ImageIcon className="h-5 w-5" />Page OG / Social Images</CardTitle>
                <CardDescription>Set a custom Open Graph image for each page. These appear as thumbnails on Discord, Facebook, Twitter, etc. Leave blank to use the global OG image.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-0 divide-y divide-border">
                <div className="py-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">Global OG Image (fallback for all pages)</Label>
                    {settings.og_image ? <Badge variant="default" className="text-xs">Set</Badge> : <Badge variant="outline" className="text-xs">Not set</Badge>}
                  </div>
                  <Input
                    value={settings.og_image || ""}
                    onChange={(e) => updateSetting("og_image", e.target.value)}
                    placeholder="https://cloudonfire.com/og-image.jpg"
                  />
                  {settings.og_image && (
                    <div className="mt-2 rounded border border-border overflow-hidden max-w-xs">
                      <img src={settings.og_image} alt="Global OG" className="w-full h-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    </div>
                  )}
                </div>
                {PAGE_SEO_KEYS.map((page) => {
                  const ogKey = `seo_${page.prefix}_og_image`;
                  const currentOg = settings[ogKey] || "";
                  return (
                    <div key={page.prefix} className="py-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-semibold text-foreground">{page.page}</span>
                          <span className="ml-2 text-xs text-muted-foreground font-mono">{page.path}</span>
                        </div>
                        {currentOg ? <Badge variant="default" className="text-xs">Custom</Badge> : <Badge variant="outline" className="text-xs">Using Global</Badge>}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={currentOg}
                          onChange={(e) => updateSetting(ogKey, e.target.value)}
                          placeholder="https://cloudonfire.com/og-image.jpg (leave blank for global)"
                          className="flex-1"
                        />
                        {currentOg && (
                          <Button variant="ghost" size="icon" className="shrink-0 h-10 w-10" onClick={() => updateSetting(ogKey, "")} title="Reset to global">
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {currentOg && (
                        <div className="mt-1 rounded border border-border overflow-hidden max-w-xs">
                          <img src={currentOg} alt={`${page.page} OG`} className="w-full h-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <AIOGImageSuggestions />
          </TabsContent>

          {/* Per-Page SEO — Enhanced */}
          <TabsContent value="pages" className="space-y-4 max-w-4xl">
            {/* Overview table */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5" />Live Meta Titles Overview</CardTitle>
                <CardDescription>Current live meta titles for every page. Green = ideal length (30-60 chars). Yellow = needs adjustment. Admin overrides shown with a badge.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {PAGE_SEO_KEYS.map((page) => {
                    const liveTitle = getLiveTitle(page.prefix);
                    const status = titleLenStatus(liveTitle);
                    const override = hasOverride(page.prefix);
                    return (
                      <div
                        key={page.prefix}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors border border-transparent hover:border-border cursor-pointer"
                        onClick={() => togglePage(page.prefix)}
                      >
                        <div className="w-32 shrink-0">
                          <span className="text-sm font-medium text-foreground">{page.page}</span>
                          <span className="block text-xs text-muted-foreground font-mono">{page.path}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate" title={liveTitle}>{liveTitle}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-xs font-medium ${status.color}`}>{liveTitle.length}c · {status.text}</span>
                          {override ? <Badge variant="default" className="text-xs">Custom</Badge> : <Badge variant="outline" className="text-xs">Default</Badge>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Expand/Collapse controls */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={expandAll}><ChevronDown className="mr-1 h-3 w-3" />Expand All</Button>
              <Button variant="outline" size="sm" onClick={collapseAll}><ChevronUp className="mr-1 h-3 w-3" />Collapse All</Button>
            </div>

            {/* Per-page editors */}
            {PAGE_SEO_KEYS.map((page) => {
              const defaults = PAGE_SEO_DEFAULTS[page.prefix];
              const expanded = expandedPages.includes(page.prefix);
              const override = hasOverride(page.prefix);
              const liveTitle = getLiveTitle(page.prefix);
              const liveDesc = getLiveDescription(page.prefix);
              const titleStatus = titleLenStatus(liveTitle);
              const descStatus = descLenStatus(liveDesc);

              return (
                <Card key={page.prefix} className="bg-card border-border">
                  <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/20 transition-colors" onClick={() => togglePage(page.prefix)}>
                    <div className="flex items-center gap-3">
                      {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                      <div>
                        <h3 className="font-medium text-foreground">{page.page}</h3>
                        <span className="text-xs text-muted-foreground font-mono">{page.path}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${titleStatus.color}`}>Title: {titleStatus.text}</span>
                      <span className={`text-xs ${descStatus.color}`}>Desc: {descStatus.text}</span>
                      {override ? <Badge variant="default" className="text-xs">Custom SEO</Badge> : <Badge variant="outline" className="text-xs">Using Defaults</Badge>}
                    </div>
                  </div>

                  {expanded && (
                    <CardContent className="pt-0 space-y-4 border-t border-border">
                      {/* Google SERP preview */}
                      <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs font-semibold flex items-center gap-1.5"><Eye className="h-3 w-3" />LIVE ON WEBSITE (Google Preview)</Label>
                          {override && (
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={(e) => { e.stopPropagation(); resetToDefault(page.prefix); }}>
                              <RotateCcw className="mr-1 h-3 w-3" />Reset to Default
                            </Button>
                          )}
                        </div>
                        <div className="p-3 bg-background rounded border border-border">
                          <p className="text-blue-400 text-base font-medium truncate">{liveTitle}</p>
                          <p className="text-green-500 text-xs font-mono">https://cloudonfire.in{page.path}</p>
                          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{liveDesc}</p>
                        </div>
                        <div className="flex gap-4 text-xs">
                          <span className={titleStatus.color}>Title: {liveTitle.length}/60 chars ({titleStatus.text})</span>
                          <span className={descStatus.color}>Description: {liveDesc.length}/160 chars ({descStatus.text})</span>
                        </div>
                      </div>

                      {/* Hardcoded default reference */}
                      <div className="p-3 rounded-lg bg-muted/10 border border-dashed border-border space-y-1">
                        <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5"><EyeOff className="h-3 w-3" />HARDCODED DEFAULT (fallback when no custom override)</Label>
                        <p className="text-xs text-muted-foreground"><span className="font-medium">Title:</span> {defaults?.title || "None"}</p>
                        <p className="text-xs text-muted-foreground"><span className="font-medium">Description:</span> {defaults?.description || "None"}</p>
                        {defaults?.keywords && <p className="text-xs text-muted-foreground"><span className="font-medium">Keywords:</span> {defaults.keywords}</p>}
                      </div>

                      {/* Editable override fields */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-semibold">Custom SEO Override</Label>
                          <AIPageSEOButton
                            pageName={page.page}
                            metaTitle={settings[`seo_${page.prefix}_title`] || defaults?.title || ""}
                            metaDescription={settings[`seo_${page.prefix}_description`] || defaults?.description || ""}
                            keywords={settings[`seo_${page.prefix}_keywords`] || defaults?.keywords || ""}
                            onApply={(data) => handleApplyPageSEO(page.prefix, data)}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Meta Title</Label>
                            <span className={`text-xs ${(settings[`seo_${page.prefix}_title`] || "").length > 60 ? "text-yellow-500" : "text-muted-foreground"}`}>
                              {(settings[`seo_${page.prefix}_title`] || "").length}/60
                            </span>
                          </div>
                          <Input
                            value={settings[`seo_${page.prefix}_title`] || ""}
                            onChange={(e) => updateSetting(`seo_${page.prefix}_title`, e.target.value)}
                            placeholder={defaults?.title || `Custom title for ${page.page}`}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Meta Description</Label>
                            <span className={`text-xs ${(settings[`seo_${page.prefix}_description`] || "").length > 160 ? "text-yellow-500" : "text-muted-foreground"}`}>
                              {(settings[`seo_${page.prefix}_description`] || "").length}/160
                            </span>
                          </div>
                          <Textarea
                            value={settings[`seo_${page.prefix}_description`] || ""}
                            onChange={(e) => updateSetting(`seo_${page.prefix}_description`, e.target.value)}
                            placeholder={defaults?.description || "Custom meta description..."}
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Keywords</Label>
                          <Input
                            value={settings[`seo_${page.prefix}_keywords`] || ""}
                            onChange={(e) => updateSetting(`seo_${page.prefix}_keywords`, e.target.value)}
                            placeholder={defaults?.keywords || "keyword1, keyword2, keyword3"}
                          />
                        </div>
                      </div>

                      {/* Per-page AI SEO score */}
                      <AISEOScore
                        pageTitle={page.page}
                        metaTitle={liveTitle}
                        metaDescription={liveDesc}
                        keywords={getLiveKeywords(page.prefix)}
                      />
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </TabsContent>

          {/* Schema / Structured Data */}
          <TabsContent value="schema" className="space-y-6 max-w-3xl">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Organization Schema (JSON-LD)</CardTitle>
                <CardDescription>This structured data helps Google understand your business and enables rich results, knowledge panels, and Google Sitelinks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Organization Name" k="org_name" placeholder="Cloud on Fire" />
                  <Field label="Legal Name" k="org_legal_name" placeholder="Cloud on Fire Pvt. Ltd." />
                  <Field label="Founding Year" k="org_founding_year" placeholder="2024" />
                  <Field label="Logo URL" k="org_logo_url" placeholder="https://cloudonfire.in/logo.png" />
                </div>
                <Field label="Organization Description" k="org_description" placeholder="India's leading VPS hosting provider..." multi />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Contact Email" k="org_email" placeholder="hello@cloudonfire.com" />
                  <Field label="Contact Phone" k="org_phone" placeholder="+91 8766215705" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" />Business Address</CardTitle>
                <CardDescription>Used in Organization schema for local SEO and Google Maps integration.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field label="Street Address" k="org_address_street" placeholder="123 Tech Park" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="City" k="org_address_city" placeholder="Delhi" />
                  <Field label="State" k="org_address_state" placeholder="Delhi" />
                  <Field label="Postal Code" k="org_address_zip" placeholder="110001" />
                </div>
                <Field label="Country" k="org_address_country" placeholder="IN" />
              </CardContent>
            </Card>
            <AISchemaGenerator />
          </TabsContent>

          {/* Social & Verification */}
          <TabsContent value="social" className="space-y-6 max-w-3xl">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Search Engine Verification</CardTitle>
                <CardDescription>Add verification codes from Google Search Console and Bing Webmaster Tools to verify site ownership.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field label="Google Site Verification" k="google_site_verification" placeholder="google-site-verification code" />
                <Field label="Bing Site Verification" k="bing_site_verification" placeholder="bing verification code" />
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Social Media Profiles</CardTitle>
                <CardDescription>Used in Organization schema's sameAs property. Helps Google associate your social profiles with your brand.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field label="Facebook Page URL" k="org_facebook" placeholder="https://facebook.com/cloudonfire" />
                <Field label="Twitter/X Handle" k="twitter_handle" placeholder="@cloudonfire" />
                <Field label="LinkedIn URL" k="org_linkedin" placeholder="https://linkedin.com/company/cloudonfire" />
                <Field label="Instagram URL" k="org_instagram" placeholder="https://instagram.com/cloudonfire" />
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Open Graph Defaults</CardTitle>
                <CardDescription>Default locale and Twitter card settings for social sharing.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field label="OG Locale" k="default_og_locale" placeholder="en_IN" />
              </CardContent>
            </Card>
            <AIOGImageSuggestions />
          </TabsContent>

          {/* AI SEO Assistant Tab */}
          <TabsContent value="ai" className="space-y-6 max-w-3xl">
            <AISEOGenerator onApply={handleApplyGlobalSEO} />
            <AIKeywordSuggestions />
            <AISEOAudit />
            <AISchemaGenerator />
            <AIOGImageSuggestions />
          </TabsContent>
        </Tabs>

        <Card className="bg-card border-border max-w-3xl">
          <CardHeader><CardTitle>Static Files</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground"><code className="text-primary">robots.txt</code> and <code className="text-primary">sitemap.xml</code> are managed as static files in the <code className="text-primary">public/</code> directory.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
