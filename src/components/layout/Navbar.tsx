import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import logo from '@/assets/Dynasty_Futures.png';

// DEV NOTE: In production, the Dashboard tab should only be visible when the user is logged in.
// If a user is logged out, hide this tab and redirect /dashboard to the login page.
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/dashboard' },
  // { name: 'Admin', path: '/admin' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Rules', path: '/rules' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Support', path: '/support' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

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
              className="h-44 md:h-60 w-auto max-h-full transition-transform duration-300 group-hover:scale-105 logo-blend"
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
                  location.pathname === link.path 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {link.name}
                <span 
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 transition-all duration-300",
                    "bg-gradient-to-r from-primary via-teal to-soft-blue",
                    location.pathname === link.path ? "w-full" : "w-0"
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
              asChild
            >
              <Link to="/login" onClick={handleLinkClick}>Trader Login</Link>
            </Button>
            <Button 
              className="btn-gradient-animated text-primary-foreground font-semibold px-6 btn-glow transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
              asChild
            >
              <Link to="/pricing" onClick={handleLinkClick}>Start Challenge</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 right-0 glass border-b border-border/30 transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              className={cn(
                "py-3 px-4 rounded-lg font-medium transition-all duration-300",
                location.pathname === link.path 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
            <Button 
              variant="outline" 
              className="w-full border-border/50"
              asChild
            >
              <Link to="/login" onClick={handleLinkClick}>Trader Login</Link>
            </Button>
            <Button 
              className="w-full btn-gradient-animated text-primary-foreground font-semibold"
              asChild
            >
              <Link to="/pricing" onClick={handleLinkClick}>Start Challenge</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;