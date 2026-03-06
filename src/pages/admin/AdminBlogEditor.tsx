import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminLayout from "@/components/admin/AdminLayout";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Eye } from "lucide-react";

export default function AdminBlogEditor() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { user } = useAdminAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", featured_image: "",
    author_name: "", category_id: "", status: "draft", publish_date: "",
    meta_title: "", meta_description: "", canonical_url: "", tags: "",
  });

  useEffect(() => {
    supabase.from("blog_categories").select("*").then(({ data }) => setCategories(data || []));
    if (!isNew && id) {
      supabase.from("blog_posts").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setForm({
            title: data.title || "", slug: data.slug || "", excerpt: data.excerpt || "",
            content: data.content || "", featured_image: data.featured_image || "",
            author_name: data.author_name || "", category_id: data.category_id || "",
            status: data.status || "draft",
            publish_date: data.publish_date ? new Date(data.publish_date).toISOString().slice(0, 16) : "",
            meta_title: data.meta_title || "", meta_description: data.meta_description || "",
            canonical_url: data.canonical_url || "", tags: (data.tags || []).join(", "),
          });
        }
        setLoading(false);
      });
    }
  }, [id, isNew]);

  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, slug: isNew ? slugify(title) : f.slug }));
  };

  const handleSave = async (status?: string) => {
    if (!form.title || !form.slug) {
      toast({ title: "Title and slug are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title, slug: form.slug, excerpt: form.excerpt, content: form.content,
      featured_image: form.featured_image, author_name: form.author_name,
      category_id: form.category_id || null, status: status || form.status,
      publish_date: form.publish_date ? new Date(form.publish_date).toISOString() : null,
      meta_title: form.meta_title, meta_description: form.meta_description,
      canonical_url: form.canonical_url, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      author_id: user?.id, updated_at: new Date().toISOString(),
    };

    let error;
    if (isNew) {
      ({ error } = await supabase.from("blog_posts").insert(payload));
    } else {
      ({ error } = await supabase.from("blog_posts").update(payload).eq("id", id));
    }

    if (error) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Post saved!" });
      navigate("/admin/blogs");
    }
    setSaving(false);
  };

  if (loading) return <AdminLayout><div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{isNew ? "New Post" : "Edit Post"}</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => handleSave("draft")} disabled={saving} className="flex-1 sm:flex-auto text-xs sm:text-sm">Save Draft</Button>
            <Button onClick={() => handleSave("published")} disabled={saving} className="flex-1 sm:flex-auto text-xs sm:text-sm">
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Eye className="mr-1 sm:mr-2 h-4 w-4" />Publish
            </Button>
          </div>
        </div>

        <Card className="bg-card border-border">
          <CardHeader><CardTitle>Post Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Post title" />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="post-slug" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Brief description..." rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <RichTextEditor value={form.content} onChange={(v) => setForm({ ...form, content: v })} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Featured Image URL</Label>
                <Input value={form.featured_image} onChange={(e) => setForm({ ...form, featured_image: e.target.value })} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Author Name</Label>
                <Input value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} placeholder="Author" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category_id} onValueChange={(v) => setForm({ ...form, category_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tags (comma separated)</Label>
                <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="hosting, vps, cloud" />
              </div>
              <div className="space-y-2">
                <Label>Publish Date</Label>
                <Input type="datetime-local" value={form.publish_date} onChange={(e) => setForm({ ...form, publish_date: e.target.value })} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader><CardTitle>SEO Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Meta Title</Label>
              <Input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} placeholder="SEO title" />
            </div>
            <div className="space-y-2">
              <Label>Meta Description</Label>
              <Textarea value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} placeholder="SEO description" rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Canonical URL</Label>
              <Input value={form.canonical_url} onChange={(e) => setForm({ ...form, canonical_url: e.target.value })} placeholder="https://..." />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
