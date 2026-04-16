import { useState } from "react";
import { X, Rocket, ExternalLink } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed top-16 md:top-20 left-0 right-0 z-40">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-gradient-to-r from-primary/90 via-primary to-primary/90 backdrop-blur-sm text-primary-foreground"
      >
        <div className="container-wide flex items-center justify-between py-2 px-4">
          <div className="flex items-center gap-2 text-sm flex-1 min-w-0">
            <Rocket className="h-4 w-4 shrink-0" />
            <span className="font-semibold truncate">
              🚀 Cloud on Fire Is Now Live — Deploy Your Server Today!
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            <a
              href="https://shop.cloudonfire.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
            >
              Get Started
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 hover:bg-primary-foreground/20 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
