import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Rocket, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface LaunchPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LaunchPopup({ open, onOpenChange }: LaunchPopupProps) {
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
            🚀 Cloud on Fire Is <span className="text-fire-gradient">Live!</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-2">
            Deploy your high-performance VPS server in seconds. Choose from our range of plans built for speed, stability, and security.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4 relative">
          {/* Buttons */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="space-y-2"
          >
            <a href="https://shop.cloudonfire.com" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full h-12 btn-fire text-sm font-semibold">
                <span className="relative z-10 flex items-center gap-2">
                  Go to Store
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
