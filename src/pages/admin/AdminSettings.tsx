import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Shield, ShieldCheck, ShieldOff, QrCode } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { logActivity } = useAdminAuth();

  // 2FA state
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [twoFALoading, setTwoFALoading] = useState(true);
  const [setupMode, setSetupMode] = useState(false);
  const [setupSecret, setSetupSecret] = useState("");
  const [setupUrl, setSetupUrl] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    supabase.from("site_settings").select("*").then(({ data }) => {
      const map: Record<string, string> = {};
      (data || []).forEach((s: any) => { map[s.key] = s.value || ""; });
      setSettings(map);
      setLoading(false);
    });

    // Check 2FA status
    supabase.functions.invoke("admin-totp", { body: { action: "status" } })
      .then(({ data }) => {
        setTwoFAEnabled(data?.enabled || false);
        setTwoFALoading(false);
      })
      .catch(() => setTwoFALoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const keys = ["site_title", "site_logo", "footer_text", "social_facebook", "social_twitter", "social_instagram", "social_linkedin", "announcement_banner"];
      for (const key of keys) {
        await supabase.from("site_settings").upsert(
          { key, value: settings[key] || "", updated_at: new Date().toISOString() },
          { onConflict: "key" }
        );
      }
      await logActivity("settings_updated", "Site settings saved");
      toast({ title: "Settings saved!" });
    } catch (err: any) {
      toast({ title: "Error saving", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const handleSetup2FA = async () => {
    setSetupMode(true);
    try {
      const { data } = await supabase.functions.invoke("admin-totp", {
        body: { action: "setup" },
      });
      if (data?.secret) {
        setSetupSecret(data.secret);
        setSetupUrl(data.otpauthUrl);
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
      setSetupMode(false);
    }
  };

  const handleEnable2FA = async () => {
    if (verifyCode.length < 6) return;
    setVerifying(true);
    try {
      const { data } = await supabase.functions.invoke("admin-totp", {
        body: { action: "enable", code: verifyCode },
      });
      if (data?.success) {
        setTwoFAEnabled(true);
        setSetupMode(false);
        setVerifyCode("");
        await logActivity("2fa_enabled", "Two-factor authentication enabled");
        toast({ title: "2FA Enabled", description: "Two-factor authentication is now active" });
      } else if (data?.error) {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setVerifying(false);
  };

  const handleDisable2FA = async () => {
    try {
      await supabase.functions.invoke("admin-totp", { body: { action: "disable" } });
      setTwoFAEnabled(false);
      await logActivity("2fa_disabled", "Two-factor authentication disabled");
      toast({ title: "2FA Disabled" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (loading) return <AdminLayout><div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></AdminLayout>;

  const Field = ({ label, k, placeholder }: { label: string; k: string; placeholder?: string }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={settings[k] || ""} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })} placeholder={placeholder} />
    </div>
  );

  const qrUrl = setupUrl ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(setupUrl)}` : "";

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Site Settings</h1>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save
          </Button>
        </div>

        {/* Two-Factor Authentication */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>
              Add an extra layer of security to your admin account using an authenticator app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {twoFALoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Checking 2FA status...
              </div>
            ) : twoFAEnabled ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-500">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="font-medium">Two-factor authentication is enabled</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm" onClick={handleDisable2FA}>
                    <ShieldOff className="mr-2 h-4 w-4" /> Disable 2FA
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSetup2FA}>
                    <QrCode className="mr-2 h-4 w-4" /> Reset Device
                  </Button>
                </div>
              </div>
            ) : setupMode ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                </p>
                {qrUrl && (
                  <div className="flex justify-center">
                    <img src={qrUrl} alt="2FA QR Code" className="rounded-lg border border-border" width={200} height={200} />
                  </div>
                )}
                {setupSecret && (
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Or enter this key manually:</p>
                    <code className="text-sm bg-muted px-3 py-1 rounded font-mono select-all">{setupSecret}</code>
                  </div>
                )}
                <div className="flex flex-col items-center gap-3">
                  <p className="text-sm font-medium">Enter the 6-digit code from your app to verify:</p>
                  <InputOTP maxLength={6} value={verifyCode} onChange={setVerifyCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <div className="flex gap-2">
                    <Button onClick={handleEnable2FA} disabled={verifying || verifyCode.length < 6}>
                      {verifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Verify & Enable
                    </Button>
                    <Button variant="ghost" onClick={() => { setSetupMode(false); setVerifyCode(""); }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Button onClick={handleSetup2FA}>
                <Shield className="mr-2 h-4 w-4" /> Enable 2FA
              </Button>
            )}
          </CardContent>
        </Card>

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
