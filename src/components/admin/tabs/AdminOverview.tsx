import { 
  Users, TrendingUp, DollarSign, UserPlus, AlertTriangle, Activity 
} from 'lucide-react';
import { AdminMetricCard } from '../AdminMetricCard';
import { AdminAlertFeed } from '../AdminAlertFeed';
import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminStatusBadge, AdminPlanBadge } from '../AdminStatusBadge';
import { 
  mockAccounts, 
  mockAlerts, 
  getKPIs, 
  getHighRiskAccounts,
  type MockAccount 
} from '@/data/mockAdminData';

export function AdminOverview() {
  const kpis = getKPIs();
  const highRiskAccounts = getHighRiskAccounts().slice(0, 10);

  const riskColumns: Column<MockAccount>[] = [
    { key: 'id', header: 'Account ID', sortable: true },
    { key: 'userName', header: 'User', sortable: true },
    { key: 'plan', header: 'Plan', render: (item) => <AdminPlanBadge plan={item.plan} /> },
    { key: 'equity', header: 'Equity', sortable: true, render: (item) => `$${item.equity.toLocaleString()}` },
    { key: 'drawdownUsed', header: 'DD Used', sortable: true, render: (item) => (
      <span className={item.drawdownUsed > 80 ? 'text-destructive font-medium' : ''}>
        {item.drawdownUsed}%
      </span>
    )},
    { key: 'dailyLossUsed', header: 'DLL Used', sortable: true, render: (item) => (
      <span className={item.dailyLossUsed > 80 ? 'text-destructive font-medium' : ''}>
        {item.dailyLossUsed}%
      </span>
    )},
    { key: 'status', header: 'Status', render: (item) => <AdminStatusBadge status={item.status} /> },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <AdminMetricCard
          title="Active Accounts"
          value={kpis.activeAccounts}
          icon={Users}
          variant="default"
        />
        <AdminMetricCard
          title="Evaluations Running"
          value={kpis.evaluationsRunning}
          icon={TrendingUp}
          variant="default"
        />
        <AdminMetricCard
          title="Funded Accounts"
          value={kpis.fundedAccounts}
          icon={Activity}
          variant="success"
        />
        <AdminMetricCard
          title="New Signups Today"
          value={kpis.newSignupsToday}
          icon={UserPlus}
          variant="default"
        />
        <AdminMetricCard
          title="Pending Payouts"
          value={kpis.pendingPayoutCount}
          subtitle={`$${kpis.pendingPayoutTotal.toLocaleString()}`}
          icon={DollarSign}
          variant="warning"
        />
        <AdminMetricCard
          title="High-Risk Accounts"
          value={kpis.highRiskAccounts}
          icon={AlertTriangle}
          variant="danger"
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accounts At Risk */}
        <div className="rounded-2xl border border-border/30 bg-gradient-card p-6">
          <h3 className="text-lg font-semibold font-display text-foreground mb-4">
            Accounts At Risk
          </h3>
          <AdminDataTable
            data={highRiskAccounts}
            columns={riskColumns}
            keyField="id"
            emptyMessage="No high-risk accounts"
          />
        </div>

        {/* Operational Alerts Feed */}
        <div className="rounded-2xl border border-border/30 bg-gradient-card p-6">
          <h3 className="text-lg font-semibold font-display text-foreground mb-4">
            Operational Alerts
          </h3>
          <AdminAlertFeed alerts={mockAlerts} maxHeight="400px" />
        </div>
      </div>
    </div>
  );
}
