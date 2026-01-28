import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Server, Globe, Layers, ArrowRight, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";

const protectionLayers = [
  {
    title: "Edge Network Filtering",
    description: "Traffic is analyzed at the network edge before reaching our infrastructure.",
  },
  {
    title: "Volumetric Attack Mitigation",
    description: "Absorbs large-scale attacks up to 1Tbps with automatic scaling.",
  },
  {
    title: "Application Layer Protection",
    description: "Deep packet inspection to filter malicious requests targeting applications.",
  },
  {
    title: "Rate Limiting & Throttling",
    description: "Intelligent rate limiting to prevent resource exhaustion attacks.",
  },
];

const attackTypes = [
  "UDP Flood",
  "TCP SYN Flood",
  "HTTP Flood",
  "DNS Amplification",
  "NTP Amplification",
  "ICMP Flood",
  "Slowloris",
  "Application Layer Attacks",
];

export default function DDoSProtection() {
  return (
    <>
      <Helmet>
        <title>DDoS Protection India - Enterprise Anti-DDoS for VPS | Cloud on Fire</title>
        <meta 
          name="description" 
          content="Enterprise-grade DDoS protection for VPS hosting in India. Multi-layer mitigation up to 1Tbps. Pro VPS never suspended under attack. Protect your servers from UDP, TCP, HTTP floods." 
        />
        <meta name="keywords" content="DDoS protection India, anti-DDoS VPS, DDoS mitigation, protected VPS hosting, DDoS attack protection, 1Tbps DDoS protection" />
        <link rel="canonical" href="https://cloudonfire.in/ddos-protection" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://cloudonfire.in/ddos-protection" />
        <meta property="og:title" content="DDoS Protection - Enterprise Anti-DDoS | Cloud on Fire" />
        <meta property="og:description" content="Multi-layer DDoS mitigation up to 1Tbps. Keep your services online during attacks." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="DDoS Protection | Cloud on Fire" />
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
                  <Shield className="w-4 h-4" />
                  Enterprise Security
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6"
              >
                DDoS Protection
                <br />
                <span className="text-fire-gradient">That Never Backs Down</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
              >
                Multi-layer DDoS mitigation that absorbs attacks up to 1Tbps. 
                Your services stay online while our infrastructure handles the threats.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link to="/pro-vps">
                  <Button size="lg" className="btn-fire text-base px-8">
                    <span className="relative z-10 flex items-center gap-2">
                      Get Protected Now
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Protection Architecture */}
        <section className="section-padding bg-card/30">
          <div className="container-wide">
            <SectionHeader
              badge="How It Works"
              title="Multi-Layer Protection Architecture"
              description="Our DDoS mitigation operates at multiple levels to ensure comprehensive protection."
            />

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Connection line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

                {protectionLayers.map((layer, index) => (
                  <motion.div
                    key={layer.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-0 md:pl-20 pb-8"
                  >
                    {/* Step number */}
                    <div className="hidden md:flex absolute left-0 top-0 w-16 h-16 rounded-full bg-card border-2 border-primary items-center justify-center">
                      <span className="text-lg font-bold text-primary">{index + 1}</span>
                    </div>

                    <div className="glass-card p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 md:hidden">
                          <span className="text-lg font-bold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{layer.title}</h3>
                          <p className="text-muted-foreground text-sm">{layer.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Attack Types */}
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
                  Coverage
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                  Protected Against
                  <br />
                  <span className="text-fire-gradient">All Attack Vectors</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Our mitigation systems are continuously updated to handle both known 
                  attack patterns and emerging threats. Here are the attack types we actively protect against:
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {attackTypes.map((attack) => (
                    <div key={attack} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{attack}</span>
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
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-fire-gradient mb-2">1 Tbps</div>
                  <div className="text-muted-foreground">Maximum Attack Absorption</div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Network Capacity</span>
                      <span className="text-foreground font-medium">100%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-primary to-fire-red rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Mitigation Efficiency</span>
                      <span className="text-foreground font-medium">99.9%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-[99.9%] bg-gradient-to-r from-primary to-fire-red rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Response Time</span>
                      <span className="text-foreground font-medium">&lt;1 second</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-primary to-fire-red rounded-full" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pro vs Budget Protection */}
        <section className="section-padding bg-card/30">
          <div className="container-wide">
            <SectionHeader
              badge="Protection Levels"
              title="Pro VPS vs Budget VPS Protection"
              description="Understand the difference in DDoS handling between our VPS tiers."
            />

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 border-primary/30"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm font-semibold bg-primary/20 text-primary rounded-full">
                    Pro VPS
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Never Suspended</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Premium DDoS mitigation up to 1Tbps</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Dedicated filtering capacity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Zero suspension policy under any attack</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Isolated from shared infrastructure attacks</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm font-semibold bg-secondary text-secondary-foreground rounded-full">
                    Budget VPS
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Standard Protection</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Standard DDoS mitigation up to 500Gbps</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Shared filtering infrastructure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Protection against common attacks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">May suspend under extreme attacks to protect network</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <div className="text-center mt-12">
              <Link to="/compare">
                <Button variant="outline" size="lg">
                  View Full Comparison
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
