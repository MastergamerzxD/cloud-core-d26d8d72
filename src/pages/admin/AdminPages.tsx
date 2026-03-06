import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAIGenerate } from "@/hooks/useAIGenerate";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function AdminPages() {
  const [pages, setPages] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { generating, generatePage } = useAIGenerate();
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiOpen, setAiOpen] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("pages").select("*").order("created_at", { ascending: false });
    setPages(data || []);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this page?")) return;
    await supabase.from("pages").delete().eq("id", id);
    toast({ title: "Page deleted" });
    load();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Pages</h1>
          <div className="flex gap-2">
            <Dialog open={aiOpen} onOpenChange={setAiOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary"><Sparkles className="mr-2 h-4 w-4" />Generate with AI</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Generate Page with AI</DialogTitle></DialogHeader>
                <Textarea
                  placeholder='E.g. "Create a landing page for Rust game server hosting"'
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button
                  disabled={generating || !aiPrompt.trim()}
                  onClick={async () => {
                    const id = await generatePage(aiPrompt);
                    if (id) {
                      setAiOpen(false);
                      setAiPrompt("");
                      load();
                      navigate(`/admin/pages/${id}`);
                    }
                  }}
                >
                  {generating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Sparkles className="mr-2 h-4 w-4" />Generate</>}
                </Button>
              </DialogContent>
            </Dialog>
            <Button onClick={() => navigate("/admin/pages/new")}><Plus className="mr-2 h-4 w-4" />New Page</Button>
          </div>
        </div>
        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No pages yet</TableCell></TableRow>
                ) : pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell className="text-muted-foreground">/{page.slug}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-full ${page.status === "published" ? "bg-green-500/20 text-green-400" : "bg-muted text-muted-foreground"}`}>{page.status}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{new Date(page.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/pages/${page.id}`)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(page.id)}><Trash2 className="h-4 w-4" /></Button>
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
