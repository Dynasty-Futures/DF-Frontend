import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminQuickFilters } from '../AdminQuickFilters';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { AdminDrawer } from '../AdminDrawer';
import { AdminNotesThread } from '../AdminNotesThread';
import { AdminCalendarMini, generateMockCalendarData } from '../AdminCalendarMini';
import { useAdminAccounts } from '@/hooks/useAccounts';
import { useAdminFilters } from '@/contexts/AdminFiltersContext';
import type { AdminAccount } from '@/types/account';
import { Pause, Play, XCircle, RotateCcw, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const statusLabel: Record<string, string> = {
  EVALUATION: 'Evaluation',
  PHASE_2: 'Phase 2',
  PASSED: 'Passed',
  FUNDED: 'Funded',
  SUSPENDED: 'Suspended',
  FAILED: 'Failed',
  CLOSED: 'Closed',
};

const formatStatus = (status: string): string => statusLabel[status] ?? status;

const toNumber = (val: string | number): number => Number(val) || 0;

const formatCurrency = (val: string | number): string =>
  `$${toNumber(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const fullName = (acc: AdminAccount): string =>
  `${acc.user.firstName} ${acc.user.lastName}`;

const isWithinDays = (dateString: string, days: number): boolean => {
  const date = new Date(dateString);
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return date >= cutoff;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AdminAccounts() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AdminAccount | null>(null);

  const { filters } = useAdminFilters();

  const statusParam =
    filters.statusFilter !== 'all' ? filters.statusFilter.toUpperCase() : undefined;

  const { data: response, isLoading, isError } = useAdminAccounts({
    limit: 100,
    status: statusParam as AdminAccount['status'] | undefined,
  });

  const accounts = response?.data ?? [];

  const globalFilteredAccounts = useMemo(() => {
    let result = accounts;

    if (filters.dateRange !== 'all') {
      const daysMap: Record<string, number> = { today: 1, '7d': 7, '30d': 30, '90d': 90 };
      const days = daysMap[filters.dateRange];
      if (days) {
        result = result.filter((acc) => isWithinDays(acc.createdAt, days));
      }
    }

    if (filters.planFilter !== 'all') {
      result = result.filter(
        (acc) => acc.accountType.name.toLowerCase() === filters.planFilter.toLowerCase()
      );
    }

    return result;
  }, [accounts, filters.dateRange, filters.planFilter]);

  const quickFilters = useMemo(() => {
    return [
      {
        id: 'high-dd',
        label: 'High DD (>80%)',
        count: globalFilteredAccounts.filter((a) => toNumber(a.currentDrawdown) > 80).length,
      },
      {
        id: 'newly-funded',
        label: 'Newly funded',
        count: globalFilteredAccounts.filter(
          (a) => a.status === 'FUNDED' && isWithinDays(a.createdAt, 30)
        ).length,
      },
      {
        id: 'recently-failed',
        label: 'Recently failed',
        count: globalFilteredAccounts.filter((a) => a.status === 'FAILED').length,
      },
    ];
  }, [globalFilteredAccounts]);

  const filteredAccounts = useMemo(() => {
    if (!activeFilter) return globalFilteredAccounts;

    switch (activeFilter) {
      case 'high-dd':
        return globalFilteredAccounts.filter((acc) => toNumber(acc.currentDrawdown) > 80);
      case 'newly-funded':
        return globalFilteredAccounts.filter(
          (acc) => acc.status === 'FUNDED' && isWithinDays(acc.createdAt, 30)
        );
      case 'recently-failed':
        return globalFilteredAccounts.filter((acc) => acc.status === 'FAILED');
      default:
        return globalFilteredAccounts;
    }
  }, [activeFilter, globalFilteredAccounts]);

  const columns: Column<AdminAccount>[] = [
    { key: 'id', header: 'Account ID', sortable: true, width: '120px',
      render: (item) => <span className="font-mono text-xs">{item.id.slice(0, 8)}...</span> },
    { key: 'userName', header: 'User', sortable: true,
      render: (item) => fullName(item) },
    { key: 'email', header: 'Email', sortable: true,
      render: (item) => item.user.email },
    { key: 'plan', header: 'Plan',
      render: (item) => (
        <span className="text-sm font-medium">{item.accountType.displayName}</span>
      ) },
    { key: 'status', header: 'Status',
      render: (item) => <AdminStatusBadge status={formatStatus(item.status)} /> },
    { key: 'currentBalance', header: 'Balance', sortable: true,
      render: (item) => formatCurrency(item.currentBalance) },
    { key: 'currentDrawdown', header: 'Drawdown', sortable: true,
      render: (item) => {
        const dd = toNumber(item.currentDrawdown);
        return <span className={dd > 80 ? 'text-destructive font-medium' : ''}>{dd.toFixed(1)}%</span>;
      } },
    { key: 'totalPnl', header: 'Total P&L', sortable: true,
      render: (item) => {
        const pnl = toNumber(item.totalPnl);
        return <span className={pnl >= 0 ? 'text-primary' : 'text-destructive'}>{formatCurrency(pnl)}</span>;
      } },
    { key: 'tradingDays', header: 'Trading Days', sortable: true },
    { key: 'createdAt', header: 'Created', sortable: true,
      render: (item) => new Date(item.createdAt).toLocaleDateString() },
  ];

  const handleRowClick = (account: AdminAccount) => {
    setSelectedAccount(account);
    setDrawerOpen(true);
  };

  const calendarDays = generateMockCalendarData();

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
        <AlertTriangle className="h-10 w-10 text-destructive" />
        <p className="text-lg font-medium text-foreground">Failed to load accounts</p>
        <p className="text-sm">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Quick filters */}
      <AdminQuickFilters filters={quickFilters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {/* Batch actions */}
      {selectedRows.length > 0 && (
        <div className="flex items-center gap-2 p-3 rounded-lg border border-border/30 bg-muted/20">
          <span className="text-sm text-muted-foreground">{selectedRows.length} selected</span>
          <Button size="sm" variant="outline"><Pause className="h-4 w-4 mr-1" />Pause</Button>
          <Button size="sm" variant="outline"><Play className="h-4 w-4 mr-1" />Resume</Button>
          <Button size="sm" variant="outline" className="text-destructive"><XCircle className="h-4 w-4 mr-1" />Fail</Button>
          <Button size="sm" variant="outline"><RotateCcw className="h-4 w-4 mr-1" />Reset</Button>
        </div>
      )}

      {/* Data table */}
      <AdminDataTable
        data={filteredAccounts}
        columns={columns}
        keyField="id"
        searchable
        searchPlaceholder="Search accounts..."
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        onRowClick={handleRowClick}
        loading={isLoading}
      />

      {/* Account Detail Drawer */}
      <AdminDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedAccount ? selectedAccount.id.slice(0, 8) + '...' : ''}
        subtitle={selectedAccount ? `${fullName(selectedAccount)} • ${selectedAccount.accountType.displayName}` : ''}
        width="xl"
      >
        {selectedAccount && (
          <div className="space-y-6">
            {/* Status */}
            <div className="flex items-center gap-2">
              <AdminStatusBadge status={formatStatus(selectedAccount.status)} />
              <span className="text-sm font-medium">{selectedAccount.accountType.displayName}</span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(selectedAccount.currentBalance)}</p>
              </div>
              <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
                <p className="text-sm text-muted-foreground">Total P&L</p>
                <p className={`text-2xl font-bold ${toNumber(selectedAccount.totalPnl) >= 0 ? 'text-primary' : 'text-destructive'}`}>
                  {formatCurrency(selectedAccount.totalPnl)}
                </p>
              </div>
              <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
                <p className="text-sm text-muted-foreground">Drawdown</p>
                <p className={`text-2xl font-bold ${toNumber(selectedAccount.currentDrawdown) > 80 ? 'text-destructive' : 'text-foreground'}`}>
                  {toNumber(selectedAccount.currentDrawdown).toFixed(1)}%
                </p>
              </div>
              <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
                <p className="text-sm text-muted-foreground">Daily P&L</p>
                <p className={`text-2xl font-bold ${toNumber(selectedAccount.dailyPnl) >= 0 ? 'text-primary' : 'text-destructive'}`}>
                  {formatCurrency(selectedAccount.dailyPnl)}
                </p>
              </div>
            </div>

            {/* Calendar */}
            <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
              <AdminCalendarMini days={calendarDays} />
            </div>

            {/* Notes placeholder */}
            <AdminNotesThread notes={[]} onAddNote={() => {}} />

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
              <Button size="sm" variant="outline"><Pause className="h-4 w-4 mr-1" />Pause</Button>
              <Button size="sm" variant="outline"><Play className="h-4 w-4 mr-1" />Resume</Button>
              <Button size="sm" variant="outline" className="text-destructive"><XCircle className="h-4 w-4 mr-1" />Fail</Button>
              <Button size="sm" variant="outline"><RotateCcw className="h-4 w-4 mr-1" />Reset</Button>
              <Button size="sm" variant="outline"><Clock className="h-4 w-4 mr-1" />Grant Extension</Button>
              <Button size="sm" variant="outline"><CheckCircle className="h-4 w-4 mr-1" />Mark Reviewed</Button>
            </div>
          </div>
        )}
      </AdminDrawer>
    </div>
  );
}
