import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Globe, Share2, Code2, MapPin, FileText, Sparkles } from "lucide-react";
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
  const { toast } = useToast();

  useEffect(() => {
    supabase.from("site_settings").select("*").then(({ data }) => {
      const map: Record<string, string> = {};
      (data || []).forEach((s: any) => { map[s.key] = s.value || ""; });
      setSettings(map);
      setLoading(false);
    });
  }, []);

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
        ]),
      ];

      const upserts = allKeys.map(key => ({
        key,
        value: settings[key] || "",
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from("site_settings").upsert(upserts, { onConflict: "key" });
      if (error) throw error;
      toast({ title: "SEO settings saved!" });
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
        <Textarea value={settings[k] || ""} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} placeholder={placeholder} rows={3} />
      ) : (
        <Input value={settings[k] || ""} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} placeholder={placeholder} />
      )}
    </div>
  );

  const handleApplyGlobalSEO = (data: any) => {
    const updated = { ...settings };
    if (data.meta_title) updated.site_meta_title = data.meta_title;
    if (data.meta_description) updated.site_meta_description = data.meta_description;
    setSettings(updated);
    toast({ title: "AI SEO applied to global settings!" });
  };

  const handleApplyPageSEO = (prefix: string, data: { title: string; description: string; keywords: string }) => {
    const updated = { ...settings };
    if (data.title) updated[`seo_${prefix}_title`] = data.title;
    if (data.description) updated[`seo_${prefix}_description`] = data.description;
    if (data.keywords) updated[`seo_${prefix}_keywords`] = data.keywords;
    setSettings(updated);
    toast({ title: "AI SEO applied!", description: "Review and save to persist changes." });
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
                <Field label="Default OG Image URL" k="og_image" placeholder="https://cloudonfire.in/og-image.jpg" />
              </CardContent>
            </Card>

            {/* AI SEO Generator in Global tab */}
            <AISEOGenerator onApply={handleApplyGlobalSEO} />
            <AISEOScore
              pageTitle="Global Site"
              metaTitle={settings.site_meta_title}
              metaDescription={settings.site_meta_description}
            />
          </TabsContent>

          {/* Per-Page SEO */}
          <TabsContent value="pages" className="space-y-4 max-w-3xl">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Per-Page Meta Overrides</CardTitle>
                <CardDescription>Customize the meta title, description, and keywords for each page. Leave blank to use the hardcoded defaults. Changes apply on next page load.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {PAGE_SEO_KEYS.map((page) => (
                  <div key={page.prefix} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground">{page.page}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground font-mono">{page.path}</span>
                        <AIPageSEOButton
                          pageName={page.page}
                          metaTitle={settings[`seo_${page.prefix}_title`] || ""}
                          metaDescription={settings[`seo_${page.prefix}_description`] || ""}
                          keywords={settings[`seo_${page.prefix}_keywords`] || ""}
                          onApply={(data) => handleApplyPageSEO(page.prefix, data)}
                        />
                      </div>
                    </div>
                    <Field label="Meta Title" k={`seo_${page.prefix}_title`} placeholder={`Custom title for ${page.page}`} />
                    <Field label="Meta Description" k={`seo_${page.prefix}_description`} placeholder="Custom meta description..." multi />
                    <Field label="Keywords" k={`seo_${page.prefix}_keywords`} placeholder="keyword1, keyword2, keyword3" />
                  </div>
                ))}
              </CardContent>
            </Card>
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

            {/* AI Schema Generator */}
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

            {/* AI OG Image Suggestions */}
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
