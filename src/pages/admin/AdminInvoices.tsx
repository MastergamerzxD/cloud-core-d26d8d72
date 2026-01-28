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
import { MoreHorizontal, Eye, Check, Send, Download } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface Invoice {
  id: string;
  invoice_number: string;
  user_id: string;
  amount: number;
  tax_amount: number | null;
  total_amount: number;
  status: string;
  due_date: string;
  paid_date: string | null;
  created_at: string;
}

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchInvoices();
  }, [page, pageSize]);

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await supabase
        .from("invoices")
        .select("*", { count: "exact" })
        .range(from, to)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInvoices(data || []);
      setTotal(count || 0);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const updateData: any = { status };
      if (status === "paid") {
        updateData.paid_date = new Date().toISOString();
      }

      const { error } = await supabase
        .from("invoices")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;
      toast.success(`Invoice marked as ${status}`);
      fetchInvoices();
    } catch (error: any) {
      toast.error(error.message || "Failed to update invoice");
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
      overdue: "destructive",
      cancelled: "outline",
      refunded: "outline",
    };
    return colors[status] || "secondary";
  };

  const columns: Column<Invoice>[] = [
    {
      key: "invoice_number",
      header: "Invoice #",
      cell: (row) => (
        <span className="font-mono text-sm">{row.invoice_number}</span>
      ),
    },
    {
      key: "amount",
      header: "Subtotal",
      cell: (row) => formatCurrency(row.amount),
    },
    {
      key: "tax",
      header: "Tax",
      cell: (row) => formatCurrency(row.tax_amount || 0),
    },
    {
      key: "total",
      header: "Total",
      cell: (row) => (
        <span className="font-medium">{formatCurrency(row.total_amount)}</span>
      ),
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
      key: "due_date",
      header: "Due Date",
      cell: (row) => format(new Date(row.due_date), "MMM dd, yyyy"),
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
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </DropdownMenuItem>
            {row.status === "pending" && (
              <>
                <DropdownMenuItem onClick={() => updateStatus(row.id, "paid")}>
                  <Check className="mr-2 h-4 w-4" /> Mark as Paid
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Send className="mr-2 h-4 w-4" /> Send Reminder
                </DropdownMenuItem>
              </>
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
          <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
          <p className="text-muted-foreground">Manage customer invoices</p>
        </div>

        <DataTable
          columns={columns}
          data={invoices}
          isLoading={isLoading}
          searchPlaceholder="Search invoices..."
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
