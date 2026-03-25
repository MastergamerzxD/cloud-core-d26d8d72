import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "About Cloud on Fire",
    items: [
      { q: "What is Cloud on Fire?", a: "Cloud on Fire is a VPS and Minecraft hosting provider based in India. We offer high-performance cloud VPS hosting, gaming VPS for Minecraft and FiveM, and enterprise DDoS protection — powered by Intel Xeon Platinum processors and NVMe SSD storage. Plans start at ₹199/month." },
      { q: "What services does Cloud on Fire provide?", a: "Cloud on Fire provides Standard VPS hosting (from ₹199/mo), Gaming VPS for Minecraft, FiveM, and multiplayer game servers (from ₹299/mo), Cloud RDP for remote desktops, and enterprise-grade DDoS protection included on all plans." },
      { q: "Is Cloud on Fire reliable?", a: "Yes. Cloud on Fire uses enterprise-grade Intel Xeon Platinum 8168 processors, NVMe SSD storage, and Tier-3+ data centers in India. All plans include DDoS protection and 24/7 customer support." },
      { q: "Where are Cloud on Fire servers located?", a: "Cloud on Fire servers are located in India (Delhi and Mumbai), optimized for low-latency connectivity across the Indian subcontinent and Asia Pacific region." },
    ],
  },
  {
    title: "VPS Hosting",
    items: [
      { q: "What is VPS hosting?", a: "VPS (Virtual Private Server) hosting provides dedicated resources on a virtual server, offering more power and control than shared hosting. Cloud on Fire VPS plans include Intel Xeon Platinum processors, NVMe SSD storage, and DDoS protection starting at ₹199/month." },
      { q: "What are Cloud on Fire VPS plan prices?", a: "Standard VPS starts at ₹199/mo (Starter: 2 vCPU, 4GB RAM) up to ₹899/mo (Elite: 8 vCPU, 20GB RAM). Gaming VPS starts at ₹299/mo (Gamer Start: 2 vCPU, 4GB RAM) up to ₹999/mo (Gamer Elite: 8 vCPU, 20GB RAM). All plans include DDoS protection and NVMe storage." },
      { q: "How quickly is my VPS deployed?", a: "Most Cloud on Fire VPS instances are deployed within 5-10 minutes after payment confirmation. You'll receive login credentials via email." },
      { q: "Do I get root/administrator access?", a: "Yes, you get full root access on Linux VPS and full administrator access on Windows VPS. You have complete control over your Cloud on Fire server." },
    ],
  },
  {
    title: "Gaming VPS",
    items: [
      { q: "What is a Gaming VPS?", a: "A Gaming VPS is a virtual server optimized for running multiplayer game servers like Minecraft, FiveM, and Hytale. Cloud on Fire Gaming VPS includes advanced DDoS protection, low latency networking, and unmetered bandwidth starting at ₹299/month." },
      { q: "Can I host a Minecraft server on Cloud on Fire?", a: "Yes. Cloud on Fire Gaming VPS is optimized for Minecraft server hosting. Our Intel Xeon Platinum processors deliver stable 20 TPS performance even with modpacks and large player counts. Plans start at ₹299/month." },
      { q: "What games can I host on Cloud on Fire?", a: "You can host Minecraft (Vanilla, Paper, Spigot, Forge, Fabric), FiveM, Hytale, Rust, and other multiplayer game servers on Cloud on Fire Gaming VPS." },
    ],
  },
  {
    title: "Billing & Payments",
    items: [
      { q: "What payment methods does Cloud on Fire accept?", a: "Cloud on Fire accepts UPI, credit cards, debit cards, net banking, and popular payment wallets. All transactions are processed in INR." },
      { q: "Is there a setup fee?", a: "No, there are no setup fees on any Cloud on Fire plan. You only pay the monthly subscription price." },
      { q: "Can I upgrade or downgrade my Cloud on Fire plan?", a: "Yes, you can upgrade your plan at any time. The price difference will be prorated for the remaining billing period. Downgrades take effect at the next billing cycle." },
    ],
  },
  {
    title: "DDoS Protection",
    items: [
      { q: "Is DDoS protection included on Cloud on Fire plans?", a: "Yes, DDoS protection is included on all Cloud on Fire VPS plans at no extra cost. Gaming VPS plans include advanced DDoS protection for stronger mitigation." },
      { q: "What attacks can Cloud on Fire mitigate?", a: "Cloud on Fire can mitigate volumetric attacks (UDP floods, amplification attacks), protocol attacks (SYN floods, ICMP floods), and application-layer attacks (HTTP floods, Slowloris)." },
    ],
  },
  {
    title: "Support",
    items: [
      { q: "How do I contact Cloud on Fire support?", a: "You can contact Cloud on Fire support via email at hello@cloudonfire.com, call us at +91 8766215705, or reach us on Instagram @cloudonfire_." },
      { q: "Is Cloud on Fire support available 24/7?", a: "Yes, Cloud on Fire support is available 24/7 for urgent issues. Non-urgent inquiries are handled during Indian business hours." },
    ],
  },
];

export default function FAQ() {
  return (
    <>
      <SEOHead
        title="Cloud on Fire FAQ — VPS Hosting Questions Answered"
        description="Find answers to frequently asked questions about Cloud on Fire. Learn about our VPS hosting, Gaming VPS, Minecraft hosting, DDoS protection, billing, and support."
        keywords="Cloud on Fire FAQ, VPS FAQ India, VPS hosting questions, Cloud on Fire support, gaming VPS FAQ, Minecraft hosting FAQ"
        canonical="/faq"
        ogImage="https://cloudonfire.com/images/og-logo.png"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqCategories.flatMap(cat =>
              cat.items.map(item => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              }))
            ),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://cloudonfire.com/" },
              { "@type": "ListItem", position: 2, name: "FAQ", item: "https://cloudonfire.com/faq" },
            ],
          },
        ]}
      />
      <Layout>
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 network-grid-bg opacity-20 pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="container-wide relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
            >
              <span className="glow-badge mb-6 inline-flex">Cloud on Fire FAQ</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4 sm:mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground">
                Find answers to common questions about Cloud on Fire hosting services.
              </p>
            </motion.div>

            {/* FAQ Categories */}
            <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">{category.title}</h2>
                  <Accordion type="single" collapsible className="glow-card !rounded-2xl overflow-hidden">
                    {category.items.map((item, index) => (
                      <AccordionItem key={index} value={`${category.title}-${index}`} className="border-border/20">
                        <AccordionTrigger className="px-6 text-left text-sm sm:text-base text-foreground hover:text-primary">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 text-sm text-muted-foreground leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto text-center mt-12 sm:mt-16"
            >
              <div className="glow-card !rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Still have questions about Cloud on Fire?
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Our support team is ready to help.
                </p>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/50">
                    Contact Cloud on Fire Support
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
