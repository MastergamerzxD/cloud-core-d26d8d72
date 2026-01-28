import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center section-padding overflow-hidden">
      {/* Hero glow effect - smaller on mobile */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[800px] h-[300px] sm:h-[400px] lg:h-[600px] bg-primary/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      
      <div className="container-wide relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-4 sm:mb-8">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Enterprise-Grade</span> DDoS Protection
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] mb-4 sm:mb-6"
          >
            High-Performance VPS.
            <br />
            <span className="text-fire-gradient">Built for Stability.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2"
          >
            Deploy game servers, high-traffic applications, and real-time workloads 
            on infrastructure that never compromises. India's most reliable VPS hosting 
            starts at just ₹299/month.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link to="/pro-vps" className="w-full sm:w-auto">
              <Button size="lg" className="btn-fire text-sm sm:text-base px-6 sm:px-8 w-full sm:w-auto h-11 sm:h-12">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Pro VPS
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>
            <Link to="/budget-vps" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="text-sm sm:text-base px-6 sm:px-8 border-border/50 hover:border-primary/50 hover:bg-primary/5 w-full sm:w-auto h-11 sm:h-12">
                View Budget VPS
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto"
          >
            {[
              { value: "99.9%", label: "Uptime SLA" },
              { value: "₹299", label: "Starting Price" },
              { value: "<1ms", label: "Network Latency" },
              { value: "24/7", label: "Expert Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-3 sm:p-0">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-fire-gradient">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating elements - hidden on mobile/tablet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute -left-20 top-1/3 hidden xl:block"
        >
          <div className="glass-card p-4 animate-float">
            <Zap className="w-8 h-8 text-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute -right-10 top-1/2 hidden xl:block"
        >
          <div className="glass-card p-4 animate-float" style={{ animationDelay: "2s" }}>
            <Server className="w-8 h-8 text-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
