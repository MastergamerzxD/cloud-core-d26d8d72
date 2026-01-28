import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
  Users,
  ShoppingCart,
  Server,
  CreditCard,
  Receipt,
  MessageSquare,
  TrendingUp,
  Activity,
} from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  activeVps: number;
  totalRevenue: number;
  pendingInvoices: number;
  openTickets: number;
  recentOrders: any[];
  recentActivity: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    activeVps: 0,
    totalRevenue: 0,
    pendingInvoices: 0,
    openTickets: 0,
    recentOrders: [],
    recentActivity: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [
        usersResult,
        ordersResult,
        vpsResult,
        revenueResult,
        invoicesResult,
        ticketsResult,
        recentOrdersResult,
      ] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("vps_instances").select("id", { count: "exact", head: true }).eq("status", "running"),
        supabase.from("payment_transactions").select("amount").eq("status", "Success"),
        supabase.from("invoices").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("support_tickets").select("id", { count: "exact", head: true }).in("status", ["open", "in_progress"]),
        supabase.from("orders").select("*, products(name)").order("created_at", { ascending: false }).limit(5),
      ]);

      const totalRevenue = revenueResult.data?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;

      setStats({
        totalUsers: usersResult.count || 0,
        totalOrders: ordersResult.count || 0,
        activeVps: vpsResult.count || 0,
        totalRevenue,
        pendingInvoices: invoicesResult.count || 0,
        openTickets: ticketsResult.count || 0,
        recentOrders: recentOrdersResult.data || [],
        recentActivity: [],
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your VPS hosting business</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={ShoppingCart}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Active VPS"
            value={stats.activeVps}
            icon={Server}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={TrendingUp}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Pending Invoices"
            value={stats.pendingInvoices}
            icon={Receipt}
          />
          <StatCard
            title="Open Tickets"
            value={stats.openTickets}
            icon={MessageSquare}
          />
          <StatCard
            title="Transactions Today"
            value="0"
            icon={CreditCard}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.recentOrders.length === 0 ? (
                <p className="text-muted-foreground text-sm">No orders yet</p>
              ) : (
                <div className="space-y-4">
                  {stats.recentOrders.map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{order.order_number}</p>
                        <p className="text-sm text-muted-foreground">{order.products?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(order.amount)}</p>
                        <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">No recent activity</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
