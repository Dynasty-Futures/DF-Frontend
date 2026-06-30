import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
  Briefcase,
  CandlestickChart,
  CalendarClock,
  Receipt,
  ArrowDownToLine,
  Users,
  User,
  Award,
  Headphones,
  ExternalLink,
  PanelLeftClose,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const siteIconSrc = '/favicon.png?v=20260406';

// Primary nav (top). The in-app Volumetrica web-trader embed is live, so 'Trade'
// renders the platform inside the dashboard; the "Launch Platform" button remains
// as a new-tab fallback.
const primaryLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: Activity },
  { name: 'Accounts', path: '/dashboard/accounts', icon: Briefcase },
  { name: 'Trade', path: '/dashboard/trade', icon: CandlestickChart },
  { name: 'Billing', path: '/dashboard/billing', icon: Receipt },
  { name: 'Payouts', path: '/dashboard/payouts', icon: ArrowDownToLine },
  { name: 'Awards', path: '/dashboard/awards', icon: Award },
  { name: 'Economic Calendar', path: '/dashboard/economic-calendar', icon: CalendarClock },
];

// Secondary nav, pinned to the bottom of the sidebar.
const secondaryLinks = [
  { name: 'Profile', path: '/dashboard/profile', icon: User },
  { name: 'Affiliate', path: '/dashboard/affiliate', icon: Users },
  { name: 'Help Center', path: '/dashboard/help', icon: Headphones },
];

interface DashboardSidebarProps {
  /** When provided, renders a collapse button that hides the sidebar. */
  onCollapse?: () => void;
}

const DashboardSidebar = ({ onCollapse }: DashboardSidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const renderLink = (link: { name: string; path: string; icon: typeof Activity }) => {
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
  };

  return (
    <aside className="w-52 shrink-0 h-screen sticky top-0 bg-transparent backdrop-blur-xl border-r border-border/30 flex flex-col overflow-hidden">
      {/* Logo + Home link */}
      <div className="relative px-4 py-4 flex flex-col items-center gap-2 border-b border-border/20">
        {onCollapse && (
          <button
            type="button"
            onClick={onCollapse}
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
            className="absolute top-2 right-2 p-1.5 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
          >
            <PanelLeftClose size={16} />
          </button>
        )}
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

      {/* Primary navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {primaryLinks.map(renderLink)}
      </nav>

      {/* Secondary navigation — pinned to the bottom */}
      <div className="p-3 border-t border-border/30 space-y-0.5">
        {secondaryLinks.map(renderLink)}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border/30">
        <p className="text-[10px] text-muted-foreground text-center">© 2026</p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
