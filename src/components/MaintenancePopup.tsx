import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageCircle, Wrench, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHONE = "+918766215705";
const WHATSAPP = "918766215705";

// GLOBAL maintenance end time — same for every visitor worldwide.
// Edit this single constant to extend or shorten the maintenance window.
// Currently set to ~24h from rollout (IST ~midnight April 21, 2026).
const MAINTENANCE_END_UTC = Date.parse("2026-04-20T18:30:00Z");

function formatRemaining(ms: number) {
  if (ms < 0) ms = 0;
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return {
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
  };
}

export default function MaintenancePopup() {
  const [open, setOpen] = useState(false);
  const [endTime] = useState<number>(() => getEndTime());
  const [remaining, setRemaining] = useState(() => endTime - Date.now());

  // Intercept clicks on links pointing to shop.cloudonfire.com
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.includes("shop.cloudonfire.com")) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  // Countdown tick
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => {
      setRemaining(endTime - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [open, endTime]);

  const { h, m, s } = formatRemaining(remaining);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border border-border/60 bg-card shadow-[0_0_60px_hsl(var(--primary)/0.25)] overflow-hidden"
          >
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-muted/70 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                    <Wrench className="w-7 h-7 text-primary" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-5">
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  Billing Panel Under Maintenance
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our new billing panel is being deployed. We'll be back online in{" "}
                  <span className="text-foreground font-semibold">24 hours</span>. In the meantime,
                  reach us directly to place your order.
                </p>
              </div>

              {/* Countdown */}
              <div className="mb-6">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                    Back Online In
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {[
                    { label: "Hours", value: h },
                    { label: "Minutes", value: m },
                    { label: "Seconds", value: s },
                  ].map((unit, i) => (
                    <div key={unit.label} className="flex items-center gap-2 sm:gap-3">
                      <div className="flex flex-col items-center">
                        <div className="min-w-[60px] sm:min-w-[72px] py-2.5 sm:py-3 px-2 rounded-xl bg-gradient-to-b from-muted/80 to-muted/40 border border-border/60">
                          <div className="text-2xl sm:text-3xl font-black tabular-nums text-foreground text-center tracking-tight">
                            {unit.value}
                          </div>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1.5 font-semibold">
                          {unit.label}
                        </span>
                      </div>
                      {i < 2 && (
                        <span className="text-2xl font-black text-primary/40 -mt-5">:</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider with text */}
              <div className="relative mb-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-px bg-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-3 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Place an order now
                  </span>
                </div>
              </div>

              {/* Contact text */}
              <p className="text-center text-sm text-muted-foreground mb-4">
                Call or WhatsApp us directly to purchase a VPS — we'll get you set up instantly.
              </p>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                    "Hi, I'd like to purchase a VPS plan from Cloud on Fire."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full h-12 bg-[hsl(142_76%_36%)] hover:bg-[hsl(142_76%_30%)] text-white font-semibold gap-2 border-0">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </a>
                <a href={`tel:${PHONE}`} className="block">
                  <Button className="w-full h-12 btn-fire font-semibold gap-2">
                    <span className="relative z-10 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call Now
                    </span>
                  </Button>
                </a>
              </div>

              {/* Phone number */}
              <p className="text-center text-xs text-muted-foreground mt-4">
                <span className="text-foreground font-semibold">+91 87662 15705</span> · Available 24/7
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
