import { Helmet } from "react-helmet-async";
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
      {
        q: "What is Cloud on Fire?",
        a: "Cloud on Fire is a VPS hosting provider based in India, offering high-performance virtual private servers with enterprise-grade DDoS protection. We specialize in gaming VPS and general-purpose hosting solutions.",
      },
      {
        q: "What's the difference between Pro VPS and Budget VPS?",
        a: "Pro VPS offers dedicated CPU cores, premium DDoS protection (never suspended under attacks), and is optimized for gaming and high-performance workloads. Budget VPS uses shared resources and is ideal for websites, bots, and development servers. Budget VPS may be temporarily suspended under extreme DDoS attacks to protect the network.",
      },
      {
        q: "Where are your servers located?",
        a: "Our servers are located in India, optimized for low-latency connectivity across the Indian subcontinent and Asia Pacific region.",
      },
    ],
  },
  {
    title: "Billing & Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept UPI, credit cards, debit cards, net banking, and popular payment wallets. All transactions are processed in INR.",
      },
      {
        q: "Is there a setup fee?",
        a: "No, there are no setup fees. You only pay the monthly subscription price for your VPS plan.",
      },
      {
        q: "Can I upgrade or downgrade my plan?",
        a: "Yes, you can upgrade your plan at any time. The price difference will be prorated for the remaining billing period. Downgrades take effect at the next billing cycle.",
      },
      {
        q: "What's your refund policy?",
        a: "We offer a 7-day money-back guarantee on all plans. If you're not satisfied, contact support within 7 days of purchase for a full refund.",
      },
      {
        q: "Do you provide GST invoices?",
        a: "Yes, we provide GST invoices for all purchases. You can download invoices from your account dashboard.",
      },
    ],
  },
  {
    title: "Technical",
    items: [
      {
        q: "How quickly is my VPS deployed?",
        a: "Most VPS instances are deployed within 5-10 minutes after payment confirmation. You'll receive login credentials via email.",
      },
      {
        q: "What operating systems are available?",
        a: "We support major Linux distributions including Ubuntu, Debian, CentOS, and AlmaLinux. Windows Server is available on select plans.",
      },
      {
        q: "Do I get root/administrator access?",
        a: "Yes, you get full root access on Linux VPS and full administrator access on Windows VPS. You have complete control over your server.",
      },
      {
        q: "Is there a bandwidth limit?",
        a: "All plans include unlimited bandwidth. We don't charge for data transfer or impose monthly bandwidth caps.",
      },
      {
        q: "What is your uptime guarantee?",
        a: "We guarantee 99.9% uptime for Budget VPS and 99.99% uptime for Pro VPS, backed by our SLA.",
      },
    ],
  },
  {
    title: "DDoS Protection",
    items: [
      {
        q: "Is DDoS protection included?",
        a: "Yes, DDoS protection is included on all VPS plans at no extra cost. The level of protection differs between Pro and Budget VPS.",
      },
      {
        q: "What attacks can you mitigate?",
        a: "We can mitigate volumetric attacks (UDP floods, amplification attacks), protocol attacks (SYN floods, ICMP floods), and application-layer attacks (HTTP floods, Slowloris).",
      },
      {
        q: "Will my Pro VPS ever be suspended during an attack?",
        a: "No. Pro VPS includes our premium DDoS protection with a zero-suspension policy. Your VPS will remain online during attacks.",
      },
      {
        q: "What happens to Budget VPS during extreme attacks?",
        a: "Budget VPS may be temporarily suspended during extreme DDoS attacks that threaten network stability. This is done to protect other customers on the shared infrastructure. For guaranteed uptime during attacks, we recommend Pro VPS.",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        q: "How do I contact support?",
        a: "You can contact support via email at support@cloudonfire.in or through the ticket system in your account dashboard. Pro VPS customers receive priority support.",
      },
      {
        q: "What's the average response time?",
        a: "Pro VPS customers receive responses within 15 minutes on average. Budget VPS customers typically receive responses within 60 minutes.",
      },
      {
        q: "Is support available 24/7?",
        a: "Yes, our support team is available 24/7 for urgent issues. Non-urgent inquiries are handled during Indian business hours.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>FAQ - VPS Hosting Questions Answered | Cloud on Fire</title>
        <meta 
          name="description" 
          content="Find answers to frequently asked questions about Cloud on Fire VPS hosting. Learn about Pro VPS, Budget VPS, DDoS protection, billing, and technical specifications." 
        />
        <meta property="og:title" content="FAQ - VPS Hosting Questions | Cloud on Fire" />
        <meta property="og:description" content="Answers to common questions about Cloud on Fire VPS hosting services." />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full mb-4">
                FAQ
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about our VPS hosting services.
              </p>
            </motion.div>

            {/* FAQ Categories */}
            <div className="max-w-3xl mx-auto space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  <h2 className="text-xl font-semibold text-foreground mb-4">{category.title}</h2>
                  <Accordion type="single" collapsible className="glass-card">
                    {category.items.map((item, index) => (
                      <AccordionItem key={index} value={`${category.title}-${index}`} className="border-border/30">
                        <AccordionTrigger className="px-6 text-left text-foreground hover:text-primary">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 text-muted-foreground">
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
              className="max-w-xl mx-auto text-center mt-16"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our support team is ready to help.
              </p>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Support
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
