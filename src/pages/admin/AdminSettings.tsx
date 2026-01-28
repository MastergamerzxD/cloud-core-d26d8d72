import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  CreditCard,
  Server,
  Mail,
  Shield,
  Globe,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

interface Setting {
  id: string;
  setting_key: string;
  setting_value: string | null;
  setting_type: string;
  category: string;
  description: string | null;
  is_encrypted: boolean;
}

export default function AdminSettings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("*");

      if (error) throw error;

      const settingsMap: Record<string, string> = {};
      data?.forEach((s) => {
        settingsMap[s.setting_key] = s.setting_value || "";
      });
      setSettings(settingsMap);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSetting = async (key: string, value: string, category: string, type: string = "text") => {
    try {
      const { data: existing } = await supabase
        .from("admin_settings")
        .select("id")
        .eq("setting_key", key)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("admin_settings")
          .update({
            setting_value: value,
            updated_by: user?.id,
          })
          .eq("setting_key", key);
      } else {
        await supabase.from("admin_settings").insert({
          setting_key: key,
          setting_value: value,
          setting_type: type,
          category,
          is_encrypted: type === "secret",
          updated_by: user?.id,
        });
      }

      setSettings({ ...settings, [key]: value });
      toast.success("Setting saved");
    } catch (error: any) {
      toast.error(error.message || "Failed to save setting");
    }
  };

  const toggleSecret = (key: string) => {
    setShowSecrets({ ...showSecrets, [key]: !showSecrets[key] });
  };

  const renderSecretInput = (key: string, label: string, category: string) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type={showSecrets[key] ? "text" : "password"}
          value={settings[key] || ""}
          onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
          placeholder="••••••••"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleSecret(key)}
        >
          {showSecrets[key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          onClick={() => saveSetting(key, settings[key] || "", category, "secret")}
        >
          <Save className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Configure API keys, integrations, and system settings
          </p>
        </div>

        <Tabs defaultValue="payment" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Payment
            </TabsTrigger>
            <TabsTrigger value="virtualizor" className="flex items-center gap-2">
              <Server className="h-4 w-4" /> Virtualizor
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> Email
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="h-4 w-4" /> General
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>CCAvenue Configuration</CardTitle>
                <CardDescription>
                  Configure your CCAvenue payment gateway credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderSecretInput("ccavenue_merchant_id", "Merchant ID", "payment")}
                {renderSecretInput("ccavenue_access_code", "Access Code", "payment")}
                {renderSecretInput("ccavenue_working_key", "Working Key", "payment")}

                <div className="space-y-2">
                  <Label>Environment</Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings["ccavenue_is_production"] === "true"}
                      onCheckedChange={(checked) => {
                        setSettings({ ...settings, ccavenue_is_production: checked.toString() });
                        saveSetting("ccavenue_is_production", checked.toString(), "payment", "boolean");
                      }}
                    />
                    <span className="text-sm">
                      {settings["ccavenue_is_production"] === "true" ? "Production" : "Test Mode"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="virtualizor">
            <Card>
              <CardHeader>
                <CardTitle>Virtualizor API Configuration</CardTitle>
                <CardDescription>
                  Connect to your Virtualizor panel for VPS provisioning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>API URL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={settings["virtualizor_api_url"] || ""}
                      onChange={(e) => setSettings({ ...settings, virtualizor_api_url: e.target.value })}
                      placeholder="https://your-panel.com:4083/index.php?act=api"
                    />
                    <Button
                      variant="outline"
                      onClick={() => saveSetting("virtualizor_api_url", settings["virtualizor_api_url"] || "", "virtualizor")}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {renderSecretInput("virtualizor_api_key", "API Key", "virtualizor")}
                {renderSecretInput("virtualizor_api_pass", "API Password", "virtualizor")}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>
                  Configure email sending for notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderSecretInput("resend_api_key", "Resend API Key", "email")}

                <div className="space-y-2">
                  <Label>From Email</Label>
                  <div className="flex gap-2">
                    <Input
                      value={settings["email_from"] || ""}
                      onChange={(e) => setSettings({ ...settings, email_from: e.target.value })}
                      placeholder="noreply@yourdomain.com"
                    />
                    <Button
                      variant="outline"
                      onClick={() => saveSetting("email_from", settings["email_from"] || "", "email")}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>From Name</Label>
                  <div className="flex gap-2">
                    <Input
                      value={settings["email_from_name"] || ""}
                      onChange={(e) => setSettings({ ...settings, email_from_name: e.target.value })}
                      placeholder="Your Company"
                    />
                    <Button
                      variant="outline"
                      onClick={() => saveSetting("email_from_name", settings["email_from_name"] || "", "email")}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security and access control settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Access Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Track user visits, devices, and locations
                    </p>
                  </div>
                  <Switch
                    checked={settings["enable_access_logging"] !== "false"}
                    onCheckedChange={(checked) => {
                      saveSetting("enable_access_logging", checked.toString(), "security", "boolean");
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for admin accounts
                    </p>
                  </div>
                  <Switch
                    checked={settings["enable_2fa"] === "true"}
                    onCheckedChange={(checked) => {
                      saveSetting("enable_2fa", checked.toString(), "security", "boolean");
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Show maintenance page to users
                    </p>
                  </div>
                  <Switch
                    checked={settings["maintenance_mode"] === "true"}
                    onCheckedChange={(checked) => {
                      saveSetting("maintenance_mode", checked.toString(), "security", "boolean");
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Basic configuration for your hosting platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <div className="flex gap-2">
                    <Input
                      value={settings["company_name"] || ""}
                      onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                      placeholder="Your Company Name"
                    />
                    <Button
                      variant="outline"
                      onClick={() => saveSetting("company_name", settings["company_name"] || "", "general")}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <div className="flex gap-2">
                    <Input
                      value={settings["support_email"] || ""}
                      onChange={(e) => setSettings({ ...settings, support_email: e.target.value })}
                      placeholder="support@yourdomain.com"
                    />
                    <Button
                      variant="outline"
                      onClick={() => saveSetting("support_email", settings["support_email"] || "", "general")}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Default Currency</Label>
                  <div className="flex gap-2">
                    <Input
                      value={settings["default_currency"] || "INR"}
                      onChange={(e) => setSettings({ ...settings, default_currency: e.target.value })}
                      placeholder="INR"
                    />
                    <Button
                      variant="outline"
                      onClick={() => saveSetting("default_currency", settings["default_currency"] || "INR", "general")}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tax Rate (%)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={settings["tax_rate"] || "18"}
                      onChange={(e) => setSettings({ ...settings, tax_rate: e.target.value })}
                      placeholder="18"
                    />
                    <Button
                      variant="outline"
                      onClick={() => saveSetting("tax_rate", settings["tax_rate"] || "18", "general", "number")}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
