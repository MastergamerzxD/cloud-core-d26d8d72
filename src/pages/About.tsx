import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Lightbulb, Shield, Users, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";

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

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Cloud on Fire VPS Hosting India</title>
        <meta 
          name="description" 
          content="Learn about Cloud on Fire, India's performance-focused VPS hosting provider. Our mission is to provide enterprise-grade infrastructure accessible to everyone." 
        />
        <meta property="og:title" content="About Us - Cloud on Fire VPS Hosting" />
        <meta property="og:description" content="India's performance-focused VPS hosting provider with enterprise-grade infrastructure." />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full mb-4">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                Building Infrastructure
                <br />
                <span className="text-fire-gradient">That Developers Trust</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Cloud on Fire was founded with a simple mission: provide enterprise-grade 
                hosting infrastructure that's accessible, affordable, and reliable for 
                developers and businesses in India.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding bg-card/30">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground">
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
                    and critical applications. Our infrastructure handles millions of requests 
                    and absorbs thousands of DDoS attacks every month.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8"
              >
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-fire-gradient mb-2">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime Record</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-fire-gradient mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Support Available</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-fire-gradient mb-2">1000+</div>
                    <div className="text-sm text-muted-foreground">Active VPS</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-fire-gradient mb-2">India</div>
                    <div className="text-sm text-muted-foreground">Based & Operated</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeader
              badge="Our Values"
              title="What Drives Us"
              description="These principles guide every decision we make."
            />

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-card/30">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Experience the Difference?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join hundreds of developers and businesses who trust Cloud on Fire 
                for their hosting needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/pricing">
                  <Button size="lg" className="btn-fire">
                    <span className="relative z-10 flex items-center gap-2">
                      View Plans
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline">
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
