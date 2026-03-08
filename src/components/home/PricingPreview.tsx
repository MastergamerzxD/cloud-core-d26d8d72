import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import PricingCard from "@/components/ui/PricingCard";

const pricingPlans = [
  {
    name: "Starter",
    price: "₹199",
    description: "Cloud VPS starting point",
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
  },
  {
    name: "Gamer Plus",
    price: "₹399",
    description: "Popular for game servers",
    type: "pro" as const,
    features: [
      "4 vCPU Cores",
      "6 GB DDR4 RAM",
      "60 GB NVMe Storage",
      "2000 GB Bandwidth",
      "Advanced DDoS Protection",
      "Gaming Support",
    ],
    popular: true,
  },
  {
    name: "Plus",
    price: "₹399",
    description: "Best value for websites & apps",
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
  },
];

export default function PricingPreview() {
  return (
    <section className="section-padding bg-card/60">
      <div className="container-wide">
        <SectionHeader
          badge="Pricing"
          title="Transparent Pricing, No Hidden Fees"
          description="All prices in INR, billed monthly. No setup fees. Intel Platinum 8168 on all plans."
        />

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
