import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Cpu, Gamepad2, Sword, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";

const features = [
  "Stable 20 TPS even with 40+ players",
  "NVMe SSD for instant world loading",
  "Advanced DDoS protection included",
  "Supports Vanilla, Paper, Spigot, Forge, Fabric",
  "Full root access — install any modpack",
  "Unmetered bandwidth on all gaming plans",
  "Plans starting at ₹299/month",
  "Indian data centers for low latency",
];

const plans = [
  { name: "Gamer Start", price: "₹299/mo", players: "10-20 players", ram: "4 GB RAM" },
  { name: "Gamer Plus", price: "₹499/mo", players: "20-40 players", ram: "6 GB RAM" },
  { name: "Gamer Pro", price: "₹799/mo", players: "40-80 players", ram: "12 GB RAM" },
  { name: "Gamer Elite", price: "₹999/mo", players: "80-150 players", ram: "20 GB RAM" },
];

export default function MinecraftHostingIndia() {
  return (
    <>
      <SEOHead
        title="Minecraft Server Hosting India – Low Lag, DDoS Protected | Cloud on Fire"
        description="Host your Minecraft server in India with Cloud on Fire. Stable 20 TPS, NVMe SSD, DDoS protection, and full root access from ₹299/month. Best Minecraft hosting in India."
        keywords="Minecraft server hosting India, Minecraft VPS India, Minecraft hosting, game server hosting India, Cloud on Fire Minecraft, best Minecraft hosting India"
        canonical="/minecraft-hosting-india"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Cloud on Fire Minecraft Server Hosting India",
            description: "High-performance Minecraft server hosting in India with DDoS protection and NVMe storage.",
            brand: { "@type": "Brand", name: "Cloud on Fire" },
            category: "Minecraft Server Hosting",
            image: "https://cloudonfire.com/images/logo-schema.png",
            offers: { "@type": "AggregateOffer", priceCurrency: "INR", lowPrice: "299", highPrice: "1999", offerCount: "6", availability: "https://schema.org/PreOrder" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", bestRating: "5", ratingCount: "85" },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "What is the best Minecraft server hosting in India?", acceptedAnswer: { "@type": "Answer", text: "Cloud on Fire offers the best Minecraft server hosting in India with Intel Xeon Platinum processors, NVMe SSD storage, advanced DDoS protection, and plans starting at ₹299/month." } },
              { "@type": "Question", name: "How many players can a Cloud on Fire Minecraft server support?", acceptedAnswer: { "@type": "Answer", text: "Depending on the plan, Cloud on Fire Minecraft servers can support 10 to 150+ players with stable 20 TPS performance." } },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://cloudonfire.com/" },
              { "@type": "ListItem", position: 2, name: "Minecraft Hosting India", item: "https://cloudonfire.com/minecraft-hosting-india" },
            ],
          },
        ]}
      />
      <Layout>
        <section className="section-padding relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="container-wide relative">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center mb-16">
              <span className="glow-badge-fire mb-6 inline-flex"><Sword className="w-3.5 h-3.5" />Minecraft Hosting</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
                Minecraft Server Hosting
                <br />
                <span className="text-fire-gradient">in India by Cloud on Fire</span>
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Host your Minecraft server on enterprise hardware optimized for gaming. Cloud on Fire Minecraft hosting delivers stable 20 TPS, instant world loading, and advanced DDoS protection — all from Indian data centers.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        <section className="py-16 sm:py-20">
          <div className="container-wide max-w-3xl">
            <SectionHeader badge="Features" title="Why Cloud on Fire for Minecraft?" description="Enterprise hardware built for Minecraft performance." />
            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {features.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 glow-card px-5 py-3.5">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

        <section className="py-16 sm:py-20">
          <div className="container-wide max-w-3xl">
            <SectionHeader badge="Plans" title="Minecraft Hosting Plans" description="Choose the right plan for your Minecraft server." />
            <div className="space-y-3 mt-8">
              {plans.map((plan, i) => (
                <motion.div key={plan.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glow-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{plan.name} — <span className="text-primary">{plan.price}</span></h3>
                    <p className="text-sm text-muted-foreground">{plan.ram} · {plan.players}</p>
                  </div>
                  <Link to="/gaming-vps"><Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">View Details</Button></Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        <section className="section-padding">
          <div className="container-wide text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Start Your <span className="text-fire-gradient">Minecraft Server</span> Today</h2>
            <p className="text-muted-foreground mb-8">Deploy a high-performance Minecraft server in minutes with Cloud on Fire Gaming VPS.</p>
            <Link to="/gaming-vps"><Button size="lg" className="btn-neon h-12 px-8"><span className="relative z-10 flex items-center gap-2">Get Started <ArrowRight className="w-4 h-4" /></span></Button></Link>
          </div>
        </section>
      </Layout>
    </>
  );
}
