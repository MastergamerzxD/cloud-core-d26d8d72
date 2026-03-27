import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLaunchPopup } from "@/hooks/useLaunchPopup";

export default function CTASection() {
  const { openPopup } = useLaunchPopup();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-wide relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glow-card glow-card-popular !rounded-3xl p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto text-center relative overflow-hidden"
        >
          {/* Animated glow ring */}
          <div className="absolute inset-0 rounded-3xl animate-glow-pulse pointer-events-none" />

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-6"
          >
            <Rocket className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
            Launch Your Server
            <br />
            <span className="text-fire-gradient">in Seconds</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto">
            Join hundreds of developers and businesses who trust Cloud on Fire for 
            their mission-critical workloads.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button size="lg" className="btn-fire text-sm sm:text-base px-8 sm:px-10 w-full sm:w-auto h-12 sm:h-14" onClick={openPopup}>
              <span className="relative z-10 flex items-center gap-2">
                Deploy Server
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
            <Link to="/vps-plans" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="text-sm sm:text-base px-8 sm:px-10 border-neon-blue/30 text-neon-blue hover:border-neon-blue/60 hover:bg-neon-blue/5 w-full sm:w-auto h-12 sm:h-14">
                View Plans
              </Button>
            </Link>
          </div>

          <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground">
            Launching 15th April 2026 • No credit card required • 24/7 support
          </p>

          {/* Internal links for SEO */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <Link to="/gaming-vps" className="hover:text-primary transition-colors">Gaming VPS hosting →</Link>
            <Link to="/rdp" className="hover:text-primary transition-colors">Cloud RDP servers →</Link>
            <Link to="/ddos-protection" className="hover:text-primary transition-colors">DDoS protection →</Link>
            <Link to="/why-us" className="hover:text-primary transition-colors">Why Cloud on Fire →</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
