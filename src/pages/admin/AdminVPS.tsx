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
import { MoreHorizontal, Eye, Power, PowerOff, RefreshCw, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface VPSInstance {
  id: string;
  hostname: string;
  ip_address: string | null;
  status: string;
  os_template: string | null;
  expires_at: string;
  created_at: string;
  virtualizor_vps_id: number | null;
  products: { name: string } | null;
}

export default function AdminVPS() {
  const [instances, setInstances] = useState<VPSInstance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchInstances();
  }, [page, pageSize]);

  const fetchInstances = async () => {
    setIsLoading(true);
    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, count, error } = await supabase
        .from("vps_instances")
        .select("*, products(name)", { count: "exact" })
        .range(from, to)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInstances(data || []);
      setTotal(count || 0);
    } catch (error) {
      console.error("Error fetching VPS instances:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "creating" | "running" | "stopped" | "suspended" | "terminated") => {
    try {
      const { error } = await supabase
        .from("vps_instances")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      toast.success(`VPS status updated to ${status}`);
      fetchInstances();
    } catch (error: any) {
      toast.error(error.message || "Failed to update VPS");
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      creating: "outline",
      running: "default",
      stopped: "secondary",
      suspended: "destructive",
      terminated: "destructive",
    };
    return colors[status] || "secondary";
  };

  const columns: Column<VPSInstance>[] = [
    {
      key: "hostname",
      header: "Hostname",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.hostname}</p>
          <p className="text-sm text-muted-foreground">{row.ip_address || "No IP"}</p>
        </div>
      ),
    },
    {
      key: "product",
      header: "Plan",
      cell: (row) => row.products?.name || "—",
    },
    {
      key: "os",
      header: "OS",
      cell: (row) => row.os_template || "—",
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
      key: "expires_at",
      header: "Expires",
      cell: (row) => format(new Date(row.expires_at), "MMM dd, yyyy"),
    },
    {
      key: "virtualizor_id",
      header: "Virtualizor ID",
      cell: (row) => row.virtualizor_vps_id || "—",
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
            {row.status === "stopped" && (
              <DropdownMenuItem onClick={() => updateStatus(row.id, "running")}>
                <Power className="mr-2 h-4 w-4" /> Start
              </DropdownMenuItem>
            )}
            {row.status === "running" && (
              <DropdownMenuItem onClick={() => updateStatus(row.id, "stopped")}>
                <PowerOff className="mr-2 h-4 w-4" /> Stop
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <RefreshCw className="mr-2 h-4 w-4" /> Sync with Virtualizor
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateStatus(row.id, "terminated")}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Terminate
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
          <h2 className="text-3xl font-bold tracking-tight">VPS Instances</h2>
          <p className="text-muted-foreground">Manage virtual private servers</p>
        </div>

        <DataTable
          columns={columns}
          data={instances}
          isLoading={isLoading}
          searchPlaceholder="Search by hostname or IP..."
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
