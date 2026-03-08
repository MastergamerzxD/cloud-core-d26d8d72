import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import PricingCard from "@/components/ui/PricingCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Cpu, HardDrive, Shield, Zap, Lock, Wifi, Gamepad2, Play, Layers, Globe,
  ArrowRight, Activity, Server, Sword, Users, Gauge,
} from "lucide-react";
import { useLaunchPopup } from "@/hooks/useLaunchPopup";
import minecraftImg from "@/assets/game-minecraft.jpg";
import fivemImg from "@/assets/game-fivem.jpg";
import hytaleImg from "@/assets/game-hytale.jpg";

const gamingPlans = [
  {
    name: "Gamer Start",
    price: "₹299",
    description: "Entry-level game hosting",
    type: "pro" as const,
    features: [
      "2 vCPU Cores",
      "4 GB DDR4 RAM",
      "30 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Gaming Support",
    ],
  },
  {
    name: "Gamer Plus",
    price: "₹499",
    description: "Popular for small servers",
    type: "pro" as const,
    popular: true,
    features: [
      "4 vCPU Cores",
      "6 GB DDR4 RAM",
      "60 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Gaming Support",
    ],
  },
  {
    name: "Gamer Pro",
    price: "₹799",
    description: "For modded servers",
    type: "pro" as const,
    features: [
      "6 vCPU Cores",
      "12 GB DDR4 RAM",
      "100 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Gaming Support",
    ],
  },
  {
    name: "Gamer Elite",
    price: "₹999",
    description: "Large player counts",
    type: "pro" as const,
    features: [
      "8 vCPU Cores",
      "20 GB DDR4 RAM",
      "150 GB NVMe Storage",
      "Unmetered Bandwidth",
      "Advanced DDoS Protection",
      "1x IPv4 Address",
      "Priority Gaming Support",
    ],
  },
  {
    name: "Gamer Ultimate",
    price: "₹1,399",
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
    price: "₹1,999",
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

const gameCards = [
  {
    title: "Minecraft Servers",
    image: minecraftImg,
    alt: "Minecraft server hosting on Cloud on Fire gaming VPS India",
    description: "Host SMP worlds, modpacks, and large Minecraft communities with powerful server performance and low latency.",
    icon: Sword,
    accent: "from-green-500/30 to-emerald-600/20",
    borderAccent: "border-green-500/30 hover:border-green-400/60",
    glowColor: "hover:shadow-[0_0_40px_hsl(142_71%_45%_/_0.2)]",
    iconColor: "text-green-400",
  },
  {
    title: "FiveM Servers",
    image: fivemImg,
    alt: "FiveM GTA RP server hosting on Cloud on Fire gaming VPS India",
    description: "Run high-performance FiveM servers with heavy scripts, custom maps, and large roleplay communities.",
    icon: Play,
    accent: "from-purple-500/30 to-cyan-500/20",
    borderAccent: "border-purple-500/30 hover:border-purple-400/60",
    glowColor: "hover:shadow-[0_0_40px_hsl(270_76%_60%_/_0.2)]",
    iconColor: "text-purple-400",
  },
  {
    title: "Hytale Servers",
    image: hytaleImg,
    alt: "Hytale game server hosting on Cloud on Fire gaming VPS India",
    description: "Prepare for the next generation sandbox multiplayer experience with powerful infrastructure optimized for Hytale worlds.",
    icon: Layers,
    accent: "from-cyan-500/30 to-blue-500/20",
    borderAccent: "border-cyan-500/30 hover:border-cyan-400/60",
    glowColor: "hover:shadow-[0_0_40px_hsl(187_92%_55%_/_0.2)]",
    iconColor: "text-cyan-400",
  },
];

const performanceMetrics = [
  {
    icon: Gamepad2,
    title: "Minecraft Servers",
    description: "High tick stability with large player counts. Run modpacks, plugins, and massive worlds without TPS drops.",
    stat: "20 TPS",
    statLabel: "Stable Tick Rate",
  },
  {
    icon: Play,
    title: "FiveM Servers",
    description: "Smooth performance even with heavy scripts, custom vehicles, and large roleplay communities connected simultaneously.",
    stat: "64+",
    statLabel: "Player Slots",
  },
  {
    icon: Sword,
    title: "Modded Servers",
    description: "Reliable performance for plugin-heavy environments. Run complex mod setups without memory leaks or instability.",
    stat: "99.9%",
    statLabel: "Uptime SLA",
  },
];

export default function GamingVPS() {
  const { openPopup } = useLaunchPopup();

  return (
    <>
      <SEOHead
        title="Gaming VPS Hosting for Minecraft & FiveM | Low Latency Servers India — Cloud on Fire"
        description="Gaming VPS optimized for multiplayer performance. Host Minecraft, FiveM, Hytale, and modded game servers on Intel Xeon Platinum with advanced DDoS protection. Starting at ₹299/month in India."
        keywords="gaming VPS India, Minecraft server hosting India, FiveM server hosting, game server India, multiplayer VPS, low latency gaming VPS, DDoS protected game server, Hytale server hosting, Cloud on Fire gaming"
        canonical="/gaming-vps"
        ogType="product"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
        jsonLd={[
          ...gamingPlans.map((plan) => ({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${plan.name} — Gaming VPS`,
            description: plan.description,
            brand: { "@type": "Brand", name: "Cloud on Fire" },
            category: "Gaming VPS Hosting",
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
              { "@type": "ListItem", position: 2, name: "Gaming VPS", item: "https://cloudonfire.com/gaming-vps" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Can I host a Minecraft server on Cloud on Fire?",
                acceptedAnswer: { "@type": "Answer", text: "Yes. Cloud on Fire Gaming VPS is optimized for Minecraft server hosting. Our Intel Xeon Platinum processors deliver stable 20 TPS even with modpacks, plugins, and large player counts. Plans start at ₹299/month." },
              },
              {
                "@type": "Question",
                name: "Can I host a FiveM server on Cloud on Fire?",
                acceptedAnswer: { "@type": "Answer", text: "Yes. Our Gaming VPS supports FiveM servers with heavy scripts, custom vehicles, and 64+ player slots. Advanced DDoS protection ensures your roleplay community stays online." },
              },
              {
                "@type": "Question",
                name: "Is DDoS protection included for gaming VPS?",
                acceptedAnswer: { "@type": "Answer", text: "Yes, all Gaming VPS plans include advanced DDoS protection at no extra cost with up to 1Tbps mitigation capacity. Your game servers stay online during attacks." },
              },
              {
                "@type": "Question",
                name: "What games can I host on Cloud on Fire Gaming VPS?",
                acceptedAnswer: { "@type": "Answer", text: "You can host Minecraft, FiveM (GTA RP), Hytale, Rust, CS2, ARK, Valheim, and any other game server that runs on Linux or Windows VPS. Our infrastructure is optimized for low-latency multiplayer gaming." },
              },
            ],
          },
        ]}
      />
      <Layout>
        {/* Hero - Gaming themed */}
        <section className="section-padding relative overflow-hidden">
          {/* Gaming-themed background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[150px] animate-pulse-glow" />
            <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-neon-purple/6 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-fire-red/5 rounded-full blur-[100px]" />
          </div>
          {/* Network grid */}
          <div className="absolute inset-0 network-grid-bg opacity-40 pointer-events-none" />
          
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
                className="glow-badge-fire mb-6 inline-flex"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                Gaming VPS
              </motion.span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-4 sm:mb-6">
                Gaming VPS
                <br />
                <span className="text-fire-gradient">Built for Multiplayer Performance</span>
              </h1>
              
              <p className="text-sm sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Gaming VPS nodes are optimized specifically for hosting multiplayer game servers 
                and real-time gaming environments. <span className="text-foreground font-medium">Starting at just ₹299/month.</span>
              </p>

              {/* Glowing hardware badges */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { icon: Cpu, label: "Intel Xeon Platinum" },
                  { icon: HardDrive, label: "NVMe SSD" },
                  { icon: Shield, label: "DDoS Protected" },
                  { icon: Zap, label: "Unmetered Bandwidth" },
                ].map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="glow-badge-fire"
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
        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* Game Cards Section */}
        <section className="py-16 sm:py-20 relative">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[150px]" />
          </div>
          <div className="container-wide relative">
            <SectionHeader
              badge="🎮 Games"
              title="Perfect For Your Favorite Games"
              description="Host the most popular multiplayer games with enterprise infrastructure designed for gaming workloads."
            />
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {gameCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-xl border ${card.borderAccent} bg-card/80 backdrop-blur-xl transition-all duration-500 ${card.glowColor} hover:-translate-y-2`}
                >
                  {/* Game image with overlay */}
                  <div className="relative h-44 sm:h-48 overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${card.accent} to-transparent`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    
                    {/* Floating icon */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-10 h-10 rounded-lg bg-background/80 backdrop-blur-sm border border-white/10 flex items-center justify-center ${card.iconColor}`}>
                        <card.icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gradient divider */}
        <div className="gradient-divider mx-auto max-w-4xl" />

        {/* Performance Section */}
        <section className="py-16 sm:py-20 relative">
          <div className="container-wide">
            <SectionHeader
              badge="⚡ Performance"
              title="Performance Built for Multiplayer Servers"
              description="Our Intel Xeon Platinum infrastructure delivers the stability and power gaming servers demand."
            />
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
              {performanceMetrics.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glow-card p-6 sm:p-7 group"
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <metric.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground">{metric.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground mb-5 leading-relaxed">
                    {metric.description}
                  </p>
                  
                  {/* Performance stat */}
                  <div className="flex items-end gap-2 pt-4 border-t border-border/30">
                    <span className="text-2xl sm:text-3xl font-extrabold text-fire-gradient">{metric.stat}</span>
                    <span className="text-xs text-muted-foreground mb-1">{metric.statLabel}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gradient divider */}
        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* Processor Highlight */}
        <section className="py-12 sm:py-16">
          <div className="container-wide max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glow-card glow-card-popular p-6 sm:p-8 lg:p-10"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <motion.div 
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, hsl(24 95% 53% / 0.2), hsl(4 90% 58% / 0.15))" }}
                    animate={{ boxShadow: ["0 0 20px hsl(24 95% 53% / 0.15)", "0 0 50px hsl(24 95% 53% / 0.3)", "0 0 20px hsl(24 95% 53% / 0.15)"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Cpu className="w-10 h-10 sm:w-14 sm:h-14 text-primary" />
                  </motion.div>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-2">
                    Gaming Infrastructure — <span className="text-fire-gradient">Intel Xeon Platinum</span>
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base mb-5">
                    Powered by Intel Xeon Platinum 8168 processors, delivering strong single-core performance essential for game server workloads and large player counts.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-muted-foreground mb-5">
                    {[
                      "24 physical cores per processor",
                      "48 threads with hyper-threading",
                      "Base clock 2.7 GHz with turbo boost",
                      "High-density virtualization environments",
                      "Enterprise hardware used in global datacenters",
                    ].map((spec) => (
                      <div key={spec} className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-primary/70 flex-shrink-0 shadow-[0_0_6px_hsl(24_95%_53%_/_0.5)]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-lg border border-primary/15 bg-primary/5">
                    <p className="text-xs sm:text-sm text-muted-foreground italic">
                      "With powerful Xeon Platinum infrastructure, Cloud on Fire Gaming VPS can handle large player bases, complex plugins, and modded environments without lag or instability."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* DDoS Protection */}
        <section className="pb-12 sm:pb-16">
          <div className="container-wide max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glow-card p-6 sm:p-8 lg:p-10"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent" />
              
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <motion.div 
                    className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, hsl(217 91% 60% / 0.15), hsl(4 90% 58% / 0.1))" }}
                    animate={{ boxShadow: ["0 0 20px hsl(217 91% 60% / 0.1)", "0 0 40px hsl(217 91% 60% / 0.25)", "0 0 20px hsl(217 91% 60% / 0.1)"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Shield className="w-10 h-10 sm:w-14 sm:h-14 text-neon-blue" />
                  </motion.div>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-2">
                    Advanced <span className="text-neon-gradient">DDoS Protection</span>
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base mb-5">
                    Gaming servers are frequent targets of attacks. Cloud on Fire includes advanced network-level protection designed to keep servers online even during malicious traffic events.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-muted-foreground mb-5">
                    {[
                      { icon: Zap, label: "Automatic attack detection" },
                      { icon: Lock, label: "Real-time mitigation" },
                      { icon: Wifi, label: "High capacity network filtering" },
                      { icon: Shield, label: "Protection against volumetric attacks" },
                      { icon: Activity, label: "Intelligent traffic scrubbing" },
                      { icon: Globe, label: "Network-level defense layer" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2.5">
                        <item.icon className="w-4 h-4 text-neon-blue flex-shrink-0" />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-lg border border-neon-blue/15 bg-neon-blue/5">
                    <p className="text-xs sm:text-sm text-muted-foreground italic">
                      "Our infrastructure continuously monitors incoming traffic to filter malicious packets and maintain server availability."
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
        <section className="py-16 sm:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-card/40 to-transparent pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/3 rounded-full blur-[200px] pointer-events-none" />
          
          <div className="container-wide relative">
            <SectionHeader
              badge="🔥 Gaming Plans"
              title="Choose Your Gaming VPS"
              description="All gaming plans include advanced DDoS protection, unmetered bandwidth, and gaming-optimized support."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {gamingPlans.map((plan, index) => (
                <PricingCard key={plan.name} {...plan} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Gradient divider */}
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
                Ready to Launch Your <span className="text-fire-gradient">Game Server?</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-sm sm:text-base">
                Deploy a high-performance gaming VPS in minutes. Built for Minecraft, FiveM, and more.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="btn-fire w-full sm:w-auto h-12 px-8 text-base" size="lg" onClick={openPopup}>
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Now
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
                <Link to="/vps-plans">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/50">
                    Compare VPS Plans
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