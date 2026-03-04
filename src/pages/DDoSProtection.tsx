import { Helmet } from "react-helmet-async";
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
    description: "All incoming traffic passes through our edge network where volumetric attacks are filtered before they reach our core infrastructure. We analyze traffic patterns in real-time using ML-based anomaly detection.",
  },
  {
    icon: Shield,
    title: "Volumetric Attack Mitigation",
    description: "Our scrubbing centers absorb and neutralize large-scale volumetric attacks up to 1Tbps. Legitimate traffic passes through unaffected while malicious packets are dropped at the network edge.",
  },
  {
    icon: Clock,
    title: "Rate Limiting & Throttling",
    description: "Intelligent rate limiting prevents resource exhaustion attacks. Dynamic thresholds adapt to traffic patterns, ensuring legitimate users are never blocked during mitigation.",
  },
  {
    icon: Zap,
    title: "Instant Auto-Mitigation",
    description: "Attack detection and mitigation begins in under 1 second. No manual intervention needed — our systems automatically identify and neutralize threats 24/7/365.",
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description: "Continuous monitoring of all network traffic with instant alerts. Our NOC team monitors traffic anomalies round the clock and fine-tunes protection rules as needed.",
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
      <Helmet>
        <title>DDoS Protection India - Enterprise Anti-DDoS for VPS | Cloud on Fire</title>
        <meta 
          name="description" 
          content="Enterprise-grade Layer 4 DDoS protection for VPS hosting in India. Multi-layer mitigation up to 1Tbps. Pro VPS never suspended under attack." 
        />
        <meta name="keywords" content="DDoS protection India, anti-DDoS VPS, DDoS mitigation, protected VPS hosting, Layer 4 DDoS protection, 1Tbps DDoS protection" />
        <link rel="canonical" href="https://cloudonfire.in/ddos-protection" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://cloudonfire.in/ddos-protection" />
        <meta property="og:title" content="DDoS Protection - Enterprise Anti-DDoS | Cloud on Fire" />
        <meta property="og:description" content="Layer 4 DDoS mitigation up to 1Tbps. Keep your services online during attacks." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="DDoS Protection | Cloud on Fire" />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center section-padding overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container-wide relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full mb-8">
                  <Shield className="w-4 h-4" />
                  Enterprise Security
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
                Layer 4 DDoS Protection
                <br />
                <span className="text-fire-gradient">That Never Backs Down</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Enterprise-grade Layer 4 DDoS mitigation absorbing attacks up to 1Tbps. Your services stay online while our infrastructure neutralizes threats in real-time.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="btn-fire text-base px-8" onClick={openPopup}>
                  <span className="relative z-10 flex items-center gap-2">Get Protected Now<ArrowRight className="w-4 h-4" /></span>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Live Attack Mitigation Demo */}
        <section className="section-padding bg-card/60">
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

        {/* Protection Architecture */}
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeader
              badge="How It Works"
              title="5-Layer Protection Architecture"
              description="Our Layer 4 DDoS mitigation operates at the network and transport layers of the stack."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {protectionLayers.map((layer, index) => (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="glass-card p-6 rounded-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <layer.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Layer {index + 1}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{layer.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{layer.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Attack Types - Layer 4 only */}
        <section className="section-padding bg-card/60">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full mb-4">Layer 4 Coverage</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                  Protected Against<br /><span className="text-fire-gradient">Layer 4 Attack Vectors</span>
                </h2>
                <p className="text-muted-foreground mb-8">
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
                className="glass-card p-8">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-fire-gradient mb-2">1 Tbps</div>
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

        {/* Pro vs Budget Protection */}
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeader badge="Protection Levels" title="Pro VPS vs Budget VPS Protection" description="Understand the critical difference in DDoS handling between our VPS tiers." />
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="glass-card p-6 border-primary/30">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm font-semibold bg-primary/20 text-primary rounded-full">Pro VPS</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-green-500/20 text-green-500 rounded-full">RECOMMENDED</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Never Suspended — Guaranteed</h3>
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
                className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm font-semibold bg-secondary text-secondary-foreground rounded-full">Budget VPS</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Standard Protection</h3>
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
            <div className="text-center mt-12">
              <Link to="/compare">
                <Button variant="outline" size="lg">View Full Comparison<ArrowRight className="w-4 h-4 ml-2" /></Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
