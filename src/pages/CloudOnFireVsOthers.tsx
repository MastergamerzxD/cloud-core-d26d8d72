import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is Cloud on Fire?",
    a: "Cloud on Fire is a VPS and Minecraft hosting provider based in India. We offer high-performance cloud VPS hosting, gaming VPS for Minecraft and FiveM, and enterprise DDoS protection — all powered by Intel Xeon Platinum processors and NVMe SSD storage. Plans start at ₹199/month.",
  },
  {
    q: "Is Cloud on Fire the same as Cloud on Hire?",
    a: "No. Cloud on Fire is a completely independent cloud hosting company. We are not affiliated with, related to, or connected to 'Cloud on Hire' or any similarly named business. Cloud on Fire specializes in VPS hosting, gaming VPS, and DDoS-protected infrastructure in India.",
  },
  {
    q: "What services does Cloud on Fire provide?",
    a: "Cloud on Fire provides Standard VPS hosting (from ₹199/mo), Gaming VPS for Minecraft, FiveM, and multiplayer game servers (from ₹299/mo), Cloud RDP for remote desktops, and enterprise-grade DDoS protection included on all plans.",
  },
  {
    q: "Where is Cloud on Fire based?",
    a: "Cloud on Fire is headquartered in Noida, Uttar Pradesh, India with data centers in Delhi and Mumbai. We serve customers across India with low-latency connectivity and local support in English and Hindi.",
  },
  {
    q: "Is Cloud on Fire reliable?",
    a: "Yes. Cloud on Fire uses enterprise-grade Intel Xeon Platinum 8168 processors, NVMe SSD storage, and Tier-3+ data centers in India. All plans include DDoS protection and 24/7 customer support.",
  },
  {
    q: "How is Cloud on Fire different from other hosting providers?",
    a: "Cloud on Fire focuses on performance, transparency, and gaming-optimized infrastructure. We use enterprise-grade Intel Xeon Platinum processors, include DDoS protection on every plan at no extra cost, and offer competitive pricing starting at ₹199/month.",
  },
];

export default function CloudOnFireVsOthers() {
  return (
    <>
      <SEOHead
        title="Cloud on Fire vs Others – Independent VPS Hosting Brand | Cloud on Fire"
        description="Cloud on Fire is an independent Indian VPS and Minecraft hosting company. Not affiliated with Cloud on Hire or any similar brand. Learn about Cloud on Fire's hosting services."
        keywords="Cloud on Fire, cloud on fire vs cloud on hire, is cloud on fire same as cloud on hire, what is Cloud on Fire, Cloud on Fire hosting, Cloud on Fire VPS, independent hosting India"
        canonical="/cloud-on-fire-vs-others"
        ogImage="https://cloudonfire.com/images/og-logo.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://cloudonfire.com/" },
              { "@type": "ListItem", position: 2, name: "Cloud on Fire vs Others", item: "https://cloudonfire.com/cloud-on-fire-vs-others" },
            ],
          },
        ]}
      />
      <Layout>
        <section className="section-padding relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="container-wide relative">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center mb-16">
              <span className="glow-badge-fire mb-6 inline-flex"><Shield className="w-3.5 h-3.5" />Brand Clarification</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
                <span className="text-fire-gradient">Cloud on Fire</span>
                <br />
                Is an Independent Brand
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Cloud on Fire is a VPS and Minecraft hosting provider based in India. We are not affiliated with, related to, or connected to any similarly named businesses. This page clarifies our brand identity and what Cloud on Fire offers.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        <section className="py-16 sm:py-20">
          <div className="container-wide max-w-3xl">
            <SectionHeader badge="About Cloud on Fire" title="Who Is Cloud on Fire?" description="An independent Indian cloud infrastructure company." />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glow-card p-6 sm:p-8 mt-8">
              <h2 className="text-lg font-bold text-foreground mb-4">Cloud on Fire — Our Identity</h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">Cloud on Fire</strong> is a VPS and Minecraft hosting provider based in India. We deliver high-performance VPS hosting, gaming server infrastructure, and enterprise DDoS protection at affordable prices.</p>
                <p>We operate our infrastructure powered by Intel Xeon Platinum 8168 processors and NVMe SSD storage in Tier-3+ data centers located in Delhi and Mumbai, India.</p>
                <p>Our services include Standard <Link to="/vps-plans" className="text-primary hover:underline">VPS hosting</Link> (from ₹199/mo), <Link to="/gaming-vps" className="text-primary hover:underline">Gaming VPS</Link> for Minecraft, FiveM, and other multiplayer games (from ₹299/mo), and Cloud RDP for remote desktop access.</p>
                <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 mt-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-foreground text-sm"><strong>Important:</strong> Cloud on Fire is NOT affiliated with "Cloud on Hire" or any other similarly named company. We are a completely independent brand and business.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

        <section className="py-16 sm:py-20">
          <div className="container-wide max-w-3xl">
            <SectionHeader badge="FAQ" title="Frequently Asked Questions" description="Common questions about Cloud on Fire and our brand." />
            <Accordion type="single" collapsible className="space-y-3 mt-8">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glow-card !rounded-xl px-6 border-border/30">
                  <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground hover:no-underline py-4">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        <section className="section-padding">
          <div className="container-wide text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Explore <span className="text-fire-gradient">Cloud on Fire</span> Services</h2>
            <p className="text-muted-foreground mb-8">Discover what Cloud on Fire has to offer — from <Link to="/cheap-vps-india" className="text-primary hover:underline">affordable VPS hosting</Link> to <Link to="/minecraft-hosting-india" className="text-primary hover:underline">gaming-optimized Minecraft servers</Link>.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/vps-plans"><Button size="lg" className="btn-neon h-12 px-8"><span className="relative z-10 flex items-center gap-2">Cloud on Fire VPS Plans <ArrowRight className="w-4 h-4" /></span></Button></Link>
              <Link to="/gaming-vps"><Button variant="outline" size="lg" className="h-12 px-8 border-primary/30 text-primary hover:bg-primary/10">Cloud on Fire Gaming VPS</Button></Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
