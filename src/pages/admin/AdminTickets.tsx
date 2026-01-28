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
import { MoreHorizontal, Eye, MessageSquare, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface SupportTicket {
  id: string;
  ticket_number: string;
  subject: string;
  status: string;
  priority: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export default function AdminTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchTickets();
  }, [page, pageSize]);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await supabase
        .from("support_tickets")
        .select("*", { count: "exact" })
        .range(from, to)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTickets(data || []);
      setTotal(count || 0);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "open" | "in_progress" | "waiting_reply" | "resolved" | "closed") => {
    try {
      const { error } = await supabase
        .from("support_tickets")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      toast.success(`Ticket ${status}`);
      fetchTickets();
    } catch (error: any) {
      toast.error(error.message || "Failed to update ticket");
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      open: "default",
      in_progress: "outline",
      waiting_reply: "secondary",
      resolved: "default",
      closed: "secondary",
    };
    return colors[status] || "secondary";
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "secondary",
      medium: "outline",
      high: "default",
      urgent: "destructive",
    };
    return colors[priority] || "secondary";
  };

  const columns: Column<SupportTicket>[] = [
    {
      key: "ticket_number",
      header: "Ticket #",
      cell: (row) => (
        <span className="font-mono text-sm">{row.ticket_number}</span>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      cell: (row) => (
        <span className="truncate max-w-[200px] block">{row.subject}</span>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      cell: (row) => (
        <Badge variant={getPriorityColor(row.priority) as any}>
          {row.priority}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => (
        <Badge variant={getStatusColor(row.status) as any}>
          {row.status.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "created_at",
      header: "Created",
      cell: (row) => format(new Date(row.created_at), "MMM dd, yyyy HH:mm"),
    },
    {
      key: "updated_at",
      header: "Last Update",
      cell: (row) => format(new Date(row.updated_at), "MMM dd, yyyy HH:mm"),
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
              <Eye className="mr-2 h-4 w-4" /> View Ticket
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" /> Reply
            </DropdownMenuItem>
            {row.status !== "resolved" && (
              <DropdownMenuItem onClick={() => updateStatus(row.id, "resolved")}>
                <CheckCircle className="mr-2 h-4 w-4" /> Mark Resolved
              </DropdownMenuItem>
            )}
            {row.status !== "closed" && (
              <DropdownMenuItem onClick={() => updateStatus(row.id, "closed")}>
                <XCircle className="mr-2 h-4 w-4" /> Close Ticket
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
          <h2 className="text-3xl font-bold tracking-tight">Support Tickets</h2>
          <p className="text-muted-foreground">Manage customer support requests</p>
        </div>

        <DataTable
          columns={columns}
          data={tickets}
          isLoading={isLoading}
          searchPlaceholder="Search tickets..."
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
