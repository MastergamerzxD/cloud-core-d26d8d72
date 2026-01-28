import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import PricingCard from "@/components/ui/PricingCard";
import { supabase } from "@/integrations/supabase/client";

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

export default function PricingPreview() {
  const [plans, setPlans] = useState<Product[]>([]);
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
        .order("price_monthly")
        .limit(3);

      if (error) throw error;
      setPlans(data || []);
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
    features.push(isProType ? "Premium DDoS Protection" : "DDoS Protection Included");
    if (isProType) features.push("Never Suspended Under Attack");
    
    return features;
  };

  return (
    <section className="section-padding bg-card/30">
      <div className="container-wide">
        <SectionHeader
          badge="Pricing"
          title="Transparent Pricing, No Hidden Fees"
          description="All prices in INR, billed monthly. No setup fees."
        />

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : plans.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.id}
                name={plan.name}
                slug={plan.slug}
                price={formatPrice(plan.price_monthly)}
                description={plan.description || "VPS Hosting"}
                features={getFeatures(plan)}
                type={plan.product_type as "pro_vps" | "budget_vps"}
                popular={index === 1}
                index={index}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            Plans coming soon. Check back later!
          </p>
        )}

        <div className="mt-8 sm:mt-12 text-center">
          <Link to="/pricing">
            <Button variant="outline" size="lg" className="group text-sm sm:text-base">
              View All Plans
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
