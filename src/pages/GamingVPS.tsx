import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import PricingCard from "@/components/ui/PricingCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cpu, HardDrive, Shield, Zap, Lock, Wifi, Gamepad2, Play, Layers, Globe,
} from "lucide-react";
import { useLaunchPopup } from "@/hooks/useLaunchPopup";

const gamingPlans = [
  {
    name: "Gamer Start",
    price: "₹299",
    description: "Entry-level game hosting",
    type: "pro" as const,
    features: [
      "2 vCPU Cores",
      "4 GB DDR4 RAM",
      "30 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Gaming Support",
    ],
  },
  {
    name: "Gamer Plus",
    price: "₹499",
    description: "Popular for small servers",
    type: "pro" as const,
    popular: true,
    features: [
      "4 vCPU Cores",
      "6 GB DDR4 RAM",
      "60 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Gaming Support",
    ],
  },
  {
    name: "Gamer Pro",
    price: "₹799",
    description: "For modded servers",
    type: "pro" as const,
    features: [
      "6 vCPU Cores",
      "12 GB DDR4 RAM",
      "100 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Gaming Support",
    ],
  },
  {
    name: "Gamer Elite",
    price: "₹999",
    description: "Large player counts",
    type: "pro" as const,
    features: [
      "8 vCPU Cores",
      "20 GB DDR4 RAM",
      "150 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Priority Gaming Support",
    ],
  },
  {
    name: "Gamer Ultimate",
    price: "₹1,399",
    description: "Community networks",
    type: "pro" as const,
    features: [
      "10 vCPU Cores",
      "32 GB DDR4 RAM",
      "150 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Priority Gaming Support",
    ],
  },
  {
    name: "Gamer Enterprise",
    price: "₹1,999",
    description: "Maximum gaming power",
    type: "pro" as const,
    features: [
      "20 vCPU Cores",
      "64 GB DDR4 RAM",
      "200 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Priority Gaming Support",
    ],
  },
];

const gameTypes = [
  { icon: Gamepad2, label: "Minecraft Servers" },
  { icon: Play, label: "FiveM / GTA RP" },
  { icon: Layers, label: "Hytale Servers" },
  { icon: Zap, label: "Modded Multiplayer Games" },
  { icon: Globe, label: "Community Gaming Networks" },
];

export default function GamingVPS() {
  const { openPopup } = useLaunchPopup();

  return (
    <>
      <SEOHead
        title="Gaming VPS India - Minecraft, FiveM Server Hosting from ₹199/mo | Cloud on Fire"
        description="Gaming VPS built for multiplayer performance. Host Minecraft, FiveM, GTA RP servers on Intel Xeon Platinum 8168 with advanced DDoS protection. Starting ₹199/month."
        keywords="gaming VPS India, Minecraft server hosting, FiveM server, GTA RP hosting, game server India, multiplayer VPS"
        canonical="/gaming-vps"
        ogType="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Cloud on Fire Gaming VPS",
          "description": "Gaming VPS optimized for multiplayer game servers with advanced DDoS protection",
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": "199",
            "highPrice": "1899",
            "offerCount": "6",
            "availability": "https://schema.org/InStock"
          }
        }}
      />
      <Layout>
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="container-wide relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-10"
            >
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full mb-4">
                Gaming VPS
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
                Gaming VPS
                <br />
                <span className="text-fire-gradient">Built for Multiplayer Performance</span>
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground mb-6">
                Gaming VPS nodes are optimized specifically for hosting multiplayer game servers 
                and real-time gaming environments.
              </p>

              {/* Game types */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {gameTypes.map((g) => (
                  <div key={g.label} className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-xs sm:text-sm font-medium text-primary">
                    <g.icon className="w-4 h-4" />
                    <span>{g.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Processor Highlight */}
        <section className="pb-12 sm:pb-16">
          <div className="container-wide max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 sm:p-8 border-primary/30 bg-primary/5"
            >
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-orange-500/30 flex items-center justify-center">
                    <Cpu className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    Gaming Infrastructure — Intel Xeon Platinum
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    Powered by Intel Xeon Platinum 8168 processors, delivering strong single-core performance essential for game server workloads and large player counts.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground mb-4">
                    {[
                      "24 physical cores per processor",
                      "48 threads with hyper-threading",
                      "Base clock 2.7 GHz with turbo boost",
                      "High-density virtualization environments",
                      "Enterprise hardware used in global datacenters",
                    ].map((spec) => (
                      <div key={spec} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground italic border-l-2 border-primary/50 pl-3">
                    "With powerful Xeon Platinum infrastructure, Cloud on Fire Gaming VPS can handle large player bases, complex plugins, and modded environments without lag or instability."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* DDoS Protection */}
        <section className="pb-12 sm:pb-16">
          <div className="container-wide max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 sm:p-8 border-primary/30 bg-gradient-to-br from-primary/5 to-orange-500/5"
            >
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-red-500/30 flex items-center justify-center">
                    <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    Advanced DDoS Protection
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    Gaming servers are frequent targets of attacks. Cloud on Fire includes advanced network-level protection designed to keep servers online even during malicious traffic events.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground mb-4">
                    {[
                      { icon: Zap, label: "Automatic attack detection" },
                      { icon: Lock, label: "Real-time mitigation" },
                      { icon: Wifi, label: "High capacity network filtering" },
                      { icon: Shield, label: "Protection against volumetric attacks" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <item.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground italic border-l-2 border-primary/50 pl-3">
                    "Our infrastructure continuously monitors incoming traffic to filter malicious packets and maintain server availability."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Plans */}
        <section className="section-padding bg-gradient-to-b from-primary/5 via-card/60 to-card/60">
          <div className="container-wide">
            <SectionHeader
              badge="Gaming Plans"
              title="Choose Your Gaming VPS"
              description="All gaming plans include advanced DDoS protection and gaming-optimized support."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {gamingPlans.map((plan, index) => (
                <PricingCard key={plan.name} {...plan} index={index} />
              ))}
            </div>
            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-8 italic">
              Gaming VPS pricing is currently identical to VPS Plans and may change in future revisions.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-wide text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to Launch Your Game Server?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm sm:text-base">
              Deploy a high-performance gaming VPS in minutes. Built for Minecraft, FiveM, and more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button className="btn-fire w-full sm:w-auto" size="lg" onClick={openPopup}>
                <span className="relative z-10">Get Started</span>
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
