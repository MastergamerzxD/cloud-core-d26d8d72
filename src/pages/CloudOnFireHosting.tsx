import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Cpu, HardDrive, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";

const highlights = [
  "Intel Xeon Platinum 8168 processors",
  "NVMe Gen4 SSD storage on all plans",
  "Enterprise DDoS protection included",
  "Data centers in India (Delhi & Mumbai)",
  "VPS from ₹199/mo, Gaming VPS from ₹299/mo",
  "24/7 customer support in English & Hindi",
  "Unmetered bandwidth on Gaming VPS",
  "Full root access with instant deployment",
];

export default function CloudOnFireHosting() {
  return (
    <>
      <SEOHead
        title="Cloud on Fire Hosting – VPS, Gaming & Cloud Servers in India"
        description="Cloud on Fire Hosting provides high-performance VPS and gaming server hosting in India. Intel Xeon Platinum hardware, NVMe storage, and DDoS protection from ₹199/month."
        keywords="Cloud on Fire hosting, cloud on fire VPS hosting, hosting India, VPS India, game hosting India, cloud server India"
        canonical="/cloud-on-fire-hosting"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Cloud on Fire Hosting",
            url: "https://cloudonfire.com/cloud-on-fire-hosting",
            isPartOf: { "@id": "https://cloudonfire.com/#website" },
            about: { "@id": "https://cloudonfire.com/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://cloudonfire.com/" },
              { "@type": "ListItem", position: 2, name: "Cloud on Fire Hosting", item: "https://cloudonfire.com/cloud-on-fire-hosting" },
            ],
          },
        ]}
      />
      <Layout>
        <section className="section-padding relative overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="container-wide relative">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
                <span className="text-neon-gradient">Cloud on Fire Hosting</span>
                <br />
                Affordable, Powerful, Indian
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Cloud on Fire Hosting delivers enterprise-grade cloud infrastructure at affordable prices. Our VPS hosting, gaming VPS, and cloud RDP services are designed for Indian businesses, developers, and gamers who need reliable performance.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        <section className="py-16 sm:py-20">
          <div className="container-wide max-w-3xl">
            <SectionHeader badge="Why Cloud on Fire Hosting?" title="What Makes Cloud on Fire Hosting Different" description="Enterprise hardware, transparent pricing, and Indian support." />
            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {highlights.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 glow-card px-5 py-3.5">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

        <section className="section-padding">
          <div className="container-wide text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Get Started with <span className="text-fire-gradient">Cloud on Fire Hosting</span></h2>
            <p className="text-muted-foreground mb-8">Choose a hosting plan that fits your workload. All plans include DDoS protection and full root access.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/vps-plans"><Button size="lg" className="btn-neon h-12 px-8"><span className="relative z-10 flex items-center gap-2">VPS Plans <ArrowRight className="w-4 h-4" /></span></Button></Link>
              <Link to="/gaming-vps"><Button variant="outline" size="lg" className="h-12 px-8 border-primary/30 text-primary hover:bg-primary/10">Gaming VPS</Button></Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
