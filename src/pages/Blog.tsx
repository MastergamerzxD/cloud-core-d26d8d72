import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, featured_image, author_name, publish_date, tags")
      .eq("status", "published")
      .order("publish_date", { ascending: false })
      .then(({ data }) => setPosts(data || []));
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Blog - Cloud on Fire</title>
        <meta name="description" content="Latest news, tutorials, and insights about VPS hosting, cloud infrastructure, and DDoS protection." />
      </Helmet>

      <section className="section-padding">
        <div className="container-wide">
          <h1 className="text-section-title font-bold text-foreground mb-2">Blog</h1>
          <p className="text-muted-foreground mb-10">Latest news, tutorials, and insights.</p>

          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts published yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="bg-card border-border hover:border-primary/50 transition-colors h-full">
                    {post.featured_image && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <CardContent className="p-5">
                      <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{post.title}</h2>
                      {post.excerpt && <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{post.excerpt}</p>}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.author_name}</span>
                        {post.publish_date && <span>{new Date(post.publish_date).toLocaleDateString()}</span>}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
