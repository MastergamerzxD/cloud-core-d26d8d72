import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Shield, Clock, Wrench, HeartHandshake, Coins, ArrowRight, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLaunchPopup } from "@/hooks/useLaunchPopup";

const reasons = [
  {
    icon: Zap,
    title: "Performance Engineering",
    description: "We obsess over every millisecond of latency. Our infrastructure is tuned for maximum performance, not maximum profit margins.",
    points: [
      "Intel Xeon Platinum 8168 processors",
      "Enterprise NVMe storage with sustained performance",
      "Premium network with intelligent routing",
      "Dedicated resources for Pro VPS customers",
    ],
  },
  {
    icon: Shield,
    title: "DDoS Protection That Works",
    description: "DDoS attacks are increasingly common. Our mitigation infrastructure is built to handle even the largest attacks without impacting your service.",
    points: [
      "Multi-layer protection architecture",
      "Up to 1Tbps attack absorption",
      "Pro VPS: Never suspended under attack",
      "Real-time threat monitoring",
    ],
  },
  {
    icon: Clock,
    title: "Reliability You Can Count On",
    description: "Downtime costs money and reputation. We've built redundancy into every layer to ensure your services stay online.",
    points: [
      "99.9%+ uptime SLA",
      "N+1 power redundancy",
      "Automatic failover systems",
      "Proactive monitoring & maintenance",
    ],
  },
  {
    icon: Wrench,
    title: "Support That Understands Tech",
    description: "Our support team consists of engineers who understand your workloads. No scripts, no runaround—just solutions.",
    points: [
      "24/7 availability",
      "Average response under 15 minutes",
      "Technical expertise, not call center scripts",
      "Priority support for Pro VPS",
    ],
  },
  {
    icon: Coins,
    title: "Fair & Transparent Pricing",
    description: "No hidden fees, no surprise charges. The price you see is the price you pay, and it's competitive for the Indian market.",
    points: [
      "Prices in INR",
      "No setup fees",
      "No bandwidth overage charges",
      "Cancel anytime, no penalties",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Built for Indian Developers",
    description: "We understand the Indian market because we're part of it. Local payment options, local support, local expertise.",
    points: [
      "UPI, cards, net banking accepted",
      "GST invoicing available",
      "Support during Indian business hours",
      "Network optimized for Indian users",
    ],
  },
];

export default function WhyUs() {
  const { openPopup } = useLaunchPopup();

  return (
    <>
      <SEOHead
        title="Why Choose Cloud on Fire — Best VPS Hosting Provider in India"
        description="Why Cloud on Fire is the best VPS hosting provider in India. Enterprise DDoS protection, Intel Xeon Platinum performance, 24/7 expert support, and transparent INR pricing built for Indian developers."
        keywords="why Cloud on Fire, best VPS provider India, reliable VPS hosting India, VPS support India, transparent VPS pricing, best hosting provider India"
        canonical="/why-us"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
      />
      <Layout>
        {/* Hero */}
        <section className="relative section-padding overflow-hidden">
          <div className="absolute inset-0 network-grid-bg opacity-20 pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="container-wide relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="glow-badge-fire mb-6 inline-flex">
                <Zap className="w-3.5 h-3.5" />
                Why Us
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-4 sm:mb-6">
                Why Developers Choose
                <br />
                <span className="text-fire-gradient">Cloud on Fire</span>
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We're not the cheapest, and we're not trying to be. We're building 
                infrastructure for developers who need reliability, performance, 
                and support they can count on.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* Reasons */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glow-card !rounded-2xl p-6 sm:p-8 lg:p-10"
                >
                  <div className={`grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center ${index % 2 === 1 ? "lg:[direction:rtl] lg:*:[direction:ltr]" : ""}`}>
                    <div>
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                        <reason.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3">
                        {reason.title}
                      </h2>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                    <div className="space-y-3">
                      {reason.points.map((point) => (
                        <div key={point} className="flex items-start gap-3 p-3 rounded-xl bg-card/50 border border-border/30">
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

        {/* CTA */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="container-wide relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glow-card glow-card-popular !rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Experience the Cloud on Fire difference. Deploy your first VPS in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/vps-plans">
                  <Button size="lg" className="btn-fire w-full sm:w-auto h-12 px-8">
                    <span className="relative z-10 flex items-center gap-2">
                      View Plans
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/50">
                    Contact Us
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
