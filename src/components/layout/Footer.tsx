import { Link } from "react-router-dom";
import { ArrowUp, Server, Gamepad2, Shield, Monitor, BookOpen, Newspaper, Activity, FileText, LifeBuoy, MessageCircle, HelpCircle, ScrollText, Lock, FileWarning, RotateCcw } from "lucide-react";
import logo from "@/assets/logo.png";
import { useSEOSettings } from "@/hooks/useSEOSettings";

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/></svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
);
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);

const columns = [
  {
    title: "Cloud Services",
    links: [
      { name: "VPS Hosting", href: "/vps-plans", icon: Server },
      { name: "Gaming VPS", href: "/gaming-vps", icon: Gamepad2 },
      { name: "Cloud RDP", href: "/rdp", icon: Monitor },
      { name: "DDoS Protection", href: "/ddos-protection", icon: Shield },
    ],
  },
  {
    title: "Gaming Servers",
    links: [
      { name: "Minecraft Hosting", href: "/gaming-vps", icon: Gamepad2 },
      { name: "FiveM Servers", href: "/gaming-vps", icon: Gamepad2 },
      { name: "Hytale Servers", href: "/gaming-vps", icon: Gamepad2 },
      { name: "Modded Game Servers", href: "/gaming-vps", icon: Gamepad2 },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#", icon: BookOpen },
      { name: "Knowledgebase", href: "#", icon: FileText },
      { name: "Blog", href: "/blog", icon: Newspaper },
      { name: "Server Status", href: "/status", icon: Activity },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Open Support Ticket", href: "/contact", icon: LifeBuoy },
      { name: "Contact Support", href: "/contact", icon: MessageCircle },
      { name: "FAQs", href: "/faq", icon: HelpCircle },
      { name: "Discord Community", href: "#", icon: MessageCircle },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms of Service", href: "/terms", icon: ScrollText },
      { name: "Privacy Policy", href: "/privacy", icon: Lock },
      { name: "Acceptable Use Policy", href: "/terms", icon: FileWarning },
      { name: "Refund Policy", href: "/terms", icon: RotateCcw },
    ],
  },
];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export default function Footer() {
  const s = useSEOSettings();

  return (
    <footer className="relative border-t border-primary/20 bg-card/80 backdrop-blur-sm">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute top-0 left-1/4 right-1/4 h-8 bg-primary/5 blur-2xl pointer-events-none" />

      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <img
                src={s.site_logo || logo}
                alt={s.site_title || "Cloud on Fire"}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Cloud on Fire provides high-performance cloud infrastructure designed for developers, gaming communities, and scalable applications. Our platform delivers powerful compute, reliable networking, and advanced DDoS protection.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: DiscordIcon, label: "Discord" },
                { icon: TwitterIcon, label: "Twitter" },
                { icon: InstagramIcon, label: "Instagram" },
                { icon: YouTubeIcon, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary/60 text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <link.icon className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Cloud on Fire. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
