import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLaunchPopup } from "@/hooks/useLaunchPopup";
import logoSymbol from "@/assets/logo-symbol.png";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "#",
    children: [
      { name: "VPS Plans", href: "/vps-plans", description: "Cloud VPS from ₹199/mo" },
      { name: "Gaming VPS", href: "/gaming-vps", description: "Built for multiplayer performance" },
      { name: "High Performance RDP", href: "/rdp", description: "Cloud desktop access" },
    ],
  },
  { name: "DDoS Protection", href: "/ddos-protection" },
  { name: "Infrastructure", href: "/infrastructure" },
  {
    name: "Resources",
    href: "#",
    children: [
      { name: "Media Gallery", href: "/media", description: "Browse our images & resources" },
      { name: "Blog", href: "/blog", description: "News, tutorials & insights" },
    ],
  },
  {
    name: "Company",
    href: "#",
    children: [
      { name: "About Us", href: "/about" },
      { name: "Why Cloud on Fire", href: "/why-us" },
      { name: "FAQ", href: "/faq" },
      { name: "Contact", href: "/contact" },
      { name: "Status", href: "/status" },
    ],
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { openPopup } = useLaunchPopup();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
      }`}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={logoSymbol} alt="Cloud on Fire" className="h-14 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105" />
            <span className="text-lg md:text-xl font-bold tracking-tight text-foreground">
              Cloud<span className="text-primary">on</span>Fire
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}>
                {item.children ? (
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link to={item.href}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      location.pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}>
                    {item.name}
                  </Link>
                )}
                <AnimatePresence>
                  {item.children && activeDropdown === item.name && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 glass-card p-2">
                      {item.children.map((child) => (
                        <Link key={child.name} to={child.href} className="block px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors group">
                          <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">{child.name}</span>
                          {child.description && <span className="block text-xs text-muted-foreground mt-0.5">{child.description}</span>}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground text-sm">Contact Sales</Button>
            </Link>
            <a href="https://shop.cloudonfire.com" target="_blank" rel="noopener noreferrer" className="relative group">
              <Button
                className="relative overflow-hidden px-5 py-2.5 h-11 text-sm font-bold rounded-lg transition-all duration-200 hover:scale-105 border-0 shadow-[0_0_20px_hsl(24_95%_53%_/_0.25)]"
                style={{
                  background: "linear-gradient(135deg, hsl(24 95% 53%), hsl(4 90% 58%))",
                }}
              >
                <span className="relative z-10 flex items-center gap-2 text-white">
                  <Rocket className="w-4 h-4" />
                  Start Hosting
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
              <span
                className="absolute -top-2.5 -right-2.5 px-2 py-0.5 text-[10px] font-black rounded-full text-white z-20"
                style={{
                  background: "linear-gradient(135deg, hsl(142 70% 45%), hsl(142 70% 35%))",
                  boxShadow: "0 2px 8px hsl(142 70% 45% / 0.4)",
                }}
              >
                40% OFF
              </span>
            </a>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-foreground">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }} className="lg:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
              <div className="py-3 sm:py-4 space-y-1 sm:space-y-2 max-h-[70vh] overflow-y-auto">
                {/* Pre-Order CTA at the top of mobile menu */}
                <div className="px-4 pb-3 border-b border-border/30 mb-2">
                  <a href="https://shop.cloudonfire.com" target="_blank" rel="noopener noreferrer" className="block">
                    <Button
                      className="w-full h-12 text-sm font-bold rounded-xl border-0"
                      style={{
                        background: "linear-gradient(135deg, hsl(24 95% 53%), hsl(4 90% 58%))",
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                        <Rocket className="w-4 h-4" />
                        Start Hosting — 40% OFF
                      </span>
                    </Button>
                  </a>
                </div>

                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <div>
                        <button onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          className="flex items-center justify-between w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground">
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-0.5 sm:space-y-1 bg-secondary/30">
                              {item.children.map((child) => (
                                <Link key={child.name} to={child.href}
                                  className="block px-4 py-2 sm:py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  {child.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link to={item.href} className="block px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-3 sm:pt-4 px-4 border-t border-border/30 mt-2">
                  <Link to="/contact" className="block">
                    <Button variant="outline" className="w-full h-10 sm:h-11 text-sm">Contact Sales</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
