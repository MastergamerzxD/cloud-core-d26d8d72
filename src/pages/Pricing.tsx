import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import PricingCard from "@/components/ui/PricingCard";
import { motion } from "framer-motion";

const proPlans = [
  {
    name: "Pro Starter",
    price: "₹299",
    description: "Entry-level gaming VPS",
    type: "pro" as const,
    features: [
      "2 vCPU Cores (Dedicated)",
      "4 GB DDR4 ECC RAM",
      "50 GB NVMe Storage",
      "Unlimited Bandwidth",
      "Premium DDoS Protection",
      "Never Suspended",
    ],
  },
  {
    name: "Pro Performance",
    price: "₹599",
    description: "Most popular choice",
    type: "pro" as const,
    popular: true,
    features: [
      "4 vCPU Cores (Dedicated)",
      "8 GB DDR4 ECC RAM",
      "100 GB NVMe Storage",
      "Unlimited Bandwidth",
      "Premium DDoS Protection",
      "Never Suspended",
      "Priority Support",
    ],
  },
  {
    name: "Pro Ultimate",
    price: "₹999",
    description: "Maximum performance",
    type: "pro" as const,
    features: [
      "8 vCPU Cores (Dedicated)",
      "16 GB DDR4 ECC RAM",
      "200 GB NVMe Storage",
      "Unlimited Bandwidth",
      "Premium DDoS Protection",
      "Never Suspended",
      "Priority Support",
      "Weekly Backups",
    ],
  },
];

const budgetPlans = [
  {
    name: "Budget Starter",
    price: "₹199",
    description: "Entry-level budget VPS",
    type: "budget" as const,
    features: [
      "2 vCPU Cores",
      "4 GB DDR4 RAM",
      "30 GB NVMe Storage",
      "1000 GB Bandwidth",
      "DDoS Protection",
      "Standard Support",
    ],
  },
  {
    name: "Budget Plus",
    price: "₹399",
    description: "Best value option",
    type: "budget" as const,
    popular: true,
    features: [
      "4 vCPU Cores",
      "6 GB DDR4 RAM",
      "60 GB NVMe Storage",
      "2000 GB Bandwidth",
      "DDoS Protection",
      "Standard Support",
    ],
  },
  {
    name: "Budget Pro",
    price: "₹699",
    description: "For growing projects",
    type: "budget" as const,
    features: [
      "6 vCPU Cores",
      "12 GB DDR4 RAM",
      "100 GB NVMe Storage",
      "4000 GB Bandwidth",
      "DDoS Protection",
      "Standard Support",
    ],
  },
  {
    name: "Budget Elite",
    price: "₹899",
    description: "High-resource workloads",
    type: "budget" as const,
    features: [
      "8 vCPU Cores",
      "20 GB DDR4 RAM",
      "150 GB NVMe Storage",
      "10,000 GB Bandwidth",
      "DDoS Protection",
      "Standard Support",
    ],
  },
  {
    name: "Budget Ultra",
    price: "₹1,199",
    description: "Power user choice",
    type: "budget" as const,
    features: [
      "10 vCPU Cores",
      "32 GB DDR4 RAM",
      "150 GB NVMe Storage",
      "Unmetered Bandwidth",
      "DDoS Protection",
      "Standard Support",
    ],
  },
  {
    name: "Budget Enterprise",
    price: "₹1,899",
    description: "Maximum budget power",
    type: "budget" as const,
    features: [
      "20 vCPU Cores",
      "64 GB DDR4 RAM",
      "200 GB NVMe Storage",
      "Unmetered Bandwidth",
      "DDoS Protection",
      "Standard Support",
    ],
  },
];

export default function Pricing() {
  return (
    <>
      <SEOHead
        title="VPS Pricing India - Affordable VPS Plans from ₹199/mo | Cloud on Fire"
        description="Transparent VPS pricing in India. Budget VPS from ₹199/month, Pro VPS from ₹299/month. Intel Xeon Platinum 8168 processors. No hidden fees, no setup costs. DDoS protection included on all plans."
        keywords="VPS pricing India, cheap VPS plans, gaming VPS price, VPS cost India, affordable server hosting, monthly VPS plans"
        canonical="/pricing"
        ogType="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Cloud on Fire VPS Hosting",
          "description": "High-performance VPS hosting with Intel Platinum 8168 and DDoS protection",
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "INR",
            "lowPrice": "199",
            "highPrice": "1899",
            "offerCount": "9",
            "availability": "https://schema.org/InStock"
          }
        }}
      />
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
                Pricing
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
                Transparent Pricing
                <br />
                <span className="text-fire-gradient">No Hidden Fees</span>
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground">
                All prices in INR. Billed monthly. No setup fees, no surprises. 
                All plans powered by Intel Xeon Platinum 8168 processors with DDoS protection included.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pro VPS Plans */}
        <section className="pb-16">
          <div className="container-wide">
            <SectionHeader
              badge="Pro VPS"
              title="High-Performance Gaming VPS"
              description="Dedicated resources, premium DDoS protection, never suspended under attacks."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {proPlans.map((plan, index) => (
                <PricingCard key={plan.name} {...plan} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Budget VPS Plans */}
        <section className="section-padding bg-card/60">
          <div className="container-wide">
            <SectionHeader
              badge="Budget VPS"
              title="Cost-Effective Standard VPS"
              description="Reliable hosting for websites, bots, and development servers. Starting from ₹199/mo."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {budgetPlans.map((plan, index) => (
                <PricingCard key={plan.name} {...plan} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeader
              badge="FAQ"
              title="Common Questions"
            />

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: "What payment methods do you accept?",
                  a: "We accept UPI, credit/debit cards, net banking, and popular payment wallets.",
                },
                {
                  q: "Is there a setup fee?",
                  a: "No, there are no setup fees. You only pay the monthly subscription price.",
                },
                {
                  q: "Can I upgrade my plan later?",
                  a: "Yes, you can upgrade your plan at any time. The price difference will be prorated.",
                },
                {
                  q: "What's your refund policy?",
                  a: "We offer a 7-day money-back guarantee on all plans. No questions asked.",
                },
                {
                  q: "What processor do you use?",
                  a: "All our VPS plans — both Pro and Budget — are powered by Intel Xeon Platinum 8168 processors with 24 cores and turbo up to 3.7GHz.",
                },
              ].map((item) => (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="glass-card p-6"
                >
                  <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="text-muted-foreground text-sm">{item.a}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Need a custom plan or have specific requirements?
              </p>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
