import { motion } from "framer-motion";
import { Cpu, HardDrive, Network, Shield, Server, Monitor, Database, Lock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const techItems = [
  { icon: Cpu, label: "Intel Platinum 8168", sublabel: "Enterprise Processors" },
  { icon: HardDrive, label: "NVMe Gen4 SSD", sublabel: "7GB/s Read Speed" },
  { icon: Network, label: "1Gbps Uplink", sublabel: "Premium Bandwidth" },
  { icon: Shield, label: "1Tbps DDoS", sublabel: "Always-On Protection" },
  { icon: Server, label: "Yotta DC", sublabel: "Tier-3+ Certified" },
  { icon: Monitor, label: "Full Root Access", sublabel: "Complete Control" },
  { icon: Database, label: "DDR4 ECC RAM", sublabel: "Error-Correcting" },
  { icon: Lock, label: "24/7 Monitoring", sublabel: "Real-Time Alerts" },
];

export default function TechStackSection() {
  return (
    <section className="section-padding bg-card/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="container-wide relative">
        <SectionHeader
          badge="Technology Stack"
          title="Powered by Enterprise Hardware"
          description="We don't compromise on hardware. Every component is selected for maximum performance and reliability."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {techItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card p-5 rounded-xl text-center group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm font-semibold text-foreground">{item.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.sublabel}</div>
            </motion.div>
          ))}
        </div>

        {/* Scrolling banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 glass-card p-6 rounded-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "Delhi & Mumbai", label: "Data Center Locations" },
              { value: "Unlimited", label: "Bandwidth on All Plans" },
              { value: "Linux & Windows", label: "OS Support" },
              { value: "₹199/mo", label: "Starting Price" },
            ].map((item, i) => (
              <div key={item.label} className="relative">
                {i > 0 && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 bg-border/50 hidden md:block" />
                )}
                <div className="text-lg sm:text-xl font-bold text-fire-gradient">{item.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
