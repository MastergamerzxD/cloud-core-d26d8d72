import { useEffect, useState } from "react";
import ClientLayout from "@/components/client/ClientLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import {
  Server,
  ShoppingCart,
  Receipt,
  Wallet,
  MessageSquare,
  Plus,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

interface DashboardData {
  activeVps: number;
  pendingOrders: number;
  unpaidInvoices: number;
  walletBalance: number;
  openTickets: number;
  recentVps: any[];
  recentInvoices: any[];
  announcements: any[];
}

export default function ClientDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData>({
    activeVps: 0,
    pendingOrders: 0,
    unpaidInvoices: 0,
    walletBalance: 0,
    openTickets: 0,
    recentVps: [],
    recentInvoices: [],
    announcements: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [
        vpsResult,
        ordersResult,
        invoicesResult,
        walletResult,
        ticketsResult,
        recentVpsResult,
        recentInvoicesResult,
        announcementsResult,
      ] = await Promise.all([
        supabase.from("vps_instances").select("id", { count: "exact", head: true }).eq("status", "running"),
        supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("invoices").select("id", { count: "exact", head: true }).in("status", ["pending", "overdue"]),
        supabase.from("user_wallets").select("balance").maybeSingle(),
        supabase.from("support_tickets").select("id", { count: "exact", head: true }).in("status", ["open", "in_progress", "waiting_reply"]),
        supabase.from("vps_instances").select("*, products(name)").order("created_at", { ascending: false }).limit(3),
        supabase.from("invoices").select("*").order("created_at", { ascending: false }).limit(3),
        supabase.from("announcements").select("*").eq("is_active", true).order("created_at", { ascending: false }).limit(3),
      ]);

      setData({
        activeVps: vpsResult.count || 0,
        pendingOrders: ordersResult.count || 0,
        unpaidInvoices: invoicesResult.count || 0,
        walletBalance: walletResult.data?.balance || 0,
        openTickets: ticketsResult.count || 0,
        recentVps: recentVpsResult.data || [],
        recentInvoices: recentInvoicesResult.data || [],
        announcements: announcementsResult.data || [],
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      running: "default",
      active: "default",
      pending: "secondary",
      stopped: "outline",
      suspended: "destructive",
      overdue: "destructive",
    };
    return colors[status] || "secondary";
  };

  return (
    <ClientLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome Back!</h2>
            <p className="text-muted-foreground">
              Here's an overview of your account
            </p>
          </div>
          <Button asChild>
            <Link to="/pricing">
              <Plus className="mr-2 h-4 w-4" /> Order New VPS
            </Link>
          </Button>
        </div>

        {/* Announcements */}
        {data.announcements.length > 0 && (
          <div className="space-y-2">
            {data.announcements.map((ann: any) => (
              <Card key={ann.id} className={`border-l-4 ${
                ann.type === "error" ? "border-l-destructive" :
                ann.type === "warning" ? "border-l-yellow-500" :
                ann.type === "success" ? "border-l-green-500" :
                "border-l-primary"
              }`}>
                <CardContent className="p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{ann.title}</p>
                    <p className="text-sm text-muted-foreground">{ann.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{data.activeVps}</p>
                  <p className="text-sm text-muted-foreground">Active VPS</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{data.pendingOrders}</p>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Receipt className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{data.unpaidInvoices}</p>
                  <p className="text-sm text-muted-foreground">Unpaid Invoices</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(data.walletBalance)}</p>
                  <p className="text-sm text-muted-foreground">Wallet Balance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{data.openTickets}</p>
                  <p className="text-sm text-muted-foreground">Open Tickets</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent VPS */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your VPS Instances</CardTitle>
                <CardDescription>Recent virtual servers</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/vps">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {data.recentVps.length === 0 ? (
                <div className="text-center py-8">
                  <Server className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No VPS instances yet</p>
                  <Button asChild>
                    <Link to="/pricing">Order Your First VPS</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.recentVps.map((vps: any) => (
                    <div key={vps.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{vps.hostname}</p>
                        <p className="text-sm text-muted-foreground">
                          {vps.products?.name} • {vps.ip_address || "Pending IP"}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(vps.status) as any}>{vps.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Invoices */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>Your billing history</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/invoices">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {data.recentInvoices.length === 0 ? (
                <div className="text-center py-8">
                  <Receipt className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No invoices yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.recentInvoices.map((invoice: any) => (
                    <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{invoice.invoice_number}</p>
                        <p className="text-sm text-muted-foreground">
                          Due: {format(new Date(invoice.due_date), "MMM dd, yyyy")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(invoice.total_amount)}</p>
                        <Badge variant={getStatusColor(invoice.status) as any}>{invoice.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
}
