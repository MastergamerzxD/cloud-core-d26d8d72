import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Server, Globe, Cpu, HardDrive, Rocket } from "lucide-react";
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

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const { openPopup } = useLaunchPopup();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center section-padding overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[900px] h-[400px] sm:h-[500px] lg:h-[700px] bg-primary/8 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-fire-red/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-fire-yellow/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      
      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-2 sm:mb-3">
                <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
                Launching 15th April 2026
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-4 sm:mb-6">
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
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed"
            >
              Deploy game servers, high-traffic applications, and real-time workloads 
              on infrastructure that never compromises. India's most reliable VPS hosting 
              starts at just <span className="text-primary font-semibold">₹199/month</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10"
            >
              <Link to="/vps-plans" className="w-full sm:w-auto">
                <Button size="lg" className="btn-fire text-sm sm:text-base px-6 sm:px-8 w-full sm:w-auto h-11 sm:h-12">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore VPS Plans
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
              <Link to="/gaming-vps" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="text-sm sm:text-base px-6 sm:px-8 border-border/50 hover:border-primary/50 hover:bg-primary/5 w-full sm:w-auto h-11 sm:h-12">
                  Gaming VPS
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span>DDoS Protected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span>NVMe Storage</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-[60px] pointer-events-none" />
              <motion.img
                src={logoBannerDark}
                alt="Cloud on Fire"
                className="relative w-full max-w-lg rounded-2xl"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="glass-card p-4 sm:p-6 rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {[
                { value: "99.9%", label: "Uptime SLA", sublabel: "Enterprise reliability" },
                { value: "₹199", label: "Starting Price", sublabel: "No hidden fees" },
                { value: "Apr '26", label: "Launch Date", sublabel: "Coming soon" },
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
