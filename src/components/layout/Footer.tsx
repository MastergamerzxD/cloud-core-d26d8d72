import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { useSEOSettings } from "@/hooks/useSEOSettings";

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

// Simple inline SVG icons for social platforms
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

export default function Footer() {
  const s = useSEOSettings();

  const email = s.org_email || "hello@cloudonfire.com";
  const phone = s.org_phone || "+918766215705";
  const footerText = s.footer_text || `© ${new Date().getFullYear()} Cloud on Fire. All rights reserved.`;

  const socialLinks = [
    { url: s.social_facebook, icon: FacebookIcon, label: "Facebook" },
    { url: s.social_twitter, icon: TwitterIcon, label: "Twitter" },
    { url: s.social_instagram, icon: InstagramIcon, label: "Instagram" },
    { url: s.social_linkedin, icon: LinkedInIcon, label: "LinkedIn" },
  ].filter(l => l.url);

  return (
    <footer className="relative border-t border-border/50 bg-card/60">
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      
      <div className="relative container-wide py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 mb-4 sm:mb-0">
            <Link to="/" className="flex items-center gap-2 mb-4 sm:mb-6">
              <img src={s.site_logo || logo} alt={s.site_title || "Cloud on Fire"} className="h-10 sm:h-12 w-auto" />
            </Link>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-sm">
              Delhi-based VPS hosting company delivering enterprise-grade virtual private servers 
              with premium DDoS protection across India.
            </p>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{phone}</a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span>{s.org_address_city || "India"}</span>
              </div>
            </div>

            {/* Social icons */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 mt-4 sm:mt-6">
                {socialLinks.map(({ url, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
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
            {footerText}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] sm:text-xs text-muted-foreground">Made with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
