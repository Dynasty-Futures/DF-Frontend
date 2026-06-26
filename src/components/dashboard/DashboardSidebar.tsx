import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
  Briefcase,
  CalendarClock,
  Receipt,
  ArrowDownToLine,
  Users,
  User,
  Award,
  Headphones,
  Tag,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const siteIconSrc = '/favicon.png?v=20260406';

const sidebarLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: Activity },
  { name: 'Accounts', path: '/dashboard/accounts', icon: Briefcase },
  // 'Trade' tab is hidden until the in-app Volumetrica embed is unblocked — for
  // now traders launch the platform via the "Launch Platform" button. The
  // /dashboard/trade route + page are intentionally kept for when the embed works.
  { name: 'Economic Calendar', path: '/dashboard/economic-calendar', icon: CalendarClock },
  { name: 'Billing', path: '/dashboard/billing', icon: Receipt },
  { name: 'Payouts', path: '/dashboard/payouts', icon: ArrowDownToLine },
  { name: 'Affiliate', path: '/dashboard/affiliate', icon: Users },
  { name: 'Profile', path: '/dashboard/profile', icon: User },
  { name: 'Awards', path: '/dashboard/awards', icon: Award },
  { name: 'Help Center', path: '/dashboard/help', icon: Headphones },
];

const DashboardSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-52 shrink-0 h-screen sticky top-0 bg-transparent backdrop-blur-xl border-r border-border/30 flex flex-col overflow-hidden">
      {/* Logo + Home link */}
      <div className="px-4 py-4 flex flex-col items-center gap-2 border-b border-border/20">
        <Link to="/" className="group">
          <img
            src={siteIconSrc}
            alt="Dynasty Futures"
            className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105 logo-blend"
          />
        </Link>
        <a
          href="https://www.dynastyfuturesdyn.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink size={10} />
          Home
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path);

          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300',
                active
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
              )}
            >
              <Icon
                size={18}
                className={cn('shrink-0 transition-colors duration-300', active ? 'text-primary' : '')}
              />
              <span className="text-sm font-medium truncate">{link.name}</span>
            </Link>
          );
        })}

        {/* Pricing — external link */}
        <a
          href="https://www.dynastyfuturesdyn.com/pricing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-300"
        >
          <Tag size={18} className="shrink-0" />
          <span className="text-sm font-medium">Pricing</span>
        </a>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border/30">
        <p className="text-[10px] text-muted-foreground text-center">© 2026</p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
