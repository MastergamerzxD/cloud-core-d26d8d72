import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Lightbulb, Shield, Users, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLaunchPopup } from "@/hooks/useLaunchPopup";

const values = [
  {
    icon: Target,
    title: "Performance First",
    description: "Every decision we make is guided by the impact on performance. We never compromise on speed or reliability.",
  },
  {
    icon: Lightbulb,
    title: "Transparency",
    description: "No hidden fees, no marketing fluff. We tell you exactly what you're getting and what the limitations are.",
  },
  {
    icon: Shield,
    title: "Security Focused",
    description: "Security isn't an afterthought. It's built into every layer of our infrastructure from day one.",
  },
  {
    icon: Users,
    title: "Customer Success",
    description: "Your success is our success. We're invested in helping you build and scale your projects.",
  },
];

const founders = [
  {
    name: "Ahaan Gupta",
    role: "Founder & CEO",
    description: "Visionary leader driving Cloud on Fire's mission to revolutionize VPS hosting in India.",
    initials: "AG",
  },
  {
    name: "Yashwanth",
    role: "Co-Founder & Operations Supervisor",
    description: "Ensuring seamless operations and world-class infrastructure delivery across all services.",
    initials: "Y",
  },
];

export default function About() {
  const { openPopup } = useLaunchPopup();

  return (
    <>
      <SEOHead
        title="About Cloud on Fire — India's Performance-Focused VPS Hosting Company"
        description="Cloud on Fire is India's performance-focused VPS hosting company. Enterprise-grade infrastructure with Intel Xeon Platinum processors, NVMe storage, and DDoS protection — accessible to developers and businesses."
        keywords="about Cloud on Fire, VPS hosting company India, Indian hosting provider, Cloud on Fire team, Cloud on Fire story"
        canonical="/about"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
      />
      <Layout>
        {/* Hero */}
        <section className="relative section-padding overflow-hidden">
          <div className="absolute inset-0 network-grid-bg opacity-20 pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="container-wide relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="glow-badge-fire mb-6 inline-flex">
                About Us
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-4 sm:mb-6">
                Building Infrastructure
                <br />
                <span className="text-fire-gradient">That Developers Trust</span>
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Cloud on Fire was founded with a simple mission: provide enterprise-grade 
                hosting infrastructure that's accessible, affordable, and reliable for 
                developers and businesses in India.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* Founders */}
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeader
              badge="Leadership"
              title="Meet Our Founders"
              description="The people behind Cloud on Fire's vision and execution."
            />

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {founders.map((founder, index) => (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="glow-card !rounded-2xl p-8 text-center group"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-fire-red flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-2xl font-bold text-primary-foreground">{founder.initials}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-1">{founder.name}</h3>
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-4">
                    {founder.role}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{founder.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

        {/* Story */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <p>
                    We started Cloud on Fire because we were frustrated with the hosting 
                    options available in India. Either you paid premium prices for reliable 
                    infrastructure, or you settled for budget options that couldn't handle 
                    real workloads.
                  </p>
                  <p>
                    We believed there had to be a middle ground—hosting that performs like 
                    enterprise infrastructure but is priced fairly for the Indian market. 
                    So we built it ourselves.
                  </p>
                  <p>
                    Today, Cloud on Fire powers hundreds of game servers, high-traffic websites, 
                    and critical applications across India.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glow-card !rounded-2xl p-8"
              >
                <div className="grid grid-cols-2 gap-8 text-center">
                  {[
                    { value: "99.9%", label: "Uptime Record" },
                    { value: "24/7", label: "Support Available" },
                    { value: "India", label: "Based & Operated" },
                    { value: "Apr '26", label: "Launch Date" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-3xl sm:text-4xl font-bold text-fire-gradient mb-2">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="gradient-divider-fire mx-auto max-w-4xl" />

        {/* Values */}
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeader
              badge="Our Values"
              title="What Drives Us"
              description="These principles guide every decision we make."
            />

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glow-card !rounded-2xl p-6 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="gradient-divider mx-auto max-w-4xl" />

        {/* CTA */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="container-wide relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glow-card glow-card-popular !rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Experience the Difference?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Join hundreds of developers and businesses who trust Cloud on Fire 
                for their hosting needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="btn-fire w-full sm:w-auto h-12 px-8" onClick={openPopup}>
                  <span className="relative z-10 flex items-center gap-2">
                    View Plans
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/50">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
