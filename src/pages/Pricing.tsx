import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import PricingCard from "@/components/ui/PricingCard";
import { motion } from "framer-motion";
import { 
  Cpu, 
  HardDrive, 
  Shield, 
  Server, 
  Globe, 
  Database, 
  Code, 
  Gamepad2, 
  Monitor,
  Zap,
  Lock,
  Wifi,
  Play,
  TrendingUp,
  Layers
} from "lucide-react";

const vpsPlans = [
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

const gamingPlans = [
  {
    name: "Gamer Start",
    price: "₹199",
    description: "Entry-level game hosting",
    type: "pro" as const,
    features: [
      "2 vCPU Cores",
      "4 GB DDR4 RAM",
      "30 GB NVMe Storage",
      "1000 GB Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Gaming Support",
    ],
  },
  {
    name: "Gamer Plus",
    price: "₹399",
    description: "Popular for small servers",
    type: "pro" as const,
    popular: true,
    features: [
      "4 vCPU Cores",
      "6 GB DDR4 RAM",
      "60 GB NVMe Storage",
      "2000 GB Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Gaming Support",
    ],
  },
  {
    name: "Gamer Pro",
    price: "₹699",
    description: "For modded servers",
    type: "pro" as const,
    features: [
      "6 vCPU Cores",
      "12 GB DDR4 RAM",
      "100 GB NVMe Storage",
      "4000 GB Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Gaming Support",
    ],
  },
  {
    name: "Gamer Elite",
    price: "₹899",
    description: "Large player counts",
    type: "pro" as const,
    features: [
      "8 vCPU Cores",
      "20 GB DDR4 RAM",
      "150 GB NVMe Storage",
      "10,000 GB Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Priority Gaming Support",
    ],
  },
  {
    name: "Gamer Ultimate",
    price: "₹1,199",
    description: "Community networks",
    type: "pro" as const,
    features: [
      "10 vCPU Cores",
      "32 GB DDR4 RAM",
      "150 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Priority Gaming Support",
    ],
  },
  {
    name: "Gamer Enterprise",
    price: "₹1,899",
    description: "Maximum gaming power",
    type: "pro" as const,
    features: [
      "20 vCPU Cores",
      "64 GB DDR4 RAM",
      "200 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Priority Gaming Support",
    ],
  },
];

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

const vpsUseCases = [
  { icon: Gamepad2, label: "Game Servers" },
  { icon: Globe, label: "Web Applications" },
  { icon: Code, label: "Development" },
  { icon: Database, label: "Databases" },
  { icon: Server, label: "API Services" },
];

const gamingUseCases = [
  { icon: Gamepad2, label: "Minecraft" },
  { icon: Play, label: "FiveM / GTA RP" },
  { icon: Layers, label: "Hytale" },
  { icon: Zap, label: "Modded Games" },
  { icon: Globe, label: "Gaming Networks" },
];

const rdpUseCases = [
  { icon: Monitor, label: "Cloud Desktop" },
  { icon: Code, label: "Development" },
  { icon: Play, label: "Video Editing" },
  { icon: TrendingUp, label: "Trading Software" },
  { icon: Gamepad2, label: "Light Gaming" },
];

const HardwareBadge = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary">
    <Icon className="w-3.5 h-3.5" />
    <span>{label}</span>
  </div>
);

