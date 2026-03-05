import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Eye, Megaphone, FileText } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ posts: 0, views: 0, pages: 0, announcements: 0 });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const [postsRes, pagesRes, annRes] = await Promise.all([
        supabase.from("blog_posts").select("id, title, status, views, created_at").order("created_at", { ascending: false }).limit(5),
        supabase.from("pages").select("id", { count: "exact", head: true }),
        supabase.from("announcements").select("id", { count: "exact", head: true }),
      ]);

      const posts = postsRes.data || [];
      const totalViews = posts.reduce((sum: number, p: any) => sum + (p.views || 0), 0);

      // Get total post count
      const { count: postCount } = await supabase.from("blog_posts").select("id", { count: "exact", head: true });

      setStats({
        posts: postCount || 0,
        views: totalViews,
        pages: pagesRes.count || 0,
        announcements: annRes.count || 0,
      });
      setRecentPosts(posts);
    };
    load();
  }, []);

  const statCards = [
    { label: "Total Posts", value: stats.posts, icon: BookOpen, color: "text-primary" },
    { label: "Total Views", value: stats.views, icon: Eye, color: "text-fire-yellow" },
    { label: "Pages", value: stats.pages, icon: FileText, color: "text-green-400" },
    { label: "Announcements", value: stats.announcements, icon: Megaphone, color: "text-blue-400" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <Card key={s.label} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{s.value}</p>
                  </div>
                  <s.icon className={`h-8 w-8 ${s.color} opacity-80`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {recentPosts.length === 0 ? (
              <p className="text-muted-foreground text-sm">No posts yet. Create your first blog post!</p>
            ) : (
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{post.title}</p>
                      <p className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${post.status === "published" ? "bg-green-500/20 text-green-400" : "bg-muted text-muted-foreground"}`}>
                      {post.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
