import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MinecraftHostingIndia() {
  return (
    <>
      <SEOHead
        title="Minecraft Server Hosting India – From ₹299 | Cloud on Fire"
        description="Host your Minecraft server in India with Cloud on Fire. Low latency, DDoS protection, NVMe SSD, and stable 20 TPS performance. Minecraft hosting from ₹299/month."
        keywords="Minecraft hosting India, Minecraft server India, Cloud on Fire Minecraft, cheap Minecraft hosting, Minecraft server hosting India, game server India"
        canonical="/minecraft-hosting-india"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Minecraft Server Hosting India by Cloud on Fire",
            brand: { "@type": "Brand", name: "Cloud on Fire" },
            description: "High-performance Minecraft server hosting in India with DDoS protection and NVMe SSD storage by Cloud on Fire.",
            image: "https://cloudonfire.com/images/logo-schema.png",
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "INR",
              lowPrice: "299",
              highPrice: "1599",
              offerCount: "4",
              availability: "https://schema.org/PreOrder",
            },
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
          <div className="absolute inset-0 network-grid-bg opacity-20 pointer-events-none" />
          <div className="container-wide relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center mb-16">
              <span className="glow-badge-fire mb-6 inline-flex">Minecraft Hosting India</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
                Minecraft Server Hosting in India <br /><span className="text-fire-gradient">by Cloud on Fire</span>
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Cloud on Fire delivers the best Minecraft hosting experience in India. Low latency, stable 20 TPS, advanced DDoS protection, and NVMe SSD storage — all starting at ₹299/month.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
              {[
                { icon: Zap, title: "Stable 20 TPS", desc: "Intel Xeon Platinum processors ensure your Minecraft server runs at full 20 TPS even with heavy modpacks." },
                { icon: Shield, title: "DDoS Protection", desc: "Cloud on Fire includes advanced DDoS protection free on all Gaming VPS plans to keep your server online." },
                { icon: Gamepad2, title: "Mod Support", desc: "Run Forge, Fabric, Paper, Spigot, or vanilla. Cloud on Fire supports all popular Minecraft server types." },
                { icon: Users, title: "High Player Count", desc: "From small survival servers to large networks — Cloud on Fire scales with your community." },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glow-card !rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-2">{item.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground text-sm sm:text-base leading-relaxed">
              <h2 className="text-2xl font-bold text-foreground">Why Host Your Minecraft Server with Cloud on Fire?</h2>
              <p>
                Cloud on Fire is purpose-built for game server hosting in India. While other providers use shared resources and outdated hardware, Cloud on Fire dedicates enterprise-grade Intel Xeon Platinum processors and NVMe Gen4 SSDs to your Minecraft server.
              </p>
              <p>
                With Cloud on Fire Minecraft hosting, you get full root access to install any mod, plugin, or custom configuration. Our servers are located in Delhi and Mumbai, ensuring the lowest possible ping for Indian players.
              </p>
              <h3 className="text-xl font-bold text-foreground pt-4">Cloud on Fire Minecraft Hosting Plans</h3>
              <p>
                <strong>Gamer Start at ₹299/month</strong> — Perfect for small Minecraft servers with up to 20 players. 2 vCPU, 4GB RAM, 50GB NVMe SSD.
              </p>
              <p>
                <strong>Gamer Elite at ₹1,599/month</strong> — Built for large Minecraft networks and heavy modpacks. 8 vCPU, 24GB RAM, 200GB NVMe SSD with advanced DDoS protection.
              </p>
              <p>
                Cloud on Fire also supports hosting for <Link to="/gaming-vps" className="text-primary hover:underline">FiveM, Hytale, and other game servers</Link>. Looking for general-purpose hosting? Check out our <Link to="/cheap-vps-india" className="text-primary hover:underline">cheap VPS India plans</Link>.
              </p>
              <div className="text-center pt-6">
                <Link to="/gaming-vps">
                  <Button size="lg" className="btn-fire h-12 px-8">
                    <span className="relative z-10 flex items-center gap-2">
                      View Minecraft Hosting Plans <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
