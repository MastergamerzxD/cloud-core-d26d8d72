import { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function MediaGallery() {
  const [media, setMedia] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setMedia((data || []).filter((m: any) => m.type?.startsWith("image/"))));
  }, []);

  return (
    <Layout>
      <SEOHead
        title="Media Gallery — Cloud on Fire VPS Hosting India"
        description="Browse Cloud on Fire media gallery including product images, infrastructure photos, data center visuals, and more."
        canonical="/media"
      />

      <section className="section-padding">
        <div className="container-wide">
          <h1 className="text-section-title font-bold text-foreground mb-2">Media Gallery</h1>
          <p className="text-muted-foreground mb-10">Browse our latest images and resources.</p>

          {media.length === 0 ? (
            <p className="text-muted-foreground">No media available yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {media.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <img
                    src={item.url}
                    alt={item.alt_text || item.name}
                    className="w-full h-auto block transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-4xl p-2 bg-card border-border">
          {selected && (
            <div>
              <img
                src={selected.url}
                alt={selected.alt_text || selected.name}
                className="w-full rounded-lg"
              />
              <div className="p-4 space-y-1">
                <h2 className="text-lg font-semibold text-foreground">{selected.name}</h2>
                {selected.description && <p className="text-sm text-muted-foreground">{selected.description}</p>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
