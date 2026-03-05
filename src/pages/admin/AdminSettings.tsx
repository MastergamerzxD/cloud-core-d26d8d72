import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

export default function AdminSettings() {
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
    const keys = ["site_title", "site_logo", "footer_text", "social_facebook", "social_twitter", "social_instagram", "social_linkedin", "announcement_banner"];
    for (const key of keys) {
      await supabase.from("site_settings").update({ value: settings[key] || "", updated_at: new Date().toISOString() }).eq("key", key);
    }
    toast({ title: "Settings saved!" });
    setSaving(false);
  };

  if (loading) return <AdminLayout><div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></AdminLayout>;

  const Field = ({ label, k, placeholder }: { label: string; k: string; placeholder?: string }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={settings[k] || ""} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} placeholder={placeholder} />
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Site Settings</h1>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save
          </Button>
        </div>
        <Card className="bg-card border-border">
          <CardHeader><CardTitle>General</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Field label="Site Title" k="site_title" />
            <Field label="Site Logo URL" k="site_logo" placeholder="https://..." />
            <Field label="Footer Text" k="footer_text" />
            <Field label="Announcement Banner" k="announcement_banner" placeholder="🔥 Special offer..." />
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader><CardTitle>Social Links</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Field label="Facebook" k="social_facebook" placeholder="https://facebook.com/..." />
            <Field label="Twitter / X" k="social_twitter" placeholder="https://x.com/..." />
            <Field label="Instagram" k="social_instagram" placeholder="https://instagram.com/..." />
            <Field label="LinkedIn" k="social_linkedin" placeholder="https://linkedin.com/..." />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
