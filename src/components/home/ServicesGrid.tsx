import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Server, Gamepad2, Monitor, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";

const services = [
  {
    icon: Server,
    name: "VPS Hosting",
    description: "Deploy high-performance cloud VPS for web apps, APIs, databases, and development workloads. Starting at ₹199/month.",
    href: "/vps-plans",
    gradient: "from-neon-blue/20 to-neon-purple/10",
    iconColor: "text-neon-blue",
    iconBg: "bg-neon-blue/15 group-hover:bg-neon-blue/25",
    anchor: "Explore VPS hosting plans",
  },
  {
    icon: Gamepad2,
    name: "Gaming VPS",
    description: "Optimized for Minecraft, FiveM, Rust, and multiplayer game servers with enterprise DDoS protection.",
    href: "/gaming-vps",
    gradient: "from-primary/20 to-fire-red/10",
    iconColor: "text-primary",
    iconBg: "bg-primary/15 group-hover:bg-primary/25",
    anchor: "Explore gaming VPS hosting",
  },
  {
    icon: Monitor,
    name: "Cloud RDP",
    description: "Enterprise-grade cloud desktops for development, trading, remote work, and productivity.",
    href: "/rdp",
    gradient: "from-neon-cyan/20 to-neon-blue/10",
    iconColor: "text-neon-cyan",
    iconBg: "bg-neon-cyan/15 group-hover:bg-neon-cyan/25",
    anchor: "Explore cloud RDP servers",
  },
  {
    icon: Shield,
    name: "DDoS Protection",
    description: "Enterprise-grade mitigation up to 1Tbps. Keep your servers online during the heaviest attacks.",
    href: "/ddos-protection",
    gradient: "from-neon-purple/20 to-neon-blue/10",
    iconColor: "text-neon-purple",
    iconBg: "bg-neon-purple/15 group-hover:bg-neon-purple/25",
    anchor: "Learn about DDoS protection",
  },
];

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-card/40 relative overflow-hidden">
      <div className="absolute inset-0 network-grid-bg opacity-20" />

      <div className="container-wide relative">
        <SectionHeader
          badge="🚀 Our Services"
          title="Your Complete Cloud Infrastructure"
          description="Everything you need to deploy, scale, and protect your applications in one platform."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glow-card p-6 sm:p-7 !rounded-2xl group relative"
            >
              {/* Subtle gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative">
                <div className={`w-14 h-14 rounded-xl ${service.iconBg} flex items-center justify-center mb-5 transition-colors duration-300`}>
                  <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{service.description}</p>
                <Link to={service.href} aria-label={service.anchor}>
                  <Button variant="ghost" size="sm" className="px-0 text-primary hover:text-primary/80 hover:bg-transparent group/btn">
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
