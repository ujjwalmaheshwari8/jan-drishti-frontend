import { Link, useLocation } from "react-router-dom";
import { BarChart3, Map, Home, Settings, FileText, Shield } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { path: "/map", label: "Map", icon: Map },
  { path: "/admin", label: "Admin", icon: Settings },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="gradient-primary sticky top-0 z-50 border-b border-border/10">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-accent">
            <Shield className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <span className="font-display text-lg font-bold text-primary-foreground">JanDrishti</span>
            <span className="ml-1 hidden text-xs text-nav-foreground/60 sm:inline">Governance Intelligence</span>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-accent/20 text-accent-foreground"
                    : "text-nav-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
