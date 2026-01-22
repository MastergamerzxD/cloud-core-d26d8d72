import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import PricingCard from "@/components/ui/PricingCard";

const pricingPlans = [
  {
    name: "Pro Starter",
    price: "₹299",
    description: "Perfect for small game servers",
    type: "pro" as const,
    features: [
      "2 vCPU Cores (Dedicated)",
      "4 GB DDR4 RAM",
      "50 GB NVMe Storage",
      "Unlimited Bandwidth",
      "Premium DDoS Protection",
      "Never Suspended Under Attack",
    ],
    popular: false,
  },
  {
    name: "Pro Performance",
    price: "₹599",
    description: "Ideal for high-traffic applications",
    type: "pro" as const,
    features: [
      "4 vCPU Cores (Dedicated)",
      "8 GB DDR4 RAM",
      "100 GB NVMe Storage",
      "Unlimited Bandwidth",
      "Premium DDoS Protection",
      "Never Suspended Under Attack",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Budget Essential",
    price: "₹499",
    description: "Cost-effective for websites & bots",
    type: "budget" as const,
    features: [
      "2 vCPU Cores (Shared)",
      "4 GB DDR4 RAM",
      "60 GB NVMe Storage",
      "Unlimited Bandwidth",
      "DDoS Protection Included",
      "Standard Support",
    ],
    popular: false,
  },
];

export default function PricingPreview() {
  return (
    <section className="section-padding bg-card/30">
      <div className="container-wide">
        <SectionHeader
          badge="Pricing"
          title="Transparent Pricing, No Hidden Fees"
          description="Choose from our range of VPS plans. All prices in INR, billed monthly. No setup fees, no surprises."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.name} {...plan} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/pricing">
            <Button variant="outline" size="lg" className="group">
              View All Plans
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
