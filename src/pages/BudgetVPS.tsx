import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Server, Check, ArrowRight, Wallet, AlertTriangle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/ui/PricingCard";
import SectionHeader from "@/components/ui/SectionHeader";

const features = [
  {
    icon: Wallet,
    title: "Cost-Effective",
    description: "Get reliable VPS hosting at competitive prices. Perfect for projects with moderate resource requirements.",
  },
  {
    icon: Shield,
    title: "DDoS Protection Included",
    description: "Standard DDoS protection is included with all Budget VPS plans to keep your services secure.",
  },
  {
    icon: Server,
    title: "NVMe Storage",
    description: "Fast NVMe storage for responsive application performance and quick data access.",
  },
];

const useCases = [
  "Personal Websites",
  "Development Servers",
  "Discord Bots",
  "Small Databases",
  "Testing Environments",
  "WordPress Sites",
  "API Development",
  "Static File Hosting",
];

const plans = [
  {
    name: "Budget Starter",
    price: "₹499",
    description: "Entry-level budget VPS",
    type: "budget" as const,
    features: [
      "2 vCPU Cores (Shared)",
      "4 GB DDR4 RAM",
      "60 GB NVMe Storage",
      "Unlimited Bandwidth",
      "DDoS Protection",
      "1 IPv4 Address",
      "Standard Support",
    ],
  },
  {
    name: "Budget Plus",
    price: "₹799",
    description: "Best value option",
    type: "budget" as const,
    popular: true,
    features: [
      "4 vCPU Cores (Shared)",
      "8 GB DDR4 RAM",
      "120 GB NVMe Storage",
      "Unlimited Bandwidth",
      "DDoS Protection",
      "1 IPv4 Address",
      "Standard Support",
    ],
  },
  {
    name: "Budget Pro",
    price: "₹1,199",
    description: "Maximum budget value",
    type: "budget" as const,
    features: [
      "6 vCPU Cores (Shared)",
      "12 GB DDR4 RAM",
      "200 GB NVMe Storage",
      "Unlimited Bandwidth",
      "DDoS Protection",
      "1 IPv4 Address",
      "Standard Support",
      "Weekly Backups",
    ],
  },
];

export default function BudgetVPS() {
  return (
    <>
      <Helmet>
        <title>Budget VPS - Affordable VPS Hosting India | Cloud on Fire</title>
        <meta 
          name="description" 
          content="Cost-effective VPS hosting in India starting from ₹499/month. DDoS protection included. Perfect for websites, bots, and development servers." 
        />
        <meta property="og:title" content="Budget VPS - Affordable VPS Hosting India | Cloud on Fire" />
        <meta property="og:description" content="Affordable VPS hosting with DDoS protection from ₹499/month. Ideal for websites and development." />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center section-padding overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-secondary/30 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container-wide relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-secondary-foreground bg-secondary border border-border rounded-full mb-8">
                  <Wallet className="w-4 h-4" />
                  Value-Oriented VPS
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6"
              >
                Budget VPS
                <br />
                <span className="text-fire-gradient">Smart Value, Real Performance</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
              >
                Cost-effective VPS hosting without compromising on reliability. 
                Perfect for websites, development servers, and applications that 
                don't require dedicated resources.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button size="lg" className="btn-fire text-base px-8">
                  <span className="relative z-10 flex items-center gap-2">
                    View Plans
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
                <Link to="/compare">
                  <Button size="lg" variant="outline" className="text-base px-8">
                    Compare with Pro VPS
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Transparency Notice */}
        <section className="py-8">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 border-l-4 border-l-primary"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Transparency About Budget VPS</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Budget VPS runs on shared infrastructure optimized for cost efficiency. While DDoS protection 
                    is included, under extreme attack conditions your VPS may be temporarily suspended to protect 
                    other customers on the same network segment. For workloads requiring guaranteed uptime during 
                    attacks, we recommend <Link to="/pro-vps" className="text-primary hover:underline">Pro VPS</Link>.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-card/30">
          <div className="container-wide">
            <SectionHeader
              badge="Budget Features"
              title="Reliable Hosting at Great Value"
              description="Get essential features for your projects without breaking the bank."
            />

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 mx-auto">
                    <feature.icon className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
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
                  Ideal For
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                  Perfect for Everyday
                  <br />
                  <span className="text-fire-gradient">Projects & Development</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Budget VPS provides reliable performance for standard workloads. 
                  It's the smart choice when you need dependable hosting without 
                  premium pricing.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {useCases.map((useCase) => (
                    <div key={useCase} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{useCase}</span>
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
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-foreground mb-2">99.9%</div>
                  <div className="text-muted-foreground">Uptime for Budget VPS</div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <span className="text-muted-foreground">Avg. Response Time</span>
                    <span className="font-semibold text-foreground">&lt;5ms</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <span className="text-muted-foreground">DDoS Protection</span>
                    <span className="font-semibold text-foreground">Included</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Under Extreme Attack</span>
                    <span className="font-semibold text-muted-foreground">May Suspend</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-padding bg-card/30">
          <div className="container-wide">
            <SectionHeader
              badge="Pricing"
              title="Budget VPS Plans"
              description="Affordable plans with DDoS protection included."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <PricingCard key={plan.name} {...plan} index={index} />
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Need guaranteed uptime? Check out <Link to="/pro-vps" className="text-primary hover:underline">Pro VPS</Link> plans.
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
}
