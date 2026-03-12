import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "./button";
import { useLaunchPopup } from "@/hooks/useLaunchPopup";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  popular?: boolean;
  type: "pro" | "budget";
  index?: number;
  shopUrl?: string;
}

export default function PricingCard({
  name,
  price,
  period = "/month",
  description,
  features,
  popular = false,
  type,
  index = 0,
  shopUrl = "https://shop.cloudonfire.com",
}: PricingCardProps) {
  const { openPopup } = useLaunchPopup();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`relative group ${popular ? "glow-card glow-card-popular !rounded-2xl scale-[1.02]" : "glow-card !rounded-2xl"} p-5 sm:p-6 lg:p-8`}
    >
      {/* Popular shimmer top bar */}
      {popular && (
        <>
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary-foreground rounded-full whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, hsl(24 95% 53%), hsl(4 90% 58%))",
                boxShadow: "0 0 25px hsl(24 95% 53% / 0.5), 0 4px 12px hsl(24 95% 53% / 0.3)",
              }}
            >
              <Zap className="w-3 h-3" />
              Most Popular
            </span>
          </div>
        </>
      )}

      {/* Subtle top gradient line for non-popular */}
      {!popular && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      <div className="mb-5 sm:mb-6">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full mb-3 sm:mb-4 ${
            type === "pro"
              ? "bg-primary/15 text-primary border border-primary/25"
              : "bg-neon-blue/10 text-neon-blue border border-neon-blue/20"
          }`}
        >
          {type === "pro" ? "Gaming VPS" : "VPS Plan"}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-neon-blue transition-colors duration-300">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      <div className="mb-5 sm:mb-6">
        <span className={`text-4xl sm:text-5xl font-black tracking-tight ${popular ? "text-fire-gradient" : "text-foreground"}`}>
          {price}
        </span>
        {price !== "Coming Soon" && (
          <span className="text-sm sm:text-base text-muted-foreground ml-1">{period}</span>
        )}
      </div>

      {/* Glowing divider */}
      <div className={`h-px mb-5 sm:mb-6 ${popular ? "gradient-divider-fire" : "gradient-divider"}`} />

      <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 sm:gap-3">
            <div
              className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                popular ? "bg-primary/20" : "bg-neon-blue/10"
              }`}
            >
              <Check className={`w-3 h-3 ${popular ? "text-primary" : "text-neon-blue"}`} />
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <a href="https://shop.cloudonfire.com" target="_blank" rel="noopener noreferrer">
        <Button
          className={`w-full h-11 sm:h-12 text-sm sm:text-base font-semibold transition-all duration-300 ${
            popular
              ? "btn-fire"
              : "bg-transparent border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/60 hover:shadow-[0_0_20px_hsl(217_91%_60%_/_0.2)]"
          }`}
          variant={popular ? "default" : "outline"}
        >
          <span className={popular ? "relative z-10" : ""}>
            {price === "Coming Soon" ? "Get Notified" : "Pre-Order Now"}
          </span>
        </Button>
      </a>
    </motion.div>
  );
}
