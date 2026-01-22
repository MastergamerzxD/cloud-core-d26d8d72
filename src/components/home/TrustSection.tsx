import { motion } from "framer-motion";
import { Server, Shield, Cpu, HardDrive } from "lucide-react";

const trustPoints = [
  {
    icon: Server,
    title: "Enterprise Hardware",
    description: "Latest-gen Intel Xeon and AMD EPYC processors with ECC RAM",
  },
  {
    icon: Shield,
    title: "Multi-Layer Security",
    description: "Hardware firewalls, network segmentation, and real-time monitoring",
  },
  {
    icon: Cpu,
    title: "Redundant Systems",
    description: "N+1 power and cooling with automatic failover capabilities",
  },
  {
    icon: HardDrive,
    title: "NVMe Storage",
    description: "High-speed solid-state drives with RAID protection",
  },
];

export default function TrustSection() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full mb-4">
              Infrastructure
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              Built on Enterprise-Grade
              <br />
              <span className="text-fire-gradient">Hardware You Can Trust</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our infrastructure is engineered with the same principles used by major cloud providers. 
              Every server, switch, and cable is selected for reliability and performance. 
              We don't cut corners because your uptime depends on it.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {trustPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <point.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{point.title}</h4>
                    <p className="text-xs text-muted-foreground">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background glow */}
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px]" />
              
              {/* Server rack visualization */}
              <div className="relative glass-card p-8 h-full flex flex-col justify-center">
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-12 rounded-lg bg-secondary/50 border border-border/50 flex items-center px-4 gap-3"
                    >
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                        <div className="w-2 h-2 rounded-full bg-primary/50" />
                      </div>
                      <div className="flex-1 h-2 rounded-full bg-border/50" />
                      <div className="flex gap-1">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="w-1 h-6 rounded-full bg-primary/30" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <span className="text-sm text-muted-foreground">Active Servers: Online</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
