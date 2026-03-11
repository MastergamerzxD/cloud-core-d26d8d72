import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Rocket, Tag, Copy, Check, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface LaunchPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LaunchPopup({ open, onOpenChange }: LaunchPopupProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("PREORDER40");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card border-primary/20 overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-40 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

        <DialogHeader className="text-center items-center relative">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-2 mx-auto"
          >
            <Rocket className="w-8 h-8 text-primary" />
          </motion.div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            🚀 Pre-Orders Are Now <span className="text-fire-gradient">Live!</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-2">
            You can now pre-order your Cloud on Fire server and receive <span className="text-primary font-semibold">40% off</span> your first month using the coupon below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4 relative">
          {/* Coupon code card */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="relative p-4 rounded-xl border border-primary/30 bg-primary/5 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Tag className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Coupon Code</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl font-black tracking-widest text-fire-gradient select-all">PREORDER40</span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors"
                title="Copy coupon code"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-primary" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">40% OFF your first month</p>
          </motion.div>

          {/* Launch date notice */}
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-xs text-center text-muted-foreground"
          >
            All pre-ordered servers will be automatically provisioned on <span className="text-foreground font-medium">April 15</span>, the official launch date.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="space-y-2"
          >
            <a href="https://shop.cloudonfire.com" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full h-12 btn-fire text-sm font-semibold">
                <span className="relative z-10 flex items-center gap-2">
                  Go to Pre-Order Store
                  <ExternalLink className="w-4 h-4" />
                </span>
              </Button>
            </a>
            <Button
              variant="ghost"
              className="w-full text-sm text-muted-foreground hover:text-foreground"
              onClick={() => onOpenChange(false)}
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
