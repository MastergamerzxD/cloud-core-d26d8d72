import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Server, Gamepad2, Monitor, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";

const products = [
  {
    icon: Server,
    name: "VPS Hosting",
    badge: "Most Popular",
    subtitle: "Affordable and powerful virtual servers",
    price: "₹199",
    href: "/vps-plans",
    popular: true,
    features: [
      "NVMe SSD Storage",
      "Full Root Access",
      "Instant Deployment",
      "DDoS Protection",
    ],
  },
  {
    icon: Gamepad2,
    name: "Gaming VPS",
    badge: "Best for Gaming",
    badgeStyle: "gaming" as const,
    subtitle: "Optimized for performance and low latency",
    price: "₹299",
    href: "/gaming-vps",
    popular: false,
    features: [
      "Ultimate DDoS Protection",
      "Low Latency Network",
      "High CPU Performance",
      "Game-optimized Setup",
    ],
  },
  {
    icon: Monitor,
    name: "RDP Plans",
    badge: null,
    subtitle: "Secure remote desktop solutions",
    price: "Coming Soon",
    href: "/rdp",
    popular: false,
    comingSoon: true,
    features: [
      "Dedicated Resources",
      "Secure Environment",
      "High-speed Connection",
      "Easy Access",
    ],
  },
];

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-card/40 relative overflow-hidden">
      <div className="absolute inset-0 network-grid-bg opacity-10" />

      <div className="container-wide relative">
        <SectionHeader
          badge="🚀 Our Products"
          title="Choose Your Cloud Solution"
          description="Deploy high-performance servers tailored to your workload — from cloud VPS to gaming servers to remote desktops."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`relative group rounded-2xl border transition-all duration-300 p-6 sm:p-7 flex flex-col ${
                product.popular
                  ? "border-primary/40 bg-gradient-to-b from-primary/[0.06] to-card shadow-[0_0_30px_hsl(var(--primary)/0.08)]"
                  : "border-border/60 bg-card/80 hover:border-border"
              } hover:shadow-lg hover:scale-[1.02]`}
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span
                    className="inline-flex items-center gap-1.5 px-4 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary-foreground rounded-full whitespace-nowrap"
                    style={
                      (product as any).badgeStyle === "gaming"
                        ? {
                            background: "linear-gradient(135deg, hsl(270 76% 55%), hsl(217 91% 60%))",
                            boxShadow: "0 0 20px hsl(270 76% 55% / 0.5), 0 0 40px hsl(217 91% 60% / 0.2)",
                          }
                        : {
                            background: "linear-gradient(135deg, hsl(24 95% 53%), hsl(4 90% 58%))",
                            boxShadow: "0 0 20px hsl(24 95% 53% / 0.4)",
                          }
                    }
                  >
                    {(product as any).badgeStyle === "gaming" ? (
                      <Gamepad2 className="w-3 h-3" />
                    ) : (
                      <Zap className="w-3 h-3" />
                    )}
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Top accent line */}
              {product.popular && (
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                product.popular
                  ? "bg-primary/15 group-hover:bg-primary/25"
                  : "bg-muted group-hover:bg-muted/80"
              }`}>
                <product.icon className={`w-6 h-6 ${product.popular ? "text-primary" : "text-foreground/70"}`} />
              </div>

              {/* Title & subtitle */}
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{product.subtitle}</p>

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      product.popular ? "bg-primary/15" : "bg-muted"
                    }`}>
                      <Check className={`w-3 h-3 ${product.popular ? "text-primary" : "text-foreground/60"}`} />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="mb-5">
                <span className={`text-3xl sm:text-4xl font-black tracking-tight ${
                  product.popular ? "text-primary" : "text-foreground"
                }`}>
                  {product.price}
                </span>
                {!product.comingSoon && (
                  <span className="text-sm text-muted-foreground ml-1">/mo</span>
                )}
              </div>

              {/* CTA */}
              <Link to={product.href} className="mt-auto">
                {product.comingSoon ? (
                  <Button
                    variant="outline"
                    className="w-full h-11 text-sm font-semibold opacity-60 cursor-not-allowed"
                    disabled
                  >
                    Coming Soon
                  </Button>
                ) : (
                  <Button
                    className={`w-full h-11 text-sm font-semibold transition-all duration-300 group/btn ${
                      product.popular
                        ? "btn-fire"
                        : "bg-transparent border border-border text-foreground hover:bg-muted hover:border-foreground/20"
                    }`}
                    variant={product.popular ? "default" : "outline"}
                  >
                    <span className={product.popular ? "relative z-10 flex items-center gap-1.5" : "flex items-center gap-1.5"}>
                      View Plans
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </Button>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
