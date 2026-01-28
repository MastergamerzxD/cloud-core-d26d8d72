import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable, { Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface ActivityLog {
  id: string;
  admin_id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  old_values: any;
  new_values: any;
  ip_address: string | null;
  created_at: string;
}

export default function AdminActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchLogs();
  }, [page, pageSize]);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await supabase
        .from("admin_activity_logs")
        .select("*", { count: "exact" })
        .range(from, to)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLogs(data || []);
      setTotal(count || 0);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes("create") || action.includes("add")) return "default";
    if (action.includes("update") || action.includes("edit")) return "outline";
    if (action.includes("delete") || action.includes("remove")) return "destructive";
    return "secondary";
  };

  const columns: Column<ActivityLog>[] = [
    {
      key: "timestamp",
      header: "Time",
      cell: (row) => (
        <div className="text-sm">
          <p>{format(new Date(row.created_at), "MMM dd, yyyy")}</p>
          <p className="text-muted-foreground">{format(new Date(row.created_at), "HH:mm:ss")}</p>
        </div>
      ),
    },
    {
      key: "action",
      header: "Action",
      cell: (row) => (
        <Badge variant={getActionColor(row.action) as any}>{row.action}</Badge>
      ),
    },
    {
      key: "entity",
      header: "Entity",
      cell: (row) => (
        <div>
          <p className="font-medium capitalize">{row.entity_type}</p>
          {row.entity_id && (
            <p className="text-sm text-muted-foreground font-mono">{row.entity_id}</p>
          )}
        </div>
      ),
    },
    {
      key: "ip_address",
      header: "IP Address",
      cell: (row) => (
        <code className="bg-muted px-2 py-1 rounded text-sm">
          {row.ip_address || "—"}
        </code>
      ),
    },
    {
      key: "changes",
      header: "Changes",
      cell: (row) => {
        if (!row.old_values && !row.new_values) return "—";
        return (
          <span className="text-sm text-muted-foreground">
            {row.new_values ? Object.keys(row.new_values).length : 0} field(s) changed
          </span>
        );
      },
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Activity Logs</h2>
          <p className="text-muted-foreground">
            Track admin actions and changes
          </p>
        </div>

        <DataTable
          columns={columns}
          data={logs}
          isLoading={isLoading}
          searchPlaceholder="Search activity..."
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
