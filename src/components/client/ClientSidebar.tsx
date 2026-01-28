import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Server,
  ShoppingCart,
  Receipt,
  MessageSquare,
  User,
  Wallet,
  Gift,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Menu,
  Flame,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Server, label: "My VPS", path: "/dashboard/vps" },
  { icon: ShoppingCart, label: "Orders", path: "/dashboard/orders" },
  { icon: Receipt, label: "Invoices", path: "/dashboard/invoices" },
  { icon: Wallet, label: "Wallet", path: "/dashboard/wallet" },
  { icon: Gift, label: "Redeem Gift Card", path: "/dashboard/redeem" },
  { icon: MessageSquare, label: "Support Tickets", path: "/dashboard/tickets" },
  { icon: User, label: "My Profile", path: "/dashboard/profile" },
];

function SidebarContent({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed?: (v: boolean) => void }) {
  const location = useLocation();

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Client Portal</span>
          </Link>
        )}
        {setCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(collapsed && "mx-auto")}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <div className="p-2">
        <Link to="/order" className="block">
          <Button className={cn("w-full btn-fire", collapsed ? "px-2" : "")}>
            <Plus className="h-4 w-4" />
            {!collapsed && <span className="relative z-10 ml-2">Order VPS</span>}
          </Button>
        </Link>
      </div>

      <nav className="flex flex-col gap-1 p-2 overflow-y-auto h-[calc(100vh-8rem)]">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* Help & Back to website */}
        <div className="mt-auto pt-4 border-t border-border space-y-1">
          <Link
            to="/faq"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? "Help & FAQ" : undefined}
          >
            <HelpCircle className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Help & FAQ</span>}
          </Link>
          <Link
            to="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? "Back to Website" : undefined}
          >
            <Flame className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Back to Website</span>}
          </Link>
        </div>
      </nav>
    </>
  );
}

export default function ClientSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent collapsed={false} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 hidden md:block",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
    </aside>
  );
}