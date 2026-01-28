import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Server, Play, Globe, Cpu, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingFeatures = [
  { icon: Shield, label: "DDoS Protected", delay: 0 },
  { icon: Cpu, label: "Dedicated CPU", delay: 0.1 },
  { icon: HardDrive, label: "NVMe Storage", delay: 0.2 },
  { icon: Globe, label: "India Optimized", delay: 0.3 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center section-padding overflow-hidden">
      {/* Multiple layered glow effects for depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[900px] h-[400px] sm:h-[500px] lg:h-[700px] bg-primary/8 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-fire-red/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-fire-yellow/5 rounded-full blur-[90px] pointer-events-none" />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      
      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-4 sm:mb-6">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                Enterprise-Grade DDoS Protection Included
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.1] mb-4 sm:mb-6"
            >
              High-Performance VPS
              <br />
              <span className="text-fire-gradient">Built for Stability.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed"
            >
              Deploy game servers, high-traffic applications, and real-time workloads 
              on infrastructure that never compromises. India's most reliable VPS hosting 
              starts at just <span className="text-primary font-semibold">₹299/month</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10"
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

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
                <span>&lt;1ms Latency</span>
              </div>
            </motion.div>
          </div>

          {/* Right visual - Server dashboard preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main dashboard card */}
            <div className="relative">
              <div className="glass-card p-6 rounded-2xl border-primary/20">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-fire-red flex items-center justify-center">
                      <Server className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Pro VPS Server</div>
                      <div className="text-xs text-muted-foreground">Mumbai, India</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-green-500 font-medium">Online</span>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="glass-card p-4 rounded-xl bg-secondary/30">
                    <div className="text-xs text-muted-foreground mb-1">CPU Usage</div>
                    <div className="text-xl font-bold text-foreground">23%</div>
                    <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-[23%] bg-gradient-to-r from-primary to-fire-red rounded-full" />
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-xl bg-secondary/30">
                    <div className="text-xs text-muted-foreground mb-1">Memory</div>
                    <div className="text-xl font-bold text-foreground">4.2 GB</div>
                    <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-[52%] bg-gradient-to-r from-primary to-fire-red rounded-full" />
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-xl bg-secondary/30">
                    <div className="text-xs text-muted-foreground mb-1">Storage</div>
                    <div className="text-xl font-bold text-foreground">45 GB</div>
                    <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-[45%] bg-gradient-to-r from-primary to-fire-red rounded-full" />
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-xl bg-secondary/30">
                    <div className="text-xs text-muted-foreground mb-1">Network</div>
                    <div className="text-xl font-bold text-foreground">1.2 Gbps</div>
                    <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-[12%] bg-gradient-to-r from-primary to-fire-red rounded-full" />
                    </div>
                  </div>
                </div>

                {/* DDoS Status */}
                <div className="glass-card p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm font-medium text-foreground">DDoS Protection Active</div>
                        <div className="text-xs text-muted-foreground">0 attacks mitigated today</div>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-green-500/20 text-green-500 text-xs font-medium rounded-full">
                      Protected
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating feature cards */}
              {floatingFeatures.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + feature.delay }}
                  className={`absolute glass-card px-3 py-2 rounded-lg flex items-center gap-2 ${
                    index === 0 ? "-left-4 top-16" :
                    index === 1 ? "-right-4 top-24" :
                    index === 2 ? "-left-8 bottom-24" :
                    "-right-6 bottom-16"
                  }`}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-foreground whitespace-nowrap">{feature.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats bar - visible on all screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="glass-card p-4 sm:p-6 rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {[
                { value: "99.9%", label: "Uptime SLA", sublabel: "Enterprise reliability" },
                { value: "₹299", label: "Starting Price", sublabel: "No hidden fees" },
                { value: "<1ms", label: "Network Latency", sublabel: "India optimized" },
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
