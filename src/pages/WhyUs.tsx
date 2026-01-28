import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Shield, Clock, Wrench, HeartHandshake, Coins, ArrowRight, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";

const reasons = [
  {
    icon: Zap,
    title: "Performance Engineering",
    description: "We obsess over every millisecond of latency. Our infrastructure is tuned for maximum performance, not maximum profit margins.",
    points: [
      "Latest-gen Intel Xeon & AMD EPYC processors",
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
  return (
    <>
      <Helmet>
        <title>Why Cloud on Fire - Best VPS Hosting Provider India | Reliability & Performance</title>
        <meta 
          name="description" 
          content="Why choose Cloud on Fire? Performance engineering, enterprise DDoS protection, reliable infrastructure, 24/7 expert support, and transparent INR pricing for Indian developers." 
        />
        <meta name="keywords" content="why Cloud on Fire, best VPS provider India, reliable VPS hosting, VPS support, transparent VPS pricing" />
        <link rel="canonical" href="https://cloudonfire.in/why-us" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://cloudonfire.in/why-us" />
        <meta property="og:title" content="Why Cloud on Fire - Best VPS Provider" />
        <meta property="og:description" content="Performance, reliability, and transparency. See why developers choose Cloud on Fire." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Why Choose Cloud on Fire" />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full mb-4">
                Why Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                Why Developers Choose
                <br />
                <span className="text-fire-gradient">Cloud on Fire</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We're not the cheapest, and we're not trying to be. We're building 
                infrastructure for developers who need reliability, performance, 
                and support they can count on.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Reasons */}
        <section className="section-padding bg-card/30">
          <div className="container-wide">
            <div className="space-y-16">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <reason.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {reason.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {reason.description}
                    </p>
                    <ul className="space-y-3">
                      {reason.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="glass-card aspect-video flex items-center justify-center">
                      <reason.icon className="w-24 h-24 text-primary/20" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-8">
                Experience the Cloud on Fire difference. Deploy your first VPS in minutes.
              </p>
              <Link to="/pricing">
                <Button size="lg" className="btn-fire">
                  <span className="relative z-10 flex items-center gap-2">
                    View Pricing
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
