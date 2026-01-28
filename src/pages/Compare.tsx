import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, X, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";

const comparisonCategories = [
  {
    title: "Performance",
    items: [
      { feature: "CPU Allocation", pro: "Dedicated Cores", budget: "Shared Cores" },
      { feature: "RAM Type", pro: "DDR4 ECC", budget: "DDR4" },
      { feature: "Storage", pro: "Enterprise NVMe", budget: "NVMe" },
      { feature: "Network Priority", pro: "High Priority", budget: "Standard" },
      { feature: "Avg. Latency", pro: "<1ms", budget: "<5ms" },
    ],
  },
  {
    title: "DDoS Protection",
    items: [
      { feature: "Protection Included", pro: true, budget: true },
      { feature: "Mitigation Capacity", pro: "Up to 1Tbps", budget: "Up to 500Gbps" },
      { feature: "Never Suspended Under Attack", pro: true, budget: false },
      { feature: "Extreme Attack Handling", pro: "Always Online", budget: "May Suspend" },
    ],
  },
  {
    title: "Support & SLA",
    items: [
      { feature: "24/7 Support", pro: true, budget: true },
      { feature: "Uptime SLA", pro: "99.99%", budget: "99.9%" },
      { feature: "Priority Support", pro: true, budget: false },
      { feature: "Avg. Response Time", pro: "<15 min", budget: "<60 min" },
    ],
  },
  {
    title: "Best Use Cases",
    items: [
      { feature: "Game Servers", pro: true, budget: false },
      { feature: "High-Traffic Apps", pro: true, budget: false },
      { feature: "Websites & Blogs", pro: true, budget: true },
      { feature: "Development Servers", pro: true, budget: true },
      { feature: "Discord/Telegram Bots", pro: true, budget: true },
      { feature: "Mission-Critical Workloads", pro: true, budget: false },
    ],
  },
];

const renderValue = (value: boolean | string) => {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-primary mx-auto" />
    ) : (
      <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
    );
  }
  return <span className="text-sm font-medium">{value}</span>;
};

export default function Compare() {
  return (
    <>
      <Helmet>
        <title>Compare VPS Plans India - Pro vs Budget VPS | Cloud on Fire</title>
        <meta 
          name="description" 
          content="Compare Cloud on Fire Pro VPS vs Budget VPS plans. Detailed comparison of performance, DDoS protection, pricing, and features. Find the best VPS for your needs in India." 
        />
        <meta name="keywords" content="VPS comparison India, Pro VPS vs Budget VPS, gaming VPS comparison, best VPS India, VPS features comparison" />
        <link rel="canonical" href="https://cloudonfire.in/compare" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://cloudonfire.in/compare" />
        <meta property="og:title" content="Compare VPS Plans - Pro vs Budget | Cloud on Fire" />
        <meta property="og:description" content="Detailed comparison between Pro VPS and Budget VPS. Find the perfect plan for your workload." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Compare VPS Plans | Cloud on Fire" />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full mb-4">
                Compare Plans
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                Pro VPS vs Budget VPS
                <br />
                <span className="text-fire-gradient">Side-by-Side Comparison</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Choose the right VPS for your workload. Compare performance, protection, 
                and pricing to make an informed decision.
              </p>
            </motion.div>

            {/* Quick Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6 mb-16"
            >
              <div className="glass-card p-6 border-primary/30">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm font-semibold bg-primary/20 text-primary rounded-full">
                    Pro VPS
                  </span>
                  <span className="text-sm text-muted-foreground">From ₹299/mo</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  High-Performance Gaming VPS
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Dedicated resources, premium DDoS protection, never suspended under attacks. 
                  Built for demanding workloads that require consistent performance.
                </p>
                <Link to="/pro-vps">
                  <Button className="btn-fire w-full">
                    <span className="relative z-10">Explore Pro VPS</span>
                  </Button>
                </Link>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-sm font-semibold bg-secondary text-secondary-foreground rounded-full">
                    Budget VPS
                  </span>
                  <span className="text-sm text-muted-foreground">From ₹499/mo</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Cost-Effective Standard VPS
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Reliable hosting at competitive prices. DDoS protection included. 
                  Best for websites, bots, and development servers.
                </p>
                <Link to="/budget-vps">
                  <Button variant="outline" className="w-full">
                    Explore Budget VPS
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Detailed Comparison */}
            {comparisonCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="mb-12"
              >
                <h2 className="text-xl font-semibold text-foreground mb-6">{category.title}</h2>
                <div className="glass-card overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/30 border-b border-border/50">
                    <div className="text-sm font-medium text-muted-foreground">Feature</div>
                    <div className="text-center">
                      <span className="text-sm font-semibold text-primary">Pro VPS</span>
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-semibold text-secondary-foreground">Budget VPS</span>
                    </div>
                  </div>

                  {/* Rows */}
                  {category.items.map((item, index) => (
                    <div
                      key={item.feature}
                      className={`grid grid-cols-3 gap-4 p-4 ${
                        index !== category.items.length - 1 ? "border-b border-border/30" : ""
                      }`}
                    >
                      <div className="text-sm text-foreground">{item.feature}</div>
                      <div className="text-center text-foreground">{renderValue(item.pro)}</div>
                      <div className="text-center text-muted-foreground">{renderValue(item.budget)}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mt-16"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Still not sure which plan is right for you?
              </h3>
              <p className="text-muted-foreground mb-8">
                Our team is here to help you choose the perfect VPS for your needs.
              </p>
              <Link to="/contact">
                <Button size="lg" className="btn-fire">
                  <span className="relative z-10 flex items-center gap-2">
                    Talk to Our Team
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
