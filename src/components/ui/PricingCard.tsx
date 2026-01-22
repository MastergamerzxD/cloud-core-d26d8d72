import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";

interface PricingCardProps {
  name: string;
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
  price,
  period = "/month",
  description,
  features,
  popular = false,
  type,
  index = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative glass-card p-6 lg:p-8 ${
        popular ? "border-primary/50 fire-glow" : ""
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 text-xs font-semibold text-primary-foreground bg-gradient-fire rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${
          type === "pro" 
            ? "bg-primary/20 text-primary" 
            : "bg-secondary text-secondary-foreground"
        }`}>
          {type === "pro" ? "Pro VPS" : "Budget VPS"}
        </span>
        <h3 className="text-xl font-bold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold text-foreground">{price}</span>
        <span className="text-muted-foreground">{period}</span>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Link to="/contact" className="block">
        <Button
          className={`w-full ${popular ? "btn-fire" : ""}`}
          variant={popular ? "default" : "outline"}
        >
          <span className={popular ? "relative z-10" : ""}>Get Started</span>
        </Button>
      </Link>
    </motion.div>
  );
}
