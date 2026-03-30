import { motion } from "framer-motion";
import { Cpu, HardDrive, Network } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const cards = [
  {
    icon: Cpu,
    title: "Compute Infrastructure",
    description: "Cloud on Fire servers are powered by Intel Xeon Platinum series processors (8168 / 8173M) — enterprise-grade CPUs with high core counts, strong single-core performance, and turbo boost capabilities. Designed for high-performance workloads and scalable cloud deployments.",
    color: "text-neon-blue",
    bg: "bg-neon-blue/10",
    border: "border-neon-blue/20",
    glow: "group-hover:shadow-[0_0_30px_hsl(217_91%_60%_/_0.2)]",
  },
  {
    icon: HardDrive,
    title: "Storage Architecture",
    description: "All servers use enterprise NVMe SSD storage designed for fast data access, low latency applications, and sustained I/O performance. RAID protection ensures data integrity across all workloads.",
    color: "text-neon-purple",
    bg: "bg-neon-purple/10",
    border: "border-neon-purple/20",
    glow: "group-hover:shadow-[0_0_30px_hsl(270_76%_60%_/_0.2)]",
  },
  {
    icon: Network,
    title: "Network Protection",
    description: "Infrastructure includes an enterprise network backbone with advanced DDoS mitigation at the network level. Multiple Tier-1 transit providers with BGP-optimized routing maintain service availability and low latency.",
    color: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
    border: "border-neon-cyan/20",
    glow: "group-hover:shadow-[0_0_30px_hsl(187_92%_55%_/_0.2)]",
  },
];

export default function InfraTransparencyCards() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-wide">
        <SectionHeader
          badge="Infrastructure Transparency"
          title="Built on Enterprise Hardware"
          description="Cloud on Fire focuses on performance-driven infrastructure using enterprise hardware and optimized networking. No exaggerated claims — just clear technical capabilities."
        />
        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group glow-card p-6 sm:p-8 transition-all duration-500 ${card.glow}`}
            >
              <div className={`w-14 h-14 rounded-2xl ${card.bg} border ${card.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className={`w-7 h-7 ${card.color}`} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
