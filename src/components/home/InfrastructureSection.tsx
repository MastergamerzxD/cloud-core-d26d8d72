import { motion } from "framer-motion";
import { Server, Building2, Globe, TrendingUp } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import LatencyTestTool from "@/components/tools/LatencyTestTool";

const infraCards = [
  {
    icon: Server,
    title: "Enterprise Hardware",
    description: "Intel Xeon Platinum processors, DDR4 ECC RAM, and enterprise NVMe drives in every server.",
    gradient: "from-neon-blue/15 to-transparent",
  },
  {
    icon: Building2,
    title: "Yotta Tier-3+ Data Centers",
    description: "World-class facilities in Delhi and Mumbai with N+1 power, cooling, and 24/7 physical security.",
    gradient: "from-neon-purple/15 to-transparent",
  },
  {
    icon: Globe,
    title: "Global Networking",
    description: "Premium 1Gbps uplinks with optimized peering for low-latency connectivity across India and beyond.",
    gradient: "from-neon-cyan/15 to-transparent",
  },
  {
    icon: TrendingUp,
    title: "Cloud Scalability",
    description: "Scale resources instantly as your workloads grow. Upgrade CPU, RAM, and storage without downtime.",
    gradient: "from-primary/15 to-transparent",
  },
];

export default function InfrastructureSection() {
  return (
    <section className="section-padding bg-card/40 relative overflow-hidden">
      <div className="absolute inset-0 network-grid-bg opacity-15" />

      <div className="container-wide relative">
        <SectionHeader
          badge="🏢 Infrastructure"
          title="Enterprise-Grade Foundation"
          description="Our infrastructure is built with the same principles used by the world's largest cloud providers."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {infraCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glow-card p-6 sm:p-7 !rounded-2xl text-center group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                  <card.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
              </div>
              </motion.div>
          ))}
          
          {/* Latency test preview card */}
          <LatencyTestTool variant="compact" />
        </div>
      </div>
    </section>
  );
}
