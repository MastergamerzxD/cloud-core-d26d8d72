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
import { MoreHorizontal, Eye, Download } from "lucide-react";
import { format } from "date-fns";

interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  currency: string | null;
  status: string;
  payment_mode: string | null;
  ccavenue_order_id: string | null;
  ccavenue_tracking_id: string | null;
  bank_ref_no: string | null;
  response_message: string | null;
  created_at: string;
}

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, [page, pageSize]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await supabase
        .from("payment_transactions")
        .select("*", { count: "exact" })
        .range(from, to)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
      setTotal(count || 0);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string | null) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Success: "default",
      success: "default",
      Failure: "destructive",
      failure: "destructive",
      Aborted: "secondary",
      aborted: "secondary",
      pending: "outline",
    };
    return colors[status] || "secondary";
  };

  const columns: Column<Transaction>[] = [
    {
      key: "ccavenue_order_id",
      header: "Order ID",
      cell: (row) => (
        <span className="font-mono text-sm">{row.ccavenue_order_id || "—"}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      cell: (row) => (
        <span className="font-medium">
          {formatCurrency(row.amount, row.currency)}
        </span>
      ),
    },
    {
      key: "payment_mode",
      header: "Payment Mode",
      cell: (row) => row.payment_mode || "—",
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
      key: "bank_ref_no",
      header: "Bank Ref",
      cell: (row) => (
        <span className="font-mono text-sm">{row.bank_ref_no || "—"}</span>
      ),
    },
    {
      key: "created_at",
      header: "Date",
      cell: (row) => format(new Date(row.created_at), "MMM dd, yyyy HH:mm"),
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
              <Download className="mr-2 h-4 w-4" /> Export
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground">Payment transaction history</p>
        </div>

        <DataTable
          columns={columns}
          data={transactions}
          isLoading={isLoading}
          searchPlaceholder="Search transactions..."
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
