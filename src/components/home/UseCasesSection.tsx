import { motion } from "framer-motion";
import { Gamepad2, Globe, Bot, BarChart3, Code, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const useCases = [
  {
    icon: Gamepad2,
    title: "Game Server Hosting",
    description: "Run Minecraft, FiveM, Rust, ARK and more with dedicated resources and DDoS protection that never takes you offline.",
    tag: "Most Popular",
  },
  {
    icon: Globe,
    title: "Web Applications",
    description: "Host high-traffic websites, SaaS platforms, and web apps on blazing-fast NVMe storage with 99.9% uptime.",
    tag: null,
  },
  {
    icon: Bot,
    title: "Discord & Trading Bots",
    description: "Deploy bots that run 24/7 with guaranteed uptime. Perfect for Discord bots, trading algorithms, and automation.",
    tag: null,
  },
  {
    icon: BarChart3,
    title: "Business Applications",
    description: "Run CRM, ERP, databases, and business-critical applications on enterprise-grade infrastructure.",
    tag: null,
  },
  {
    icon: Code,
    title: "Development & CI/CD",
    description: "Spin up dev environments, staging servers, and CI/CD pipelines with full root access and fast deployment.",
    tag: null,
  },
  {
    icon: ShieldCheck,
    title: "VPN & Proxy Servers",
    description: "Deploy private VPN servers, proxy services, and secure tunnels with unlimited bandwidth and DDoS protection.",
    tag: null,
  },
];

export default function UseCasesSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container-wide relative">
        <SectionHeader
          badge="Use Cases"
          title="Built for Every Workload"
          description="From gaming to enterprise — our VPS infrastructure handles it all with dedicated performance."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card p-6 rounded-xl group hover:border-primary/30 transition-all duration-300 relative"
            >
              {useCase.tag && (
                <span className="absolute top-4 right-4 px-2 py-0.5 text-[10px] font-semibold bg-primary/20 text-primary rounded-full">
                  {useCase.tag}
                </span>
              )}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <useCase.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{useCase.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
