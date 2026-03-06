import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Shield, Ban, Clock, Trash2, Plus, AlertTriangle, Activity, Zap,
  Globe, Bot, Lock, XCircle, TrendingUp, MapPin
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { toast } from "@/hooks/use-toast";

const COUNTRIES = [
  { code: "CN", name: "China" }, { code: "RU", name: "Russia" }, { code: "US", name: "United States" },
  { code: "BR", name: "Brazil" }, { code: "IN", name: "India" }, { code: "DE", name: "Germany" },
  { code: "FR", name: "France" }, { code: "GB", name: "United Kingdom" }, { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" }, { code: "UA", name: "Ukraine" }, { code: "VN", name: "Vietnam" },
  { code: "ID", name: "Indonesia" }, { code: "TH", name: "Thailand" }, { code: "PK", name: "Pakistan" },
  { code: "BD", name: "Bangladesh" }, { code: "NG", name: "Nigeria" }, { code: "TR", name: "Turkey" },
  { code: "IR", name: "Iran" }, { code: "PH", name: "Philippines" }, { code: "EG", name: "Egypt" },
  { code: "MX", name: "Mexico" }, { code: "AR", name: "Argentina" }, { code: "CO", name: "Colombia" },
  { code: "ZA", name: "South Africa" }, { code: "SA", name: "Saudi Arabia" }, { code: "AE", name: "UAE" },
  { code: "NL", name: "Netherlands" }, { code: "PL", name: "Poland" }, { code: "IT", name: "Italy" },
];

export default function AdminDDoS() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [storedPassword, setStoredPassword] = useState("");

  // Dashboard state
  const [blockedIps, setBlockedIps] = useState<any[]>([]);
  const [securityLogs, setSecurityLogs] = useState<any[]>([]);
  const [blockedCountries, setBlockedCountries] = useState<any[]>([]);
  const [liveVisitors, setLiveVisitors] = useState<any[]>([]);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [rateLimitRpm, setRateLimitRpm] = useState("60");
  const [autoBanMinutes, setAutoBanMinutes] = useState("5");
  const [spikeThreshold, setSpikeThreshold] = useState("200");
  const [blockedOverTime, setBlockedOverTime] = useState<any[]>([]);
  const [topSuspiciousIps, setTopSuspiciousIps] = useState<any[]>([]);

  // Dialogs
  const [addIpOpen, setAddIpOpen] = useState(false);
  const [newIp, setNewIp] = useState("");
  const [newReason, setNewReason] = useState("");
  const [isPermanent, setIsPermanent] = useState(true);
  const [timeoutHours, setTimeoutHours] = useState("1");
  const [addCountryCode, setAddCountryCode] = useState("");
  const [logFilter, setLogFilter] = useState("");

  // Load password from settings
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "ddos_password")
        .maybeSingle();
      setStoredPassword(data?.value || "0703");
    })();
  }, []);

  const handlePasswordSubmit = () => {
    if (passwordInput === storedPassword) {
      setAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Access denied.");
    }
  };

  const loadData = useCallback(async () => {
    if (!authenticated) return;
    const now = new Date();
    const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();

    const [
      { data: blocked }, { data: logs }, { data: countries },
      { data: live }, { data: settings }
    ] = await Promise.all([
      supabase.from("blocked_ips").select("*").order("created_at", { ascending: false }),
      supabase.from("security_logs").select("*").order("created_at", { ascending: false }).limit(200),
      supabase.from("blocked_countries").select("*").order("country_name"),
      supabase.from("visitor_sessions").select("*").gte("last_seen_at", fiveMinAgo).order("last_seen_at", { ascending: false }),
      supabase.from("site_settings").select("key, value").in("key", [
        "ddos_emergency_mode", "ddos_rate_limit_rpm", "ddos_auto_ban_minutes", "ddos_spike_threshold"
      ]),
    ]);

    setBlockedIps(blocked || []);
    setSecurityLogs(logs || []);
    setBlockedCountries(countries || []);
    setLiveVisitors(live || []);

    const s = (settings || []).reduce((acc: any, r: any) => ({ ...acc, [r.key]: r.value }), {});
    setEmergencyMode(s.ddos_emergency_mode === "true");
    setRateLimitRpm(s.ddos_rate_limit_rpm || "60");
    setAutoBanMinutes(s.ddos_auto_ban_minutes || "5");
    setSpikeThreshold(s.ddos_spike_threshold || "200");

    // Blocked over time (last 7 days)
    const allLogs = logs || [];
    const days: any[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayStr = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      const count = allLogs.filter((l: any) => {
        const t = new Date(l.created_at);
        return t >= start && t < end && (l.event_type === "rate_limit" || l.event_type === "ip_block" || l.event_type === "bot_blocked");
      }).length;
      days.push({ date: dayStr, blocked: count });
    }
    setBlockedOverTime(days);

    // Top suspicious IPs
    const ipCounts: Record<string, number> = {};
    allLogs.filter((l: any) => l.event_type === "rate_limit" || l.event_type === "bot_blocked")
      .forEach((l: any) => { ipCounts[l.ip_address || "unknown"] = (ipCounts[l.ip_address || "unknown"] || 0) + 1; });
    setTopSuspiciousIps(
      Object.entries(ipCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([ip, count]) => ({ ip, count }))
    );
  }, [authenticated]);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, [loadData]);

  const saveSetting = async (key: string, value: string) => {
    await supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" });
  };

  const toggleEmergency = async () => {
    const newVal = !emergencyMode;
    setEmergencyMode(newVal);
    await saveSetting("ddos_emergency_mode", String(newVal));
    await supabase.from("security_logs").insert({
      event_type: newVal ? "emergency_enabled" : "emergency_disabled",
      details: `Emergency DDoS Protection Mode ${newVal ? "activated" : "deactivated"}`,
    });
    toast({ title: newVal ? "Emergency Mode Activated" : "Emergency Mode Deactivated" });
  };

  const saveRateLimits = async () => {
    await Promise.all([
      saveSetting("ddos_rate_limit_rpm", rateLimitRpm),
      saveSetting("ddos_auto_ban_minutes", autoBanMinutes),
      saveSetting("ddos_spike_threshold", spikeThreshold),
    ]);
    toast({ title: "Rate Limits Saved" });
  };

  const blockIp = async () => {
    if (!newIp.trim()) return;
    const insert: any = { ip_address: newIp.trim(), reason: newReason || "Manually blocked", is_permanent: isPermanent };
    if (!isPermanent) insert.expires_at = new Date(Date.now() + parseInt(timeoutHours) * 3600000).toISOString();
    const { error } = await supabase.from("blocked_ips").insert(insert);
    if (!error) {
      await supabase.from("security_logs").insert({ event_type: "ip_block", ip_address: newIp.trim(), details: newReason || "Manually blocked" });
      toast({ title: "IP Blocked", description: newIp.trim() });
      setNewIp(""); setNewReason(""); setAddIpOpen(false);
      loadData();
    }
  };

  const unblockIp = async (id: string, ip: string) => {
    await supabase.from("blocked_ips").delete().eq("id", id);
    await supabase.from("security_logs").insert({ event_type: "ip_unblock", ip_address: ip, details: "Unblocked by admin" });
    toast({ title: "IP Unblocked" });
    loadData();
  };

  const blockCountry = async () => {
    if (!addCountryCode) return;
    const c = COUNTRIES.find((x) => x.code === addCountryCode);
    if (!c) return;
    const { error } = await supabase.from("blocked_countries").insert({ country_code: c.code, country_name: c.name });
    if (!error) {
      await supabase.from("security_logs").insert({ event_type: "country_block", details: `Blocked country: ${c.name}` });
      toast({ title: "Country Blocked", description: c.name });
      setAddCountryCode("");
      loadData();
    } else if (error.code === "23505") {
      toast({ title: "Already blocked", variant: "destructive" });
    }
  };

  const unblockCountry = async (id: string, name: string) => {
    await supabase.from("blocked_countries").delete().eq("id", id);
    toast({ title: "Country Unblocked", description: name });
    loadData();
  };

  const handleBlockVisitor = async (ip: string) => {
    await supabase.from("blocked_ips").insert({ ip_address: ip, reason: "Blocked from DDoS panel", is_permanent: true });
    await supabase.from("security_logs").insert({ event_type: "ip_block", ip_address: ip, details: "Blocked from live visitors" });
    toast({ title: "IP Blocked", description: ip });
    loadData();
  };

  const handleTimeoutVisitor = async (ip: string) => {
    await supabase.from("blocked_ips").insert({
      ip_address: ip, reason: "Temporary timeout", is_permanent: false,
      expires_at: new Date(Date.now() + parseInt(autoBanMinutes) * 60000).toISOString(),
    });
    toast({ title: "Timeout Applied", description: `${ip} blocked for ${autoBanMinutes} min` });
    loadData();
  };

  const handleTerminate = async (sessionId: string, ip: string) => {
    await supabase.from("visitor_sessions").delete().eq("session_id", sessionId);
    await supabase.from("security_logs").insert({ event_type: "session_terminate", ip_address: ip, details: `Session terminated` });
    toast({ title: "Session Terminated" });
    loadData();
  };

  const filteredLogs = securityLogs.filter((l) => {
    if (!logFilter) return true;
    const q = logFilter.toLowerCase();
    return (l.ip_address || "").toLowerCase().includes(q) || (l.details || "").toLowerCase().includes(q);
  });

  const activeBans = blockedIps.filter((b) => b.is_permanent || !b.expires_at || new Date(b.expires_at) > new Date());
  const rateLimitEvents = securityLogs.filter((l) => l.event_type === "rate_limit").length;
  const botEvents = securityLogs.filter((l) => l.event_type === "bot_blocked").length;

  // Password Gate
  if (!authenticated) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md bg-card border-border">
            <CardHeader className="text-center">
              <Lock className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle className="text-xl">DDoS Protection Access</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Enter the security password to access this section</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                  placeholder="Enter access password"
                />
              </div>
              {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
              <Button onClick={handlePasswordSubmit} className="w-full">Access DDoS Protection</Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Emergency Banner */}
        {emergencyMode && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-destructive">Emergency DDoS Protection Mode Active</p>
              <p className="text-sm text-destructive/80">Strict rate limiting, aggressive bot filtering, and reduced thresholds are in effect.</p>
            </div>
            <Button variant="outline" size="sm" onClick={toggleEmergency}>Disable</Button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6" /> DDoS Protection
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm">Emergency Mode</Label>
              <Switch checked={emergencyMode} onCheckedChange={toggleEmergency} />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Protection</p>
                  <p className="text-lg font-bold text-foreground mt-1">{emergencyMode ? "Emergency" : "Active"}</p>
                </div>
                <Shield className="h-7 w-7 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Blocked IPs</p>
                  <p className="text-lg font-bold text-foreground mt-1">{activeBans.length}</p>
                </div>
                <Ban className="h-7 w-7 text-destructive opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Rate Limited</p>
                  <p className="text-lg font-bold text-foreground mt-1">{rateLimitEvents}</p>
                </div>
                <Clock className="h-7 w-7 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Bots Blocked</p>
                  <p className="text-lg font-bold text-foreground mt-1">{botEvents}</p>
                </div>
                <Bot className="h-7 w-7 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Countries Blocked</p>
                  <p className="text-lg font-bold text-foreground mt-1">{blockedCountries.length}</p>
                </div>
                <Globe className="h-7 w-7 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-lg">Blocked Requests (7 Days)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={blockedOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="blocked" fill="hsl(4, 90%, 58%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-lg">Top Suspicious IPs</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={topSuspiciousIps} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis type="category" dataKey="ip" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} width={120} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="count" fill="hsl(24, 95%, 53%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="ips">
          <TabsList className="flex-wrap">
            <TabsTrigger value="ips">IP Management</TabsTrigger>
            <TabsTrigger value="live">Live Visitors</TabsTrigger>
            <TabsTrigger value="countries">Country Blocking</TabsTrigger>
            <TabsTrigger value="rate">Rate Limiting</TabsTrigger>
            <TabsTrigger value="logs">Security Log</TabsTrigger>
          </TabsList>

          {/* IP Management */}
          <TabsContent value="ips">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Blocked IP Addresses</CardTitle>
                <Dialog open={addIpOpen} onOpenChange={setAddIpOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Block IP</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Block IP Address</DialogTitle></DialogHeader>
                    <div className="space-y-4">
                      <div><Label>IP Address</Label><Input value={newIp} onChange={(e) => setNewIp(e.target.value)} placeholder="e.g. 192.168.1.1" /></div>
                      <div><Label>Reason</Label><Input value={newReason} onChange={(e) => setNewReason(e.target.value)} placeholder="Reason for blocking" /></div>
                      <div className="flex items-center gap-2"><Switch checked={isPermanent} onCheckedChange={setIsPermanent} /><Label>Permanent ban</Label></div>
                      {!isPermanent && <div><Label>Timeout (hours)</Label><Input type="number" value={timeoutHours} onChange={(e) => setTimeoutHours(e.target.value)} min="1" /></div>}
                      <Button onClick={blockIp} className="w-full">Block IP</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {activeBans.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">No blocked IPs</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Expires</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blockedIps.map((b) => (
                          <TableRow key={b.id}>
                            <TableCell className="font-mono text-xs">{b.ip_address}</TableCell>
                            <TableCell className="text-sm">{b.reason || "—"}</TableCell>
                            <TableCell><Badge variant={b.is_permanent ? "destructive" : "secondary"}>{b.is_permanent ? "Permanent" : "Temporary"}</Badge></TableCell>
                            <TableCell className="text-xs text-muted-foreground">{b.expires_at ? new Date(b.expires_at).toLocaleString() : "Never"}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{new Date(b.created_at).toLocaleString()}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" onClick={() => unblockIp(b.id, b.ip_address)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Visitors */}
          <TabsContent value="live">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  Live Visitors ({liveVisitors.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {liveVisitors.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">No active visitors</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>IP</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Device</TableHead>
                          <TableHead>Browser</TableHead>
                          <TableHead>Page</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {liveVisitors.map((v) => (
                          <TableRow key={v.id}>
                            <TableCell className="font-mono text-xs">{v.ip_address}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <span className="text-sm">{v.city}, {v.country}</span>
                              </div>
                            </TableCell>
                            <TableCell><Badge variant="secondary" className="text-xs">{v.device_type}</Badge></TableCell>
                            <TableCell className="text-sm">{v.browser}</TableCell>
                            <TableCell className="text-sm">{v.current_page}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" title="Block IP" onClick={() => handleBlockVisitor(v.ip_address)}>
                                  <Ban className="h-3.5 w-3.5 text-destructive" />
                                </Button>
                                <Button variant="ghost" size="sm" title="Timeout" onClick={() => handleTimeoutVisitor(v.ip_address)}>
                                  <Clock className="h-3.5 w-3.5 text-primary" />
                                </Button>
                                <Button variant="ghost" size="sm" title="Terminate" onClick={() => handleTerminate(v.session_id, v.ip_address)}>
                                  <XCircle className="h-3.5 w-3.5 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Country Blocking */}
          <TabsContent value="countries">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Country Blocking</CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={addCountryCode} onValueChange={setAddCountryCode}>
                    <SelectTrigger className="w-[200px]"><SelectValue placeholder="Select country" /></SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.filter((c) => !blockedCountries.some((bc: any) => bc.country_code === c.code)).map((c) => (
                        <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={blockCountry} disabled={!addCountryCode}><Plus className="h-4 w-4 mr-1" /> Block</Button>
                </div>
              </CardHeader>
              <CardContent>
                {blockedCountries.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">No countries blocked</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {blockedCountries.map((c: any) => (
                      <Badge key={c.id} variant="destructive" className="text-sm py-1.5 px-3 gap-2">
                        {c.country_name} ({c.country_code})
                        <button onClick={() => unblockCountry(c.id, c.country_name)} className="ml-1 hover:opacity-70">
                          <XCircle className="h-3.5 w-3.5" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rate Limiting */}
          <TabsContent value="rate">
            <Card className="bg-card border-border">
              <CardHeader><CardTitle className="text-lg">Rate Limiting Configuration</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Max Requests per IP per Minute</Label>
                    <Input type="number" value={rateLimitRpm} onChange={(e) => setRateLimitRpm(e.target.value)} min="1" />
                  </div>
                  <div>
                    <Label>Auto-ban Duration (minutes)</Label>
                    <Input type="number" value={autoBanMinutes} onChange={(e) => setAutoBanMinutes(e.target.value)} min="1" />
                  </div>
                  <div>
                    <Label>Spike Threshold (requests/min)</Label>
                    <Input type="number" value={spikeThreshold} onChange={(e) => setSpikeThreshold(e.target.value)} min="10" />
                  </div>
                </div>
                <Button onClick={saveRateLimits}>Save Rate Limits</Button>

                <div className="border-t border-border pt-4 mt-4">
                  <h3 className="font-semibold text-foreground mb-2">Bot Detection</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Automated scripts, scraping tools, and unknown user agents are automatically detected and blocked.
                    Events are logged in the Security Log tab.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">curl / wget detection</Badge>
                    <Badge variant="secondary">Headless browser detection</Badge>
                    <Badge variant="secondary">Empty user-agent blocking</Badge>
                    <Badge variant="secondary">Known bot pattern matching</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Log */}
          <TabsContent value="logs">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Security Event Log</CardTitle>
                <Input placeholder="Filter by IP or details..." value={logFilter} onChange={(e) => setLogFilter(e.target.value)} className="max-w-xs" />
              </CardHeader>
              <CardContent>
                {filteredLogs.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">No security events</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Event</TableHead>
                          <TableHead>IP</TableHead>
                          <TableHead>Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLogs.map((l) => (
                          <TableRow key={l.id}>
                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{new Date(l.created_at).toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge variant={
                                l.event_type === "rate_limit" || l.event_type === "bot_blocked" ? "destructive" :
                                l.event_type === "emergency_enabled" ? "destructive" : "secondary"
                              }>
                                {l.event_type}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{l.ip_address || "—"}</TableCell>
                            <TableCell className="text-sm max-w-xs truncate">{l.details || "—"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
