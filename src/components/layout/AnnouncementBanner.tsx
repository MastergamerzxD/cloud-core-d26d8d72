import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { X, Megaphone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("announcements")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(3);
      setAnnouncements(data || []);
    };
    load();

    // Listen for realtime changes
    const channel = supabase
      .channel("public:announcements")
      .on("postgres_changes", { event: "*", schema: "public", table: "announcements" }, () => {
        load();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const visible = announcements.filter((a) => !dismissed.includes(a.id));

  if (visible.length === 0) return null;

  return (
    <div className="fixed top-16 md:top-20 left-0 right-0 z-40">
      <AnimatePresence>
        {visible.map((ann) => (
          <motion.div
            key={ann.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-primary/90 backdrop-blur-sm text-primary-foreground"
          >
            <div className="container-wide flex items-center justify-between py-2 px-4">
              <div className="flex items-center gap-2 text-sm">
                <Megaphone className="h-4 w-4 shrink-0" />
                <span className="font-medium">{ann.title}</span>
                {ann.description && (
                  <span className="hidden sm:inline text-primary-foreground/80">— {ann.description}</span>
                )}
              </div>
              <button
                onClick={() => setDismissed((prev) => [...prev, ann.id])}
                className="p-1 hover:bg-primary-foreground/20 rounded transition-colors shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
