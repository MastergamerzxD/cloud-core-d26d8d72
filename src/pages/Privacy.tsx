import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy - Cloud on Fire VPS Hosting India"
        description="Privacy Policy for Cloud on Fire VPS hosting. Learn how we collect, use, protect your personal information and your rights regarding data privacy."
        canonical="/privacy"
        ogImage="https://cloudonfire.com/images/og-logo.jpg"
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
              <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground mb-8">Last updated: 15 March 2026</p>

              <p className="text-muted-foreground mb-8">
                Cloud on Fire ("Company", "we", "us", or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, services, or infrastructure.
              </p>
              <p className="text-muted-foreground mb-10">
                By using Cloud on Fire services, you agree to the collection and use of information in accordance with this policy.
              </p>

              <div className="prose prose-invert max-w-none space-y-10">
                {/* 1 */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Company Information</h2>
                  <ul className="list-none text-muted-foreground space-y-2">
                    <li><strong className="text-foreground">Company Name:</strong> Cloud on Fire</li>
                    <li><strong className="text-foreground">Registered Address:</strong> Shop No 9, Capital Athena, Sec 1, Society, Bisrakh Jalalpur, Noida, Uttar Pradesh 201318, India</li>
                    <li><strong className="text-foreground">Email:</strong>{" "}
                      <a href="mailto:hello@cloudonfire.com" className="text-primary hover:underline">hello@cloudonfire.com</a>
                    </li>
                    <li><strong className="text-foreground">Phone:</strong> +91 8766215705</li>
                  </ul>
                </section>

                {/* 2 */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
                  <p className="text-muted-foreground mb-4">When you use Cloud on Fire services, we may collect the following types of information.</p>

                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Personal Information</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Billing address</li>
                    <li>Company name (if applicable)</li>
                    <li>Payment details (processed by secure third-party payment processors)</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Account Information</h3>
                  <p className="text-muted-foreground mb-2">When creating an account or purchasing services, we may collect:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Login credentials</li>
                    <li>Service configuration information</li>
                    <li>Order and billing history</li>
                    <li>Customer support communications</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Technical & Usage Information</h3>
                  <p className="text-muted-foreground mb-2">We may automatically collect technical information such as:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>IP address</li>
                    <li>Device information</li>
                    <li>Browser type and version</li>
                    <li>Login timestamps</li>
                    <li>Server activity logs</li>
                    <li>Network usage statistics</li>
                  </ul>
                  <p className="text-muted-foreground mt-2">This data helps us maintain system stability and prevent abuse.</p>
                </section>

                {/* 3 */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">Cloud on Fire may use collected information for purposes including:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Providing and maintaining hosting services</li>
                    <li>Processing payments and orders</li>
                    <li>Providing customer support</li>
                    <li>Preventing fraud or illegal activity</li>
                    <li>Monitoring network stability and performance</li>
                    <li>Improving our infrastructure and services</li>
                    <li>Communicating important service updates or security alerts</li>
                  </ul>
                  <p className="text-muted-foreground mt-4 font-medium">Cloud on Fire does not sell customer personal information to third parties.</p>
                </section>

                {/* 4 */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Payment Processing</h2>
                  <p className="text-muted-foreground mb-2">
                    Payments for Cloud on Fire services are handled through <strong className="text-foreground">secure third-party payment gateways</strong>.
                  </p>
                  <p className="text-muted-foreground mb-2">
                    Cloud on Fire does <strong className="text-foreground">not store full credit or debit card information</strong> on its servers.
                  </p>
                  <p className="text-muted-foreground">
                    Payment processors may collect billing data according to their own privacy policies.
                  </p>
                </section>

                {/* 5 */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Log Data & Infrastructure Monitoring</h2>
                  <p className="text-muted-foreground mb-4">To ensure security and system stability, Cloud on Fire may maintain logs including:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>IP addresses</li>
                    <li>Network traffic metadata</li>
                    <li>Login attempts</li>
                    <li>Resource usage statistics</li>
                    <li>Server access logs</li>
                  </ul>
                  <p className="text-muted-foreground mt-4 mb-2">These logs are used for:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Security monitoring</li>
                    <li>Infrastructure management</li>
                    <li>Abuse detection</li>
                    <li>System troubleshooting</li>
                  </ul>
                </section>

                {/* 6 */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Security</h2>
                  <p className="text-muted-foreground mb-4">Cloud on Fire implements reasonable security measures to protect customer data, including:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Secure hosting infrastructure</li>
                    <li>Access control systems</li>
                    <li>Monitoring tools for threat detection</li>
                    <li>Security auditing procedures</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    However, due to the nature of the internet, no system can be guaranteed to be completely secure, and Cloud on Fire cannot guarantee protection from highly sophisticated cyber attacks or unforeseen vulnerabilities.
                  </p>
                </section>

                {/* 7 */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Data Retention</h2>
                  <p className="text-muted-foreground mb-4">We retain personal information only as long as necessary to:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Provide services</li>
                    <li>Meet legal obligations</li>
                    <li>Resolve disputes</li>
                    <li>Prevent abuse or fraud</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">Certain data may be retained longer where required by law or regulatory compliance.</p>
                </section>

                {/* 8 */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">8. Sharing of Information</h2>
                  <p className="text-muted-foreground mb-4">Cloud on Fire may share limited information in the following circumstances:</p>

                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Service Providers</h3>
                  <p className="text-muted-foreground mb-2">Information may be shared with trusted third-party providers who assist with:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Payment processing</li>
                    <li>Infrastructure services</li>
                    <li>Security monitoring</li>
                    <li>Customer support tools</li>
                  </ul>
                  <p className="text-muted-foreground mt-2">These providers are required to maintain confidentiality.</p>

                  <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Legal Requirements</h3>
                  <p className="text-muted-foreground mb-2">Information may be disclosed if required to:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Comply with legal obligations</li>
                    <li>Respond to lawful government requests</li>
                    <li>Protect infrastructure security</li>
                    <li>Prevent fraud, abuse, or illegal activities</li>
                  </ul>
                </section>

                {/* 9 */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">9. Cookies & Website Tracking</h2>
                  <p className="text-muted-foreground mb-4">Cloud on Fire may use cookies and similar technologies to improve website functionality. Cookies may be used for:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Login sessions</li>
                    <li>Website performance monitoring</li>
                    <li>Analytics</li>
                    <li>User experience improvements</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">Users may disable cookies through browser settings, though some features may not function properly.</p>
                </section>

                {/* 10 */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">10. Customer Responsibilities</h2>
                  <p className="text-muted-foreground mb-4">Customers are responsible for protecting their own:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Account credentials</li>
                    <li>Server configurations</li>
                    <li>Data backups</li>
                    <li>Hosted content</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">Cloud on Fire does not assume responsibility for data loss caused by user misconfiguration, negligence, or software vulnerabilities.</p>
                </section>

                {/* 11 */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">11. Children's Privacy</h2>
                  <p className="text-muted-foreground">
                    Cloud on Fire services are not intended for individuals under <strong className="text-foreground">18 years of age without supervision</strong>. We do not knowingly collect personal data from children.
                  </p>
                </section>

                {/* 12 */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to This Privacy Policy</h2>
                  <p className="text-muted-foreground">
                    Cloud on Fire reserves the right to modify or update this Privacy Policy at any time. Changes will be posted on the official website, and continued use of services indicates acceptance of the updated policy.
                  </p>
                </section>

                {/* 13 */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Information</h2>
                  <p className="text-muted-foreground mb-4">If you have questions regarding this Privacy Policy, please contact us:</p>
                  <ul className="list-none text-muted-foreground space-y-2">
                    <li>📧 <a href="mailto:hello@cloudonfire.com" className="text-primary hover:underline font-medium">hello@cloudonfire.com</a></li>
                    <li>📞 <span className="font-medium text-foreground">+91 8766215705</span></li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    <strong className="text-foreground">Registered Address:</strong><br />
                    Shop No 9, Capital Athena, Sec 1, Society,<br />
                    Bisrakh Jalalpur, Noida, Uttar Pradesh 201318, India
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
