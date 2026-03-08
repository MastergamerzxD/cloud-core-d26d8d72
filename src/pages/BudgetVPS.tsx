import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Server, Check, ArrowRight, Wallet, AlertTriangle, Cpu, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/ui/PricingCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLaunchPopup } from "@/hooks/useLaunchPopup";

const features = [
  {
    icon: Wallet,
    title: "Cost-Effective",
    description: "Get reliable VPS hosting at India's most competitive prices. Perfect for projects with moderate resource requirements.",
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
  {
    icon: Cpu,
    title: "Intel Platinum 8168",
    description: "Powered by Intel Xeon Platinum 8168 processors — 24 cores, 2.7GHz base clock, designed for enterprise-grade workloads with exceptional multi-threaded performance.",
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
  "App Hosting",
  "Email Servers",
];

const plans = [
  {
    name: "Budget Starter",
    price: "₹199",
    description: "Entry-level budget VPS",
    type: "budget" as const,
    features: [
      "2 vCPU Cores",
      "4 GB DDR4 RAM",
      "30 GB NVMe Storage",
      "1000 GB Bandwidth",
      "DDoS Protection",
      "1x IPv4 Address",
      "Standard Support",
    ],
  },
  {
    name: "Budget Plus",
    price: "₹399",
    description: "Best value option",
    type: "budget" as const,
    popular: true,
    features: [
      "4 vCPU Cores",
      "6 GB DDR4 RAM",
      "60 GB NVMe Storage",
      "2000 GB Bandwidth",
      "DDoS Protection",
      "1x IPv4 Address",
      "Standard Support",
    ],
  },
  {
    name: "Budget Pro",
    price: "₹699",
    description: "For growing projects",
    type: "budget" as const,
    features: [
      "6 vCPU Cores",
      "12 GB DDR4 RAM",
      "100 GB NVMe Storage",
      "4000 GB Bandwidth",
      "DDoS Protection",
      "1x IPv4 Address",
      "Standard Support",
    ],
  },
  {
    name: "Budget Elite",
    price: "₹899",
    description: "High-resource workloads",
    type: "budget" as const,
    features: [
      "8 vCPU Cores",
      "20 GB DDR4 RAM",
      "150 GB NVMe Storage",
      "10,000 GB Bandwidth",
      "DDoS Protection",
      "1x IPv4 Address",
      "Standard Support",
    ],
  },
  {
    name: "Budget Ultra",
    price: "₹1,199",
    description: "Power user choice",
    type: "budget" as const,
    features: [
      "10 vCPU Cores",
      "32 GB DDR4 RAM",
      "150 GB NVMe Storage",
      "Unmetered Bandwidth",
      "DDoS Protection",
      "1x IPv4 Address",
      "Standard Support",
    ],
  },
  {
    name: "Budget Enterprise",
    price: "₹1,899",
    description: "Maximum budget power",
    type: "budget" as const,
    features: [
      "20 vCPU Cores",
      "64 GB DDR4 RAM",
      "200 GB NVMe Storage",
      "Unmetered Bandwidth",
      "DDoS Protection",
      "1x IPv4 Address",
      "Standard Support",
    ],
  },
];

export default function BudgetVPS() {
  const { openPopup } = useLaunchPopup();
  return (
    <>
      <SEOHead
        seoPrefix="budget_vps"
        title="Budget VPS India – Cheapest VPS Hosting | From ₹199/mo | Cloud on Fire"
        description="Cheapest VPS hosting in India from ₹199/month. Powered by Intel Xeon Platinum 8168 processors. DDoS protection included, NVMe storage. Best affordable VPS for websites, WordPress, Discord bots, and development. Cloud on Fire Budget VPS."
        keywords="cheapest VPS India, budget VPS hosting, affordable VPS India, WordPress VPS India, development server, Discord bot hosting, website VPS India, cheap cloud server India, best budget hosting India, Cloud on Fire Budget VPS, Intel Platinum VPS"
        canonical="/budget-vps"
        ogType="product"
      />
      <Layout>
        {/* Hero */}
        <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center section-padding overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-secondary/30 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="container-wide relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-secondary-foreground bg-secondary border border-border rounded-full mb-4 sm:mb-8">
                  <Wallet className="w-3 h-3 sm:w-4 sm:h-4" />
                  Value-Oriented VPS
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-4 sm:mb-6"
              >
                Budget VPS
                <br />
                <span className="text-fire-gradient">Smart Value, Real Performance</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-10"
              >
                India's most affordable VPS hosting powered by Intel Xeon Platinum 8168 processors. 
                Starting at just <span className="text-primary font-semibold">₹199/month</span> — perfect for 
                websites, development servers, apps, and more.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              >
                <Button size="lg" className="btn-fire text-sm sm:text-base px-6 sm:px-8 w-full sm:w-auto h-11 sm:h-12" onClick={openPopup}>
                  <span className="relative z-10 flex items-center gap-2">
                    View Plans
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
                <Link to="/compare" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="text-sm sm:text-base px-6 sm:px-8 w-full sm:w-auto h-11 sm:h-12">
                    Compare with Pro VPS
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Intel Processor Section */}
        <section className="py-8 sm:py-12">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 sm:p-8 border-l-4 border-l-primary"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Cpu className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg sm:text-xl mb-2">Powered by Intel® Xeon® Platinum 8168</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Every Budget VPS runs on the Intel Xeon Platinum 8168 — a server-grade processor with 24 cores, 
                    48 threads, and a 2.7GHz base clock (turbo up to 3.7GHz). With 33MB of L3 cache and support for 
                    6-channel DDR4 memory, this processor delivers exceptional performance for web hosting, app hosting, 
                    bot hosting, database workloads, and development environments.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "24 Cores", sublabel: "48 Threads" },
                      { label: "2.7 GHz", sublabel: "Base Clock" },
                      { label: "3.7 GHz", sublabel: "Turbo Boost" },
                      { label: "33 MB", sublabel: "L3 Cache" },
                    ].map((spec) => (
                      <div key={spec.label} className="text-center bg-secondary/50 rounded-lg p-2 sm:p-3">
                        <div className="text-sm sm:text-base font-bold text-foreground">{spec.label}</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground">{spec.sublabel}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Transparency Notice */}
        <section className="pb-8">
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
        <section className="section-padding bg-card/60">
          <div className="container-wide">
            <SectionHeader
              badge="Budget Features"
              title="Reliable Hosting at Great Value"
              description="Get essential features for your projects without breaking the bank."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
                  Powered by Intel Platinum 8168 processors, it's the smart choice 
                  when you need dependable hosting without premium pricing.
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
                    <span className="text-muted-foreground">Processor</span>
                    <span className="font-semibold text-foreground">Intel Platinum 8168</span>
                  </div>
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
        <section className="section-padding bg-card/60">
          <div className="container-wide">
            <SectionHeader
              badge="Pricing"
              title="Budget VPS Plans"
              description="Affordable plans powered by Intel Platinum 8168 with DDoS protection included."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
