import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Cloud on Fire VPS Hosting</title>
        <meta 
          name="description" 
          content="Terms of Service for Cloud on Fire VPS hosting services. Read our policies on service usage, acceptable use, and customer responsibilities." 
        />
      </Helmet>
      <Layout>
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
              <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

              <div className="prose prose-invert max-w-none space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
                  <p className="text-muted-foreground">
                    By accessing or using Cloud on Fire services, you agree to be bound by these Terms of Service 
                    and all applicable laws and regulations. If you do not agree with any of these terms, 
                    you are prohibited from using our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Service Description</h2>
                  <p className="text-muted-foreground">
                    Cloud on Fire provides virtual private server (VPS) hosting services including but not limited to 
                    Pro VPS and Budget VPS plans. Service specifications, including CPU, RAM, storage, and bandwidth 
                    allocations, are as described on our website at the time of purchase.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. Acceptable Use Policy</h2>
                  <p className="text-muted-foreground mb-4">You agree not to use our services to:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Engage in any illegal activities or promote illegal content</li>
                    <li>Distribute malware, viruses, or other harmful software</li>
                    <li>Launch DDoS attacks or other network attacks from our infrastructure</li>
                    <li>Send unsolicited bulk email (spam)</li>
                    <li>Host content that infringes on intellectual property rights</li>
                    <li>Mine cryptocurrency without prior written approval</li>
                    <li>Engage in activities that negatively impact other customers</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Payment Terms</h2>
                  <p className="text-muted-foreground">
                    All services are billed monthly in Indian Rupees (INR). Payment is due at the time of purchase 
                    and at the beginning of each billing cycle. Failure to pay may result in service suspension.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Refund Policy</h2>
                  <p className="text-muted-foreground">
                    We offer a 7-day money-back guarantee on all new VPS purchases. Refund requests must be submitted 
                    within 7 days of the initial purchase. Refunds are not available for service renewals, upgrades, 
                    or violations of our acceptable use policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Service Level Agreement</h2>
                  <p className="text-muted-foreground">
                    Cloud on Fire guarantees 99.9% uptime for Budget VPS and 99.99% uptime for Pro VPS, 
                    calculated on a monthly basis. Credits for downtime exceeding these thresholds may be 
                    requested within 30 days of the incident.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. DDoS Protection</h2>
                  <p className="text-muted-foreground">
                    All VPS plans include DDoS protection. Pro VPS customers are guaranteed no suspension during 
                    DDoS attacks. Budget VPS customers may experience temporary suspension during extreme attacks 
                    to protect network integrity.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
                  <p className="text-muted-foreground">
                    Cloud on Fire shall not be liable for any indirect, incidental, special, consequential, 
                    or punitive damages resulting from your use of our services. Our total liability shall not 
                    exceed the amount paid for the service in the preceding 12 months.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these terms at any time. Material changes will be communicated 
                    via email or through our website. Continued use of our services constitutes acceptance of 
                    the modified terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact</h2>
                  <p className="text-muted-foreground">
                    For questions about these Terms of Service, please contact us at legal@cloudonfire.in.
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
