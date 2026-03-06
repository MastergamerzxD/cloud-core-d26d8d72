import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single()
      .then(({ data }) => {
        setPost(data);
        setLoading(false);
        if (data) {
          supabase.rpc("increment_blog_views", { post_id: data.id });
        }
      });
  }, [slug]);

  if (loading) return <Layout><div className="section-padding container-wide text-center text-muted-foreground">Loading...</div></Layout>;
  if (!post) return <Layout><div className="section-padding container-wide text-center"><h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1><Link to="/blog" className="text-primary hover:underline">← Back to blog</Link></div></Layout>;

  return (
    <Layout>
      <Helmet>
        <title>{post.meta_title || post.title} - Cloud on Fire Blog</title>
        {post.meta_description && <meta name="description" content={post.meta_description} />}
        {post.canonical_url ? <link rel="canonical" href={post.canonical_url} /> : <link rel="canonical" href={`https://cloudonfire.in/blog/${post.slug}`} />}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://cloudonfire.in/blog/${post.slug}`} />
        <meta property="og:title" content={post.meta_title || post.title} />
        {post.meta_description && <meta property="og:description" content={post.meta_description} />}
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.meta_title || post.title} />
        {post.tags?.length > 0 && <meta name="keywords" content={post.tags.join(", ")} />}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.meta_description || post.excerpt || "",
            image: post.featured_image || undefined,
            datePublished: post.publish_date,
            dateModified: post.updated_at || post.publish_date,
            author: { "@type": "Person", name: post.author_name || "Cloud on Fire" },
            publisher: { "@type": "Organization", name: "Cloud on Fire", url: "https://cloudonfire.in" },
            mainEntityOfPage: `https://cloudonfire.in/blog/${post.slug}`,
            keywords: post.tags?.join(", "),
          })}
        </script>
      </Helmet>

      <article className="section-padding">
        <div className="container-wide max-w-3xl mx-auto">
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 mb-6">
            <ArrowLeft className="h-4 w-4" />Back to blog
          </Link>

          {post.featured_image && (
            <div className="aspect-video rounded-xl overflow-hidden mb-8">
              <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            {post.author_name && <span>By {post.author_name}</span>}
            {post.publish_date && <span>{new Date(post.publish_date).toLocaleDateString()}</span>}
            {post.tags?.length > 0 && (
              <div className="flex gap-1">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div
            className="prose prose-invert max-w-none [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_p]:text-muted-foreground [&_a]:text-primary [&_li]:text-muted-foreground [&_blockquote]:border-primary/50"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </div>
      </article>
    </Layout>
  );
}
