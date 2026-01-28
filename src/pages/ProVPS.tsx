import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Zap, Server, Clock, Check, ArrowRight, Flame } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/ui/PricingCard";
import SectionHeader from "@/components/ui/SectionHeader";

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
    icon: Server,
    title: "NVMe Storage",
    description: "Enterprise-grade NVMe SSDs with sustained read/write speeds for demanding applications.",
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
  return (
    <>
      <Helmet>
        <title>Pro VPS India - Gaming VPS Server Hosting | From ₹299/mo | Cloud on Fire</title>
        <meta 
          name="description" 
          content="Pro VPS for gaming servers and high-traffic apps in India. Dedicated CPU cores, premium DDoS protection, never suspended under attacks. Minecraft, FiveM, CS2 servers from ₹299/month." 
        />
        <meta name="keywords" content="gaming VPS India, pro VPS, Minecraft server hosting India, FiveM server, dedicated VPS, game server hosting, CS2 server, Valorant server, high performance VPS" />
        <link rel="canonical" href="https://cloudonfire.in/pro-vps" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://cloudonfire.in/pro-vps" />
        <meta property="og:title" content="Pro VPS India - Gaming VPS Server Hosting | Cloud on Fire" />
        <meta property="og:description" content="Gaming VPS with dedicated resources and premium DDoS protection. Never suspended under attacks. From ₹299/month." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pro VPS - Gaming VPS India | Cloud on Fire" />
        <meta name="twitter:description" content="Dedicated gaming VPS with premium DDoS protection from ₹299/month." />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center section-padding overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container-wide relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-8">
                  <Flame className="w-4 h-4" />
                  Professional-Grade VPS
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6"
              >
                Pro VPS
                <br />
                <span className="text-fire-gradient">Built for Performance</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
              >
                High-performance VPS with dedicated resources, premium DDoS protection, 
                and a zero-suspension policy. Engineered for gaming servers, high-traffic 
                applications, and mission-critical workloads.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button size="lg" className="btn-fire text-base px-8">
                  <span className="relative z-10 flex items-center gap-2">
                    View Plans
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
                <Link to="/compare">
                  <Button size="lg" variant="outline" className="text-base px-8">
                    Compare with Budget VPS
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-card/30">
          <div className="container-wide">
            <SectionHeader
              badge="Pro Features"
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
                  className="glass-card p-6"
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
                  <span className="text-fire-gradient">High-Performance Workloads</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Pro VPS is specifically engineered for applications that demand consistent 
                  low-latency performance and cannot afford downtime during attacks.
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
                className="glass-card p-8"
              >
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-fire-gradient mb-2">99.99%</div>
                  <div className="text-muted-foreground">Uptime for Pro VPS</div>
                </div>
                <div className="space-y-4">
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
                    <span className="font-semibold text-primary">Never</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-padding bg-card/30">
          <div className="container-wide">
            <SectionHeader
              badge="Pricing"
              title="Pro VPS Plans"
              description="All plans include premium DDoS protection and dedicated resources."
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
