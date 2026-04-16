import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Cpu, HardDrive, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLaunchPopup } from "@/hooks/useLaunchPopup";
import logoBannerDark from "@/assets/logo-banner-dark.png";

const rotatingTexts = [
  "High-Performance VPS",
  "The VPS Hosting Revolution Is Here",
  "Made by Developers, for Developers",
  "Made by Gamers, for Gamers",
  "Made by People, for the People",
  "Enterprise-Grade Infrastructure",
];

const featureBadges = [
  { icon: Cpu, label: "Intel Xeon Platinum", color: "neon-blue" },
  { icon: HardDrive, label: "NVMe Gen4 SSD", color: "neon-cyan" },
  { icon: Shield, label: "DDoS Protection", color: "primary" },
  { icon: Rocket, label: "Instant Deployment", color: "primary" },
];

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const { openPopup } = useLaunchPopup();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  // Memoize particles - fewer on mobile
  const particles = useMemo(() => 
    [...Array(isMobile ? 4 : 12)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    })), []
  );

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center section-padding overflow-hidden">
      {/* Animated network grid */}
      <div className="absolute inset-0 network-grid-bg opacity-30" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] lg:w-[1000px] h-[400px] sm:h-[600px] lg:h-[800px] bg-primary/6 rounded-full blur-[120px] sm:blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-neon-purple/4 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating particles - reduced count */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <a href="https://shop.cloudonfire.com" target="_blank" rel="noopener noreferrer" className="inline-block">
                <span className="glow-badge-fire text-xs sm:text-sm mb-2 sm:mb-3 cursor-pointer hover:scale-105 transition-transform">
                  <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
                  🔥 We Are Live — Deploy Your Server Now
                </span>
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
              <span className="glow-badge text-xs sm:text-sm mb-4 sm:mb-6">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                Enterprise-Grade DDoS Protection Included
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mb-4 sm:mb-6">
              <div className="min-h-[3.5em] sm:min-h-[2.8em] md:min-h-[2.8em] flex items-end mb-2 sm:mb-3">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentTextIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-fire-gradient leading-[1.15]"
                  >
                    {rotatingTexts[currentTextIndex]}
                  </motion.h1>
                </AnimatePresence>
              </div>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.15]">
                Built for Stability.
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-3 leading-relaxed"
            >
              Deploy <Link to="/gaming-vps" className="text-primary hover:underline font-medium">game servers</Link>, high-traffic applications, and real-time workloads 
              on infrastructure that never compromises. India's most reliable <Link to="/vps-plans" className="text-primary hover:underline font-medium">VPS hosting</Link> starts at just <span className="text-primary font-semibold">₹199/month</span>.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10"
            >
              <a href="https://shop.cloudonfire.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="btn-fire text-sm sm:text-base px-6 sm:px-8 w-full sm:w-auto h-11 sm:h-12">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </a>
              <Link to="/vps-plans" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="text-sm sm:text-base px-6 sm:px-8 border-neon-blue/30 text-neon-blue hover:border-neon-blue/60 hover:bg-neon-blue/5 w-full sm:w-auto h-11 sm:h-12">
                  Explore Plans
                </Button>
              </Link>
            </motion.div>

            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              {featureBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="glow-card px-3 py-2 flex items-center gap-2 !rounded-lg"
                >
                  <badge.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-foreground/80">{badge.label}</span>
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
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-[60px] pointer-events-none" />
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

        {/* Stats bar card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="glow-card p-4 sm:p-6 !rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {[
                { value: "99.9%", label: "Uptime SLA", sublabel: "Enterprise reliability" },
                { value: "₹199", label: "Starting Price", sublabel: "No hidden fees" },
                { value: "Live", label: "Status", sublabel: "Servers deploying now" },
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
