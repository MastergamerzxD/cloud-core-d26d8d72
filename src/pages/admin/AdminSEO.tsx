import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

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
      const keys = ["site_meta_title", "site_meta_description", "og_image"];
      for (const key of keys) {
        await supabase.from("site_settings").upsert(
          { key, value: settings[key] || "", updated_at: new Date().toISOString() },
          { onConflict: "key" }
        );
      }
      toast({ title: "SEO settings saved!" });
    } catch (err: any) {
      toast({ title: "Error saving", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  if (loading) return <AdminLayout><div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">SEO Settings</h1>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save
          </Button>
        </div>
        <Card className="bg-card border-border">
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label>Site Meta Title</Label>
              <Input value={settings.site_meta_title || ""} onChange={(e) => setSettings({ ...settings, site_meta_title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Site Meta Description</Label>
              <Textarea value={settings.site_meta_description || ""} onChange={(e) => setSettings({ ...settings, site_meta_description: e.target.value })} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>OpenGraph Image URL</Label>
              <Input value={settings.og_image || ""} onChange={(e) => setSettings({ ...settings, og_image: e.target.value })} placeholder="https://..." />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader><CardTitle>Files</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">robots.txt and sitemap.xml are managed as static files in the <code className="text-primary">public/</code> directory. Edit them directly in your codebase.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
