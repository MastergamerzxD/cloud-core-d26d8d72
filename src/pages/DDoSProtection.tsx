import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, ArrowRight, Check, Layers, Clock, Zap, Activity } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import LiveAttackAnimation from "@/components/ddos/LiveAttackAnimation";
import { useLaunchPopup } from "@/hooks/useLaunchPopup";

const protectionLayers = [
  {
    icon: Layers,
    title: "Edge Network Filtering",
    description: "All incoming traffic passes through our edge network where volumetric attacks are filtered before they reach our core infrastructure.",
  },
  {
    icon: Shield,
    title: "Volumetric Attack Mitigation",
    description: "Our scrubbing centers absorb and neutralize large-scale volumetric attacks up to 1Tbps. Legitimate traffic passes through unaffected.",
  },
  {
    icon: Clock,
    title: "Rate Limiting & Throttling",
    description: "Intelligent rate limiting prevents resource exhaustion attacks. Dynamic thresholds adapt to traffic patterns automatically.",
  },
  {
    icon: Zap,
    title: "Instant Auto-Mitigation",
    description: "Attack detection and mitigation begins in under 1 second. No manual intervention needed — fully automated 24/7/365.",
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description: "Continuous monitoring of all network traffic with instant alerts. Our NOC team fine-tunes protection rules round the clock.",
  },
];

const attackTypes = [
  "UDP Flood", "TCP SYN Flood", "DNS Amplification",
  "NTP Amplification", "ICMP Flood", "SSDP Amplification",
  "Memcached Amplification", "GRE Flood", "TCP ACK Flood",
  "TCP RST Flood", "UDP Fragment Flood", "IP Null Attack",
];

export default function DDoSProtection() {
  const { openPopup } = useLaunchPopup();

  return (
    <>
      <SEOHead
        title="Advanced DDoS Protection for Game Servers & VPS Hosting — Cloud on Fire"
        description="Enterprise-grade Layer 4 DDoS mitigation up to 1Tbps for VPS and game servers in India. Pro VPS never suspended under attack. Real-time threat detection and automatic mitigation included on all plans."
        keywords="DDoS protection India, anti-DDoS VPS, DDoS mitigation India, protected VPS hosting, Layer 4 DDoS protection, 1Tbps DDoS protection, DDoS protected game server India, Cloud on Fire DDoS"
        canonical="/ddos-protection"
        ogImage="https://cloudonfire.com/images/og-logo.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Cloud on Fire DDoS Protection",
            description: "Enterprise-grade Layer 4 DDoS mitigation service with up to 1Tbps attack absorption capacity. Included on all VPS and Gaming VPS plans.",
            provider: { "@id": "https://cloudonfire.com/#organization" },
            serviceType: "DDoS Protection",
            areaServed: { "@type": "Country", name: "India" },
            brand: { "@type": "Brand", name: "Cloud on Fire" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://cloudonfire.com/" },
              { "@type": "ListItem", position: 2, name: "DDoS Protection", item: "https://cloudonfire.com/ddos-protection" },
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
                <span className="glow-badge-fire mb-6 inline-flex">
                  <Shield className="w-3.5 h-3.5" />
                  Enterprise Security
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-4 sm:mb-6">
                Layer 4 DDoS Protection
                <br />
                <span className="text-fire-gradient">That Never Backs Down</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-10">
                Enterprise-grade Layer 4 DDoS mitigation absorbing attacks up to 1Tbps. Your services stay online while our infrastructure neutralizes threats in real-time.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Button size="lg" className="btn-fire text-sm sm:text-base px-6 sm:px-8 w-full sm:w-auto h-11 sm:h-12" onClick={openPopup}>
                  <span className="relative z-10 flex items-center gap-2">Get Protected Now<ArrowRight className="w-4 h-4" /></span>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* Live Attack Demo */}
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeader
              badge="Live Demo"
              title="How Attacks Get Mitigated"
              description="See how our multi-layer defense system detects and neutralizes DDoS attacks before they reach your server."
            />
            <div className="max-w-5xl mx-auto">
              <LiveAttackAnimation />
            </div>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

        {/* Protection Architecture */}
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeader
              badge="How It Works"
              title="5-Layer Protection Architecture"
              description="Our Layer 4 DDoS mitigation operates at the network and transport layers of the stack."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {protectionLayers.map((layer, index) => (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="glow-card !rounded-2xl p-6 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <layer.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Layer {index + 1}</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{layer.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{layer.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* Attack Types */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <span className="glow-badge mb-6 inline-flex">Layer 4 Coverage</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                  Protected Against<br /><span className="text-fire-gradient">Layer 4 Attack Vectors</span>
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
                  Our Layer 4 mitigation systems handle both known network-level attack patterns and zero-day threats. Continuously updated to stay ahead of evolving DDoS techniques.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {attackTypes.map((attack) => (
                    <div key={attack} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">{attack}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                className="glow-card !rounded-2xl p-6 sm:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="text-4xl sm:text-5xl font-extrabold text-fire-gradient mb-2">1 Tbps</div>
                  <div className="text-muted-foreground">Maximum Attack Absorption</div>
                </div>
                <div className="space-y-6">
                  {[
                    { label: "Network Capacity", value: "100%", width: "100%" },
                    { label: "Mitigation Efficiency", value: "99.9%", width: "99.9%" },
                    { label: "Auto-Detection Speed", value: "<1 second", width: "100%" },
                    { label: "False Positive Rate", value: "0.01%", width: "1%" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="text-foreground font-medium">{item.value}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-fire-red rounded-full" style={{ width: item.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

        {/* Pro vs Budget */}
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeader badge="Protection Levels" title="Pro VPS vs Budget VPS Protection" description="Understand the critical difference in DDoS handling between our VPS tiers." />
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="glow-card glow-card-popular !rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm font-semibold bg-primary/20 text-primary rounded-full">Pro VPS</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-500 rounded-full">RECOMMENDED</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-4">Never Suspended — Guaranteed</h3>
                <ul className="space-y-3">
                  {[
                    "Premium Layer 4 DDoS mitigation up to 1Tbps",
                    "Dedicated filtering capacity per VPS",
                    "Zero suspension policy under any attack size",
                    "Isolated from shared infrastructure attacks",
                    "Real-time attack analytics dashboard",
                    "Custom firewall rules & rate limiting",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                className="glow-card !rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm font-semibold bg-secondary text-secondary-foreground rounded-full">Budget VPS</span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-4">Standard Protection</h3>
                <ul className="space-y-3">
                  {[
                    "Standard Layer 4 DDoS mitigation",
                    "Shared filtering infrastructure",
                    "Protection against common attack vectors",
                    "Automatic mitigation for known patterns",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">May suspend under extreme attacks to protect network</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Internal linking CTA */}
        <div className="gradient-divider mx-auto max-w-4xl" />
        <section className="section-padding">
          <div className="container-wide text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Protected Hosting <span className="text-fire-gradient">For Every Workload</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm sm:text-base">
              All Cloud on Fire services include DDoS protection. Choose your platform:
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link to="/vps-plans">
                <Button variant="outline" size="lg" className="group text-sm">
                  VPS hosting plans
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/gaming-vps">
                <Button variant="outline" size="lg" className="group text-sm">
                  Gaming VPS with advanced DDoS
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/rdp">
                <Button variant="outline" size="lg" className="group text-sm">
                  Cloud RDP servers
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
