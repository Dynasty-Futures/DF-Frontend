import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  LogOut,
  User as UserIcon,
  Home,
  LayoutDashboard,
  Info,
  Tag,
  BookOpen,
  HelpCircle,
  Users,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/Dynasty_Futures.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const handleLinkClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate("/");
  };

  // Build navigation links dynamically based on auth state
  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    ...(isAuthenticated ? [{ name: "Dashboard", path: "/dashboard", icon: LayoutDashboard }] : []),
    { name: "About", path: "/about", icon: Info },
    { name: "Pricing", path: "/pricing", icon: Tag },
    { name: "Rules", path: "/rules", icon: BookOpen },
    { name: "FAQ", path: "/faq", icon: HelpCircle },
    { name: "Affiliates", path: "/affiliates", icon: Users },
    { name: "Support", path: "/support", icon: MessageCircle },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28 md:h-40">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-2 group"
          >
            <img
              src={logo}
              alt="Dynasty Futures"
              className="h-10 md:h-12 w-auto max-h-full transition-transform duration-300 group-hover:scale-105 logo-blend"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleLinkClick}
                className={cn(
                  "relative font-medium text-sm transition-all duration-300 hover:text-primary link-transition",
                  location.pathname === link.path ||
                    location.pathname.startsWith(link.path + "/")
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 transition-all duration-300",
                    "bg-gradient-to-r from-gold-dark via-primary to-gold-light",
                    location.pathname === link.path ||
                      location.pathname.startsWith(link.path + "/")
                      ? "w-full"
                      : "w-0",
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="h-9 w-24 animate-pulse rounded-md bg-muted/30" />
            ) : isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mr-1">
                  <UserIcon className="h-4 w-4" />
                  <span className="max-w-[120px] truncate">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  asChild
                >
                  <Link to="/login" onClick={handleLinkClick}>
                    Trader Login
                  </Link>
                </Button>
                <Button
                  className="btn-gradient-animated text-primary-foreground font-semibold px-6 btn-glow transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                  asChild
                >
                  <Link to="/pricing" onClick={handleLinkClick}>
                    Start Challenge
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu — Sheet drawer matching dashboard mobile nav */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-foreground hover:text-primary transition-colors duration-300">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 bg-card/95 backdrop-blur-xl border-border/30 p-0 flex flex-col gap-0"
              >
                {/* Drawer header with logo */}
                <div className="p-6 border-b border-border/30">
                  <img
                    src={logo}
                    alt="Dynasty Futures"
                    className="h-10 w-auto logo-blend"
                  />
                </div>

                {/* Scrollable nav links */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  <nav className="p-4 space-y-1">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const active =
                        location.pathname === link.path ||
                        location.pathname.startsWith(link.path + "/");
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={handleLinkClick}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300",
                            active
                              ? "bg-primary/10 text-primary border border-primary/20"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                          )}
                        >
                          <Icon
                            size={20}
                            className={active ? "text-primary" : ""}
                          />
                          <span>{link.name}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Auth section pinned to bottom */}
                <div className="p-4 border-t border-border/30 space-y-2">
                  {isLoading ? (
                    <div className="h-10 animate-pulse rounded-xl bg-muted/30" />
                  ) : isAuthenticated && user ? (
                    <>
                      <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                        <UserIcon className="h-4 w-4 shrink-0" />
                        <span className="truncate">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0">
                          {user.role}
                        </span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-300"
                      >
                        <LogOut size={20} />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={handleLinkClick}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-medium text-sm border border-border/50 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-300"
                      >
                        <UserIcon size={20} />
                        <span>Trader Login</span>
                      </Link>
                      <Link
                        to="/pricing"
                        onClick={handleLinkClick}
                        className="flex items-center justify-center w-full px-4 py-3 rounded-xl font-semibold text-sm btn-gradient-animated text-primary-foreground transition-all duration-300"
                      >
                        Start Challenge
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
