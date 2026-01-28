import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";

interface PricingCardProps {
  name: string;
  slug?: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  popular?: boolean;
  type: "pro" | "budget";
  index?: number;
}

export default function PricingCard({
  name,
  slug,
  price,
  period = "/month",
  description,
  features,
  popular = false,
  type,
  index = 0,
}: PricingCardProps) {
  // Generate slug from name if not provided
  const productSlug = slug || name.toLowerCase().replace(/\s+/g, "-");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative glass-card p-4 sm:p-6 lg:p-8 ${
        popular ? "border-primary/50 fire-glow" : ""
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-semibold text-primary-foreground bg-gradient-fire rounded-full whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-4 sm:mb-6">
        <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full mb-3 sm:mb-4 ${
          type === "pro" 
            ? "bg-primary/20 text-primary" 
            : "bg-secondary text-secondary-foreground"
        }`}>
          {type === "pro" ? "Pro VPS" : "Budget VPS"}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-foreground">{name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">{description}</p>
      </div>

      <div className="mb-4 sm:mb-6">
        <span className="text-3xl sm:text-4xl font-bold text-foreground">{price}</span>
        <span className="text-sm sm:text-base text-muted-foreground">{period}</span>
      </div>

      <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 sm:gap-3">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Link to={`/order?product=${productSlug}`} className="block">
        <Button
          className={`w-full h-10 sm:h-11 text-sm sm:text-base ${popular ? "btn-fire" : ""}`}
          variant={popular ? "default" : "outline"}
        >
          <span className={popular ? "relative z-10" : ""}>Order Now</span>
        </Button>
      </Link>
    </motion.div>
  );
}