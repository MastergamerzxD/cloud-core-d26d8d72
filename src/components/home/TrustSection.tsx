import { motion } from "framer-motion";
import { Zap, Server, IndianRupee, Activity } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const trustPoints = [
  {
    icon: Zap,
    title: "Fast Deployment",
    description: "Get your VPS server up and running in minutes, not hours. One-click setup with your choice of OS.",
  },
  {
    icon: Server,
    title: "High-Performance VPS",
    description: "Intel Xeon Platinum 8168 processors, NVMe Gen4 SSDs, and 10Gbps networking for demanding workloads.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    description: "Enterprise-grade infrastructure starting at just ₹199/month. No hidden fees, no surprises.",
  },
  {
    icon: Activity,
    title: "Reliable Uptime",
    description: "99.9% uptime SLA backed by Tier-3+ data centers in India with redundant power and cooling.",
  },
];

export default function TrustSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeader
          badge="Why Cloud on Fire"
          title="Why Choose Cloud on Fire?"
          description="Cloud on Fire is a VPS hosting provider built for performance, reliability, and affordability."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {trustPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glow-card p-5 sm:p-6 text-center group hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">{point.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
