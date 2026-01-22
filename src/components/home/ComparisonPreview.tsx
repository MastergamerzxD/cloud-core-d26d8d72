import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";

const comparisonData = [
  { feature: "DDoS Protection", pro: true, budget: true },
  { feature: "Dedicated Resources", pro: true, budget: false },
  { feature: "Never Suspended Under Attack", pro: true, budget: false },
  { feature: "NVMe Storage", pro: true, budget: true },
  { feature: "24/7 Support", pro: true, budget: true },
  { feature: "Optimized for Gaming", pro: true, budget: false },
];

export default function ComparisonPreview() {
  return (
    <section className="section-padding bg-card/30">
      <div className="container-wide">
        <SectionHeader
          badge="Compare Plans"
          title="Find the Right VPS for Your Needs"
          description="Choose between high-performance Pro VPS for demanding workloads or cost-effective Budget VPS for standard applications."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-border/50 bg-secondary/30">
              <div className="text-sm font-medium text-muted-foreground">Feature</div>
              <div className="text-center">
                <span className="inline-block px-3 py-1 text-sm font-semibold bg-primary/20 text-primary rounded-full">
                  Pro VPS
                </span>
                <div className="text-xs text-muted-foreground mt-1">From ₹299/mo</div>
              </div>
              <div className="text-center">
                <span className="inline-block px-3 py-1 text-sm font-semibold bg-secondary text-secondary-foreground rounded-full">
                  Budget VPS
                </span>
                <div className="text-xs text-muted-foreground mt-1">From ₹499/mo</div>
              </div>
            </div>

            {/* Rows */}
            {comparisonData.map((row, index) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 gap-4 p-4 ${
                  index !== comparisonData.length - 1 ? "border-b border-border/30" : ""
                }`}
              >
                <div className="text-sm text-foreground">{row.feature}</div>
                <div className="flex justify-center">
                  {row.pro ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : (
                    <X className="w-5 h-5 text-muted-foreground/50" />
                  )}
                </div>
                <div className="flex justify-center">
                  {row.budget ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : (
                    <X className="w-5 h-5 text-muted-foreground/50" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link to="/compare">
              <Button variant="outline" className="group">
                View Full Comparison
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
