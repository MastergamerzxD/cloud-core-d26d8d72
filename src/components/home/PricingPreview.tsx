import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import PricingCard from "@/components/ui/PricingCard";

const pricingPlans = [
  {
    name: "Starter",
    price: "₹199",
    description: "Perfect for personal projects & small websites",
    type: "budget" as const,
    features: [
      "2 vCPU Cores",
      "4 GB DDR4 RAM",
      "30 GB NVMe Storage",
      "1000 GB Bandwidth",
      "DDoS Protection",
      "1x IPv4 Address",
    ],
    popular: false,
    badge: "Best Value",
  },
  {
    name: "Gamer Plus",
    price: "₹399",
    description: "Recommended for game servers & apps",
    type: "pro" as const,
    features: [
      "4 vCPU Cores",
      "6 GB DDR4 RAM",
      "60 GB NVMe Storage",
      "2000 GB Bandwidth",
      "Advanced DDoS Protection",
      "Gaming Optimized",
    ],
    popular: true,
    badge: "Most Popular",
  },
  {
    name: "Plus",
    price: "₹399",
    description: "Great for businesses & high-traffic sites",
    type: "budget" as const,
    features: [
      "4 vCPU Cores",
      "6 GB DDR4 RAM",
      "60 GB NVMe Storage",
      "2000 GB Bandwidth",
      "DDoS Protection",
      "1x IPv4 Address",
    ],
    popular: false,
    badge: "Recommended",
  },
];

export default function PricingPreview() {
  return (
    <section className="section-padding bg-card/40">
      <div className="container-wide">
        <SectionHeader
          badge="Pricing"
          title="Simple, Transparent Pricing"
          description="No hidden fees. All plans include DDoS protection, NVMe storage, and 24/7 support."
        />

        {/* Pre-order notice */}
        <div className="max-w-2xl mx-auto mb-8 p-4 rounded-xl border border-primary/20 bg-primary/5 text-center">
          <p className="text-sm text-foreground">
            🔥 Use coupon <span className="font-black text-primary tracking-wide">PREORDER40</span> for 40% off your first month.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.name} {...plan} index={index} />
          ))}
        </div>

        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-3">
          <Link to="/vps-plans">
            <Button variant="outline" size="lg" className="group text-sm sm:text-base">
              View All VPS Plans
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/gaming-vps">
            <Button variant="outline" size="lg" className="group text-sm sm:text-base">
              Gaming VPS
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
