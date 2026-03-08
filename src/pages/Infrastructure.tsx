import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cpu, HardDrive, Network, Shield, Server, ArrowRight, Building2, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import WorldMap from "@/components/infrastructure/WorldMap";

const specs = [
  {
    icon: Cpu,
    title: "Enterprise Processors",
    description: "Intel Xeon Platinum 8168 processors with 24 cores, turbo up to 3.7GHz — optimized for gaming and real-time applications.",
    details: ["Intel® Xeon® Platinum 8168", "24 Cores / 48 Threads", "Turbo up to 3.7GHz", "33MB L3 Cache"],
  },
  {
    icon: HardDrive,
    title: "NVMe Gen4 Storage",
    description: "Enterprise-grade NVMe Gen4 SSDs delivering sustained read/write performance with RAID protection for data integrity.",
    details: ["Samsung PM9A3 drives", "Up to 7GB/s read speeds", "RAID 10 configuration", "Daily backups available"],
  },
  {
    icon: Network,
    title: "Premium Network",
    description: "Multiple Tier-1 transit providers with BGP-optimized routing for the lowest possible latency across India.",
    details: ["10Gbps+ uplinks", "Multiple peering points", "BGP optimized routing", "Redundant connectivity"],
  },
  {
    icon: Shield,
    title: "Security Infrastructure",
    description: "Multi-layer security from hardware firewalls to application-level protection, including always-on DDoS mitigation.",
    details: ["Juniper hardware firewalls", "1Tbps DDoS mitigation", "Network segmentation", "24/7 NOC monitoring"],
  },
];

const yottaFeatures = [
  "Tier-3+ certified facility",
  "N+1 power redundancy",
  "UPS and diesel backup generators",
  "Precision cooling systems",
  "24/7 on-site security personnel",
  "Biometric + RFID access control",
  "FM-200 fire suppression",
  "Environmental monitoring sensors",
  "Seismic zone protection",
  "99.995% facility uptime",
];

export default function Infrastructure() {
  return (
    <>
      <SEOHead
        seoPrefix="infrastructure"
        title="VPS Infrastructure India – Yotta Tier-3+ Data Centers Delhi & Mumbai | Cloud on Fire"
        description="Cloud on Fire operates from Yotta's Tier-3+ certified data centers in Delhi & Mumbai. Intel Xeon Platinum 8168 processors, NVMe Gen4 storage, 10Gbps+ network, 1Tbps DDoS scrubbing. Best VPS infrastructure in India."
        keywords="Yotta data center India, VPS infrastructure India, Intel Platinum VPS, NVMe Gen4 VPS, Delhi data center, Mumbai data center, Tier 3 data center India, enterprise VPS hardware, best VPS infrastructure"
        canonical="/infrastructure"
      />
      <Layout>
        {/* Hero */}
        <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center section-padding overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="container-wide relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-4 sm:mb-8">
                  <Server className="w-3 h-3 sm:w-4 sm:h-4" />
                  Enterprise Infrastructure
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-4 sm:mb-6">
                Powered by <span className="text-fire-gradient">Yotta Data Centers</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Our infrastructure runs on India's most advanced data centers — Yotta's Tier-3+ certified facilities in Delhi and Mumbai with enterprise-grade hardware at every level.
              </motion.p>
            </div>
          </div>
        </section>

        {/* World Map */}
        <section className="section-padding bg-card/60">
          <div className="container-wide">
            <SectionHeader
              badge="Data Center Locations"
              title="Delhi & Mumbai — Connected Infrastructure"
              description="Strategic dual-location deployment ensures low latency across India with automatic failover capabilities."
            />
            <div className="max-w-5xl mx-auto">
              <WorldMap />
            </div>
          </div>
        </section>

        {/* Hardware Specs */}
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeader badge="Hardware" title="Enterprise-Grade Components" description="Every server is built with reliability and raw performance in mind." />
            <div className="grid md:grid-cols-2 gap-6">
              {specs.map((spec, index) => (
                <motion.div key={spec.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }} className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <spec.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{spec.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{spec.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {spec.details.map((detail) => (
                          <span key={detail} className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">{detail}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Yotta Data Center */}
        <section className="section-padding bg-card/60">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full mb-4">
                  <Building2 className="w-3 h-3" />
                  Yotta Data Centers
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                  India's Most Advanced
                  <br />
                  <span className="text-fire-gradient">Data Center Facilities</span>
                </h2>
                <p className="text-muted-foreground mb-4">
                  All Cloud on Fire servers are housed in Yotta's world-class data centers — 
                  India's largest and most advanced data center provider. Yotta facilities are 
                  built to Uptime Institute Tier-3+ standards with multi-layer redundancy.
                </p>
                <p className="text-muted-foreground mb-8">
                  With locations in Delhi NCR and Mumbai, we ensure pan-India low-latency coverage 
                  with redundant connectivity and automatic failover capabilities.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {yottaFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="relative">
                <div className="glass-card p-5 sm:p-8 aspect-auto sm:aspect-square flex flex-col justify-center">
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                            <div className="w-2 h-2 rounded-full bg-primary/30" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="h-2 bg-border/50 rounded-full w-3/4" />
                          <div className="h-2 bg-border/30 rounded-full w-1/2" />
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(8)].map((_, j) => (
                            <div key={j} className="w-0.5 h-8 rounded-full bg-primary/30" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <span className="text-sm text-muted-foreground">Yotta Server Rack — Live Status</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-wide text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Deploy on <span className="text-fire-gradient">Premium Infrastructure?</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Get your VPS running on Yotta data centers with enterprise hardware and DDoS protection.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/pro-vps">
                  <Button size="lg" className="btn-fire">
                    <span className="relative z-10 flex items-center gap-2">Explore Pro VPS<ArrowRight className="w-4 h-4" /></span>
                  </Button>
                </Link>
                <Link to="/budget-vps">
                  <Button size="lg" variant="outline">View Budget VPS</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
