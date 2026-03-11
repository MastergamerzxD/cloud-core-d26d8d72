import { ExternalLink, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function PreOrderBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto mb-10 p-5 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-sm text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <Tag className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Pre-Order Available</span>
      </div>
      <p className="text-sm sm:text-base text-foreground font-medium mb-1">
        Pre-orders now available — launch your server on April 15 and save 40% with coupon{" "}
        <span className="font-black text-primary tracking-wide">PREORDER40</span>.
      </p>
      <a href="https://shop.cloudonfire.com" target="_blank" rel="noopener noreferrer">
        <Button size="sm" className="btn-fire mt-3">
          <span className="relative z-10 flex items-center gap-2">
            Pre-Order Now
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </Button>
      </a>
    </motion.div>
  );
}
