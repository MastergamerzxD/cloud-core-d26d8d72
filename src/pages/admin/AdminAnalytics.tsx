import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Globe, Monitor, Eye, TrendingUp, MapPin, Ban, Clock, XCircle, Lock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { toast } from "@/hooks/use-toast";

const COLORS = ["hsl(24, 95%, 53%)", "hsl(38, 92%, 50%)", "hsl(4, 90%, 58%)", "hsl(200, 80%, 50%)", "hsl(150, 60%, 45%)", "hsl(280, 60%, 55%)"];

export default function AdminAnalytics() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [storedPassword, setStoredPassword] = useState("");
  const [liveVisitors, setLiveVisitors] = useState<any[]>([]);
  const [totalToday, setTotalToday] = useState(0);
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [topPages, setTopPages] = useState<any[]>([]);
  const [deviceData, setDeviceData] = useState<any[]>([]);
  const [browserData, setBrowserData] = useState<any[]>([]);
  const [countryData, setCountryData] = useState<any[]>([]);
  const [mapPoints, setMapPoints] = useState<any[]>([]);
  const [timeoutDialog, setTimeoutDialog] = useState<{ open: boolean; ip: string; sessionId: string }>({ open: false, ip: "", sessionId: "" });
  const [timeoutHours, setTimeoutHours] = useState("1");

  const loadData = useCallback(async () => {
    const now = new Date();
    const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

    // Live visitors (active in last 5 min)
    const { data: live } = await supabase
      .from("visitor_sessions")
      .select("*")
      .gte("last_seen_at", fiveMinAgo)
      .order("last_seen_at", { ascending: false });
    setLiveVisitors(live || []);

    // Map points from live visitors
    setMapPoints((live || []).filter((v: any) => v.latitude && v.longitude).map((v: any) => ({
      lat: v.latitude, lng: v.longitude, city: v.city, country: v.country,
    })));

    // Total today
    const { count } = await supabase
      .from("visitor_sessions")
      .select("id", { count: "exact", head: true })
      .gte("created_at", todayStart);
    setTotalToday(count || 0);

    // Last 7 days daily
    const days: any[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const start = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
      const end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).toISOString();
      const { count: c } = await supabase
        .from("visitor_sessions")
        .select("id", { count: "exact", head: true })
        .gte("created_at", start)
        .lt("created_at", end);
      days.push({ date: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }), visitors: c || 0 });
    }
    setDailyData(days);

    // All sessions for aggregations (last 30 days)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: allSessions } = await supabase
      .from("visitor_sessions")
      .select("current_page, device_type, browser, os, country, referrer")
      .gte("created_at", thirtyDaysAgo);

    const sessions = allSessions || [];

    // Top pages
    const pageCounts: Record<string, number> = {};
    sessions.forEach((s: any) => { pageCounts[s.current_page] = (pageCounts[s.current_page] || 0) + 1; });
    setTopPages(Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([page, count]) => ({ page, count })));

    // Devices
    const devCounts: Record<string, number> = {};
    sessions.forEach((s: any) => { devCounts[s.device_type || "unknown"] = (devCounts[s.device_type || "unknown"] || 0) + 1; });
    setDeviceData(Object.entries(devCounts).map(([name, value]) => ({ name, value })));

    // Browsers
    const brCounts: Record<string, number> = {};
    sessions.forEach((s: any) => { brCounts[s.browser || "unknown"] = (brCounts[s.browser || "unknown"] || 0) + 1; });
    setBrowserData(Object.entries(brCounts).map(([name, value]) => ({ name, value })));

    // Countries
    const cCounts: Record<string, number> = {};
    sessions.forEach((s: any) => { cCounts[s.country || "unknown"] = (cCounts[s.country || "unknown"] || 0) + 1; });
    setCountryData(Object.entries(cCounts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, value]) => ({ name, value })));
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000); // refresh every 15s

    // Realtime subscription for live updates
    const channel = supabase
      .channel("visitor-analytics")
      .on("postgres_changes", { event: "*", schema: "public", table: "visitor_sessions" }, () => {
        loadData();
      })
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [loadData]);

  const activePages = [...new Set(liveVisitors.map((v) => v.current_page))];

  const handleBlockIp = async (ip: string) => {
    const { error } = await supabase.from("blocked_ips").insert({
      ip_address: ip, reason: "Blocked from analytics dashboard", is_permanent: true,
    });
    if (!error) {
      await supabase.from("security_logs").insert({ event_type: "ip_block", ip_address: ip, details: "Blocked from live visitors" });
      toast({ title: "IP Blocked", description: `${ip} has been permanently blocked` });
    }
  };

  const handleTimeout = async () => {
    const { ip } = timeoutDialog;
    const hours = parseInt(timeoutHours) || 1;
    const { error } = await supabase.from("blocked_ips").insert({
      ip_address: ip, reason: "Temporary timeout from analytics", is_permanent: false,
      expires_at: new Date(Date.now() + hours * 3600000).toISOString(),
    });
    if (!error) {
      await supabase.from("security_logs").insert({ event_type: "ip_timeout", ip_address: ip, details: `${hours}h timeout` });
      toast({ title: "Timeout Applied", description: `${ip} blocked for ${hours} hour(s)` });
    }
    setTimeoutDialog({ open: false, ip: "", sessionId: "" });
  };

  const handleTerminate = async (sessionId: string, ip: string) => {
    await supabase.from("visitor_sessions").delete().eq("session_id", sessionId);
    await supabase.from("security_logs").insert({ event_type: "session_terminate", ip_address: ip, details: `Session ${sessionId} terminated` });
    toast({ title: "Session Terminated", description: `Session for ${ip} has been ended` });
    loadData();
  };

  // Password Gate
  if (!authenticated) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md bg-card border-border">
            <CardHeader className="text-center">
              <Lock className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle className="text-xl">Analytics Access</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Enter the security password to access visitor analytics</p>
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
              <Button onClick={handlePasswordSubmit} className="w-full">Access Analytics</Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Visitor Analytics</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Live Visitors</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{liveVisitors.length}</p>
                </div>
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Visitors</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{totalToday}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Pages</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{activePages.length}</p>
                </div>
                <Eye className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Countries</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{countryData.length}</p>
                </div>
                <Globe className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Visitors Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Live Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            {liveVisitors.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4 text-center">No active visitors right now</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>IP</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Browser</TableHead>
                      <TableHead>OS</TableHead>
                      <TableHead>Current Page</TableHead>
                      <TableHead>Last Seen</TableHead>
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
                        <TableCell className="text-sm">{v.os}</TableCell>
                        <TableCell className="text-sm font-medium">{v.current_page}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(v.last_seen_at).toLocaleTimeString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" title="Block IP" onClick={() => handleBlockIp(v.ip_address)}>
                              <Ban className="h-3.5 w-3.5 text-destructive" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Timeout" onClick={() => setTimeoutDialog({ open: true, ip: v.ip_address, sessionId: v.session_id })}>
                              <Clock className="h-3.5 w-3.5 text-primary" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Terminate Session" onClick={() => handleTerminate(v.session_id, v.ip_address)}>
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

        {/* Visitor Map */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Visitor Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[300px] bg-muted/30 rounded-lg overflow-hidden">
              <svg viewBox="0 0 1000 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Simplified world map outline */}
                <path d="M150,120 L180,100 L220,105 L250,95 L280,100 L300,90 L330,95 L350,85 L380,90 L400,80 L420,85 L450,75 L470,80 L500,85 L520,75 L540,80 L560,70 L580,75 L600,80 L620,85 L650,80 L670,75 L700,80 L720,85 L750,80 L770,85 L800,80 L830,90 L850,85"
                  fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
                {/* Continents simplified */}
                <ellipse cx="250" cy="200" rx="100" ry="80" fill="hsl(var(--muted))" opacity="0.3" />
                <ellipse cx="500" cy="180" rx="120" ry="100" fill="hsl(var(--muted))" opacity="0.3" />
                <ellipse cx="700" cy="200" rx="80" ry="90" fill="hsl(var(--muted))" opacity="0.3" />
                <ellipse cx="300" cy="350" rx="60" ry="50" fill="hsl(var(--muted))" opacity="0.3" />
                <ellipse cx="550" cy="370" rx="40" ry="40" fill="hsl(var(--muted))" opacity="0.3" />
                <ellipse cx="800" cy="380" rx="50" ry="40" fill="hsl(var(--muted))" opacity="0.3" />

                {/* Visitor dots */}
                {mapPoints.map((p, i) => {
                  const x = ((p.lng + 180) / 360) * 1000;
                  const y = ((90 - p.lat) / 180) * 500;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="6" fill="hsl(24, 95%, 53%)" opacity="0.8">
                        <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={x} cy={y} r="3" fill="hsl(24, 95%, 53%)" />
                      <title>{p.city}, {p.country}</title>
                    </g>
                  );
                })}

                {mapPoints.length === 0 && (
                  <text x="500" y="250" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="14">
                    No visitor locations to display
                  </text>
                )}
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Visitors */}
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-lg">Visitors (Last 7 Days)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="visitors" fill="hsl(24, 95%, 53%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Pages */}
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-lg">Top Pages (30 Days)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={topPages} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis type="category" dataKey="page" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} width={120} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="count" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Device Types */}
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-lg">Devices</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {deviceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Browsers */}
          <Card className="bg-card border-border">
            <CardHeader><CardTitle className="text-lg">Browsers</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={browserData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {browserData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Countries */}
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-lg">Top Countries (30 Days)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={countryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
                <Bar dataKey="value" fill="hsl(200, 80%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Timeout Dialog */}
        <Dialog open={timeoutDialog.open} onOpenChange={(open) => !open && setTimeoutDialog({ open: false, ip: "", sessionId: "" })}>
          <DialogContent>
            <DialogHeader><DialogTitle>Temporary Timeout</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Block <span className="font-mono">{timeoutDialog.ip}</span> temporarily</p>
              <div>
                <Label>Duration (hours)</Label>
                <Input type="number" value={timeoutHours} onChange={(e) => setTimeoutHours(e.target.value)} min="1" />
              </div>
              <Button onClick={handleTimeout} className="w-full">Apply Timeout</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
