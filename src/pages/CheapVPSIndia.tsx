import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, IndianRupee, Zap, Shield, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheapVPSIndia() {
  return (
    <>
      <SEOHead
        title="Cheap VPS India – Affordable VPS Hosting from ₹199 | Cloud on Fire"
        description="Looking for cheap VPS in India? Cloud on Fire offers affordable VPS hosting from ₹199/month with Intel Xeon Platinum, NVMe SSD, and free DDoS protection."
        keywords="cheap VPS India, affordable VPS hosting India, budget VPS India, low cost VPS India, Cloud on Fire VPS, VPS ₹199"
        canonical="/cheap-vps-india"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Cheap VPS Hosting India by Cloud on Fire",
            brand: { "@type": "Brand", name: "Cloud on Fire" },
            description: "Affordable VPS hosting in India starting at ₹199/month with enterprise hardware and DDoS protection.",
            image: "https://cloudonfire.com/images/logo-schema.png",
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "INR",
              lowPrice: "199",
              highPrice: "1499",
              offerCount: "8",
              availability: "https://schema.org/PreOrder",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://cloudonfire.com/" },
              { "@type": "ListItem", position: 2, name: "Cheap VPS India", item: "https://cloudonfire.com/cheap-vps-india" },
            ],
          },
        ]}
      />
      <Layout>
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 network-grid-bg opacity-20 pointer-events-none" />
          <div className="container-wide relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center mb-16">
              <span className="glow-badge-fire mb-6 inline-flex">Cheap VPS India</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
                Cheap VPS Hosting in India <br /><span className="text-fire-gradient">Starting at Just ₹199/month</span>
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Cloud on Fire makes enterprise-grade VPS hosting affordable for everyone in India. No compromises on performance — just honest, cheap VPS plans that actually deliver.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
              {[
                { icon: IndianRupee, title: "From ₹199/mo", desc: "Cloud on Fire VPS plans start at just ₹199 — the most affordable enterprise VPS in India." },
                { icon: Zap, title: "Intel Xeon Platinum", desc: "No cheap hardware. Cloud on Fire runs on enterprise Xeon Platinum processors for real performance." },
                { icon: HardDrive, title: "NVMe Gen4 SSD", desc: "Up to 7x faster than SATA SSDs. Every cheap VPS plan from Cloud on Fire includes NVMe storage." },
                { icon: Shield, title: "Free DDoS Protection", desc: "Enterprise DDoS protection is included free on every Cloud on Fire VPS plan — no hidden fees." },
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
              <h2 className="text-2xl font-bold text-foreground">Why Cloud on Fire Offers the Best Cheap VPS in India</h2>
              <p>
                Most "cheap VPS" providers in India cut corners on hardware, support, or security. Cloud on Fire takes a different approach — we optimize our infrastructure costs so we can pass the savings to you without sacrificing quality.
              </p>
              <p>
                Every Cloud on Fire cheap VPS plan includes the same Intel Xeon Platinum processors, NVMe Gen4 SSDs, and DDoS protection that premium providers charge 3-5x more for. Our data centers in Delhi and Mumbai ensure low latency across India.
              </p>
              <h3 className="text-xl font-bold text-foreground pt-4">Cloud on Fire Cheap VPS Plans</h3>
              <p>
                <strong>Starter VPS at ₹199/month</strong> — Perfect for small websites, development environments, and lightweight applications. Includes 2 vCPU, 4GB RAM, and 40GB NVMe SSD.
              </p>
              <p>
                <strong>Plus VPS at ₹499/month</strong> — Ideal for growing businesses and medium-traffic websites. 4 vCPU, 8GB RAM, and 80GB NVMe SSD.
              </p>
              <p>
                Need gaming-optimized hosting? Check out <Link to="/minecraft-hosting-india" className="text-primary hover:underline">Cloud on Fire Minecraft Hosting</Link> or our <Link to="/gaming-vps" className="text-primary hover:underline">Gaming VPS plans</Link>.
              </p>
              <div className="text-center pt-6">
                <Link to="/vps-plans">
                  <Button size="lg" className="btn-fire h-12 px-8">
                    <span className="relative z-10 flex items-center gap-2">
                      View All Cheap VPS Plans <ArrowRight className="w-4 h-4" />
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
