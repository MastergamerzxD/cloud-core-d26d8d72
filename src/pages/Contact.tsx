import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "For general inquiries and support requests",
    value: "hello@cloudonfire.com",
  },
  {
    icon: MessageCircle,
    title: "Phone Support",
    description: "Call us for immediate assistance",
    value: "+91 8766215705",
  },
  {
    icon: Clock,
    title: "Response Time",
    description: "We aim to respond as quickly as possible",
    value: "< 15 minutes (Pro VPS)",
  },
  {
    icon: MapPin,
    title: "Location",
    description: "Our headquarters",
    value: "India",
  },
];

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact Cloud on Fire — VPS Hosting Support India | 24/7 Expert Help"
        description="Contact Cloud on Fire for VPS hosting support, sales inquiries, or technical questions. 24/7 support with under 15 minute response for Pro VPS customers. Email, phone, and live chat available."
        keywords="Cloud on Fire contact, VPS support India, hosting support, sales inquiry, technical support India, 24/7 VPS support"
        canonical="/contact"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
      />
      <Layout>
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 network-grid-bg opacity-20 pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="container-wide relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
            >
              <span className="glow-badge-fire mb-6 inline-flex">Contact</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4 sm:mb-6">
                Get in Touch
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground">
                Have questions or need help? We're here for you. 
                Reach out through any of the channels below.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* Contact Methods */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8">Contact Information</h2>
                <div className="space-y-4">
                  {contactMethods.map((method, i) => (
                    <motion.div 
                      key={method.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="glow-card !rounded-2xl p-5 flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <method.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{method.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{method.description}</p>
                        <span className="text-sm text-primary font-medium">{method.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8">Send a Message</h2>
                <form className="glow-card !rounded-2xl p-6 sm:p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" className="bg-card/50 border-border/40" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" className="bg-card/50 border-border/40" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" className="bg-card/50 border-border/40" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      className="bg-card/50 border-border/40"
                    />
                  </div>
                  <Button type="submit" className="btn-fire w-full h-11">
                    <span className="relative z-10">Send Message</span>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    We typically respond within 24 hours.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
