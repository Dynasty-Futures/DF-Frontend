import { ShieldAlert } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { AdminTopBar } from './AdminTopBar';

const adminTabs = [
  { id: 'overview', label: 'Overview', path: '/admin' },
  { id: 'accounts', label: 'Accounts', path: '/admin/accounts' },
  { id: 'risk', label: 'Risk & Flags', path: '/admin/risk' },
  { id: 'payouts', label: 'Payouts', path: '/admin/payouts' },
  { id: 'users', label: 'Users & KYC', path: '/admin/users' },
  { id: 'compliance', label: 'Compliance', path: '/admin/compliance' },
  { id: 'billing', label: 'Billing', path: '/admin/billing' },
  { id: 'audit', label: 'Audit Log', path: '/admin/audit' },
  { id: 'health', label: 'System Health', path: '/admin/health' },
  { id: 'settings', label: 'Settings', path: '/admin/settings' },
  { id: 'support', label: 'Support', path: '/admin/support' },
  { id: 'announcements', label: 'Announcements', path: '/admin/announcements' },
  { id: 'products', label: 'Products', path: '/admin/products' },
  { id: 'integrations', label: 'Integrations', path: '/admin/integrations' },
  { id: 'security', label: 'Security', path: '/admin/security' },
];

interface AdminLayoutProps {
  isAdmin?: boolean;
}

export function AdminLayout({ isAdmin = true }: AdminLayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine active tab based on current path
  const getActiveTab = () => {
    // Exact match for /admin (overview)
    if (currentPath === '/admin') return 'overview';
    
    // Find matching tab for other paths
    const matchingTab = adminTabs.find(
      tab => tab.path !== '/admin' && currentPath.startsWith(tab.path)
    );
    return matchingTab?.id || 'overview';
  };

  const activeTab = getActiveTab();

  // Access denied state
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground mb-2">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You don't have access to Admin tools. Please contact your administrator if you believe this is an error.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminTopBar />

      {/* Tab Navigation */}
      <div className="border-b border-border/30 bg-card/50">
        <div className="px-6">
          <div className="overflow-x-auto">
            <nav className="flex h-12 gap-0">
              {adminTabs.map((tab) => (
                <Link
                  key={tab.id}
                  to={tab.path}
                  className={cn(
                    'h-12 px-4 flex items-center border-b-2 border-transparent',
                    'text-muted-foreground hover:text-foreground transition-colors',
                    'whitespace-nowrap text-sm font-medium',
                    activeTab === tab.id && 'border-primary text-foreground'
                  )}
                >
                  {tab.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Tab Content - Outlet renders the nested route */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}
