import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable, { Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Monitor, Smartphone, Tablet, Globe, MapPin, Wifi } from "lucide-react";
import { format } from "date-fns";

interface AccessLog {
  id: string;
  user_id: string | null;
  session_id: string | null;
  ip_address: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  isp: string | null;
  user_agent: string | null;
  browser: string | null;
  browser_version: string | null;
  os: string | null;
  os_version: string | null;
  device_type: string | null;
  is_mobile: boolean | null;
  referrer: string | null;
  page_url: string | null;
  action_type: string;
  created_at: string;
}

export default function AdminAccessLogs() {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [total, setTotal] = useState(0);
  const [filterDevice, setFilterDevice] = useState<string>("all");
  const [filterCountry, setFilterCountry] = useState<string>("all");

  useEffect(() => {
    fetchLogs();
  }, [page, pageSize, filterDevice, filterCountry]);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from("user_access_logs")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (filterDevice !== "all") {
        query = query.eq("device_type", filterDevice);
      }

      if (filterCountry !== "all") {
        query = query.eq("country", filterCountry);
      }

      const { data, count, error } = await query;

      if (error) throw error;
      setLogs(data || []);
      setTotal(count || 0);
    } catch (error) {
      console.error("Error fetching access logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDeviceIcon = (deviceType: string | null, isMobile: boolean | null) => {
    if (isMobile) return <Smartphone className="h-4 w-4" />;
    if (deviceType === "tablet") return <Tablet className="h-4 w-4" />;
    return <Monitor className="h-4 w-4" />;
  };

  const columns: Column<AccessLog>[] = [
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
      key: "ip",
      header: "IP Address",
      cell: (row) => (
        <code className="bg-muted px-2 py-1 rounded text-sm">{row.ip_address || "—"}</code>
      ),
    },
    {
      key: "location",
      header: "Location",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm">
            <p>{row.city || "Unknown"}</p>
            <p className="text-muted-foreground">{row.country || "—"}</p>
          </div>
        </div>
      ),
    },
    {
      key: "isp",
      header: "ISP",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Wifi className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm truncate max-w-[150px]">{row.isp || "—"}</span>
        </div>
      ),
    },
    {
      key: "device",
      header: "Device",
      cell: (row) => (
        <div className="flex items-center gap-2">
          {getDeviceIcon(row.device_type, row.is_mobile)}
          <div className="text-sm">
            <p>{row.os || "Unknown"} {row.os_version}</p>
            <p className="text-muted-foreground">{row.browser} {row.browser_version}</p>
          </div>
        </div>
      ),
    },
    {
      key: "action",
      header: "Action",
      cell: (row) => (
        <Badge variant="outline">{row.action_type}</Badge>
      ),
    },
    {
      key: "page",
      header: "Page",
      cell: (row) => (
        <span className="text-sm truncate max-w-[150px] block">{row.page_url || "—"}</span>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Access Logs</h2>
            <p className="text-muted-foreground">
              Track user visits, devices, and locations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <Select value={filterDevice} onValueChange={setFilterDevice}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Device Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Devices</SelectItem>
                <SelectItem value="desktop">Desktop</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="tablet">Tablet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" onClick={fetchLogs}>
            Refresh
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={logs}
          isLoading={isLoading}
          searchPlaceholder="Search by IP..."
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
