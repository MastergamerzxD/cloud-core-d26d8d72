import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable, { Column } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { MoreHorizontal, Plus, Ban, Copy, Gift } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";

interface GiftCard {
  id: string;
  code: string;
  initial_balance: number;
  current_balance: number;
  currency: string;
  status: string;
  created_by: string | null;
  redeemed_by: string | null;
  redeemed_at: string | null;
  expires_at: string | null;
  created_at: string;
}

export default function AdminGiftCards() {
  const { user } = useAuth();
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    initial_balance: 500,
    expires_at: "",
  });

  useEffect(() => {
    fetchGiftCards();
  }, []);

  const fetchGiftCards = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("gift_cards")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGiftCards(data || []);
    } catch (error) {
      console.error("Error fetching gift cards:", error);
      toast.error("Failed to fetch gift cards");
    } finally {
      setIsLoading(false);
    }
  };

  const generateCode = async () => {
    const { data, error } = await supabase.rpc("generate_gift_card_code");
    if (!error && data) {
      setFormData({ ...formData, code: data });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("gift_cards").insert({
        code: formData.code,
        initial_balance: formData.initial_balance,
        current_balance: formData.initial_balance,
        expires_at: formData.expires_at || null,
        created_by: user?.id,
      });

      if (error) throw error;

      toast.success("Gift card created successfully");
      setIsDialogOpen(false);
      setFormData({ code: "", initial_balance: 500, expires_at: "" });
      fetchGiftCards();
    } catch (error: any) {
      console.error("Error creating gift card:", error);
      toast.error(error.message || "Failed to create gift card");
    }
  };

  const handleDisable = async (id: string) => {
    try {
      const { error } = await supabase
        .from("gift_cards")
        .update({ status: "disabled" })
        .eq("id", id);

      if (error) throw error;
      toast.success("Gift card disabled");
      fetchGiftCards();
    } catch (error: any) {
      toast.error(error.message || "Failed to disable gift card");
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "redeemed":
        return "secondary";
      case "expired":
      case "disabled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const columns: Column<GiftCard>[] = [
    {
      key: "code",
      header: "Code",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <code className="bg-muted px-2 py-1 rounded text-sm">{row.code}</code>
          <Button variant="ghost" size="icon" onClick={() => copyCode(row.code)}>
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
    {
      key: "balance",
      header: "Balance",
      cell: (row) => (
        <div>
          <p className="font-medium">{formatCurrency(row.current_balance)}</p>
          {row.current_balance !== row.initial_balance && (
            <p className="text-xs text-muted-foreground">
              of {formatCurrency(row.initial_balance)}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => (
        <Badge variant={getStatusColor(row.status) as any}>{row.status}</Badge>
      ),
    },
    {
      key: "expires_at",
      header: "Expires",
      cell: (row) =>
        row.expires_at ? format(new Date(row.expires_at), "MMM dd, yyyy") : "Never",
    },
    {
      key: "created_at",
      header: "Created",
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
            <DropdownMenuItem onClick={() => copyCode(row.code)}>
              <Copy className="mr-2 h-4 w-4" /> Copy Code
            </DropdownMenuItem>
            {row.status === "active" && (
              <DropdownMenuItem
                onClick={() => handleDisable(row.id)}
                className="text-destructive"
              >
                <Ban className="mr-2 h-4 w-4" /> Disable
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Gift Cards</h2>
            <p className="text-muted-foreground">Create and manage gift cards</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Gift Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" /> Create Gift Card
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Code</Label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="GC-XXXX-XXXX-XXXX"
                      required
                    />
                    <Button type="button" variant="outline" onClick={generateCode}>
                      Generate
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Balance (₹)</Label>
                  <Input
                    type="number"
                    value={formData.initial_balance}
                    onChange={(e) =>
                      setFormData({ ...formData, initial_balance: Number(e.target.value) })
                    }
                    min={1}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Expires At (Optional)</Label>
                  <Input
                    type="date"
                    value={formData.expires_at}
                    onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Gift Card</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <DataTable columns={columns} data={giftCards} isLoading={isLoading} />
      </div>
    </AdminLayout>
  );
}
