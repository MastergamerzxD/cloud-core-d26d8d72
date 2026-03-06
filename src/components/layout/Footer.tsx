import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const footerLinks = {
  products: [
    { name: "Pro VPS", href: "/pro-vps" },
    { name: "Budget VPS", href: "/budget-vps" },
    { name: "Compare VPS", href: "/compare" },
    { name: "DDoS Protection", href: "/ddos-protection" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Why Cloud on Fire", href: "/why-us" },
    { name: "Infrastructure", href: "/infrastructure" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
  ],
  support: [
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Documentation", href: "#" },
    { name: "Status", href: "/status" },
  ],
  legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Acceptable Use", href: "/terms" },
    { name: "SLA", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-card/60">
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      
      <div className="relative container-wide py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 mb-4 sm:mb-0">
            <Link to="/" className="flex items-center gap-2 mb-4 sm:mb-6">
              <img src={logo} alt="Cloud on Fire" className="h-10 sm:h-12 w-auto" />
            </Link>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-sm">
              Delhi-based VPS hosting company delivering enterprise-grade virtual private servers 
              with premium DDoS protection across India.
            </p>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <a href="mailto:hello@cloudonfire.com" className="hover:text-primary transition-colors">hello@cloudonfire.com</a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <a href="tel:+918766215705" className="hover:text-primary transition-colors">+91 8766215705</a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span>India</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3 sm:mb-4">Products</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3 sm:mb-4">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Cloud on Fire. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] sm:text-xs text-muted-foreground">Made with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
