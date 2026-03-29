import { motion } from "framer-motion";
import { Cpu, HardDrive, Wifi, Shield, Clock, Gauge } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const features = [
  {
    icon: Cpu,
    title: "Intel Xeon Platinum CPUs",
    description: "Enterprise-grade Intel Xeon Platinum 8168 processors with dedicated cores. No shared resources, no throttling.",
    stat: "8168",
    statLabel: "Xeon Platinum",
    gradient: "from-neon-blue/15 to-transparent",
  },
  {
    icon: HardDrive,
    title: "NVMe Gen4 SSD Storage",
    description: "Enterprise NVMe Gen4 SSDs deliver up to 7GB/s sequential read speeds. Your applications load instantly.",
    stat: "7GB/s",
    statLabel: "Read Speed",
    gradient: "from-neon-cyan/15 to-transparent",
  },
  {
    icon: Wifi,
    title: "High Bandwidth Networking",
    description: "1Gbps premium uplinks with optimized routing for sub-millisecond latency across India and beyond.",
    stat: "1Gbps",
    statLabel: "Uplink",
    gradient: "from-neon-purple/15 to-transparent",
  },
  {
    icon: Shield,
    title: "Advanced DDoS Protection",
    description: "Always-on enterprise DDoS mitigation absorbing attacks up to 1Tbps. Your services stay online, guaranteed.",
    stat: "1Tbps",
    statLabel: "Mitigation",
    gradient: "from-primary/15 to-transparent",
  },
];

const statsBar = [
  { icon: Clock, value: "99.99%", label: "Uptime SLA" },
  { icon: Cpu, value: "Xeon Platinum", label: "Enterprise CPUs" },
  { icon: HardDrive, value: "NVMe Gen4", label: "SSD Storage" },
  { icon: Shield, value: "1Tbps", label: "DDoS Mitigation" },
  { icon: Gauge, value: "1Gbps", label: "Network Uplink" },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-neon-blue/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-wide relative">
        <SectionHeader
          badge="⚡ Performance"
          title="Performance Built for Scale"
          description="Every component of our platform is engineered for maximum throughput, reliability, and security."
        />

        {/* Infrastructure stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glow-card p-4 sm:p-6 !rounded-2xl mb-8 sm:mb-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {statsBar.map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 opacity-70" />
                <div className="text-lg sm:text-xl font-extrabold text-fire-gradient">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glow-card p-6 sm:p-8 !rounded-2xl group relative"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative flex gap-5">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{feature.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-fire-gradient">{feature.stat}</span>
                    <span className="text-xs text-muted-foreground">{feature.statLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
