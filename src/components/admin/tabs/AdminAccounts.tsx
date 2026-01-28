import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminQuickFilters } from '../AdminQuickFilters';
import { AdminStatusBadge, AdminPlanBadge } from '../AdminStatusBadge';
import { AdminDrawer } from '../AdminDrawer';
import { AdminNotesThread } from '../AdminNotesThread';
import { AdminCalendarMini, generateMockCalendarData } from '../AdminCalendarMini';
import { mockAccounts, mockTrades, mockNotes, type MockAccount } from '@/data/mockAdminData';
import { useAdminFilters } from '@/contexts/AdminFiltersContext';
import { isWithinDateRange, filterByPlan, filterByStatus } from '@/lib/dateFilterUtils';
import { Pause, Play, XCircle, RotateCcw, Clock, CheckCircle } from 'lucide-react';

export function AdminAccounts() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<MockAccount | null>(null);
  
  const { filters } = useAdminFilters();

  // Apply global filters first
  const globalFilteredAccounts = useMemo(() => {
    let result = mockAccounts;
    
    // Apply date range filter based on lastTradeTime
    result = result.filter(acc => isWithinDateRange(acc.lastTradeTime, filters.dateRange));
    
    // Apply plan filter
    result = filterByPlan(result, filters.planFilter);
    
    // Apply status filter
    result = filterByStatus(result, filters.statusFilter);
    
    return result;
  }, [filters.dateRange, filters.planFilter, filters.statusFilter]);

  // Calculate dynamic filter counts based on globally filtered data
  const quickFilters = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    return [
      { id: 'high-dd', label: 'High DD (>80%)', count: globalFilteredAccounts.filter(a => a.drawdownUsed > 80).length },
      { id: 'high-dll', label: 'High DLL (>80%)', count: globalFilteredAccounts.filter(a => a.dailyLossUsed > 80).length },
      { id: 'no-trades', label: 'No trades 7D', count: globalFilteredAccounts.filter(a => new Date(a.lastTradeTime) < sevenDaysAgo).length },
      { id: 'newly-funded', label: 'Newly funded', count: globalFilteredAccounts.filter(a => a.status === 'Funded' && new Date(a.createdAt) > thirtyDaysAgo).length },
      { id: 'recently-failed', label: 'Recently failed', count: globalFilteredAccounts.filter(a => a.status === 'Failed').length },
    ];
  }, [globalFilteredAccounts]);

  // Apply quick filter on top of global filters
  const filteredAccounts = useMemo(() => {
    if (!activeFilter) return globalFilteredAccounts;

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    switch (activeFilter) {
      case 'high-dd':
        return globalFilteredAccounts.filter(acc => acc.drawdownUsed > 80);
      case 'high-dll':
        return globalFilteredAccounts.filter(acc => acc.dailyLossUsed > 80);
      case 'no-trades':
        return globalFilteredAccounts.filter(acc => new Date(acc.lastTradeTime) < sevenDaysAgo);
      case 'newly-funded':
        return globalFilteredAccounts.filter(acc => acc.status === 'Funded' && new Date(acc.createdAt) > thirtyDaysAgo);
      case 'recently-failed':
        return globalFilteredAccounts.filter(acc => acc.status === 'Failed');
      default:
        return globalFilteredAccounts;
    }
  }, [activeFilter, globalFilteredAccounts]);

  const columns: Column<MockAccount>[] = [
    { key: 'id', header: 'Account ID', sortable: true, width: '120px' },
    { key: 'userName', header: 'User', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'plan', header: 'Plan', render: (item) => <AdminPlanBadge plan={item.plan} /> },
    { key: 'status', header: 'Status', render: (item) => <AdminStatusBadge status={item.status} /> },
    { key: 'equity', header: 'Equity', sortable: true, render: (item) => `$${item.equity.toLocaleString()}` },
    { key: 'drawdownUsed', header: 'DD Used', sortable: true, render: (item) => (
      <span className={item.drawdownUsed > 80 ? 'text-destructive font-medium' : ''}>{item.drawdownUsed}%</span>
    )},
    { key: 'dailyLossUsed', header: 'DLL Used', sortable: true, render: (item) => (
      <span className={item.dailyLossUsed > 80 ? 'text-destructive font-medium' : ''}>{item.dailyLossUsed}%</span>
    )},
    { key: 'tradesToday', header: 'Trades Today', sortable: true },
    { key: 'lastTradeTime', header: 'Last Trade', sortable: true },
    { key: 'flagsCount', header: 'Flags', sortable: true, render: (item) => (
      item.flagsCount > 0 ? <span className="text-yellow-400">{item.flagsCount}</span> : <span className="text-muted-foreground">0</span>
    )},
  ];

  const handleRowClick = (account: MockAccount) => {
    setSelectedAccount(account);
    setDrawerOpen(true);
  };

  const calendarDays = generateMockCalendarData();

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
      />

      {/* Account Detail Drawer */}
      <AdminDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={selectedAccount?.id || ''} subtitle={`${selectedAccount?.userName} • ${selectedAccount?.plan}`} width="xl">
        {selectedAccount && (
          <div className="space-y-6">
            {/* Status */}
            <div className="flex items-center gap-2">
              <AdminStatusBadge status={selectedAccount.status} />
              <AdminPlanBadge plan={selectedAccount.plan} />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
                <p className="text-sm text-muted-foreground">Equity</p>
                <p className="text-2xl font-bold text-foreground">${selectedAccount.equity.toLocaleString()}</p>
              </div>
              <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
                <p className="text-sm text-muted-foreground">Closed P&L</p>
                <p className={`text-2xl font-bold ${selectedAccount.closedPnL >= 0 ? 'text-primary' : 'text-destructive'}`}>
                  ${selectedAccount.closedPnL.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
                <p className="text-sm text-muted-foreground">Drawdown Used</p>
                <p className={`text-2xl font-bold ${selectedAccount.drawdownUsed > 80 ? 'text-destructive' : 'text-foreground'}`}>
                  {selectedAccount.drawdownUsed}%
                </p>
              </div>
              <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
                <p className="text-sm text-muted-foreground">Daily Loss Used</p>
                <p className={`text-2xl font-bold ${selectedAccount.dailyLossUsed > 80 ? 'text-destructive' : 'text-foreground'}`}>
                  {selectedAccount.dailyLossUsed}%
                </p>
              </div>
            </div>

            {/* Calendar */}
            <div className="rounded-lg border border-border/30 bg-muted/10 p-4">
              <AdminCalendarMini days={calendarDays} />
            </div>

            {/* Recent Trades */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Recent Trades</h4>
              <div className="rounded-lg border border-border/30 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/20">
                    <tr>
                      <th className="text-left p-2">Time</th>
                      <th className="text-left p-2">Symbol</th>
                      <th className="text-left p-2">Side</th>
                      <th className="text-right p-2">P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTrades.slice(0, 5).map((trade) => (
                      <tr key={trade.id} className="border-t border-border/30">
                        <td className="p-2 text-muted-foreground">{trade.timestamp}</td>
                        <td className="p-2">{trade.symbol}</td>
                        <td className="p-2">{trade.side}</td>
                        <td className={`p-2 text-right ${trade.pnl >= 0 ? 'text-primary' : 'text-destructive'}`}>
                          ${trade.pnl.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes */}
            <AdminNotesThread notes={mockNotes} onAddNote={() => {}} />

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
