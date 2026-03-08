import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import PricingCard from "@/components/ui/PricingCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cpu, HardDrive, Shield, Server, Monitor, Code, Play, TrendingUp, Gamepad2, Lock, Wifi,
} from "lucide-react";

const rdpPlans = [
  {
    name: "Starter RDP",
    price: "Coming Soon",
    description: "Personal cloud desktop",
    type: "budget" as const,
    features: [
      "2 vCPU Cores",
      "4 GB DDR4 RAM",
      "50 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Windows Server License",
      "Remote Desktop Access",
      "Standard Support",
    ],
  },
  {
    name: "Pro RDP",
    price: "Coming Soon",
    description: "Professional workstation",
    type: "budget" as const,
    popular: true,
    features: [
      "4 vCPU Cores",
      "8 GB DDR4 RAM",
      "100 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Windows Server License",
      "Remote Desktop Access",
      "Priority Support",
    ],
  },
  {
    name: "Ultra RDP",
    price: "Coming Soon",
    description: "Power user desktop",
    type: "budget" as const,
    features: [
      "8 vCPU Cores",
      "16 GB DDR4 RAM",
      "200 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Windows Server License",
      "Remote Desktop Access",
      "Priority Support",
    ],
  },
];

const useCases = [
  { icon: Monitor, label: "Personal Cloud Desktop" },
  { icon: Code, label: "Coding & Development" },
  { icon: Play, label: "Video Editing" },
  { icon: TrendingUp, label: "Trading Software" },
  { icon: Gamepad2, label: "Light Gaming" },
];

const keyFeatures = [
  { icon: Cpu, label: "Enterprise Intel Xeon CPUs" },
  { icon: HardDrive, label: "NVMe SSD Storage" },
  { icon: Wifi, label: "High-speed Cloud Networking" },
  { icon: Lock, label: "Secure Remote Desktop Access" },
  { icon: Server, label: "Stable Datacenter Infrastructure" },
  { icon: Shield, label: "DDoS Protection Included" },
];

export default function RDP() {
  return (
    <>
      <SEOHead
        title="High Performance RDP India - Cloud Desktop | Cloud on Fire"
        description="High performance cloud RDP desktop powered by Intel Xeon Platinum 8168. Access a powerful cloud workstation from anywhere for development, trading, editing, and more."
        keywords="RDP India, cloud desktop, remote desktop, Windows RDP, cloud workstation, high performance RDP"
        canonical="/rdp"
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
                High Performance RDP
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
                Cloud Desktop
                <br />
                <span className="text-fire-gradient">Access From Anywhere</span>
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground mb-6">
                Cloud on Fire RDP provides a powerful cloud desktop that can be accessed from anywhere. 
                Each RDP instance runs on enterprise infrastructure powered by Intel Xeon Platinum 8168 processors, 
                delivering workstation-level performance in the cloud.
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary">
                  <Cpu className="w-3.5 h-3.5" /> Intel Xeon Platinum
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary">
                  <HardDrive className="w-3.5 h-3.5" /> NVMe SSD
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary">
                  <Monitor className="w-3.5 h-3.5" /> Windows RDP
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="pb-12 sm:pb-16">
          <div className="container-wide">
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

        {/* Key Features */}
        <section className="pb-12 sm:pb-16">
          <div className="container-wide max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 sm:p-8"
            >
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6 text-center">
                Enterprise Infrastructure Features
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {keyFeatures.map((feature) => (
                  <div key={feature.label} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border/30">
                    <feature.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Plans */}
        <section className="section-padding bg-card/60">
          <div className="container-wide">
            <SectionHeader
              badge="RDP Plans"
              title="High Performance RDP Plans"
              description="Powerful cloud desktops for every use case."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {rdpPlans.map((plan, index) => (
                <PricingCard key={plan.name} {...plan} index={index} />
              ))}
            </div>
            <p className="text-center text-xs sm:text-sm text-muted-foreground mt-8 italic">
              RDP plan specifications and pricing will be finalized later.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-wide text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Interested in Cloud RDP?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm sm:text-base">
              Get notified when our RDP plans launch. Contact us for early access or custom requirements.
            </p>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
}
