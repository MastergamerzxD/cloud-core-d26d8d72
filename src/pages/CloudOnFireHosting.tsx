import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Intel Xeon Platinum processors",
  "NVMe Gen4 SSD storage",
  "Enterprise DDoS protection included",
  "Tier-3+ data centers in India",
  "24/7 technical support",
  "99.9% uptime commitment",
  "Full root/admin access",
  "Instant deployment in 5-10 minutes",
];

export default function CloudOnFireHosting() {
  return (
    <>
      <SEOHead
        title="Cloud on Fire Hosting – Affordable VPS Hosting in India from ₹199"
        description="Cloud on Fire Hosting offers affordable, high-performance VPS hosting in India. Intel Xeon Platinum, NVMe SSD, DDoS protection — plans from ₹199/month."
        keywords="Cloud on Fire Hosting, Cloud on Fire VPS hosting, affordable VPS India, cheap hosting India, Cloud on Fire plans"
        canonical="/cloud-on-fire-hosting"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Cloud on Fire Hosting",
            brand: { "@type": "Brand", name: "Cloud on Fire" },
            description: "Affordable VPS hosting in India by Cloud on Fire with Intel Xeon Platinum, NVMe SSD, and DDoS protection.",
            image: "https://cloudonfire.com/images/logo-schema.png",
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "INR",
              lowPrice: "199",
              highPrice: "1999",
              offerCount: "12",
              availability: "https://schema.org/PreOrder",
            },
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
          <div className="absolute inset-0 network-grid-bg opacity-20 pointer-events-none" />
          <div className="container-wide relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center mb-16">
              <span className="glow-badge-fire mb-6 inline-flex">Cloud on Fire Hosting</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
                <span className="text-fire-gradient">Cloud on Fire Hosting</span> — Built for Performance
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Cloud on Fire Hosting delivers enterprise-grade VPS infrastructure at prices built for the Indian market. From ₹199/month, get the power you need without breaking the bank.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16 items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">What You Get with Cloud on Fire Hosting</h2>
                <ul className="space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glow-card !rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Cloud on Fire Hosting Plans</h3>
                <div className="space-y-4">
                  {[
                    { name: "Starter VPS", price: "₹199/mo", specs: "2 vCPU, 4GB RAM, 40GB NVMe" },
                    { name: "Plus VPS", price: "₹499/mo", specs: "4 vCPU, 8GB RAM, 80GB NVMe" },
                    { name: "Gaming VPS", price: "₹299/mo", specs: "2 vCPU, 4GB RAM + DDoS Pro" },
                    { name: "Cloud RDP", price: "₹399/mo", specs: "4 vCPU, 8GB RAM, Windows" },
                  ].map((plan) => (
                    <div key={plan.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div>
                        <div className="font-semibold text-foreground text-sm">{plan.name}</div>
                        <div className="text-xs text-muted-foreground">{plan.specs}</div>
                      </div>
                      <span className="text-primary font-bold text-sm">{plan.price}</span>
                    </div>
                  ))}
                </div>
                <Link to="/vps-plans" className="block mt-6">
                  <Button className="btn-fire w-full">
                    <span className="relative z-10 flex items-center gap-2 justify-center">
                      View All Plans <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground text-sm sm:text-base leading-relaxed">
              <h2 className="text-2xl font-bold text-foreground">Why Cloud on Fire Hosting?</h2>
              <p>
                Cloud on Fire Hosting stands apart by combining enterprise hardware with affordable pricing. Every Cloud on Fire server is powered by Intel Xeon Platinum processors and NVMe Gen4 SSDs, delivering performance that rivals providers charging 3-5x more.
              </p>
              <p>
                With data centers in Delhi and Mumbai, Cloud on Fire Hosting ensures ultra-low latency for users across India. Whether you're hosting a web application, running a Minecraft server, or deploying a business-critical workload, Cloud on Fire Hosting provides the reliability and speed your project demands.
              </p>
              <p>
                Cloud on Fire Hosting includes DDoS protection on every plan at no additional cost. Our 24/7 support team is ready to help you get started and scale with confidence.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/gaming-vps" className="text-primary hover:underline text-sm">Cloud on Fire Gaming VPS →</Link>
                <Link to="/rdp" className="text-primary hover:underline text-sm">Cloud on Fire Cloud RDP →</Link>
                <Link to="/ddos-protection" className="text-primary hover:underline text-sm">Cloud on Fire DDoS Protection →</Link>
                <Link to="/infrastructure" className="text-primary hover:underline text-sm">Our Infrastructure →</Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
