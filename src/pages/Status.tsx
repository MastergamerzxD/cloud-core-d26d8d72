import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Rocket } from "lucide-react";
import Layout from "@/components/layout/Layout";

const services = [
  { name: "Pro VPS Servers", status: "coming_soon" },
  { name: "Budget VPS Servers", status: "coming_soon" },
  { name: "DDoS Protection", status: "coming_soon" },
  { name: "Control Panel", status: "coming_soon" },
  { name: "Support System", status: "coming_soon" },
  { name: "Website", status: "operational" },
];

export default function Status() {
  return (
    <>
      <Helmet>
        <title>Service Status - Cloud on Fire | System Status</title>
        <meta name="description" content="Check the current status of Cloud on Fire services. Real-time system status and uptime monitoring." />
        <link rel="canonical" href="https://cloudonfire.in/status" />
      </Helmet>
      <Layout>
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 rounded-full mb-4">
                <Rocket className="w-3 h-3" />
                Status
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                Service <span className="text-fire-gradient">Status</span>
              </h1>
              <div className="glass-card p-6 border-primary/30 inline-block">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <div className="text-lg font-bold text-foreground">Launching 15th April 2026</div>
                    <div className="text-sm text-muted-foreground">All services will be live on launch day</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="max-w-2xl mx-auto space-y-3">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-card p-4 flex items-center justify-between"
                >
                  <span className="text-sm font-medium text-foreground">{service.name}</span>
                  {service.status === "operational" ? (
                    <span className="flex items-center gap-2 text-xs font-medium text-green-500">
                      <CheckCircle className="w-4 h-4" />
                      Operational
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-xs font-medium text-primary">
                      <Rocket className="w-4 h-4" />
                      Coming Soon
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
