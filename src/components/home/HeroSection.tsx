import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Server, Headphones, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoBannerDark from "@/assets/logo-banner-dark.png";

const trustIndicators = [
  { icon: Zap, label: "Instant Deployment" },
  { icon: Shield, label: "DDoS Protected" },
  { icon: Server, label: "India Servers" },
  { icon: Headphones, label: "24/7 Support" },
];

export default function HeroSection() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const particles = useMemo(() =>
    [...Array(isMobile ? 3 : 8)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    })), []
  );

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center section-padding overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 network-grid-bg opacity-20" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] lg:w-[900px] h-[400px] sm:h-[500px] lg:h-[700px] bg-primary/5 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 rounded-full bg-primary/25"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -25, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Pre-order badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <a href="https://shop.cloudonfire.com" target="_blank" rel="noopener noreferrer" className="inline-block">
                <span className="glow-badge-fire text-xs sm:text-sm mb-4 sm:mb-5 cursor-pointer hover:scale-105 transition-transform">
                  <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
                  🔥 Pre-Orders Live — 40% OFF with PREORDER40
                </span>
              </a>
            </motion.div>

            {/* Main headline */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-4 sm:mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.15] mb-2 sm:mb-3">
                Affordable VPS Hosting
                <br />
                <span className="text-fire-gradient">in India ⚡</span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-3 leading-relaxed"
            >
              High-performance <Link to="/vps-plans" className="text-primary hover:underline font-medium">VPS servers</Link> starting at <span className="text-primary font-semibold">₹199/month</span>. Fast, secure, and reliable hosting for websites, apps, and <Link to="/gaming-vps" className="text-primary hover:underline font-medium">game servers</Link>.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm text-primary font-medium max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8"
            >
              Servers launch April 15. Save 40% with coupon <span className="font-black tracking-wide">PREORDER40</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10"
            >
              <a href="https://shop.cloudonfire.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="btn-fire text-sm sm:text-base px-6 sm:px-8 w-full sm:w-auto h-11 sm:h-12">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Hosting
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </a>
              <Link to="/vps-plans" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="text-sm sm:text-base px-6 sm:px-8 border-border text-foreground hover:border-primary/40 hover:bg-primary/5 w-full sm:w-auto h-11 sm:h-12">
                  View Plans
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6"
            >
              {trustIndicators.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm text-muted-foreground font-medium">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Logo visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/8 rounded-3xl blur-[60px] pointer-events-none" />
              <img
                src={logoBannerDark}
                alt="Cloud on Fire — high performance VPS hosting platform India"
                className="relative w-full max-w-lg rounded-2xl"
                width={512}
                height={512}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="glow-card p-4 sm:p-6 !rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {[
                { value: "99.9%", label: "Uptime SLA", sublabel: "Enterprise reliability" },
                { value: "₹199", label: "Starting Price", sublabel: "No hidden fees" },
                { value: "Apr '26", label: "Launch Date", sublabel: "Pre-orders live" },
                { value: "24/7", label: "Expert Support", sublabel: "Always available" },
              ].map((stat, index) => (
                <div key={index} className="text-center relative">
                  {index > 0 && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border/50 hidden md:block" />
                  )}
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-fire-gradient">{stat.value}</div>
                  <div className="text-xs sm:text-sm font-medium text-foreground mt-1">{stat.label}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 hidden sm:block">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
