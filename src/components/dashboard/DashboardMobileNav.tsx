import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, LayoutDashboard, Wallet, LineChart, CalendarClock, CreditCard, Banknote, Users, User, Trophy, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

/** Same asset as <link rel="icon"> in index.html */
const siteIconSrc = '/favicon.png?v=20260406';

const sidebarLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Accounts', path: '/dashboard/accounts', icon: Wallet },
  { name: 'Trade', path: '/dashboard/trade', icon: LineChart },
  { name: 'Economic Calendar', path: '/dashboard/economic-calendar', icon: CalendarClock },
  { name: 'Billing', path: '/dashboard/billing', icon: CreditCard },
  { name: 'Payouts', path: '/dashboard/payouts', icon: Banknote },
  { name: 'Affiliate', path: '/dashboard/affiliate', icon: Users },
  { name: 'Profile', path: '/dashboard/profile', icon: User },
  { name: 'Awards', path: '/dashboard/awards', icon: Trophy },
  { name: 'Help Center', path: '/dashboard/help', icon: HelpCircle },
];

const DashboardMobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/30">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={siteIconSrc} alt="Dynasty Futures" className="h-10 w-10 object-contain logo-blend" />
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 text-foreground hover:text-primary transition-colors">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-card/95 backdrop-blur-xl border-border/30 p-0">
            <div className="p-6 border-b border-border/30">
              <img src={siteIconSrc} alt="Dynasty Futures" className="h-10 w-10 object-contain logo-blend" />
            </div>
            <nav className="p-4 space-y-2">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300",
                      active 
                        ? "bg-primary/10 text-primary border border-primary/20" 
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <Icon size={20} className={active ? "text-primary" : ""} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default DashboardMobileNav;
