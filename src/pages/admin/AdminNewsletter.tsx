import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminNewsletter() {
  const [subs, setSubs] = useState<any[]>([]);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("newsletter_subscribers").select("*").order("subscribed_at", { ascending: false });
    setSubs(data || []);
  };

  useEffect(() => { load(); }, []);

  const handleExport = () => {
    const csv = "Email,Subscribed At,Status\n" + subs.map((s) => `${s.email},${s.subscribed_at},${s.status}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "newsletter-subscribers.csv"; a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported!" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove subscriber?")) return;
    await supabase.from("newsletter_subscribers").delete().eq("id", id);
    toast({ title: "Removed" }); load();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Newsletter ({subs.length})</h1>
          <Button variant="outline" onClick={handleExport} disabled={subs.length === 0}><Download className="mr-2 h-4 w-4" />Export CSV</Button>
        </div>
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>Email</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {subs.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No subscribers yet</TableCell></TableRow>
                ) : subs.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.email}</TableCell>
                    <TableCell className="text-muted-foreground">{new Date(s.subscribed_at).toLocaleDateString()}</TableCell>
                    <TableCell><span className={`text-xs px-2 py-1 rounded-full ${s.status === "active" ? "bg-green-500/20 text-green-400" : "bg-muted text-muted-foreground"}`}>{s.status}</span></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(s.id)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
