import { useEffect, useState } from "react";
import ClientLayout from "@/components/client/ClientLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import {
  Server,
  Power,
  PowerOff,
  RefreshCw,
  Terminal,
  HardDrive,
  Cpu,
  MemoryStick,
  Globe,
  Calendar,
  Plus,
  Loader2,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
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
  products: {
    name: string;
    cpu_cores: number;
    ram_gb: number;
    storage_gb: number;
    bandwidth_tb: number;
  } | null;
}

export default function ClientVPS() {
  const [instances, setInstances] = useState<VPSInstance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchInstances();
  }, []);

  const fetchInstances = async () => {
    try {
      const { data, error } = await supabase
        .from("vps_instances")
        .select("*, products(name, cpu_cores, ram_gb, storage_gb, bandwidth_tb)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInstances(data || []);
    } catch (error) {
      console.error("Error fetching VPS instances:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (id: string, action: string) => {
    setActionLoading(id);
    // This would integrate with Virtualizor API
    toast.info(`${action} action will be available after Virtualizor integration`);
    setTimeout(() => setActionLoading(null), 1000);
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

  const getDaysUntilExpiry = (expiresAt: string) => {
    const days = differenceInDays(new Date(expiresAt), new Date());
    return days;
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
            <h2 className="text-3xl font-bold tracking-tight">My VPS Instances</h2>
            <p className="text-muted-foreground">
              Manage your virtual private servers
            </p>
          </div>
          <Button asChild>
            <Link to="/pricing">
              <Plus className="mr-2 h-4 w-4" /> Order New VPS
            </Link>
          </Button>
        </div>

        {instances.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Server className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No VPS Instances</h3>
              <p className="text-muted-foreground mb-6">
                You haven't ordered any VPS yet. Get started with your first server!
              </p>
              <Button asChild>
                <Link to="/pricing">Browse VPS Plans</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {instances.map((vps) => {
              const daysLeft = getDaysUntilExpiry(vps.expires_at);
              const isExpiringSoon = daysLeft <= 7 && daysLeft > 0;
              const isExpired = daysLeft <= 0;

              return (
                <Card key={vps.id} className={isExpired ? "border-destructive" : isExpiringSoon ? "border-yellow-500" : ""}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Server className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{vps.hostname}</CardTitle>
                          <CardDescription>{vps.products?.name}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(vps.status) as any} className="text-sm">
                        {vps.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Server Details */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">IP Address</p>
                              <p className="font-mono">{vps.ip_address || "Pending"}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Terminal className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">OS</p>
                              <p>{vps.os_template || "Not set"}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          <div className="p-3 rounded-lg bg-muted/50 text-center">
                            <Cpu className="h-4 w-4 mx-auto mb-1 text-primary" />
                            <p className="text-sm font-medium">{vps.products?.cpu_cores} vCPU</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50 text-center">
                            <MemoryStick className="h-4 w-4 mx-auto mb-1 text-primary" />
                            <p className="text-sm font-medium">{vps.products?.ram_gb} GB</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50 text-center">
                            <HardDrive className="h-4 w-4 mx-auto mb-1 text-primary" />
                            <p className="text-sm font-medium">{vps.products?.storage_gb} GB</p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/50 text-center">
                            <Globe className="h-4 w-4 mx-auto mb-1 text-primary" />
                            <p className="text-sm font-medium">{vps.products?.bandwidth_tb} TB</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions & Expiry */}
                      <div className="space-y-4">
                        <div className={`p-4 rounded-lg ${isExpired ? "bg-destructive/10" : isExpiringSoon ? "bg-yellow-500/10" : "bg-muted/50"}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              {isExpired ? "Expired" : isExpiringSoon ? "Expiring Soon" : "Valid Until"}
                            </span>
                          </div>
                          <p className="text-lg font-bold">
                            {format(new Date(vps.expires_at), "MMMM dd, yyyy")}
                          </p>
                          {!isExpired && (
                            <p className="text-sm text-muted-foreground">
                              {daysLeft} days remaining
                            </p>
                          )}
                          {(isExpired || isExpiringSoon) && (
                            <Button size="sm" className="mt-2 w-full">
                              Renew Now
                            </Button>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {vps.status === "running" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleAction(vps.id, "stop")}
                              disabled={actionLoading === vps.id}
                            >
                              {actionLoading === vps.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <PowerOff className="h-4 w-4 mr-1" />
                              )}
                              Stop
                            </Button>
                          ) : vps.status === "stopped" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleAction(vps.id, "start")}
                              disabled={actionLoading === vps.id}
                            >
                              {actionLoading === vps.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Power className="h-4 w-4 mr-1" />
                              )}
                              Start
                            </Button>
                          ) : null}
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleAction(vps.id, "restart")}
                            disabled={actionLoading === vps.id || vps.status !== "running"}
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Restart
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleAction(vps.id, "console")}
                            disabled={vps.status !== "running"}
                          >
                            <Terminal className="h-4 w-4 mr-1" />
                            Console
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
