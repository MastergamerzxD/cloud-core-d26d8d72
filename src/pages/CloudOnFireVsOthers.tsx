import SEOHead from "@/components/SEOHead";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CloudOnFireVsOthers() {
  return (
    <>
      <SEOHead
        title="Cloud on Fire vs Others – What Makes Cloud on Fire Different | VPS Hosting"
        description="Learn what makes Cloud on Fire a unique VPS hosting brand in India. Compare features, pricing, and performance. Cloud on Fire is an independent hosting provider — not affiliated with any other brand."
        keywords="Cloud on Fire vs, Cloud on Fire comparison, Cloud on Fire hosting review, Cloud on Fire brand, is Cloud on Fire legit, Cloud on Fire VPS review"
        canonical="/cloud-on-fire-vs-others"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Cloud on Fire?",
                acceptedAnswer: { "@type": "Answer", text: "Cloud on Fire is an independent VPS hosting provider based in India, offering high-performance VPS, Gaming VPS, Cloud RDP, and DDoS protection services. It is a separate brand not affiliated with any similarly-named companies." },
              },
              {
                "@type": "Question",
                name: "Is Cloud on Fire the same as Cloud on Hire?",
                acceptedAnswer: { "@type": "Answer", text: "No, Cloud on Fire is an independent hosting provider offering VPS and Minecraft hosting services in India. It is not related to or affiliated with Cloud on Hire or any other similarly named service." },
              },
              {
                "@type": "Question",
                name: "What services does Cloud on Fire offer?",
                acceptedAnswer: { "@type": "Answer", text: "Cloud on Fire offers VPS Hosting (from ₹199/mo), Gaming VPS (from ₹299/mo), Cloud RDP, and enterprise-grade DDoS protection. All services run on Intel Xeon Platinum processors with NVMe SSD storage in Indian data centers." },
              },
              {
                "@type": "Question",
                name: "Why should I choose Cloud on Fire over other VPS providers?",
                acceptedAnswer: { "@type": "Answer", text: "Cloud on Fire provides enterprise-grade hardware (Intel Xeon Platinum, NVMe Gen4 SSD) at affordable prices starting at ₹199/mo. Every plan includes free DDoS protection, and servers are located in Delhi and Mumbai for low latency across India." },
              },
            ],
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
          <div className="absolute inset-0 network-grid-bg opacity-20 pointer-events-none" />
          <div className="container-wide relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center mb-16">
              <span className="glow-badge-fire mb-6 inline-flex">Brand Comparison</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
                What Makes <span className="text-fire-gradient">Cloud on Fire</span> Different?
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Cloud on Fire is an independent VPS hosting brand in India. Here's what sets us apart from the competition and why thousands of developers trust Cloud on Fire.
              </p>
            </motion.div>

            {/* Comparison table */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="glow-card !rounded-2xl overflow-hidden">
                <div className="grid grid-cols-3 gap-0">
                  <div className="p-4 bg-secondary/30 font-semibold text-foreground text-sm border-b border-border/20">Feature</div>
                  <div className="p-4 bg-primary/10 font-semibold text-primary text-sm text-center border-b border-border/20">Cloud on Fire</div>
                  <div className="p-4 bg-secondary/30 font-semibold text-muted-foreground text-sm text-center border-b border-border/20">Typical Budget VPS</div>
                  {[
                    ["Intel Xeon Platinum CPU", true, false],
                    ["NVMe Gen4 SSD", true, false],
                    ["Free DDoS Protection", true, false],
                    ["India Data Centers", true, true],
                    ["Plans from ₹199/mo", true, true],
                    ["Gaming-Optimized Plans", true, false],
                    ["24/7 Support", true, false],
                    ["Full Root Access", true, true],
                  ].map(([feature, cof, other], i) => (
                    <>
                      <div key={`f-${i}`} className="p-4 text-sm text-muted-foreground border-b border-border/10">{feature as string}</div>
                      <div key={`c-${i}`} className="p-4 flex justify-center border-b border-border/10">{cof ? <Check className="w-5 h-5 text-primary" /> : <X className="w-5 h-5 text-destructive/50" />}</div>
                      <div key={`o-${i}`} className="p-4 flex justify-center border-b border-border/10">{other ? <Check className="w-5 h-5 text-muted-foreground" /> : <X className="w-5 h-5 text-destructive/50" />}</div>
                    </>
                  ))}
                </div>
              </div>
            </div>

            {/* About Cloud on Fire */}
            <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground text-sm sm:text-base leading-relaxed mb-16">
              <h2 className="text-2xl font-bold text-foreground">About Cloud on Fire</h2>
              <p>
                Cloud on Fire is an independent VPS hosting company founded in India. We specialize in high-performance cloud infrastructure including VPS hosting, Gaming VPS, Minecraft server hosting, Cloud RDP, and enterprise DDoS protection.
              </p>
              <p>
                Our brand name is sometimes confused with similarly named services. To be clear: <strong>Cloud on Fire is a completely separate, independent company</strong> with no affiliation to any other brand. We are solely focused on providing the best VPS hosting experience in India.
              </p>
              <p>
                Cloud on Fire was built by a team of infrastructure engineers who wanted to bring enterprise-quality hosting to the Indian market at fair prices. Every Cloud on Fire server runs on Intel Xeon Platinum processors with NVMe Gen4 SSDs, housed in Tier-3+ certified data centers in Delhi and Mumbai.
              </p>
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="glow-card !rounded-2xl overflow-hidden">
                <AccordionItem value="q1" className="border-border/20">
                  <AccordionTrigger className="px-6 text-sm sm:text-base text-foreground">What is Cloud on Fire?</AccordionTrigger>
                  <AccordionContent className="px-6 text-sm text-muted-foreground leading-relaxed">
                    Cloud on Fire is an independent VPS hosting provider based in India. We offer VPS hosting, Gaming VPS, Minecraft server hosting, Cloud RDP, and enterprise DDoS protection. Our services run on Intel Xeon Platinum processors and NVMe Gen4 SSD storage.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2" className="border-border/20">
                  <AccordionTrigger className="px-6 text-sm sm:text-base text-foreground">Is Cloud on Fire the same as Cloud on Hire?</AccordionTrigger>
                  <AccordionContent className="px-6 text-sm text-muted-foreground leading-relaxed">
                    No, Cloud on Fire is an independent hosting provider offering VPS and Minecraft hosting services in India. It is not related to or affiliated with Cloud on Hire or any other similarly named service.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3" className="border-border/20">
                  <AccordionTrigger className="px-6 text-sm sm:text-base text-foreground">What services does Cloud on Fire offer?</AccordionTrigger>
                  <AccordionContent className="px-6 text-sm text-muted-foreground leading-relaxed">
                    Cloud on Fire offers VPS Hosting (from ₹199/mo), Gaming VPS for Minecraft and FiveM (from ₹299/mo), Cloud RDP (from ₹399/mo), and enterprise-grade DDoS protection included free on all plans.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q4" className="border-border/20">
                  <AccordionTrigger className="px-6 text-sm sm:text-base text-foreground">Why should I choose Cloud on Fire?</AccordionTrigger>
                  <AccordionContent className="px-6 text-sm text-muted-foreground leading-relaxed">
                    Cloud on Fire provides enterprise-grade hardware at affordable Indian pricing, free DDoS protection on every plan, India-based data centers for low latency, and 24/7 support. We never oversell resources — what you pay for is what you get.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="text-center">
              <Link to="/vps-plans">
                <Button size="lg" className="btn-fire h-12 px-8">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Cloud on Fire Plans <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </Link>
              <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <Link to="/cloud-on-fire" className="hover:text-primary transition-colors">About Cloud on Fire →</Link>
                <Link to="/cloud-on-fire-hosting" className="hover:text-primary transition-colors">Cloud on Fire Hosting →</Link>
                <Link to="/about" className="hover:text-primary transition-colors">Our Story →</Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
