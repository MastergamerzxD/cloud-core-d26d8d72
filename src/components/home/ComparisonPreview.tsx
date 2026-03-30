import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Server, Gamepad2, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";

const products = [
  {
    icon: Server,
    name: "VPS Plans",
    description: "Cloud VPS for web apps, APIs, databases, and development environments.",
    price: "From ₹199/mo",
    href: "/vps-plans",
    highlights: ["Intel Xeon Platinum Series", "NVMe SSD Storage", "DDoS Protection", "6 plan tiers"],
  },
  {
    icon: Gamepad2,
    name: "Gaming VPS",
    description: "Optimized for Minecraft, FiveM, GTA RP, and multiplayer game servers.",
    price: "From ₹199/mo",
    href: "/gaming-vps",
    highlights: ["Gaming-optimized", "Advanced DDoS Protection", "Low-latency networking", "6 plan tiers"],
  },
  {
    icon: Monitor,
    name: "High Performance RDP",
    description: "Cloud desktop access for development, trading, editing, and productivity.",
    price: "Coming Soon",
    href: "/rdp",
    highlights: ["Windows RDP", "NVMe SSD Storage", "Enterprise CPUs", "3 plan tiers"],
  },
];

export default function ComparisonPreview() {
  return (
    <section className="section-padding bg-card/60">
      <div className="container-wide">
        <SectionHeader
          badge="Our Products"
          title="Find the Right Plan for You"
          description="Three product lineups designed for every workload — from cloud compute to gaming servers to remote desktops."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <product.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">{product.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 flex-1">{product.description}</p>
              <div className="space-y-2 mb-5">
                {product.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm font-semibold text-primary mb-4">{product.price}</div>
              <Link to={product.href}>
                <Button variant="outline" size="sm" className="w-full group">
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
