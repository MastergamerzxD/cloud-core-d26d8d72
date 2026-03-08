import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Zap, Server, Clock, Check, ArrowRight, Flame, Cpu } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/ui/PricingCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLaunchPopup } from "@/hooks/useLaunchPopup";

const features = [
  {
    icon: Shield,
    title: "Never Suspended Under DDoS",
    description: "Our premium DDoS mitigation ensures your VPS stays online during attacks. Zero suspension policy for Pro VPS customers.",
  },
  {
    icon: Zap,
    title: "Dedicated Performance",
    description: "Isolated CPU cores and RAM allocation. Your resources are never shared with other customers.",
  },
  {
    icon: Cpu,
    title: "Intel Xeon Platinum 8168",
    description: "Enterprise-grade Intel Platinum 8168 processors with 24 cores, 3.7GHz turbo — delivering exceptional single-thread and multi-thread performance for gaming and real-time workloads.",
  },
  {
    icon: Clock,
    title: "Instant Deployment",
    description: "Your VPS is provisioned within minutes. Start deploying your workloads immediately.",
  },
];

const useCases = [
  "Minecraft Servers",
  "FiveM / GTA RP Servers",
  "CS2 / Valorant Servers",
  "High-Traffic Web Apps",
  "Real-Time Applications",
  "Trading Bots",
  "Streaming Services",
  "API Backends",
];

const plans = [
  {
    name: "Pro Starter",
    price: "₹299",
    description: "Entry-level gaming VPS",
    type: "pro" as const,
    features: [
      "2 vCPU Cores (Dedicated)",
      "4 GB DDR4 ECC RAM",
      "50 GB NVMe Storage",
      "Unlimited Bandwidth",
      "Premium DDoS Protection",
      "Never Suspended",
      "1 IPv4 Address",
    ],
  },
  {
    name: "Pro Performance",
    price: "₹599",
    description: "Most popular choice",
    type: "pro" as const,
    popular: true,
    features: [
      "4 vCPU Cores (Dedicated)",
      "8 GB DDR4 ECC RAM",
      "100 GB NVMe Storage",
      "Unlimited Bandwidth",
      "Premium DDoS Protection",
      "Never Suspended",
      "1 IPv4 Address",
      "Priority Support",
    ],
  },
  {
    name: "Pro Ultimate",
    price: "₹999",
    description: "Maximum performance",
    type: "pro" as const,
    features: [
      "8 vCPU Cores (Dedicated)",
      "16 GB DDR4 ECC RAM",
      "200 GB NVMe Storage",
      "Unlimited Bandwidth",
      "Premium DDoS Protection",
      "Never Suspended",
      "2 IPv4 Addresses",
      "Priority Support",
      "Weekly Backups",
    ],
  },
];

