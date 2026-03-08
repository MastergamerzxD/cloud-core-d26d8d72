import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  badge,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} mb-10 sm:mb-14 lg:mb-18`}
    >
      {badge && (
        <span className="glow-badge text-[10px] sm:text-xs mb-4 sm:mb-5 inline-flex">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-foreground leading-tight tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-2 sm:px-0">
          {description}
        </p>
      )}
    </motion.div>
  );
}
