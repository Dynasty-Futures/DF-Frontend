import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PanelLeftOpen } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import DashboardMobileNav from './DashboardMobileNav';

const SITE_NAME = 'Dynasty Futures';

// Persist the collapsed state so a fuller-screen view (e.g. while trading)
// survives navigation and refreshes until the trader reopens the sidebar.
const SIDEBAR_COLLAPSED_KEY = 'df:sidebarCollapsed';

const readCollapsed = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true';
  } catch {
    return false;
  }
};

// Maps each dashboard route to the page name shown in the browser tab.
const DASHBOARD_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/accounts': 'Accounts',
  '/dashboard/trade': 'Trade',
  '/dashboard/economic-calendar': 'Economic Calendar',
  '/dashboard/billing': 'Billing',
  '/dashboard/payouts': 'Payouts',
  '/dashboard/affiliate': 'Affiliate',
  '/dashboard/profile': 'Profile',
  '/dashboard/achievements': 'Achievements',
  '/dashboard/awards': 'Awards',
  '/dashboard/help': 'Help Center',
};

const getDashboardTitle = (pathname: string): string => {
  // Journal is a dynamic route (/dashboard/journal/:date), so match by prefix.
  if (pathname.startsWith('/dashboard/journal')) return 'Journal';
  return DASHBOARD_TITLES[pathname] ?? 'Dashboard';
};

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const pageTitle = `${getDashboardTitle(pathname)} | ${SITE_NAME}`;

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(readCollapsed);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        SIDEBAR_COLLAPSED_KEY,
        String(sidebarCollapsed),
      );
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, [sidebarCollapsed]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        {/* Private area — keep dashboard out of search indexes. */}
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* Mobile Navigation */}
      <DashboardMobileNav />
      
      <div className="flex">
        {/* Desktop Sidebar (collapsible) */}
        {!sidebarCollapsed && (
          <div className="hidden lg:block">
            <DashboardSidebar onCollapse={() => setSidebarCollapsed(true)} />
          </div>
        )}

        {/* Reopen button — shown on desktop when the sidebar is collapsed */}
        {sidebarCollapsed && (
          <button
            type="button"
            onClick={() => setSidebarCollapsed(false)}
            aria-label="Open sidebar"
            title="Open sidebar"
            className="hidden lg:flex fixed left-3 top-3 z-40 items-center justify-center p-2 rounded-lg bg-card/70 border border-border/30 backdrop-blur-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
          >
            <PanelLeftOpen size={18} />
          </button>
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
