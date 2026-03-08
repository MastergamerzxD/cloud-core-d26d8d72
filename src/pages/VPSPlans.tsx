import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import PricingCard from "@/components/ui/PricingCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cpu, HardDrive, Shield, Server, Globe, Database, Code, Gamepad2, ArrowRight, Zap,
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

const processorSpecs = [
  "24 physical cores per processor",
  "48 threads with hyper-threading",
  "Base clock 2.7 GHz with turbo boost",
  "High-density virtualization environments",
  "Enterprise hardware used in global datacenters",
];

export default function VPSPlans() {
  const { openPopup } = useLaunchPopup();

  return (
    <>
      <SEOHead
        title="High Performance VPS Hosting in India | NVMe Cloud Servers — Cloud on Fire"
        description="Enterprise cloud VPS hosting in India starting from ₹199/month. Intel Xeon Platinum processors, NVMe SSD storage, advanced DDoS protection included. No hidden fees, no setup charges."
        keywords="VPS hosting India, cloud VPS India, cheap VPS India, NVMe VPS hosting, VPS plans India, high performance VPS, server hosting India, Cloud on Fire VPS"
        canonical="/vps-plans"
        ogType="product"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
        jsonLd={[
          ...plans.map((plan) => ({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${plan.name} VPS Plan`,
            description: plan.description,
            brand: { "@type": "Brand", name: "Cloud on Fire" },
            category: "Cloud VPS Hosting",
            image: "https://cloudonfire.com/images/logo-schema.png",
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: plan.price.replace(/[₹,]/g, ""),
              availability: "https://schema.org/PreOrder",
              seller: { "@type": "Organization", name: "Cloud on Fire" },
              priceValidUntil: "2027-12-31",
            },
          })),
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://cloudonfire.com/" },
              { "@type": "ListItem", position: 2, name: "VPS Plans", item: "https://cloudonfire.com/vps-plans" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What processor does Cloud on Fire VPS use?",
                acceptedAnswer: { "@type": "Answer", text: "All Cloud on Fire VPS plans are powered by Intel Xeon Platinum 8168 processors with 24 cores, 48 threads, and turbo boost up to 3.7GHz — enterprise-grade CPUs designed for cloud infrastructure." },
              },
              {
                "@type": "Question",
                name: "Is DDoS protection included with VPS plans?",
                acceptedAnswer: { "@type": "Answer", text: "Yes, all VPS plans include DDoS protection at no extra cost. Protection levels vary between standard and premium tiers." },
              },
              {
                "@type": "Question",
                name: "What is the cheapest VPS plan available?",
                acceptedAnswer: { "@type": "Answer", text: "The Starter VPS plan begins at ₹199/month and includes 2 vCPU cores, 4 GB DDR4 RAM, 30 GB NVMe storage, and DDoS protection." },
              },
            ],
          },
        ]}
      />
      <Layout>
        {/* Hero with animated background */}
        <section className="section-padding relative overflow-hidden">
          {/* Animated glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
          
          {/* Network grid overlay */}
          <div className="absolute inset-0 network-grid-bg opacity-50 pointer-events-none" />
          
          <div className="container-wide relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center mb-10"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glow-badge mb-6 inline-flex"
              >
                <Zap className="w-3.5 h-3.5" />
                VPS Plans
              </motion.span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-4 sm:mb-6">
                Cloud VPS Hosting
                <br />
                <span className="text-neon-gradient">Starting at ₹199/mo</span>
              </h1>
              
              <p className="text-sm sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Enterprise cloud compute for web apps, APIs, databases, and development. 
                All prices in INR, billed monthly. <span className="text-foreground font-medium">No setup fees, no surprises.</span>
              </p>
              
              {/* Glowing hardware badges */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {[
                  { icon: Cpu, label: "Intel Xeon Platinum", variant: "blue" },
                  { icon: HardDrive, label: "NVMe SSD", variant: "purple" },
                  { icon: Shield, label: "DDoS Protected", variant: "fire" },
                ].map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className={badge.variant === "fire" ? "glow-badge-fire" : "glow-badge"}
                  >
                    <badge.icon className="w-3.5 h-3.5" />
                    {badge.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gradient divider */}
        <div className="gradient-divider mx-auto max-w-4xl" />

        {/* Processor Highlight */}
        <section className="py-12 sm:py-16 relative">
          <div className="container-wide max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glow-card p-6 sm:p-8 lg:p-10"
            >
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />
              
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <motion.div 
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center relative"
                    style={{ background: "linear-gradient(135deg, hsl(217 91% 60% / 0.15), hsl(270 76% 60% / 0.1))" }}
                    animate={{ boxShadow: ["0 0 20px hsl(217 91% 60% / 0.1)", "0 0 40px hsl(217 91% 60% / 0.25)", "0 0 20px hsl(217 91% 60% / 0.1)"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Cpu className="w-10 h-10 sm:w-14 sm:h-14 text-neon-blue" />
                  </motion.div>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-2">
                    Enterprise Cloud Compute Powered by <span className="text-neon-gradient">Intel Xeon Platinum</span>
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base mb-5">
                    All Cloud on Fire VPS plans are powered by Intel Xeon Platinum 8168 processors — enterprise-grade CPUs designed for large scale cloud infrastructure.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-muted-foreground mb-5">
                    {processorSpecs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-neon-blue/70 flex-shrink-0 shadow-[0_0_6px_hsl(217_91%_60%_/_0.5)]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                  <div className="relative p-4 rounded-lg border border-neon-blue/15 bg-neon-blue/5">
                    <p className="text-xs sm:text-sm text-muted-foreground italic">
                      "These processors deliver exceptional stability and strong single-core performance, making them ideal for game servers, web hosting, databases, and scalable backend services."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gradient divider */}
        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* Plans */}
        <section className="py-16 sm:py-20 relative">
          {/* Background glow behind plans */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/3 rounded-full blur-[200px] pointer-events-none" />
          
          <div className="container-wide relative">
            <SectionHeader
              badge="Choose Your Plan"
              title="Powerful VPS Plans"
              description="From entry-level to enterprise. Pick the plan that fits your workload."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <PricingCard key={plan.name} {...plan} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Gradient divider */}
        <div className="gradient-divider mx-auto max-w-4xl" />

        {/* Use Cases */}
        <section className="py-16 sm:py-20">
          <div className="container-wide">
            <SectionHeader
              badge="Use Cases"
              title="Built For Every Workload"
              description="From lightweight apps to enterprise backends, our VPS infrastructure handles it all."
            />
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
              {useCases.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glow-card flex items-center gap-3 px-5 py-3.5 cursor-default"
                >
                  <c.icon className="w-5 h-5 text-neon-blue" />
                  <span className="text-sm text-foreground font-medium">{c.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gradient divider */}
        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* CTA */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="container-wide relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to <span className="text-fire-gradient">Deploy?</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm sm:text-base">
                Get started with a Cloud on Fire VPS in minutes. No setup fees, no hidden charges.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="btn-neon w-full sm:w-auto h-12 px-8 text-base" size="lg" onClick={openPopup}>
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Now
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
                <Link to="/gaming-vps">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50">
                    Explore Gaming VPS
                  </Button>
                </Link>
              </div>
              {/* Internal links */}
              <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <Link to="/gaming-vps" className="hover:text-primary transition-colors">Gaming VPS for Minecraft & FiveM →</Link>
                <Link to="/rdp" className="hover:text-primary transition-colors">Cloud RDP remote desktop →</Link>
                <Link to="/ddos-protection" className="hover:text-primary transition-colors">DDoS protection →</Link>
                <Link to="/why-us" className="hover:text-primary transition-colors">Why choose Cloud on Fire →</Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}