import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable, { Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { MoreHorizontal, Eye, Shield, ShieldOff, Ban, User, LogIn, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  company_name: string | null;
  city: string | null;
  country: string | null;
  created_at: string;
  is_suspended: boolean | null;
  role?: string;
  email?: string;
}

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [page, pageSize]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data: profiles, count, error } = await supabase
        .from("profiles")
        .select("*", { count: "exact" })
        .range(from, to)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch roles for users
      const userIds = profiles?.map((p) => p.user_id) || [];
      const { data: roles } = await supabase
        .from("user_roles")
        .select("user_id, role")
        .in("user_id", userIds);

      const usersWithRoles = profiles?.map((profile) => ({
        ...profile,
        role: roles?.find((r) => r.user_id === profile.user_id)?.role || "user",
      }));

      setUsers(usersWithRoles || []);
      setTotal(count || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMakeAdmin = async (userId: string) => {
    setActionLoading(userId);
    try {
      const { data, error } = await supabase.rpc("promote_to_admin", {
        target_user_id: userId,
      });

      if (error) throw error;

      if (data) {
        toast.success("User promoted to admin successfully");
        fetchUsers();
      } else {
        toast.info("User is already an admin");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to promote user");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemoveAdmin = async (userId: string) => {
    if (userId === user?.id) {
      toast.error("You cannot remove your own admin access");
      return;
    }

    setActionLoading(userId);
    try {
      const { error } = await supabase.rpc("demote_from_admin", {
        target_user_id: userId,
      });

      if (error) throw error;

      toast.success("Admin access removed");
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Failed to remove admin access");
    } finally {
      setActionLoading(null);
    }
  };

  const handleSuspendUser = async (userId: string, suspend: boolean) => {
    setActionLoading(userId);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          is_suspended: suspend,
          suspended_reason: suspend ? "Suspended by admin" : null,
        })
        .eq("user_id", userId);

      if (error) throw error;

      toast.success(suspend ? "User suspended" : "User unsuspended");
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Failed to update user");
    } finally {
      setActionLoading(null);
    }
  };

  const handleLoginAsUser = async (targetUser: UserProfile) => {
    // Log the impersonation
    await supabase.from("admin_impersonations").insert({
      admin_id: user?.id,
      impersonated_user_id: targetUser.user_id,
    });

    toast.info(
      `To login as ${targetUser.full_name || "this user"}, they would need to provide their password. In a full implementation, this would use a secure impersonation token.`
    );
  };

  const columns: Column<UserProfile>[] = [
    {
      key: "full_name",
      header: "User",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-medium">{row.full_name || "—"}</p>
            <p className="text-sm text-muted-foreground">{row.company_name || "No company"}</p>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Contact",
      cell: (row) => row.phone || "—",
    },
    {
      key: "location",
      header: "Location",
      cell: (row) => {
        if (row.city && row.country) return `${row.city}, ${row.country}`;
        return row.country || row.city || "—";
      },
    },
    {
      key: "role",
      header: "Role",
      cell: (row) => (
        <Badge variant={row.role === "admin" ? "default" : "secondary"}>
          {row.role === "admin" && <Shield className="h-3 w-3 mr-1" />}
          {row.role}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => (
        <Badge variant={row.is_suspended ? "destructive" : "outline"}>
          {row.is_suspended ? "Suspended" : "Active"}
        </Badge>
      ),
    },
    {
      key: "created_at",
      header: "Joined",
      cell: (row) => format(new Date(row.created_at), "MMM dd, yyyy"),
    },
    {
      key: "actions",
      header: "",
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={actionLoading === row.user_id}>
              {actionLoading === row.user_id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MoreHorizontal className="h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => { setSelectedUser(row); setIsDetailOpen(true); }}>
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLoginAsUser(row)}>
              <LogIn className="mr-2 h-4 w-4" /> Login as User
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {row.role !== "admin" ? (
              <DropdownMenuItem onClick={() => handleMakeAdmin(row.user_id)}>
                <Shield className="mr-2 h-4 w-4" /> Make Admin
              </DropdownMenuItem>
            ) : row.user_id !== user?.id ? (
              <DropdownMenuItem onClick={() => handleRemoveAdmin(row.user_id)}>
                <ShieldOff className="mr-2 h-4 w-4" /> Remove Admin
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuSeparator />
            {row.is_suspended ? (
              <DropdownMenuItem onClick={() => handleSuspendUser(row.user_id, false)}>
                <User className="mr-2 h-4 w-4" /> Unsuspend User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => handleSuspendUser(row.user_id, true)}
                className="text-destructive"
              >
                <Ban className="mr-2 h-4 w-4" /> Suspend User
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
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Manage registered users and their roles</p>
        </div>

        <DataTable
          columns={columns}
          data={users}
          isLoading={isLoading}
          searchPlaceholder="Search users..."
          onSearch={() => {}}
          pagination={{
            page,
            pageSize,
            total,
            onPageChange: setPage,
            onPageSizeChange: setPageSize,
          }}
        />

        {/* User Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Complete information about this user
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{selectedUser.full_name || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedUser.phone || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p className="font-medium">{selectedUser.company_name || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">
                      {selectedUser.city && selectedUser.country
                        ? `${selectedUser.city}, ${selectedUser.country}`
                        : selectedUser.country || selectedUser.city || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <Badge variant={selectedUser.role === "admin" ? "default" : "secondary"}>
                      {selectedUser.role}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={selectedUser.is_suspended ? "destructive" : "outline"}>
                      {selectedUser.is_suspended ? "Suspended" : "Active"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="font-medium">
                      {format(new Date(selectedUser.created_at), "MMMM dd, yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">User ID</p>
                    <p className="font-mono text-xs">{selectedUser.user_id}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  {selectedUser.role !== "admin" ? (
                    <Button onClick={() => handleMakeAdmin(selectedUser.user_id)} size="sm">
                      <Shield className="mr-2 h-4 w-4" /> Make Admin
                    </Button>
                  ) : selectedUser.user_id !== user?.id ? (
                    <Button
                      variant="outline"
                      onClick={() => handleRemoveAdmin(selectedUser.user_id)}
                      size="sm"
                    >
                      <ShieldOff className="mr-2 h-4 w-4" /> Remove Admin
                    </Button>
                  ) : null}
                  <Button variant="outline" onClick={() => handleLoginAsUser(selectedUser)} size="sm">
                    <LogIn className="mr-2 h-4 w-4" /> Login as User
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
