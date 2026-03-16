import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Shield, Ban, Clock, Trash2, Plus, AlertTriangle, Activity, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AdminSecurity() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [blockedIps, setBlockedIps] = useState<any[]>([]);
  const [securityLogs, setSecurityLogs] = useState<any[]>([]);
  const [visitorLogs, setVisitorLogs] = useState<any[]>([]);
  const [sessionMap, setSessionMap] = useState<Record<string, any>>({});
  const [logFilter, setLogFilter] = useState("");
  const [addIpOpen, setAddIpOpen] = useState(false);
  const [newIp, setNewIp] = useState("");
  const [newReason, setNewReason] = useState("");
  const [isPermanent, setIsPermanent] = useState(true);
  const [timeoutHours, setTimeoutHours] = useState("1");

  // Load security password from settings
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "security_password")
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
    const [{ data: blocked }, { data: logs }, { data: vLogs }, { data: sessions }] = await Promise.all([
      supabase.from("blocked_ips").select("*").order("created_at", { ascending: false }),
      supabase.from("security_logs").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("visitor_logs").select("*").order("created_at", { ascending: false }).limit(200),
      supabase.from("visitor_sessions").select("session_id, city, country, country_code").limit(500),
    ]);
    setBlockedIps(blocked || []);
    setSecurityLogs(logs || []);
    setVisitorLogs(vLogs || []);
    const map: Record<string, any> = {};
    (sessions || []).forEach((s: any) => { map[s.session_id] = s; });
    setSessionMap(map);
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, [loadData]);

  const blockIp = async (ip: string, reason: string, permanent: boolean, hours?: number) => {
    const insert: any = {
      ip_address: ip,
      reason,
      is_permanent: permanent,
    };
    if (!permanent && hours) {
      insert.expires_at = new Date(Date.now() + hours * 3600000).toISOString();
    }
    const { error } = await supabase.from("blocked_ips").insert(insert);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "IP Blocked", description: `${ip} has been blocked` });
      // Log the event
      await supabase.from("security_logs").insert({
        event_type: permanent ? "ip_block" : "ip_timeout",
        ip_address: ip,
        details: reason,
      });
      loadData();
    }
  };

  const unblockIp = async (id: string, ip: string) => {
    const { error } = await supabase.from("blocked_ips").delete().eq("id", id);
    if (!error) {
      toast({ title: "IP Unblocked", description: `${ip} has been unblocked` });
      await supabase.from("security_logs").insert({
        event_type: "ip_unblock",
        ip_address: ip,
        details: "Manually unblocked by admin",
      });
      loadData();
    }
  };

  const handleAddIp = async () => {
    if (!newIp.trim()) return;
    await blockIp(newIp.trim(), newReason || "Manually blocked by admin", isPermanent, parseInt(timeoutHours));
    setNewIp("");
    setNewReason("");
    setAddIpOpen(false);
  };

  const filteredLogs = visitorLogs.filter((l) => {
    if (!logFilter) return true;
    const q = logFilter.toLowerCase();
    const session = sessionMap[l.session_id];
    const city = session?.city || "";
    return (l.ip_address || "").toLowerCase().includes(q) ||
      (l.country || "").toLowerCase().includes(q) ||
      city.toLowerCase().includes(q);
  });

  const activeBans = blockedIps.filter((b) => b.is_permanent || !b.expires_at || new Date(b.expires_at) > new Date());
  const tempBans = blockedIps.filter((b) => !b.is_permanent && b.expires_at);
  const rateLimitEvents = securityLogs.filter((l) => l.event_type === "rate_limit");

  // Password Gate
  if (!authenticated) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md bg-card border-border">
            <CardHeader className="text-center">
              <Lock className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle className="text-xl">Security Access</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Enter the security password to access the security panel</p>
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
              <Button onClick={handlePasswordSubmit} className="w-full">Access Security</Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6" /> Security
          </h1>
          <Dialog open={addIpOpen} onOpenChange={setAddIpOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Block IP</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Block IP Address</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>IP Address</Label>
                  <Input value={newIp} onChange={(e) => setNewIp(e.target.value)} placeholder="e.g. 192.168.1.1" />
                </div>
                <div>
                  <Label>Reason</Label>
                  <Input value={newReason} onChange={(e) => setNewReason(e.target.value)} placeholder="Reason for blocking" />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={isPermanent} onCheckedChange={setIsPermanent} />
                  <Label>Permanent ban</Label>
                </div>
                {!isPermanent && (
                  <div>
                    <Label>Timeout (hours)</Label>
                    <Input type="number" value={timeoutHours} onChange={(e) => setTimeoutHours(e.target.value)} min="1" />
                  </div>
                )}
                <Button onClick={handleAddIp} className="w-full">Block IP</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Blocked IPs</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{activeBans.length}</p>
                </div>
                <Ban className="h-8 w-8 text-destructive opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Temp Bans</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{tempBans.length}</p>
                </div>
                <Clock className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rate Limits Hit</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{rateLimitEvents.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Security Events</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{securityLogs.length}</p>
                </div>
                <Activity className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="blocked">
          <TabsList>
            <TabsTrigger value="blocked">Blocked IPs</TabsTrigger>
            <TabsTrigger value="events">Security Events</TabsTrigger>
            <TabsTrigger value="logs">Visitor Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="blocked">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
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
                          <TableHead>Blocked At</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blockedIps.map((b) => (
                          <TableRow key={b.id}>
                            <TableCell className="font-mono text-xs">{b.ip_address}</TableCell>
                            <TableCell className="text-sm">{b.reason || "—"}</TableCell>
                            <TableCell>
                              <Badge variant={b.is_permanent ? "destructive" : "secondary"}>
                                {b.is_permanent ? "Permanent" : "Temporary"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {b.expires_at ? new Date(b.expires_at).toLocaleString() : "Never"}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {new Date(b.created_at).toLocaleString()}
                            </TableCell>
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

          <TabsContent value="events">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                {securityLogs.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">No security events</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event</TableHead>
                          <TableHead>IP</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {securityLogs.map((l) => (
                          <TableRow key={l.id}>
                            <TableCell>
                              <Badge variant={l.event_type === "rate_limit" ? "destructive" : "secondary"}>
                                {l.event_type}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-xs">{l.ip_address || "—"}</TableCell>
                            <TableCell className="text-sm max-w-xs truncate">{l.details || "—"}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {new Date(l.created_at).toLocaleString()}
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

          <TabsContent value="logs">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Filter by IP or country..."
                    value={logFilter}
                    onChange={(e) => setLogFilter(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {filteredLogs.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">No visitor logs</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>IP</TableHead>
                          <TableHead>Country</TableHead>
                          <TableHead>Device</TableHead>
                          <TableHead>Browser</TableHead>
                          <TableHead>Pages</TableHead>
                          <TableHead>Start</TableHead>
                          <TableHead>Last Active</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLogs.map((l) => (
                          <TableRow key={l.id}>
                            <TableCell className="font-mono text-xs">{l.ip_address || "—"}</TableCell>
                            <TableCell className="text-sm">{l.country || "—"}</TableCell>
                            <TableCell><Badge variant="secondary" className="text-xs">{l.device_type || "—"}</Badge></TableCell>
                            <TableCell className="text-sm">{l.browser || "—"}</TableCell>
                            <TableCell className="text-xs max-w-[200px] truncate">
                              {(l.pages_visited || []).join(", ")}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {new Date(l.session_start).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {l.session_end ? new Date(l.session_end).toLocaleString() : "—"}
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
        </Tabs>
      </div>
    </AdminLayout>
  );
}
