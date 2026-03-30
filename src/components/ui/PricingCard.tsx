import { motion } from "framer-motion";
import { Check, Zap, Cpu, MemoryStick, HardDrive, Globe, Shield, Server } from "lucide-react";
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

// Map feature keywords to icons
const getFeatureIcon = (feature: string) => {
  const lower = feature.toLowerCase();
  if (lower.includes("vcpu") || lower.includes("cpu") || lower.includes("core")) return Cpu;
  if (lower.includes("ram") || lower.includes("ddr")) return MemoryStick;
  if (lower.includes("nvme") || lower.includes("storage") || lower.includes("ssd")) return HardDrive;
  if (lower.includes("bandwidth")) return Globe;
  if (lower.includes("ddos") || lower.includes("protection")) return Shield;
  if (lower.includes("ipv4") || lower.includes("address")) return Server;
  return Check;
};

// Parse feature to highlight the value portion
const parseFeature = (feature: string) => {
  // Patterns like "4 vCPU Cores", "6 GB DDR4 RAM", "60 GB NVMe Storage", "2000 GB Bandwidth"
  const match = feature.match(/^([\d,]+\s*(?:x\s*)?(?:GB|TB|vCPU)?)\s+(.+)$/i);
  if (match) {
    return { value: match[1], label: match[2] };
  }
  // Patterns like "Unmetered Bandwidth"
  const unmatch = feature.match(/^(Unmetered|Advanced|Standard|Priority|Full)\s+(.+)$/i);
  if (unmatch) {
    return { value: unmatch[1], label: unmatch[2] };
  }
  // Patterns like "1x IPv4 Address"
  const countMatch = feature.match(/^(\d+x)\s+(.+)$/i);
  if (countMatch) {
    return { value: countMatch[1], label: countMatch[2] };
  }
  return { value: null, label: feature };
};

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

      <ul className="space-y-3 sm:space-y-3.5 mb-6 sm:mb-8">
        {features.map((feature, i) => {
          const FeatureIcon = getFeatureIcon(feature);
          const { value, label } = parseFeature(feature);

          return (
            <li key={i} className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  popular ? "bg-primary/15 border border-primary/20" : "bg-neon-blue/10 border border-neon-blue/15"
                }`}
              >
                <FeatureIcon className={`w-3.5 h-3.5 ${popular ? "text-primary" : "text-neon-blue"}`} />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                {value ? (
                  <>
                    <span className="font-bold text-foreground text-[15px]">{value}</span>{" "}
                    <span className="text-muted-foreground">{label}</span>
                  </>
                ) : (
                  <span>{label}</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <a href={shopUrl} target="_blank" rel="noopener noreferrer">
        <Button
          className={`w-full h-12 sm:h-13 text-sm sm:text-base font-bold transition-all duration-300 ${
            popular
              ? "btn-fire shadow-[0_0_20px_hsl(24_95%_53%_/_0.3)]"
              : "bg-transparent border-2 border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/60 hover:shadow-[0_0_20px_hsl(217_91%_60%_/_0.2)]"
          }`}
          variant={popular ? "default" : "outline"}
        >
          <span className={popular ? "relative z-10" : ""}>
            {price === "Coming Soon" ? "Get Notified" : "Pre-Order Now →"}
          </span>
        </Button>
      </a>
    </motion.div>
  );
}
