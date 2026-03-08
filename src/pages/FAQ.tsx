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
    title: "General",
    items: [
      { q: "What is Cloud on Fire?", a: "Cloud on Fire is a VPS hosting provider based in India, offering high-performance virtual private servers with enterprise-grade DDoS protection. We specialize in gaming VPS and general-purpose hosting solutions." },
      { q: "What's the difference between Pro VPS and Budget VPS?", a: "Pro VPS offers dedicated CPU cores, premium DDoS protection (never suspended under attacks), and is optimized for gaming and high-performance workloads. Budget VPS uses shared resources and is ideal for websites, bots, and development servers. Budget VPS may be temporarily suspended under extreme DDoS attacks to protect the network." },
      { q: "Where are your servers located?", a: "Our servers are located in India, optimized for low-latency connectivity across the Indian subcontinent and Asia Pacific region." },
    ],
  },
  {
    title: "Billing & Payments",
    items: [
      { q: "What payment methods do you accept?", a: "We accept UPI, credit cards, debit cards, net banking, and popular payment wallets. All transactions are processed in INR." },
      { q: "Is there a setup fee?", a: "No, there are no setup fees. You only pay the monthly subscription price for your VPS plan." },
      { q: "Can I upgrade or downgrade my plan?", a: "Yes, you can upgrade your plan at any time. The price difference will be prorated for the remaining billing period. Downgrades take effect at the next billing cycle." },
      { q: "What's your refund policy?", a: "We offer a 7-day money-back guarantee on all plans. If you're not satisfied, contact support within 7 days of purchase for a full refund." },
      { q: "Do you provide GST invoices?", a: "Yes, we provide GST invoices for all purchases. You can download invoices from your account dashboard." },
    ],
  },
  {
    title: "Technical",
    items: [
      { q: "How quickly is my VPS deployed?", a: "Most VPS instances are deployed within 5-10 minutes after payment confirmation. You'll receive login credentials via email." },
      { q: "What operating systems are available?", a: "We support major Linux distributions including Ubuntu, Debian, CentOS, and AlmaLinux. Windows Server is available on select plans." },
      { q: "Do I get root/administrator access?", a: "Yes, you get full root access on Linux VPS and full administrator access on Windows VPS. You have complete control over your server." },
      { q: "Is there a bandwidth limit?", a: "All plans include unlimited bandwidth. We don't charge for data transfer or impose monthly bandwidth caps." },
      { q: "What is your uptime guarantee?", a: "We guarantee 99.9% uptime for Budget VPS and 99.99% uptime for Pro VPS, backed by our SLA." },
    ],
  },
  {
    title: "DDoS Protection",
    items: [
      { q: "Is DDoS protection included?", a: "Yes, DDoS protection is included on all VPS plans at no extra cost. The level of protection differs between Pro and Budget VPS." },
      { q: "What attacks can you mitigate?", a: "We can mitigate volumetric attacks (UDP floods, amplification attacks), protocol attacks (SYN floods, ICMP floods), and application-layer attacks (HTTP floods, Slowloris)." },
      { q: "Will my Pro VPS ever be suspended during an attack?", a: "No. Pro VPS includes our premium DDoS protection with a zero-suspension policy. Your VPS will remain online during attacks." },
      { q: "What happens to Budget VPS during extreme attacks?", a: "Budget VPS may be temporarily suspended during extreme DDoS attacks that threaten network stability. This is done to protect other customers on the shared infrastructure. For guaranteed uptime during attacks, we recommend Pro VPS." },
    ],
  },
  {
    title: "Support",
    items: [
      { q: "How do I contact support?", a: "You can contact support via email at hello@cloudonfire.com or call us at +91 8766215705. Pro VPS customers receive priority support with under 15 minute response times." },
      { q: "What's the average response time?", a: "Pro VPS customers receive responses within 15 minutes on average. Budget VPS customers typically receive responses within 60 minutes." },
      { q: "Is support available 24/7?", a: "Yes, our support team is available 24/7 for urgent issues. Non-urgent inquiries are handled during Indian business hours." },
    ],
  },
];

export default function FAQ() {
  return (
    <>
      <SEOHead
        title="VPS Hosting FAQ India — Common Questions Answered | Cloud on Fire"
        description="Find answers to frequently asked questions about Cloud on Fire VPS hosting in India. Learn about Pro VPS vs Budget VPS, DDoS protection, billing, payment methods, server specs, and support."
        keywords="VPS FAQ India, VPS hosting questions, DDoS protection FAQ, VPS billing India, Cloud on Fire FAQ, gaming VPS FAQ"
        canonical="/faq"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqCategories.flatMap(cat =>
            cat.items.map(item => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            }))
          ),
        }}
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
              <span className="glow-badge mb-6 inline-flex">FAQ</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4 sm:mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground">
                Find answers to common questions about our VPS hosting services.
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
                  Still have questions?
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  Our support team is ready to help.
                </p>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/50">
                    Contact Support
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
