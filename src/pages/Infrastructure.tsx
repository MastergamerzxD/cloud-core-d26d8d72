import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cpu, HardDrive, Network, Shield, Server, ArrowRight, Building2, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import WorldMap from "@/components/infrastructure/WorldMap";
import InfraTransparencyCards from "@/components/infrastructure/InfraTransparencyCards";
import InfraArchitectureDiagram from "@/components/infrastructure/InfraArchitectureDiagram";
import LatencyTestTool from "@/components/tools/LatencyTestTool";

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
        title="Cloud Infrastructure | Enterprise Hardware & Network | Cloud on Fire"
        description="Explore the infrastructure behind Cloud on Fire including enterprise processors, NVMe storage, and advanced network architecture."
        keywords="VPS infrastructure India, Yotta data center, Intel Xeon VPS, NVMe Gen4 VPS, Delhi data center, enterprise VPS hardware"
        canonical="/infrastructure"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Cloud on Fire Infrastructure",
            url: "https://cloudonfire.com/infrastructure",
            description: "Enterprise-grade VPS infrastructure powered by Yotta Tier-3+ data centers in Delhi and Mumbai with Intel Xeon Platinum processors and NVMe Gen4 storage.",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://cloudonfire.com/" },
              { "@type": "ListItem", position: 2, name: "Infrastructure", item: "https://cloudonfire.com/infrastructure" },
            ],
          },
        ]}
      />
      <Layout>
        {/* Hero */}
        <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center section-padding overflow-hidden">
          <div className="absolute inset-0 network-grid-bg opacity-30 pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />

          <div className="container-wide relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="glow-badge mb-6 inline-flex">
                  <Server className="w-3.5 h-3.5" />
                  Enterprise Infrastructure
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-4 sm:mb-6">
                Powered by <span className="text-fire-gradient">Yotta Data Centers</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Our infrastructure runs on India's most advanced data centers — Yotta's Tier-3+ certified facilities in Delhi and Mumbai with enterprise-grade hardware at every level.
              </motion.p>
            </div>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

        {/* World Map */}
        <section className="section-padding">
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

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* Hardware Specs */}
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeader badge="Hardware" title="Enterprise-Grade Components" description="Every server is built with reliability and raw performance in mind." />
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {specs.map((spec, index) => (
                <motion.div key={spec.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }} className="glow-card !rounded-2xl p-6 sm:p-8 group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <spec.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">{spec.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{spec.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {spec.details.map((detail) => (
                          <span key={detail} className="text-xs text-muted-foreground bg-card/80 border border-border/30 px-2.5 py-1.5 rounded-lg">{detail}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

        {/* Yotta Data Center */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <span className="glow-badge-fire mb-6 inline-flex">
                  <Building2 className="w-3.5 h-3.5" />
                  Yotta Data Centers
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                  India's Most Advanced
                  <br />
                  <span className="text-fire-gradient">Data Center Facilities</span>
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                  All Cloud on Fire servers are housed in Yotta's world-class data centers — 
                  India's largest and most advanced data center provider, built to Uptime Institute Tier-3+ standards.
                </p>
                <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
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

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="glow-card !rounded-2xl p-6 sm:p-8">
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-card/50 border border-border/30">
                        <div className="w-12 h-12 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                            <div className="w-2 h-2 rounded-full bg-primary/30" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div className="h-2 bg-border/50 rounded-full w-3/4" />
                          <div className="h-2 bg-border/30 rounded-full w-1/2" />
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(6)].map((_, j) => (
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

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* Infrastructure Transparency Cards */}
        <InfraTransparencyCards />

        <div className="gradient-divider mx-auto max-w-4xl" />

        {/* Architecture Diagram */}
        <InfraArchitectureDiagram />

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* Latency Test Tool */}
        <LatencyTestTool variant="full" />

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* CTA */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="container-wide relative text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="glow-card glow-card-popular !rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Deploy on <span className="text-fire-gradient">Premium Infrastructure?</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Get your VPS running on Yotta data centers with enterprise hardware and DDoS protection.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/vps-plans">
                  <Button size="lg" className="btn-fire w-full sm:w-auto h-12 px-8">
                    <span className="relative z-10 flex items-center gap-2">Explore VPS Plans<ArrowRight className="w-4 h-4" /></span>
                  </Button>
                </Link>
                <Link to="/gaming-vps">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/50">
                    Gaming VPS
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