export default function ProVPS() {
  const { openPopup } = useLaunchPopup();
  return (
    <>
      <SEOHead
        seoPrefix="pro_vps"
        title="Pro VPS India – Best Gaming VPS Server Hosting | From ₹299/mo | Cloud on Fire"
        description="Best gaming VPS in India from ₹299/month. Intel Xeon Platinum 8168 processors, dedicated CPU cores, premium DDoS protection (never suspended), NVMe Gen4 storage. Perfect for Minecraft, FiveM, CS2, GTA V, Rust servers. Cloud on Fire Pro VPS."
        keywords="best gaming VPS India, pro VPS hosting, Minecraft server hosting India, FiveM server India, CS2 server hosting, GTA V server, dedicated VPS India, game server hosting India, high performance VPS, Cloud on Fire Pro VPS, best game hosting company India, Rust server India, Intel Platinum VPS"
        canonical="/pro-vps"
        ogType="product"
      />
      <Layout>
        {/* Hero - Fire Theme */}
        <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center section-padding overflow-hidden">
          {/* Fire-themed glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] sm:w-[700px] h-[300px] sm:h-[500px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-fire-red/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/3 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-fire-yellow/8 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="container-wide relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-4 sm:mb-8">
                  <Flame className="w-3 h-3 sm:w-4 sm:h-4" />
                  Professional-Grade VPS
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-4 sm:mb-6"
              >
                Pro VPS
                <br />
                <span className="text-fire-gradient">Built for Performance 🔥</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-10"
              >
                High-performance VPS powered by Intel Xeon Platinum 8168 processors with dedicated resources, 
                premium DDoS protection, and a zero-suspension policy. Engineered for gaming servers, 
                high-traffic applications, and mission-critical workloads.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              >
                <Button size="lg" className="btn-fire text-sm sm:text-base px-6 sm:px-8 w-full sm:w-auto h-11 sm:h-12" onClick={openPopup}>
                  <span className="relative z-10 flex items-center gap-2">
                    View Plans
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
                <Link to="/compare" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="text-sm sm:text-base px-6 sm:px-8 w-full sm:w-auto h-11 sm:h-12 border-primary/30 hover:border-primary/50 hover:bg-primary/5">
                    Compare with Budget VPS
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Intel Processor Section - Fire Themed */}
        <section className="py-8 sm:py-12">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 sm:p-8 border border-primary/30 fire-glow"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-fire flex items-center justify-center shrink-0">
                  <Cpu className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg sm:text-xl mb-2">
                    Intel® Xeon® Platinum 8168 — <span className="text-fire-gradient">The Heart of Pro VPS</span>
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    The Intel Xeon Platinum 8168 is a server-class powerhouse with 24 cores, 48 threads, and a 
                    turbo clock of 3.7GHz. Its massive 33MB L3 cache and 6-channel DDR4 memory support make it 
                    ideal for gaming servers like Minecraft, FiveM, CS2, and Rust — where single-thread performance 
                    and low latency are critical. This processor also excels at high-traffic web applications, 
                    real-time APIs, streaming, and database-heavy workloads.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "24 Cores", sublabel: "48 Threads" },
                      { label: "3.7 GHz", sublabel: "Turbo Boost" },
                      { label: "33 MB", sublabel: "L3 Cache" },
                      { label: "Dedicated", sublabel: "CPU Cores" },
                    ].map((spec) => (
                      <div key={spec.label} className="text-center bg-primary/10 border border-primary/20 rounded-lg p-2 sm:p-3">
                        <div className="text-sm sm:text-base font-bold text-fire-gradient">{spec.label}</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground">{spec.sublabel}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-card/60">
          <div className="container-wide">
            <SectionHeader
              badge="🔥 Pro Features"
              title="Why Choose Pro VPS?"
              description="Built for demanding workloads that require consistent, high-performance infrastructure."
            />

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 border-primary/10 hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full mb-4">
                  Optimized For
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                  Perfect for Gaming &
                  <br />
                  <span className="text-fire-gradient">High-Performance Workloads 🔥</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Pro VPS is specifically engineered with Intel Platinum 8168 processors for applications 
                  that demand consistent low-latency performance and cannot afford downtime during attacks. 
                  Whether it's a 100-player Minecraft server or a high-traffic SaaS app, Pro VPS delivers.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {useCases.map((useCase) => (
                    <div key={useCase} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{useCase}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 border-primary/20"
              >
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-fire-gradient mb-2">99.99%</div>
                  <div className="text-muted-foreground">Uptime for Pro VPS</div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <span className="text-muted-foreground">Processor</span>
                    <span className="font-semibold text-primary">Intel Platinum 8168</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <span className="text-muted-foreground">Avg. Response Time</span>
                    <span className="font-semibold text-foreground">&lt;1ms</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <span className="text-muted-foreground">DDoS Mitigation</span>
                    <span className="font-semibold text-foreground">Up to 1Tbps</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Suspension Policy</span>
                    <span className="font-semibold text-primary">Never 🔥</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-padding bg-card/60">
          <div className="container-wide">
            <SectionHeader
              badge="🔥 Pricing"
              title="Pro VPS Plans"
              description="All plans include Intel Platinum 8168, premium DDoS protection, and dedicated resources."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <PricingCard key={plan.name} {...plan} index={index} />
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Need more resources? <Link to="/contact" className="text-primary hover:underline">Contact us</Link> for custom plans.
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
}
