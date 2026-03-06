import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import NotFound from "./NotFound";
import { Loader2 } from "lucide-react";

export default function DynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single()
      .then(({ data }) => {
        setPage(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <Layout><div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></Layout>;
  if (!page) return <NotFound />;

  return (
    <Layout>
      <SEOHead
        title={`${page.seo_title || page.title} - Cloud on Fire`}
        description={page.seo_description || ""}
        canonical={`/page/${slug}`}
      />
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <h1 className="text-section-title font-bold text-foreground mb-8">{page.title}</h1>
          <div
            className="prose prose-invert max-w-none [&_img]:rounded-lg [&_a]:text-primary"
            dangerouslySetInnerHTML={{ __html: page.content || "" }}
          />
        </div>
      </section>
    </Layout>
  );
}
