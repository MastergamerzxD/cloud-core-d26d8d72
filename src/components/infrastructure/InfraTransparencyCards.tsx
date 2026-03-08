import { motion } from "framer-motion";
import { Cpu, HardDrive, Network } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const cards = [
  {
    icon: Cpu,
    title: "Compute",
    description: "Intel Xeon Platinum 8168 processors optimized for high performance workloads. 24 cores, 48 threads, and turbo boost up to 3.7 GHz deliver reliable compute power for every application.",
    color: "text-neon-blue",
    bg: "bg-neon-blue/10",
    border: "border-neon-blue/20",
    glow: "group-hover:shadow-[0_0_30px_hsl(217_91%_60%_/_0.2)]",
  },
  {
    icon: HardDrive,
    title: "Storage",
    description: "High speed NVMe SSD storage optimized for low latency workloads. Enterprise-grade drives deliver sustained read and write performance with RAID protection for data integrity.",
    color: "text-neon-purple",
    bg: "bg-neon-purple/10",
    border: "border-neon-purple/20",
    glow: "group-hover:shadow-[0_0_30px_hsl(270_76%_60%_/_0.2)]",
  },
  {
    icon: Network,
    title: "Networking",
    description: "Enterprise network backbone with advanced DDoS mitigation. Multiple Tier-1 transit providers with BGP-optimized routing ensure the lowest possible latency across India and beyond.",
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
          badge="Technology"
          title="Real Infrastructure, Real Performance"
          description="Transparent details about the technology powering Cloud on Fire."
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
