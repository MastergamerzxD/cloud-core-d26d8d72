import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
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
      <SEOHead
        title="Blog — VPS Hosting News, Tutorials & Guides | Cloud on Fire India"
        description="Latest news, tutorials, and expert guides about VPS hosting in India, cloud infrastructure, DDoS protection, gaming server optimization, and more from Cloud on Fire."
        keywords="VPS hosting blog India, Cloud on Fire blog, hosting tutorials, DDoS protection guides, gaming server tips, cloud infrastructure news"
        canonical="/blog"
        ogType="blog"
        ogImage="https://cloudonfire.com/images/og-logo.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Cloud on Fire Blog",
            url: "https://cloudonfire.com/blog",
            description: "Latest news, tutorials, and expert guides about VPS hosting, gaming servers, and cloud infrastructure from Cloud on Fire.",
            isPartOf: { "@id": "https://cloudonfire.com/#website" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://cloudonfire.com/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://cloudonfire.com/blog" },
            ],
          },
        ]}
      />

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
