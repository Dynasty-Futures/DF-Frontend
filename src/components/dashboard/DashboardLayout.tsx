import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardSidebar from './DashboardSidebar';
import DashboardMobileNav from './DashboardMobileNav';

const SITE_NAME = 'Dynasty Futures';

// Maps each dashboard route to the page name shown in the browser tab.
const DASHBOARD_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/accounts': 'Accounts',
  '/dashboard/trade': 'Trade',
  '/dashboard/billing': 'Billing',
  '/dashboard/payouts': 'Payouts',
  '/dashboard/affiliate': 'Affiliate',
  '/dashboard/profile': 'Profile',
  '/dashboard/achievements': 'Achievements',
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
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>

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
