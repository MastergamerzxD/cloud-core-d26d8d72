import { motion } from "framer-motion";
import { User, Globe, Shield, Cpu, HardDrive, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const stages = [
  {
    icon: User,
    label: "User",
    description: "Your request originates from anywhere in the world",
    color: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
    border: "border-neon-cyan/20",
    glow: "shadow-[0_0_20px_hsl(187_92%_55%_/_0.15)]",
  },
  {
    icon: Globe,
    label: "Network",
    description: "Routed through BGP-optimized Tier-1 transit providers",
    color: "text-neon-blue",
    bg: "bg-neon-blue/10",
    border: "border-neon-blue/20",
    glow: "shadow-[0_0_20px_hsl(217_91%_60%_/_0.15)]",
  },
  {
    icon: Shield,
    label: "DDoS Protection",
    description: "Traffic filtered through multi-layer mitigation systems",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    glow: "shadow-[0_0_20px_hsl(24_95%_53%_/_0.15)]",
  },
  {
    icon: Cpu,
    label: "Compute Nodes",
    description: "Processed by Intel Xeon Platinum series processors",
    color: "text-neon-purple",
    bg: "bg-neon-purple/10",
    border: "border-neon-purple/20",
    glow: "shadow-[0_0_20px_hsl(270_76%_60%_/_0.15)]",
  },
  {
    icon: HardDrive,
    label: "NVMe Storage",
    description: "Data served from enterprise NVMe SSD arrays",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
    glow: "shadow-[0_0_20px_hsl(142_71%_45%_/_0.15)]",
  },
];

export default function InfraArchitectureDiagram() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-wide">
        <SectionHeader
          badge="Architecture"
          title="Cloud Infrastructure Architecture"
          description="How your traffic flows through our infrastructure — from request to response."
        />

        {/* Desktop: Horizontal flow */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-2">
            {stages.map((stage, index) => (
              <div key={stage.label} className="flex items-start flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="flex flex-col items-center text-center flex-1"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl ${stage.bg} border ${stage.border} ${stage.glow} flex items-center justify-center mb-4 transition-all duration-300 hover:scale-110`}
                  >
                    <stage.icon className={`w-7 h-7 ${stage.color}`} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1.5">{stage.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-[140px]">
                    {stage.description}
                  </p>
                </motion.div>

                {index < stages.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
                    className="flex items-center pt-5 px-1 shrink-0"
                  >
                    <div className="relative flex items-center">
                      <div className="w-8 h-px bg-gradient-to-r from-border to-border/50" />
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Animated data flow line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-8 mx-auto max-w-4xl"
          >
            <div className="h-px w-full bg-gradient-to-r from-neon-cyan/0 via-neon-blue/30 via-primary/30 via-neon-purple/30 to-green-400/0 relative overflow-hidden rounded-full">
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile: Vertical flow */}
        <div className="lg:hidden max-w-sm mx-auto space-y-3">
          {stages.map((stage, index) => (
            <div key={stage.label}>
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-xl ${stage.bg} border ${stage.border}`}
              >
                <div className={`w-11 h-11 rounded-xl ${stage.bg} border ${stage.border} flex items-center justify-center shrink-0`}>
                  <stage.icon className={`w-5 h-5 ${stage.color}`} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{stage.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{stage.description}</p>
                </div>
              </motion.div>

              {index < stages.length - 1 && (
                <div className="flex justify-center py-1">
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40 rotate-90" />
                  </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
