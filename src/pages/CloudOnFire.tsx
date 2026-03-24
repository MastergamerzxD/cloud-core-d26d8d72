import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Cpu, HardDrive, Zap, Server, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";

const services = [
  {
    icon: Server,
    title: "Cloud VPS Hosting",
    description: "High-performance VPS plans starting at ₹199/month with Intel Xeon Platinum processors, NVMe SSD storage, and DDoS protection included.",
    link: "/vps-plans",
    linkText: "View VPS Plans",
  },
  {
    icon: Gamepad2,
    title: "Gaming VPS",
    description: "Optimized for Minecraft, FiveM, Hytale, and Rust servers. Unmetered bandwidth and advanced DDoS protection from ₹299/month.",
    link: "/gaming-vps",
    linkText: "View Gaming VPS",
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    description: "Enterprise-grade DDoS mitigation with up to 1Tbps absorption capacity. Every Cloud on Fire server is protected at no extra cost.",
    link: "/ddos-protection",
    linkText: "Learn More",
  },
];

export default function CloudOnFire() {
  return (
    <>
      <SEOHead
        title="Cloud on Fire – India's High-Performance VPS & Gaming Server Hosting"
        description="Cloud on Fire is an Indian cloud hosting company offering affordable VPS, gaming VPS, and DDoS-protected servers powered by Intel Xeon Platinum processors and NVMe storage."
        keywords="Cloud on Fire, cloud on fire hosting, cloud on fire VPS, Indian VPS hosting, cloud hosting India, Cloud on Fire servers"
        canonical="/cloud-on-fire"
        ogImage="https://cloudonfire.com/images/og-logo.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Cloud on Fire – India's High-Performance VPS Hosting",
            url: "https://cloudonfire.com/cloud-on-fire",
            description: "Cloud on Fire is an Indian cloud hosting company offering affordable VPS, gaming VPS, and DDoS-protected servers.",
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
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="container-wide relative">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
                <span className="text-fire-gradient">Cloud on Fire</span>
                <br />
                High-Performance Hosting in India
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Cloud on Fire is an Indian cloud infrastructure company delivering powerful VPS hosting, gaming server hosting, and enterprise-grade DDoS protection. Built on Intel Xeon Platinum hardware and NVMe storage with data centers in India.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { icon: Cpu, label: "Intel Xeon Platinum" },
                  { icon: HardDrive, label: "NVMe SSD Storage" },
                  { icon: Shield, label: "DDoS Protected" },
                  { icon: Zap, label: "From ₹199/mo" },
                ].map((badge) => (
                  <span key={badge.label} className="glow-badge">
                    <badge.icon className="w-3.5 h-3.5" />
                    {badge.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        <section className="py-16 sm:py-20">
          <div className="container-wide">
            <SectionHeader badge="Our Services" title="What Cloud on Fire Offers" description="Explore Cloud on Fire hosting services built for performance and reliability." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {services.map((service, i) => (
                <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glow-card p-6 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-2">{service.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                  <Link to={service.link} className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                    {service.linkText} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

        <section className="section-padding">
          <div className="container-wide max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Why Choose <span className="text-fire-gradient">Cloud on Fire?</span></h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Cloud on Fire combines enterprise-grade hardware with transparent pricing and hands-on Indian customer support. Whether you need a VPS for web apps, a gaming server for Minecraft or FiveM, or DDoS-protected infrastructure — Cloud on Fire delivers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/vps-plans">
                <Button size="lg" className="btn-neon h-12 px-8">
                  <span className="relative z-10 flex items-center gap-2">Explore Plans <ArrowRight className="w-4 h-4" /></span>
                </Button>
              </Link>
              <Link to="/why-us">
                <Button variant="outline" size="lg" className="h-12 px-8 border-primary/30 text-primary hover:bg-primary/10">Why Cloud on Fire</Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
