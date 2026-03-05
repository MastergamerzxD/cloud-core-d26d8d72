import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminRedirects() {
  const [items, setItems] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ from_path: "", to_path: "", status_code: 301 });
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("redirects").select("*").order("created_at", { ascending: false });
    setItems(data || []);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!form.from_path || !form.to_path) return;
    const { error } = await supabase.from("redirects").insert(form);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Redirect added!" }); setOpen(false); setForm({ from_path: "", to_path: "", status_code: 301 }); load(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("redirects").delete().eq("id", id);
    toast({ title: "Deleted" }); load();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Redirects</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />Add Redirect</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New Redirect</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2"><Label>From Path</Label><Input value={form.from_path} onChange={(e) => setForm({ ...form, from_path: e.target.value })} placeholder="/old-url" /></div>
                <div className="space-y-2"><Label>To Path</Label><Input value={form.to_path} onChange={(e) => setForm({ ...form, to_path: e.target.value })} placeholder="/new-url" /></div>
                <Button onClick={handleSave} className="w-full">Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>From</TableHead><TableHead>To</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No redirects</TableCell></TableRow>
                ) : items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-sm">{item.from_path}</TableCell>
                    <TableCell className="font-mono text-sm">{item.to_path}</TableCell>
                    <TableCell>{item.status_code}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
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
