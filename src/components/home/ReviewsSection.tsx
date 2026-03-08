import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Arjun S.",
    role: "Game Server Admin",
    quote: "Best Minecraft hosting in India. Zero lag, zero downtime. The DDoS protection actually works.",
    rating: 5,
  },
  {
    name: "Priya M.",
    role: "SaaS Developer",
    quote: "Moved from AWS to Cloud on Fire. Performance is identical at 1/3rd the cost. Insane value.",
    rating: 5,
  },
  {
    name: "Rahul K.",
    role: "FiveM Community Owner",
    quote: "Our 64-slot FiveM server runs butter smooth. Support team responds in minutes, not hours.",
    rating: 5,
  },
  {
    name: "Deepak T.",
    role: "Trading Bot Developer",
    quote: "99.99% uptime for my trading bots. The NVMe speeds are exactly as advertised.",
    rating: 5,
  },
];

export default function ReviewsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-6 lg:gap-8 items-stretch">
          {/* Big rating card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glow-card glow-card-popular p-6 sm:p-8 flex flex-col items-center justify-center text-center !rounded-2xl"
          >
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 sm:w-7 sm:h-7 fill-primary text-primary" />
              ))}
            </div>
            <div className="text-5xl sm:text-6xl font-extrabold text-fire-gradient mb-2">4.9</div>
            <p className="text-sm sm:text-base text-muted-foreground mb-1">out of 5.0</p>
            <p className="text-lg sm:text-xl font-bold text-foreground mt-2">We're Rated Excellent</p>
            <p className="text-xs text-muted-foreground mt-1">Based on 150+ verified reviews</p>
          </motion.div>

          {/* Review cards grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glow-card p-5 !rounded-2xl group"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed mb-4 italic">
                  "{review.quote}"
                </p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
