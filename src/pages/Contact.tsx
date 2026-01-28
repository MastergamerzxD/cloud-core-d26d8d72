import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SectionHeader from "@/components/ui/SectionHeader";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "For general inquiries and support requests",
    value: "support@cloudonfire.in",
  },
  {
    icon: MessageCircle,
    title: "Sales Inquiries",
    description: "Talk to our sales team for custom solutions",
    value: "sales@cloudonfire.in",
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
      <Helmet>
        <title>Contact Us - Cloud on Fire VPS Support | 24/7 Expert Help</title>
        <meta 
          name="description" 
          content="Contact Cloud on Fire for VPS hosting support, sales inquiries, or technical questions. 24/7 support available. Response time under 15 minutes for Pro VPS customers." 
        />
        <meta name="keywords" content="Cloud on Fire contact, VPS support India, hosting support, sales inquiry, technical support" />
        <link rel="canonical" href="https://cloudonfire.in/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cloudonfire.in/contact" />
        <meta property="og:title" content="Contact Us - Cloud on Fire Support" />
        <meta property="og:description" content="Get in touch with Cloud on Fire. 24/7 support, fast response times." />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Cloud on Fire" />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full mb-4">
                Contact
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground">
                Have questions or need help? We're here for you. 
                Reach out through any of the channels below.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Methods */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-8">Contact Information</h2>
                <div className="space-y-6">
                  {contactMethods.map((method) => (
                    <div key={method.title} className="glass-card p-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <method.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{method.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{method.description}</p>
                        <span className="text-sm text-primary">{method.value}</span>
                      </div>
                    </div>
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
                <h2 className="text-2xl font-bold text-foreground mb-8">Send a Message</h2>
                <form className="glass-card p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="btn-fire w-full">
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
