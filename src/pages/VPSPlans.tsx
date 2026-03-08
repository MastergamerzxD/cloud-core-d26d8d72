import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import PricingCard from "@/components/ui/PricingCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cpu, HardDrive, Shield, Server, Globe, Database, Code, Gamepad2,
} from "lucide-react";
import { useLaunchPopup } from "@/hooks/useLaunchPopup";

const plans = [
  {
    name: "Starter",
    price: "₹199",
    description: "Entry-level cloud compute",
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
    name: "Plus",
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
    name: "Pro",
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
    name: "Elite",
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
    name: "Ultra",
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
    name: "Enterprise",
    price: "₹1,899",
    description: "Maximum cloud power",
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

const useCases = [
  { icon: Gamepad2, label: "Game Servers" },
  { icon: Globe, label: "Web Applications" },
  { icon: Code, label: "Development Environments" },
  { icon: Database, label: "Databases" },
  { icon: Server, label: "API Services" },
];

export default function VPSPlans() {
  const { openPopup } = useLaunchPopup();

  return (
    <>
      <SEOHead
        title="VPS Plans India - Cloud VPS from ₹199/mo | Cloud on Fire"
        description="Enterprise cloud VPS hosting in India starting from ₹199/month. Intel Xeon Platinum 8168 processors, NVMe storage, DDoS protection included. No hidden fees."
        keywords="VPS plans India, cloud VPS hosting, cheap VPS India, VPS pricing, server hosting India"
        canonical="/vps-plans"
        ogType="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Cloud on Fire VPS Plans",
          "description": "Enterprise cloud VPS hosting powered by Intel Xeon Platinum 8168",
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": "199",
            "highPrice": "1899",
            "offerCount": "6",
            "availability": "https://schema.org/InStock"
          }
        }}
      />
      <Layout>
        {/* Hero */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-10"
            >
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full mb-4">
                VPS Plans
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
                Cloud VPS Hosting
                <br />
                <span className="text-fire-gradient">Starting at ₹199/mo</span>
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground mb-6">
                Enterprise cloud compute for web apps, APIs, databases, and development. 
                All prices in INR, billed monthly. No setup fees.
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary">
                  <Cpu className="w-3.5 h-3.5" /> Intel Xeon Platinum
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary">
                  <HardDrive className="w-3.5 h-3.5" /> NVMe SSD
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary">
                  <Shield className="w-3.5 h-3.5" /> DDoS Protected
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Processor Highlight */}
        <section className="pb-12 sm:pb-16">
          <div className="container-wide max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 sm:p-8"
            >
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-primary/20 flex items-center justify-center">
                    <Cpu className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    Enterprise Cloud Compute Powered by Intel Xeon Platinum
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    All Cloud on Fire VPS plans are powered by Intel Xeon Platinum 8168 processors, enterprise-grade CPUs designed for large scale cloud infrastructure.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground mb-4">
                    {[
                      "24 physical cores per processor",
                      "48 threads with hyper-threading",
                      "Base clock 2.7 GHz with turbo boost",
                      "High-density virtualization environments",
                      "Enterprise hardware used in global datacenters",
                    ].map((spec) => (
                      <div key={spec} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground italic border-l-2 border-primary/50 pl-3">
                    "These processors deliver exceptional stability and strong single-core performance, making them ideal for applications such as game servers, web hosting, databases, and scalable backend services."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Plans */}
        <section className="pb-16 sm:pb-20">
          <div className="container-wide">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <PricingCard key={plan.name} {...plan} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="pb-16 sm:pb-20">
          <div className="container-wide">
            <SectionHeader
              badge="Use Cases"
              title="Built For Every Workload"
              description="From lightweight apps to enterprise backends, our VPS infrastructure handles it all."
            />
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
              {useCases.map((c) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 px-4 py-3 bg-card border border-border/50 rounded-xl text-sm text-foreground"
                >
                  <c.icon className="w-5 h-5 text-primary" />
                  <span>{c.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-card/60">
          <div className="container-wide text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to Deploy?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm sm:text-base">
              Get started with a Cloud on Fire VPS in minutes. No setup fees, no hidden charges.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button className="btn-fire w-full sm:w-auto" size="lg" onClick={openPopup}>
                <span className="relative z-10">Get Started</span>
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
