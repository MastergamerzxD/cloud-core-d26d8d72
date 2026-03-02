import { motion } from "framer-motion";
import { MapPin, Users, Shield, Zap, Building2, Clock } from "lucide-react";

const companyHighlights = [
  {
    icon: MapPin,
    title: "Based in Delhi, India",
    description: "Headquartered in Delhi with data center operations in Delhi & Mumbai for pan-India low-latency connectivity.",
  },
  {
    icon: Building2,
    title: "Yotta Data Centers",
    description: "Our servers are housed in India's premier Yotta data centers — Tier-3+ certified with world-class security and redundancy.",
  },
  {
    icon: Shield,
    title: "Enterprise DDoS Shield",
    description: "Every VPS comes with always-on DDoS protection. Pro VPS customers are never suspended — even under the heaviest attacks.",
  },
  {
    icon: Zap,
    title: "Blazing Fast NVMe",
    description: "Enterprise NVMe Gen4 SSDs deliver up to 7GB/s read speeds. Your applications load instantly, every time.",
  },
  {
    icon: Users,
    title: "500+ Active Servers",
    description: "Trusted by developers, gamers, and businesses across India running mission-critical workloads 24/7.",
  },
  {
    icon: Clock,
    title: "5-Minute Deployment",
    description: "From payment to live server in under 5 minutes. Automated provisioning with full root access from day one.",
  },
];

export default function CompanySection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - About text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 border border-primary/20 rounded-full mb-6">
              <MapPin className="w-3 h-3" />
              Delhi, India
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              India's Most Reliable
              <br />
              <span className="text-fire-gradient">VPS Hosting Provider</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Cloud on Fire is a Delhi-based VPS hosting company delivering enterprise-grade 
              virtual private servers across India. We operate out of Yotta's world-class 
              data centers in Delhi and Mumbai, ensuring sub-millisecond latency for your 
              applications.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you're hosting game servers, running SaaS applications, deploying 
              trading bots, or managing high-traffic websites — our infrastructure is 
              engineered for stability, speed, and unmatched DDoS protection.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "2", label: "Data Centers" },
                { value: "99.9%", label: "Uptime SLA" },
                { value: "1Tbps", label: "DDoS Shield" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center glass-card p-4 rounded-xl"
                >
                  <div className="text-2xl font-bold text-fire-gradient">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Grid of highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {companyHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card p-5 rounded-xl group hover:border-primary/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
