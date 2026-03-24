import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Shield, Cpu, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";

const plans = [
  { name: "Starter VPS", price: "₹199/mo", specs: "2 vCPU, 4 GB RAM, 30 GB NVMe, DDoS Protection" },
  { name: "Plus VPS", price: "₹399/mo", specs: "4 vCPU, 6 GB RAM, 60 GB NVMe, DDoS Protection" },
  { name: "Pro VPS", price: "₹699/mo", specs: "6 vCPU, 12 GB RAM, 100 GB NVMe, DDoS Protection" },
  { name: "Elite VPS", price: "₹899/mo", specs: "8 vCPU, 20 GB RAM, 150 GB NVMe, DDoS Protection" },
];

export default function CheapVPSIndia() {
  return (
    <>
      <SEOHead
        title="Cheap VPS India – Affordable VPS Hosting from ₹199 | Cloud on Fire"
        description="Looking for cheap VPS hosting in India? Cloud on Fire offers affordable VPS servers starting at ₹199/month with Intel Xeon Platinum, NVMe SSD, and DDoS protection."
        keywords="cheap VPS India, affordable VPS India, low cost VPS hosting, budget VPS India, VPS ₹199, cheapest VPS India, Cloud on Fire VPS"
        canonical="/cheap-vps-india"
        ogImage="https://cloudonfire.com/images/og-logo.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Cheap VPS India – Affordable Hosting from ₹199",
            url: "https://cloudonfire.com/cheap-vps-india",
            isPartOf: { "@id": "https://cloudonfire.com/#website" },
          },
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Cloud on Fire Affordable VPS Hosting India",
            description: "Cheap VPS hosting in India starting at ₹199/month with enterprise hardware and DDoS protection.",
            brand: { "@type": "Brand", name: "Cloud on Fire" },
            offers: { "@type": "AggregateOffer", priceCurrency: "INR", lowPrice: "199", highPrice: "1899", offerCount: "6", availability: "https://schema.org/PreOrder" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", bestRating: "5", ratingCount: "150" },
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
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="container-wide relative">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center mb-16">
              <span className="glow-badge mb-6 inline-flex"><Cpu className="w-3.5 h-3.5" />Affordable VPS</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
                Cheap VPS Hosting in India
                <br />
                <span className="text-neon-gradient">Starting at Just ₹199/mo</span>
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Cloud on Fire offers the most affordable VPS hosting in India without compromising on performance. Get Intel Xeon Platinum processors, NVMe SSD storage, and enterprise DDoS protection — all starting at just ₹199 per month.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        <section className="py-16 sm:py-20">
          <div className="container-wide max-w-3xl">
            <SectionHeader badge="Plans" title="Affordable VPS Plans by Cloud on Fire" description="Enterprise hardware at budget-friendly prices." />
            <div className="space-y-3 mt-8">
              {plans.map((plan, i) => (
                <motion.div key={plan.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glow-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{plan.name} — <span className="text-primary">{plan.price}</span></h3>
                    <p className="text-sm text-muted-foreground">{plan.specs}</p>
                  </div>
                  <Link to="/vps-plans">
                    <Button size="sm" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">View Details</Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

        <section className="section-padding">
          <div className="container-wide text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Why Cloud on Fire for <span className="text-neon-gradient">Cheap VPS in India?</span></h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Unlike other budget providers, Cloud on Fire uses enterprise-grade Intel Xeon Platinum processors and NVMe storage even on the cheapest plans. Every VPS includes DDoS protection, full root access, and Indian customer support.
            </p>
            <Link to="/vps-plans"><Button size="lg" className="btn-neon h-12 px-8"><span className="relative z-10 flex items-center gap-2">See All Plans <ArrowRight className="w-4 h-4" /></span></Button></Link>
          </div>
        </section>
      </Layout>
    </>
  );
}
