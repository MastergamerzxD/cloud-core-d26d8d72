import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable, { Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { MoreHorizontal, Eye, Check, X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface Order {
  id: string;
  order_number: string;
  user_id: string;
  product_id: string;
  amount: number;
  billing_cycle: string;
  status: string;
  hostname: string | null;
  os_template: string | null;
  created_at: string;
  products: { name: string } | null;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, [page, pageSize]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await supabase
        .from("orders")
        .select("*, products(name)", { count: "exact" })
        .range(from, to)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
      setTotal(count || 0);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "pending" | "paid" | "provisioning" | "active" | "suspended" | "cancelled" | "expired") => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      toast.success(`Order status updated to ${status}`);
      fetchOrders();
    } catch (error: any) {
      toast.error(error.message || "Failed to update order");
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

  const columns: Column<Order>[] = [
    {
      key: "order_number",
      header: "Order #",
      cell: (row) => (
        <span className="font-mono text-sm">{row.order_number}</span>
      ),
    },
    {
      key: "product",
      header: "Product",
      cell: (row) => row.products?.name || "—",
    },
    {
      key: "amount",
      header: "Amount",
      cell: (row) => formatCurrency(row.amount),
    },
    {
      key: "billing_cycle",
      header: "Billing",
      cell: (row) => <span className="capitalize">{row.billing_cycle}</span>,
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => (
        <Badge variant={getStatusColor(row.status) as any}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: "created_at",
      header: "Date",
      cell: (row) => format(new Date(row.created_at), "MMM dd, yyyy"),
    },
    {
      key: "actions",
      header: "",
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            {row.status === "pending" && (
              <DropdownMenuItem onClick={() => updateStatus(row.id, "paid")}>
                <Check className="mr-2 h-4 w-4" /> Mark as Paid
              </DropdownMenuItem>
            )}
            {row.status === "paid" && (
              <DropdownMenuItem onClick={() => updateStatus(row.id, "provisioning")}>
                <Check className="mr-2 h-4 w-4" /> Start Provisioning
              </DropdownMenuItem>
            )}
            {!["cancelled", "expired"].includes(row.status) && (
              <DropdownMenuItem
                onClick={() => updateStatus(row.id, "cancelled")}
                className="text-destructive"
              >
                <X className="mr-2 h-4 w-4" /> Cancel Order
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">Manage customer orders</p>
        </div>

        <DataTable
          columns={columns}
          data={orders}
          isLoading={isLoading}
          searchPlaceholder="Search orders..."
          onSearch={() => {}}
          pagination={{
            page,
            pageSize,
            total,
            onPageChange: setPage,
            onPageSizeChange: setPageSize,
          }}
        />
      </div>
    </AdminLayout>
  );
}
