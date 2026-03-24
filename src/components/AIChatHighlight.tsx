import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

/**
 * One-time-per-session AI chat discovery animation.
 * A small glowing bot orb appears, floats to the chat button,
 * pulses it, shows a tooltip, then disappears. Fully CSS-transform based.
 */
export default function AIChatHighlight() {
  const [phase, setPhase] = useState<"idle" | "float" | "highlight" | "done">("idle");

  useEffect(() => {
    // Only run once per session
    if (sessionStorage.getItem("cof_ai_seen")) {
      setPhase("done");
      return;
    }

    // Wait for page to settle before starting
    const startTimer = setTimeout(() => setPhase("float"), 2500);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (phase === "float") {
      const t = setTimeout(() => setPhase("highlight"), 1800);
      return () => clearTimeout(t);
    }
    if (phase === "highlight") {
      sessionStorage.setItem("cof_ai_seen", "1");
      const t = setTimeout(() => setPhase("done"), 3500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Dismiss on any click
  useEffect(() => {
    if (phase === "done" || phase === "idle") return;
    const dismiss = () => {
      sessionStorage.setItem("cof_ai_seen", "1");
      setPhase("done");
    };
    window.addEventListener("click", dismiss, { once: true });
    return () => window.removeEventListener("click", dismiss);
  }, [phase]);

  if (phase === "done" || phase === "idle") {
    // During highlight phase, add glow to chat button via a portal-style overlay
    return null;
  }

  return (
    <AnimatePresence>
      {/* Floating orb */}
      {phase === "float" && (
        <motion.div
          key="orb"
          className="fixed z-[60] pointer-events-none"
          initial={{ top: "40%", left: "50%", opacity: 0, scale: 0.5 }}
          animate={{
            top: "calc(100vh - 3.5rem)",
            left: "calc(100vw - 3.5rem)",
            opacity: [0, 1, 1, 0.8],
            scale: [0.5, 1, 0.9, 0.7],
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
        </motion.div>
      )}

      {/* Chat button glow ring + tooltip */}
      {phase === "highlight" && (
        <>
          {/* Pulsing ring behind chat button */}
          <motion.div
            key="glow"
            className="fixed z-[49] pointer-events-none"
            style={{ bottom: "1.5rem", right: "1.5rem" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.6, 0.3, 0.6, 0], scale: [0.8, 1.3, 1.1, 1.3, 0.8] }}
            transition={{ duration: 3, ease: "easeInOut" }}
          >
            <div className="w-14 h-14 rounded-full bg-primary/40 blur-sm" />
          </motion.div>

          {/* Tooltip */}
          <motion.div
            key="tooltip"
            className="fixed z-[60] pointer-events-none"
            style={{ bottom: "5rem", right: "1.5rem" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl text-sm text-foreground whitespace-nowrap">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Ask Cloud on Fire AI anything ⚡
              </span>
              {/* Arrow */}
              <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
