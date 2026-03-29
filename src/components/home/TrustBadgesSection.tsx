import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HardDrive, Shield, Cpu, Gauge, Clock, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const badges = [
  { icon: Cpu, label: "Intel Xeon Platinum", description: "Enterprise-grade 24-core processors" },
  { icon: HardDrive, label: "NVMe Gen4 Storage", description: "Up to 7GB/s sequential reads" },
  { icon: Shield, label: "1Tbps DDoS Shield", description: "Always-on attack mitigation" },
  { icon: Gauge, label: "1Gbps Network", description: "Premium low-latency uplinks" },
  { icon: Clock, label: "99.99% Uptime", description: "Enterprise reliability SLA" },
];

export default function TrustBadgesSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 network-grid-bg opacity-10 pointer-events-none" />

      <div className="container-wide relative">
        <SectionHeader
          badge="🛡️ Why Trust Us"
          title="Enterprise Infrastructure, Accessible Pricing"
          description="Built with the same hardware powering the world's largest cloud platforms — but priced for India."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto mb-10">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glow-card p-4 sm:p-5 text-center group hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <badge.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-foreground">{badge.label}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">{badge.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Internal link strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {[
            { label: "Explore VPS hosting plans", href: "/vps-plans" },
            { label: "Gaming VPS for Minecraft & FiveM", href: "/gaming-vps" },
            { label: "Cloud RDP remote desktop", href: "/rdp" },
            { label: "Learn about DDoS protection", href: "/ddos-protection" },
            { label: "View our infrastructure", href: "/infrastructure" },
          ].map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="group flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary border border-border/50 hover:border-primary/30 rounded-full transition-all duration-300"
            >
              {link.label}
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
