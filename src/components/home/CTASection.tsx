import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glow-card !rounded-3xl p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto text-center relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-6">
            <Rocket className="w-7 h-7 text-primary" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
            Ready to
            <span className="text-fire-gradient"> Start Hosting?</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto">
            Pre-orders are now available. Launch your server on April 15 and save 40% with coupon PREORDER40.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="https://shop.cloudonfire.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="btn-fire text-sm sm:text-base px-8 sm:px-10 w-full sm:w-auto h-12 sm:h-14">
                <span className="relative z-10 flex items-center gap-2">
                  Start Hosting
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </a>
            <Link to="/vps-plans" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="text-sm sm:text-base px-8 sm:px-10 border-border text-foreground hover:border-primary/40 hover:bg-primary/5 w-full sm:w-auto h-12 sm:h-14">
                View Plans
              </Button>
            </Link>
          </div>

          <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground">
            Launching 15th April 2026 • No credit card required • 24/7 support
          </p>

          {/* Internal links for SEO */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <Link to="/gaming-vps" className="hover:text-primary transition-colors">Gaming VPS →</Link>
            <Link to="/rdp" className="hover:text-primary transition-colors">Cloud RDP →</Link>
            <Link to="/ddos-protection" className="hover:text-primary transition-colors">DDoS Protection →</Link>
            <Link to="/why-us" className="hover:text-primary transition-colors">Why Cloud on Fire →</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
