import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Rocket, Phone, MessageCircle, Instagram } from "lucide-react";

interface LaunchPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LaunchPopup({ open, onOpenChange }: LaunchPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card border-primary/20">
        <DialogHeader className="text-center items-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 mx-auto">
            <Rocket className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Launching <span className="text-fire-gradient">15th April 2026</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm mt-2">
            We're working hard to bring you the best VPS hosting experience in India. 
            Stay tuned! In the meantime, reach out to us:
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <a href="tel:+918766215705" className="block">
            <Button variant="outline" className="w-full justify-start gap-3 h-12">
              <Phone className="w-5 h-5 text-primary" />
              <div className="text-left">
                <div className="text-sm font-medium text-foreground">Call Us</div>
                <div className="text-xs text-muted-foreground">+91 8766215705</div>
              </div>
            </Button>
          </a>

          <a href="https://wa.me/918766215705" target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="outline" className="w-full justify-start gap-3 h-12 border-green-500/30 hover:bg-green-500/10">
              <MessageCircle className="w-5 h-5 text-green-500" />
              <div className="text-left">
                <div className="text-sm font-medium text-foreground">WhatsApp</div>
                <div className="text-xs text-muted-foreground">+91 8766215705</div>
              </div>
            </Button>
          </a>

          <a href="https://instagram.com/cloudonfire_" target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="outline" className="w-full justify-start gap-3 h-12 border-pink-500/30 hover:bg-pink-500/10">
              <Instagram className="w-5 h-5 text-pink-500" />
              <div className="text-left">
                <div className="text-sm font-medium text-foreground">Follow on Instagram</div>
                <div className="text-xs text-muted-foreground">@cloudonfire_</div>
              </div>
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