const ProcessorHighlight = ({ variant = "default" }: { variant?: "default" | "gaming" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`glass-card p-6 sm:p-8 mb-12 ${variant === "gaming" ? "border-primary/30 bg-primary/5" : ""}`}
  >
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
      <div className="flex-shrink-0 flex items-center justify-center">
        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center ${variant === "gaming" ? "bg-gradient-to-br from-primary/30 to-orange-500/30" : "bg-gradient-to-br from-blue-500/20 to-primary/20"}`}>
          <Cpu className={`w-10 h-10 sm:w-12 sm:h-12 ${variant === "gaming" ? "text-primary" : "text-blue-400"}`} />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
          {variant === "gaming" 
            ? "Gaming Infrastructure — Intel Xeon Platinum" 
            : "Enterprise Cloud Compute Powered by Intel Xeon Platinum"
          }
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          {variant === "gaming"
            ? "Powered by Intel Xeon Platinum 8168 processors, delivering strong single-core performance essential for game server workloads and large player counts."
            : "All Cloud on Fire VPS plans are powered by Intel Xeon Platinum 8168 processors, enterprise-grade CPUs designed for large scale cloud infrastructure."
          }
        </p>
        <div className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>24 physical cores per processor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>48 threads with hyper-threading</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Base clock 2.7 GHz with turbo boost</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>High-density virtualization ready</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground italic border-l-2 border-primary/50 pl-3">
          {variant === "gaming"
            ? "\"With powerful Xeon Platinum infrastructure, Cloud on Fire Gaming VPS can handle large player bases, complex plugins, and modded environments without lag or instability.\""
            : "\"These processors deliver exceptional stability and strong single-core performance, making them ideal for applications such as game servers, web hosting, databases, and scalable backend services.\""
          }
        </p>
      </div>
    </div>
  </motion.div>
);

const DDoSSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass-card p-6 sm:p-8 mb-12 border-primary/30 bg-gradient-to-br from-primary/5 to-orange-500/5"
  >
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
      <div className="flex-shrink-0 flex items-center justify-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-red-500/30 flex items-center justify-center">
          <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
          Advanced DDoS Protection
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Gaming servers are frequent targets of attacks. Cloud on Fire includes advanced network-level protection designed to keep servers online even during malicious traffic events.
        </p>
        <div className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span>Automatic attack detection</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-primary" />
            <span>Real-time mitigation</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-3.5 h-3.5 text-primary" />
            <span>High capacity network filtering</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span>Intelligent traffic scrubbing</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground italic border-l-2 border-primary/50 pl-3">
          "Our infrastructure continuously monitors incoming traffic to filter malicious packets and maintain server availability."
        </p>
      </div>
    </div>
  </motion.div>
);

const UseCaseBar = ({ cases }: { cases: { icon: any; label: string }[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 mb-4"
  >
    {cases.map((c) => (
      <div key={c.label} className="flex items-center gap-2 px-3 py-2 bg-card/80 border border-border/50 rounded-lg text-xs sm:text-sm text-muted-foreground">
        <c.icon className="w-4 h-4 text-primary" />
        <span>{c.label}</span>
      </div>
    ))}
  </motion.div>
);

export default function Pricing() {
  return (
    <>
      <SEOHead
        title="VPS Pricing India - Cloud VPS, Gaming VPS & RDP from ₹199/mo | Cloud on Fire"
        description="Transparent VPS pricing in India. VPS Plans from ₹199/month, Gaming VPS for Minecraft & FiveM, High Performance RDP. Intel Xeon Platinum 8168 processors. No hidden fees."
        keywords="VPS pricing India, gaming VPS price, Minecraft server hosting, FiveM server, cloud RDP, VPS cost India, affordable server hosting"
        canonical="/pricing"
        ogType="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Cloud on Fire VPS Hosting",
          "description": "High-performance VPS hosting with Intel Platinum 8168 and DDoS protection",
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": "199",
            "highPrice": "1899",
            "offerCount": "15",
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
              className="max-w-3xl mx-auto text-center mb-8"
            >
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full mb-4">
                Pricing
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
                Simple, Transparent
                <br />
                <span className="text-fire-gradient">Cloud Pricing</span>
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground mb-6">
                All prices in INR. Billed monthly. No setup fees, no surprises.
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                <HardwareBadge icon={Cpu} label="Intel Xeon Platinum" />
                <HardwareBadge icon={HardDrive} label="NVMe SSD" />
                <HardwareBadge icon={Shield} label="DDoS Protected" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* VPS Plans */}
        <section className="pb-16 sm:pb-20">
          <div className="container-wide">
            <SectionHeader
              badge="VPS Plans"
              title="Cloud VPS Hosting"
              description="Enterprise cloud compute for web apps, databases, and development environments."
            />

            <ProcessorHighlight />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {vpsPlans.map((plan, index) => (
                <PricingCard key={plan.name} {...plan} index={index} />
              ))}
            </div>

            <UseCaseBar cases={vpsUseCases} />
          </div>
        </section>

        {/* Gaming VPS */}
        <section className="section-padding bg-gradient-to-b from-primary/5 via-card/60 to-card/60">
          <div className="container-wide">
            <SectionHeader
              badge="Gaming VPS"
              title="Gaming VPS — Built for Multiplayer Performance"
              description="Gaming VPS nodes are optimized specifically for hosting multiplayer game servers and real-time gaming environments."
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
            >
              {gamingUseCases.map((c) => (
                <div key={c.label} className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-xs sm:text-sm font-medium text-primary">
                  <c.icon className="w-4 h-4" />
                  <span>{c.label}</span>
                </div>
              ))}
            </motion.div>

            <ProcessorHighlight variant="gaming" />
            <DDoSSection />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {gamingPlans.map((plan, index) => (
                <PricingCard key={plan.name} {...plan} index={index} />
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-xs sm:text-sm text-muted-foreground mt-8 italic"
            >
              Gaming VPS pricing is currently identical to VPS Plans and may change in future revisions.
            </motion.p>
          </div>
        </section>

        {/* High Performance RDP */}
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeader
              badge="High Performance RDP"
              title="Cloud Desktop Access"
              description="A powerful cloud desktop that can be accessed from anywhere. Each RDP instance runs on enterprise infrastructure powered by Intel Xeon Platinum 8168 processors."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 sm:p-8 mb-12 max-w-4xl mx-auto"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: Cpu, label: "Enterprise Intel Xeon CPUs" },
                  { icon: HardDrive, label: "NVMe SSD Storage" },
                  { icon: Wifi, label: "High-speed Cloud Networking" },
                  { icon: Lock, label: "Secure Remote Desktop Access" },
                  { icon: Server, label: "Stable Datacenter Infrastructure" },
                  { icon: Shield, label: "DDoS Protection Included" },
                ].map((feature) => (
                  <div key={feature.label} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border/30">
                    <feature.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {rdpPlans.map((plan, index) => (
                <PricingCard key={plan.name} {...plan} index={index} />
              ))}
            </div>

            <UseCaseBar cases={rdpUseCases} />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-xs sm:text-sm text-muted-foreground mt-6 italic"
            >
              RDP plan specifications and pricing will be finalized later.
            </motion.p>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-card/60">
          <div className="container-wide">
            <SectionHeader
              badge="FAQ"
              title="Common Questions"
            />

            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
              {[
                {
                  q: "What payment methods do you accept?",
                  a: "We accept UPI, credit/debit cards, net banking, and popular payment wallets.",
                },
                {
                  q: "Is there a setup fee?",
                  a: "No, there are no setup fees. You only pay the monthly subscription price.",
                },
                {
                  q: "Can I upgrade my plan later?",
                  a: "Yes, you can upgrade your plan at any time. The price difference will be prorated.",
                },
                {
                  q: "What's your refund policy?",
                  a: "We offer a 7-day money-back guarantee on all plans. No questions asked.",
                },
                {
                  q: "What processor do you use?",
                  a: "All our VPS plans are powered by Intel Xeon Platinum 8168 processors with 24 cores and turbo up to 3.7GHz.",
                },
              ].map((item) => (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="glass-card p-4 sm:p-6"
                >
                  <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{item.q}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{item.a}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10 sm:mt-12">
              <p className="text-muted-foreground mb-4 text-sm">
                Need a custom plan or have specific requirements?
              </p>
              <Link to="/contact">
                <Button variant="outline" size="lg">
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
