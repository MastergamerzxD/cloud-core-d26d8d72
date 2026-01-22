import { Shield, Zap, Server, Globe, Clock, Headphones } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCard from "@/components/ui/FeatureCard";

const features = [
  {
    icon: Shield,
    title: "Premium DDoS Protection",
    description: "Enterprise-grade mitigation that absorbs attacks up to 1Tbps. Your services stay online while we handle the threats.",
  },
  {
    icon: Zap,
    title: "Low-Latency Network",
    description: "Optimized routing and premium bandwidth ensure sub-millisecond latency for gaming and real-time applications.",
  },
  {
    icon: Server,
    title: "Dedicated Resources",
    description: "Pro VPS plans feature dedicated CPU cores and NVMe storage. No shared resources, no performance throttling.",
  },
  {
    icon: Globe,
    title: "India-Optimized Infrastructure",
    description: "Data centers strategically located for optimal connectivity across the Indian subcontinent and beyond.",
  },
  {
    icon: Clock,
    title: "99.9% Uptime Guarantee",
    description: "SLA-backed reliability with redundant power, networking, and storage systems across all infrastructure.",
  },
  {
    icon: Headphones,
    title: "24/7 Technical Support",
    description: "Expert engineers available around the clock via ticket and chat. Average response time under 15 minutes.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeader
          badge="Why Choose Us"
          title="Infrastructure Built for Performance"
          description="Every component of our platform is engineered for stability, speed, and security. From network architecture to hardware selection, we prioritize reliability."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
