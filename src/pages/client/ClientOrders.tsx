import { useEffect, useState } from "react";
import ClientLayout from "@/components/client/ClientLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ShoppingCart, Plus, Loader2, Eye, CreditCard } from "lucide-react";
import { format } from "date-fns";

interface Order {
  id: string;
  order_number: string;
  amount: number;
  billing_cycle: string;
  status: string;
  hostname: string | null;
  os_template: string | null;
  created_at: string;
  products: { name: string } | null;
}

export default function ClientOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*, products(name)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
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
      pending: "secondary",
      paid: "default",
      provisioning: "outline",
      active: "default",
      suspended: "destructive",
      cancelled: "destructive",
      expired: "secondary",
    };
    return colors[status] || "secondary";
  };

  if (isLoading) {
    return (
      <ClientLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">My Orders</h2>
            <p className="text-muted-foreground">View and manage your orders</p>
          </div>
          <Button asChild>
            <Link to="/pricing">
              <Plus className="mr-2 h-4 w-4" /> New Order
            </Link>
          </Button>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet.
              </p>
              <Button asChild>
                <Link to="/pricing">Browse Plans</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingCart className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono font-medium">{order.order_number}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.products?.name} • {order.billing_cycle}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(order.created_at), "MMMM dd, yyyy 'at' HH:mm")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold">{formatCurrency(order.amount)}</p>
                        <Badge variant={getStatusColor(order.status) as any}>
                          {order.status}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> Details
                        </Button>
                        {order.status === "pending" && (
                          <Button size="sm">
                            <CreditCard className="h-4 w-4 mr-1" /> Pay Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
