import PreOrderBanner from "@/components/PreOrderBanner";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import PricingCard from "@/components/ui/PricingCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cpu, HardDrive, Shield, Monitor, Code, Play, TrendingUp, Gamepad2, Lock, Wifi, ArrowRight, Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  { icon: Cpu, label: "Enterprise Intel Xeon CPUs", description: "Intel Xeon Platinum 8168 processors for workstation-level performance." },
  { icon: HardDrive, label: "NVMe SSD Storage", description: "Enterprise NVMe Gen4 drives with up to 7GB/s read speeds." },
  { icon: Wifi, label: "High-speed Networking", description: "1Gbps uplinks with optimized routing for smooth remote access." },
  { icon: Lock, label: "Secure Remote Access", description: "Encrypted RDP connections with enterprise-grade security." },
  { icon: Monitor, label: "Windows Server", description: "Licensed Windows Server with full administrator access." },
  { icon: Shield, label: "DDoS Protection", description: "Always-on enterprise DDoS mitigation included on every plan." },
];

export default function RDP() {
  return (
    <>
      <SEOHead
        title="Cloud RDP Servers | Remote Desktop Hosting | Cloud on Fire"
        description="High performance remote desktop servers powered by Intel Xeon Platinum processors for development, remote work, and software workloads."
        keywords="cloud RDP India, remote desktop hosting, Windows RDP server, cloud desktop India, high performance RDP, remote workstation India, Cloud on Fire RDP"
        canonical="/rdp"
        ogImage="https://cloudonfire.com/images/og-logo.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://cloudonfire.com/" },
              { "@type": "ListItem", position: 2, name: "Cloud RDP", item: "https://cloudonfire.com/rdp" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Cloud RDP?",
                acceptedAnswer: { "@type": "Answer", text: "Cloud RDP is a remote desktop service that lets you access a powerful Windows cloud workstation from anywhere. Cloud on Fire RDP runs on Intel Xeon Platinum processors with NVMe storage and full administrator access." },
              },
              {
                "@type": "Question",
                name: "What can I use Cloud RDP for?",
                acceptedAnswer: { "@type": "Answer", text: "Cloud RDP is ideal for coding and development, video editing, trading software, running business applications, and accessing a personal cloud desktop from any device." },
              },
            ],
          },
        ]}
      />
      <Layout>
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 network-grid-bg opacity-30 pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="container-wide relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-10"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glow-badge mb-6 inline-flex"
              >
                <Monitor className="w-3.5 h-3.5" />
                High Performance RDP
              </motion.span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-4 sm:mb-6">
                Cloud Desktop
                <br />
                <span className="text-neon-gradient">Access From Anywhere</span>
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Cloud on Fire RDP provides a powerful cloud desktop accessible from anywhere. 
                Each instance runs on enterprise infrastructure powered by Intel Xeon Platinum 8168, 
                delivering <span className="text-foreground font-medium">workstation-level performance in the cloud.</span>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { icon: Cpu, label: "Intel Xeon Platinum" },
                  { icon: HardDrive, label: "NVMe SSD" },
                  { icon: Monitor, label: "Windows RDP" },
                ].map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="glow-badge"
                  >
                    <badge.icon className="w-3.5 h-3.5" />
                    {badge.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

        {/* Use Cases */}
        <section className="py-12 sm:py-16">
          <div className="container-wide">
            <SectionHeader
              badge="Use Cases"
              title="Built for Every Workflow"
              description="From personal desktops to professional workstations."
            />
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
              {useCases.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glow-card flex items-center gap-3 px-5 py-3.5 !rounded-xl cursor-default"
                >
                  <c.icon className="w-5 h-5 text-neon-blue" />
                  <span className="text-sm text-foreground font-medium">{c.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* Key Features */}
        <section className="py-16 sm:py-20">
          <div className="container-wide">
            <SectionHeader
              badge="Features"
              title="Enterprise Infrastructure Features"
              description="Every RDP instance runs on the same enterprise hardware powering our VPS platform."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {keyFeatures.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glow-card p-6 !rounded-2xl group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{feature.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

        {/* Plans */}
        <section className="py-16 sm:py-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-neon-blue/3 rounded-full blur-[200px] pointer-events-none" />
          <div className="container-wide relative">
            <SectionHeader
              badge="RDP Plans"
              title="High Performance RDP Plans"
              description="Powerful cloud desktops for every use case."
            />
            <PreOrderBanner />
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

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* FAQ Section */}
        <section className="py-16 sm:py-20">
          <div className="container-wide max-w-3xl">
            <SectionHeader
              badge="FAQ"
              title="RDP Questions"
              description="Common questions about Cloud on Fire remote desktop servers."
            />
            <Accordion type="single" collapsible className="space-y-3">
              {[
                { q: "What is Cloud RDP?", a: "Cloud RDP is a remote desktop service that lets you access a powerful Windows cloud workstation from anywhere. Cloud on Fire RDP runs on Intel Xeon Platinum processors with NVMe storage and full administrator access." },
                { q: "What can I use Cloud RDP for?", a: "Cloud RDP is ideal for coding and development, video editing, trading software, running business applications, and accessing a personal cloud desktop from any device." },
                { q: "Is a Windows license included?", a: "Yes, all RDP plans include a licensed Windows Server installation with full administrator access at no additional cost." },
                { q: "Can I install my own software?", a: "Yes, you get full administrator access to your cloud desktop. You can install any software that runs on Windows Server." },
                { q: "How do I connect to my RDP server?", a: "You can connect using the built-in Remote Desktop Connection client on Windows, or any RDP client on macOS, Linux, iOS, or Android." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glow-card !rounded-xl px-6 border-border/30">
                  <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

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
                Interested in <span className="text-neon-gradient">Cloud RDP?</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm sm:text-base">
                Get notified when our RDP plans launch. Contact us for early access or custom requirements.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <Button size="lg" className="btn-neon w-full sm:w-auto h-12 px-8">
                    <span className="relative z-10 flex items-center gap-2">
                      Contact Sales
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
                <Link to="/vps-plans">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50">
                    Explore VPS Plans
                  </Button>
                </Link>
              </div>
              {/* Internal links */}
              <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <Link to="/vps-plans" className="hover:text-primary transition-colors">Standard VPS hosting →</Link>
                <Link to="/gaming-vps" className="hover:text-primary transition-colors">Gaming VPS hosting →</Link>
                <Link to="/ddos-protection" className="hover:text-primary transition-colors">DDoS protection →</Link>
                <Link to="/infrastructure" className="hover:text-primary transition-colors">Infrastructure details →</Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
