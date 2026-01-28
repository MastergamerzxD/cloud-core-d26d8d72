import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import PricingCard from "@/components/ui/PricingCard";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  product_type: string;
  cpu_cores: number;
  ram_gb: number;
  storage_gb: number;
  bandwidth_tb: number;
  price_monthly: number;
}

export default function Pricing() {
  const [proPlans, setProPlans] = useState<Product[]>([]);
  const [budgetPlans, setBudgetPlans] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("price_monthly");

      if (error) throw error;

      const pro = data?.filter((p) => p.product_type === "pro_vps") || [];
      const budget = data?.filter((p) => p.product_type === "budget_vps") || [];
      setProPlans(pro);
      setBudgetPlans(budget);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getFeatures = (product: Product): string[] => {
    const features: string[] = [];
    const isProType = product.product_type === "pro_vps";
    
    features.push(`${product.cpu_cores} vCPU Cores (${isProType ? "Dedicated" : "Shared"})`);
    features.push(`${product.ram_gb} GB DDR4${isProType ? " ECC" : ""} RAM`);
    features.push(`${product.storage_gb} GB NVMe Storage`);
    features.push(product.bandwidth_tb >= 100 ? "Unlimited Bandwidth" : `${product.bandwidth_tb} TB Bandwidth`);
    features.push(isProType ? "Premium DDoS Protection" : "DDoS Protection");
    if (isProType) features.push("Never Suspended");
    
    return features;
  };

  return (
    <>
      <Helmet>
        <title>VPS Pricing India - Affordable VPS Plans from ₹299/mo | Cloud on Fire</title>
        <meta 
          name="description" 
          content="Transparent VPS pricing in India. Pro VPS from ₹299/month, Budget VPS from ₹499/month. No hidden fees, no setup costs. DDoS protection included on all plans. Compare all VPS plans." 
        />
        <meta name="keywords" content="VPS pricing India, cheap VPS plans, gaming VPS price, VPS cost India, affordable server hosting, monthly VPS plans" />
        <link rel="canonical" href="https://cloudonfire.in/pricing" />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://cloudonfire.in/pricing" />
        <meta property="og:title" content="VPS Pricing - Affordable Plans | Cloud on Fire" />
        <meta property="og:description" content="VPS hosting from ₹299/month. Transparent pricing, no hidden fees, DDoS protection included." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="VPS Pricing India | Cloud on Fire" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Cloud on Fire VPS Hosting",
            "description": "High-performance VPS hosting with DDoS protection",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "INR",
              "lowPrice": "299",
              "highPrice": "1199",
              "offerCount": "6",
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>
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
                Pricing
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                Transparent Pricing
                <br />
                <span className="text-fire-gradient">No Hidden Fees</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                All prices in INR. Billed monthly. No setup fees, no surprises. 
                DDoS protection included on all plans.
              </p>
            </motion.div>
          </div>
        </section>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Pro VPS Plans */}
            {proPlans.length > 0 && (
              <section className="pb-16">
                <div className="container-wide">
                  <SectionHeader
                    badge="Pro VPS"
                    title="High-Performance Gaming VPS"
                    description="Dedicated resources, premium DDoS protection, never suspended under attacks."
                  />

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {proPlans.map((plan, index) => (
                      <PricingCard
                        key={plan.id}
                        name={plan.name}
                        slug={plan.slug}
                        price={formatPrice(plan.price_monthly)}
                        description={plan.description || "High-performance VPS"}
                        features={getFeatures(plan)}
                        type="pro_vps"
                        popular={index === 1}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Budget VPS Plans */}
            {budgetPlans.length > 0 && (
              <section className="section-padding bg-card/30">
                <div className="container-wide">
                  <SectionHeader
                    badge="Budget VPS"
                    title="Cost-Effective Standard VPS"
                    description="Reliable hosting for websites, bots, and development servers."
                  />

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {budgetPlans.map((plan, index) => (
                      <PricingCard
                        key={plan.id}
                        name={plan.name}
                        slug={plan.slug}
                        price={formatPrice(plan.price_monthly)}
                        description={plan.description || "Affordable VPS"}
                        features={getFeatures(plan)}
                        type="budget_vps"
                        popular={index === 1}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {proPlans.length === 0 && budgetPlans.length === 0 && (
              <section className="py-20 text-center">
                <p className="text-muted-foreground">No plans available yet. Check back soon!</p>
              </section>
            )}
          </>
        )}

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
