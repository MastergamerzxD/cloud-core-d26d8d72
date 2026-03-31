import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Terms & Conditions - Cloud on Fire"
        description="Terms & Conditions for Cloud on Fire VPS hosting services. Read our policies on service usage, acceptable use, refunds, liability, and customer responsibilities."
        canonical="/terms"
        ogImage="https://cloudonfire.com/images/og-logo.png"
      />
      <Layout>
        <section className="section-padding">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-4xl font-bold text-foreground mb-4">Terms & Conditions</h1>
              <p className="text-muted-foreground mb-8">Last Updated: 15 March 2026</p>

              <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
                <p>
                  These Terms & Conditions govern the use of services provided by <strong className="text-foreground">Cloud on Fire</strong> ("Company", "we", "us", or "our"). By purchasing or using any services from Cloud on Fire, including but not limited to VPS hosting, gaming VPS, or related services, you agree to be bound by these terms.
                </p>
                <p>If you do not agree with any part of these Terms, you must not use our services.</p>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Company Information</h2>
                  <ul className="list-none space-y-1">
                    <li><strong className="text-foreground">Company Name:</strong> Cloud on Fire</li>
                    <li><strong className="text-foreground">Email:</strong> <a href="mailto:hello@cloudonfire.com" className="text-primary hover:underline">hello@cloudonfire.com</a></li>
                    <li><strong className="text-foreground">Phone:</strong> +91 8766215705</li>
                    <li><strong className="text-foreground">Registered Address:</strong> Shop No 9, Capital Athena, Sec 1, Society, Bisrakh Jalalpur, Noida, Uttar Pradesh 201318</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services Provided</h2>
                  <p>
                    Cloud on Fire provides high-performance <strong className="text-foreground">Virtual Private Servers (VPS), Gaming VPS, and related hosting infrastructure services</strong> designed primarily for gaming servers, application hosting, and development environments.
                  </p>
                  <p>
                    Our infrastructure is backed by <strong className="text-foreground">high-performance enterprise hardware and networking equipment</strong>. Significant investments have been made in infrastructure to ensure service stability and reliability.
                  </p>
                  <p>
                    However, while we strive to deliver excellent performance and uptime, <strong className="text-foreground">no hosting provider can guarantee uninterrupted service under all circumstances</strong>.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. Service Availability & Uptime</h2>
                  <p>
                    Cloud on Fire makes <strong className="text-foreground">reasonable and commercially practical efforts</strong> to maintain high uptime and service availability.
                  </p>
                  <p>
                    However, <strong className="text-foreground">uptime is not guaranteed</strong> and Cloud on Fire shall not be held liable for service interruptions caused by factors including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Network failures</li>
                    <li>Hardware failures</li>
                    <li>Data center incidents</li>
                    <li>Internet backbone disruptions</li>
                    <li>Power outages</li>
                    <li>Targeted cyber attacks or DDoS attacks</li>
                    <li>Security incidents or vulnerabilities</li>
                    <li>Software failures</li>
                    <li>Maintenance operations</li>
                    <li>Actions by third-party providers</li>
                    <li>Government actions or regulatory restrictions</li>
                    <li>Natural disasters including earthquakes, floods, fires, storms, and other force majeure events</li>
                  </ul>
                  <p>
                    While we take strong preventive measures, <strong className="text-foreground">service interruptions may occur</strong> and Cloud on Fire shall not be held responsible for losses arising from such interruptions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Force Majeure</h2>
                  <p>
                    Cloud on Fire shall not be liable for failure or delay in performance caused by events beyond reasonable control, including but not limited to:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Natural disasters</li>
                    <li>War</li>
                    <li>Cyber warfare</li>
                    <li>Terrorist attacks</li>
                    <li>Government restrictions</li>
                    <li>Data center failures</li>
                    <li>Internet outages</li>
                    <li>Major infrastructure failures</li>
                  </ul>
                  <p>These events shall be considered <strong className="text-foreground">Force Majeure</strong>, and no liability shall arise from them.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Refund Policy</h2>
                  <p>Cloud on Fire offers a <strong className="text-foreground">limited refund window</strong> under the following conditions:</p>

                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-2">Standard VPS</h3>
                  <p>Refund requests must be submitted within <strong className="text-foreground">24 hours</strong> of the initial purchase.</p>

                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-2">Gaming VPS</h3>
                  <p>Refund requests must be submitted within <strong className="text-foreground">36 hours</strong> of the initial purchase.</p>

                  <p>Refund requests submitted within the eligible period will be reviewed and processed if the service has not been heavily used or abused.</p>

                  <div className="my-6 rounded-lg border border-primary/30 bg-primary/5 p-5">
                    <p className="text-foreground font-semibold flex items-center gap-2 mb-2">
                      ⚠️ Important: How to Request a Refund
                    </p>
                    <p>
                      Refund requests are <strong className="text-foreground">only accepted via a support ticket</strong> opened within the eligible refund window on{" "}
                      <a href="https://shop.cloudonfire.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">shop.cloudonfire.com</a>.
                      Requests made through any other channel (email, social media, etc.) will <strong className="text-foreground">not be processed</strong>.
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-2">Refunds After Refund Window</h3>
                  <p>After the refund period expires:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Refunds <strong className="text-foreground">are not guaranteed</strong>.</li>
                    <li>Any refunds issued will be <strong className="text-foreground">at the sole discretion of Cloud on Fire</strong>.</li>
                    <li>Most refunds issued after the refund window will be provided <strong className="text-foreground">in the form of account credits</strong>, not monetary refunds.</li>
                  </ul>
                  <p>Credits issued cannot be withdrawn or transferred.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Abuse & Service Misuse</h2>
                  <p>Customers must not use Cloud on Fire services for activities including but not limited to:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Illegal activities</li>
                    <li>Fraud</li>
                    <li>Malware distribution</li>
                    <li>Botnet operations</li>
                    <li>Unauthorized network scanning</li>
                    <li>Phishing attacks</li>
                    <li>Cryptocurrency mining (unless permitted)</li>
                    <li>Spam services</li>
                    <li>Attacking other networks or services</li>
                  </ul>
                  <p>Cloud on Fire reserves the right to <strong className="text-foreground">suspend or terminate services immediately</strong> if abuse is detected. No refunds will be issued in such cases.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Customer Responsibility</h2>
                  <p>Customers are responsible for:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Securing their servers</li>
                    <li>Maintaining backups</li>
                    <li>Protecting login credentials</li>
                    <li>Proper configuration of services</li>
                  </ul>
                  <p>Cloud on Fire <strong className="text-foreground">does not guarantee data integrity or backups</strong> unless explicitly stated. Loss of data due to user misconfiguration, software failure, or security breaches remains the customer's responsibility.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">8. Data Protection & Security</h2>
                  <p>Cloud on Fire takes security seriously and deploys multiple protective measures against cyber threats.</p>
                  <p>However, due to the nature of the internet and modern cyber warfare:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>No system can be considered <strong className="text-foreground">100% secure</strong></li>
                    <li>Highly targeted attacks or unknown vulnerabilities may occur</li>
                  </ul>
                  <p>Cloud on Fire shall not be liable for data loss or service disruption resulting from such incidents.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
                  <p>Under no circumstances shall Cloud on Fire, its owners, employees, or partners be liable for:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Financial losses</li>
                    <li>Business interruptions</li>
                    <li>Loss of profits</li>
                    <li>Loss of data</li>
                    <li>Service interruptions</li>
                    <li>Indirect damages</li>
                    <li>Consequential damages</li>
                  </ul>
                  <p>The maximum liability of Cloud on Fire shall <strong className="text-foreground">never exceed the amount paid by the customer for the affected service</strong>.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">10. Service Suspension</h2>
                  <p>Cloud on Fire reserves the right to suspend or terminate services if:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Payments are overdue</li>
                    <li>Abuse or illegal activity is detected</li>
                    <li>Infrastructure security is threatened</li>
                    <li>System stability is at risk</li>
                  </ul>
                  <p>Services may also be suspended for <strong className="text-foreground">scheduled maintenance or emergency maintenance</strong>.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">11. Infrastructure Reliability Statement</h2>
                  <p>
                    Cloud on Fire operates using <strong className="text-foreground">enterprise-grade hardware and infrastructure</strong>, and the company has made significant investments to ensure high reliability and performance.
                  </p>
                  <p>
                    Due to this high infrastructure investment, the likelihood of major failures is minimized. However, <strong className="text-foreground">no infrastructure system can be considered completely immune to unexpected events</strong>.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">12. Modifications to Terms</h2>
                  <p>
                    Cloud on Fire reserves the right to modify these Terms & Conditions at any time without prior notice. Updated terms will be published on the official website, and continued use of services constitutes acceptance of those changes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">13. Governing Law</h2>
                  <p>
                    These Terms shall be governed by and interpreted under the laws of <strong className="text-foreground">India</strong>.
                  </p>
                  <p>
                    Any disputes arising from these terms shall fall under the jurisdiction of courts located in <strong className="text-foreground">New Delhi, India</strong>.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">14. Contact Information</h2>
                  <p>For any questions regarding these Terms & Conditions, contact:</p>
                  <ul className="list-none space-y-1 mt-2">
                    <li>📧 <a href="mailto:hello@cloudonfire.com" className="text-primary hover:underline">hello@cloudonfire.com</a></li>
                    <li>📞 +91 8766215705</li>
                  </ul>
                </section>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
