import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLaunchPopup } from "@/hooks/useLaunchPopup";
import logo from "@/assets/logo.png";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "VPS",
    href: "#",
    children: [
      { name: "Pro VPS", href: "/pro-vps", description: "High-performance gaming VPS" },
      { name: "Budget VPS", href: "/budget-vps", description: "Cost-effective standard VPS" },
      { name: "Compare VPS", href: "/compare", description: "Side-by-side comparison" },
    ],
  },
  { name: "DDoS Protection", href: "/ddos-protection" },
  { name: "Blog", href: "/blog" },
  { name: "Infrastructure", href: "/infrastructure" },
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
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Cloud on Fire" className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
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

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/contact">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Contact Sales</Button>
            </Link>
            <Button className="btn-fire" onClick={openPopup}>
              <span className="relative z-10">Get Started</span>
            </Button>
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
                <div className="pt-3 sm:pt-4 px-4 space-y-2 sm:space-y-3 border-t border-border/30 mt-2">
                  <Link to="/contact" className="block">
                    <Button variant="outline" className="w-full h-10 sm:h-11 text-sm">Contact Sales</Button>
                  </Link>
                  <Button className="w-full h-10 sm:h-11 text-sm btn-fire" onClick={openPopup}>
                    <span className="relative z-10">Get Started</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
