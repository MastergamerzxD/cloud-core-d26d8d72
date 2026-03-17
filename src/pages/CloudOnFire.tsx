import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Server, Gamepad2, Shield, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CloudOnFire() {
  return (
    <>
      <SEOHead
        title="Cloud on Fire – India's Leading VPS & Game Server Hosting Provider"
        description="Cloud on Fire is India's trusted VPS hosting brand. We offer affordable VPS, Minecraft hosting, Gaming VPS, Cloud RDP, and enterprise DDoS protection starting at ₹199/month."
        keywords="Cloud on Fire, Cloud on Fire hosting, Cloud on Fire VPS, Cloud on Fire India, VPS hosting brand India"
        canonical="/cloud-on-fire"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Cloud on Fire – India's Leading VPS Hosting Provider",
            url: "https://cloudonfire.com/cloud-on-fire",
            description: "Cloud on Fire is India's trusted VPS and game server hosting brand offering affordable, high-performance cloud infrastructure.",
            isPartOf: { "@id": "https://cloudonfire.com/#website" },
            about: { "@id": "https://cloudonfire.com/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://cloudonfire.com/" },
              { "@type": "ListItem", position: 2, name: "Cloud on Fire", item: "https://cloudonfire.com/cloud-on-fire" },
            ],
          },
        ]}
      />
      <Layout>
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 network-grid-bg opacity-20 pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="container-wide relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center mb-16">
              <span className="glow-badge-fire mb-6 inline-flex">Cloud on Fire</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
                Welcome to <span className="text-fire-gradient">Cloud on Fire</span>
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Cloud on Fire is India's performance-focused hosting brand delivering enterprise-grade VPS, Minecraft server hosting, Gaming VPS, Cloud RDP, and advanced DDoS protection — all at prices that make sense for the Indian market.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
              {[
                { icon: Server, title: "Cloud on Fire VPS", desc: "High-performance VPS hosting with NVMe SSD and Intel Xeon Platinum processors starting at ₹199/month.", link: "/vps-plans" },
                { icon: Gamepad2, title: "Cloud on Fire Gaming VPS", desc: "Optimized for Minecraft, FiveM, and Hytale with advanced DDoS protection and unmetered bandwidth.", link: "/gaming-vps" },
                { icon: Monitor, title: "Cloud on Fire Cloud RDP", desc: "Remote desktop solutions powered by enterprise hardware for seamless remote work.", link: "/rdp" },
                { icon: Shield, title: "Cloud on Fire DDoS Protection", desc: "Enterprise-grade DDoS mitigation included free with every Cloud on Fire hosting plan.", link: "/ddos-protection" },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glow-card !rounded-2xl p-6 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-2">{item.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                  <Link to={item.link} className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground text-sm sm:text-base leading-relaxed">
              <h2 className="text-2xl font-bold text-foreground">Why Choose Cloud on Fire?</h2>
              <p>
                Cloud on Fire was built from the ground up to solve the hosting challenges faced by developers, gamers, and businesses in India. Unlike generic cloud providers, Cloud on Fire focuses exclusively on delivering low-latency, high-performance infrastructure optimized for the Indian market.
              </p>
              <p>
                Every Cloud on Fire server runs on Intel Xeon Platinum processors with NVMe Gen4 SSD storage, housed in Tier-3+ data centers in Delhi and Mumbai. Whether you need a simple VPS for your web application, a powerful gaming server for your Minecraft community, or a Cloud RDP for remote work — Cloud on Fire has you covered.
              </p>
              <h3 className="text-xl font-bold text-foreground pt-4">Cloud on Fire Hosting Plans</h3>
              <p>
                Cloud on Fire VPS plans start at just ₹199/month, making enterprise-grade hosting accessible to everyone. Our Gaming VPS plans, designed specifically for game server hosting, start at ₹299/month with advanced DDoS protection included at no extra cost.
              </p>
              <p>
                Cloud on Fire is not just another hosting company — it's a commitment to performance, transparency, and customer success. Join the growing community of developers and gamers who trust Cloud on Fire for their hosting needs.
              </p>
            </div>

            <div className="text-center mt-12">
              <Link to="/vps-plans">
                <Button size="lg" className="btn-fire h-12 px-8">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Cloud on Fire Plans <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
