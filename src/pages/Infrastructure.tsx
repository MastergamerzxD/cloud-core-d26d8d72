import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cpu, HardDrive, Network, Shield, Server, Globe, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";

const specs = [
  {
    icon: Cpu,
    title: "Enterprise Processors",
    description: "Latest-generation Intel Xeon and AMD EPYC processors with high single-thread performance for gaming and real-time applications.",
    details: ["Intel Xeon Gold Series", "AMD EPYC 7003 Series", "High clock speeds", "Large L3 cache"],
  },
  {
    icon: HardDrive,
    title: "NVMe Storage",
    description: "Enterprise-grade NVMe SSDs with sustained read/write performance and RAID protection for data integrity.",
    details: ["Samsung PM9A3 / Intel P5316", "Up to 7GB/s read speeds", "RAID 10 configuration", "Daily backups available"],
  },
  {
    icon: Network,
    title: "Premium Network",
    description: "Multiple Tier-1 transit providers with intelligent routing for optimal latency across India and globally.",
    details: ["10Gbps+ uplinks", "Multiple peering points", "BGP optimized routing", "Redundant connectivity"],
  },
  {
    icon: Shield,
    title: "Security Infrastructure",
    description: "Multi-layer security from hardware firewalls to application-level protection.",
    details: ["Hardware firewalls", "DDoS mitigation", "Network segmentation", "24/7 monitoring"],
  },
];

const datacenterFeatures = [
  "Tier-3 equivalent facility",
  "N+1 power redundancy",
  "UPS and diesel backup",
  "Precision cooling systems",
  "24/7 security personnel",
  "Biometric access control",
  "Fire suppression systems",
  "Environmental monitoring",
];

export default function Infrastructure() {
  return (
    <>
      <Helmet>
        <title>Infrastructure - Enterprise VPS Hardware India | Cloud on Fire</title>
        <meta 
          name="description" 
          content="Learn about Cloud on Fire's enterprise-grade infrastructure. Intel Xeon & AMD EPYC processors, NVMe storage, premium network, and Tier-3 data centers in India." 
        />
        <meta property="og:title" content="Infrastructure - Enterprise VPS Hardware | Cloud on Fire" />
        <meta property="og:description" content="Enterprise-grade hardware: Intel Xeon, AMD EPYC, NVMe storage, and premium networking." />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center section-padding overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container-wide relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-8">
                  <Server className="w-4 h-4" />
                  Enterprise Infrastructure
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6"
              >
                Built on Hardware
                <br />
                <span className="text-fire-gradient">You Can Trust</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Every component of our infrastructure is selected for reliability and performance. 
                We use the same enterprise-grade hardware trusted by major cloud providers.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Hardware Specs */}
        <section className="section-padding bg-card/30">
          <div className="container-wide">
            <SectionHeader
              badge="Hardware"
              title="Enterprise-Grade Components"
              description="We don't cut corners on hardware. Every server is built with reliability in mind."
            />

            <div className="grid md:grid-cols-2 gap-6">
              {specs.map((spec, index) => (
                <motion.div
                  key={spec.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <spec.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{spec.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{spec.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {spec.details.map((detail) => (
                          <span key={detail} className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Center */}
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
                  Data Center
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                  Secure, Reliable
                  <br />
                  <span className="text-fire-gradient">Facility Standards</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Our servers are housed in facilities that meet stringent reliability 
                  and security standards. Redundant power, cooling, and connectivity 
                  ensure your services stay online.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {datacenterFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="glass-card p-8 aspect-square flex flex-col justify-center">
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
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Network Map */}
        <section className="section-padding bg-card/30">
          <div className="container-wide">
            <SectionHeader
              badge="Network"
              title="Optimized for India & Beyond"
              description="Strategic connectivity ensures low latency across the Indian subcontinent and globally."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-1">India</div>
                  <div className="text-sm text-muted-foreground">&lt;5ms latency</div>
                </div>
                <div>
                  <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-1">Asia Pacific</div>
                  <div className="text-sm text-muted-foreground">&lt;50ms latency</div>
                </div>
                <div>
                  <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-1">Global</div>
                  <div className="text-sm text-muted-foreground">&lt;150ms latency</div>
                </div>
              </div>
            </motion.div>

            <div className="text-center mt-12">
              <Link to="/pricing">
                <Button size="lg" className="btn-fire">
                  <span className="relative z-10 flex items-center gap-2">
                    View VPS Plans
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
