import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminStatusBadge, AdminPlanBadge } from '../AdminStatusBadge';
import { mockPayouts, type MockPayout } from '@/data/mockAdminData';
import { useAdminFilters } from '@/contexts/AdminFiltersContext';
import { isWithinDateRange, filterByPlan } from '@/lib/dateFilterUtils';
import { Check, X, Pause, Eye } from 'lucide-react';

export function AdminPayouts() {
  const [activeTab, setActiveTab] = useState('pending');
  const { filters } = useAdminFilters();

  // Apply global filters to payouts
  const filteredPayouts = useMemo(() => {
    let result = mockPayouts;
    
    // Apply date range filter based on requestedDate
    result = result.filter(p => isWithinDateRange(p.requestedDate, filters.dateRange));
    
    // Apply plan filter
    result = filterByPlan(result, filters.planFilter);
    
    return result;
  }, [filters.dateRange, filters.planFilter]);

  const pendingPayouts = useMemo(() => 
    filteredPayouts.filter(p => p.status === 'Pending'), 
    [filteredPayouts]
  );
  
  const historyPayouts = useMemo(() => 
    filteredPayouts.filter(p => p.status !== 'Pending'), 
    [filteredPayouts]
  );

  const pendingColumns: Column<MockPayout>[] = [
    { key: 'id', header: 'Payout ID', sortable: true },
    { key: 'requestedDate', header: 'Requested', sortable: true },
    { key: 'userName', header: 'User', sortable: true },
    { key: 'accountId', header: 'Account', sortable: true },
    { key: 'plan', header: 'Plan', render: (item) => <AdminPlanBadge plan={item.plan} /> },
    { key: 'amount', header: 'Amount', sortable: true, render: (item) => `$${item.amount.toLocaleString()}` },
    { key: 'method', header: 'Method' },
    { key: 'eligibilityStatus', header: 'Eligibility', render: (item) => <AdminStatusBadge status={item.eligibilityStatus} /> },
    { key: 'riskScore', header: 'Risk', sortable: true, render: (item) => (
      <span className={item.riskScore > 50 ? 'text-destructive font-medium' : item.riskScore > 30 ? 'text-yellow-400' : 'text-primary'}>
        {item.riskScore}
      </span>
    )},
    { key: 'flagsCount', header: 'Flags', render: (item) => item.flagsCount > 0 ? <span className="text-yellow-400">{item.flagsCount}</span> : '0' },
    { key: 'actions', header: 'Actions', render: () => (
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" className="h-7 px-2 text-primary"><Check className="h-3 w-3" /></Button>
        <Button size="sm" variant="ghost" className="h-7 px-2 text-yellow-400"><Pause className="h-3 w-3" /></Button>
        <Button size="sm" variant="ghost" className="h-7 px-2 text-destructive"><X className="h-3 w-3" /></Button>
        <Button size="sm" variant="ghost" className="h-7 px-2"><Eye className="h-3 w-3" /></Button>
      </div>
    )},
  ];

  const historyColumns: Column<MockPayout>[] = [
    { key: 'processedDate', header: 'Date', sortable: true, render: (item) => item.processedDate || item.requestedDate },
    { key: 'userName', header: 'User', sortable: true },
    { key: 'accountId', header: 'Account', sortable: true },
    { key: 'amount', header: 'Amount', sortable: true, render: (item) => `$${item.amount.toLocaleString()}` },
    { key: 'status', header: 'Status', render: (item) => <AdminStatusBadge status={item.status} /> },
    { key: 'method', header: 'Method' },
    { key: 'referenceId', header: 'Reference', render: (item) => item.referenceId || <span className="text-muted-foreground">—</span> },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="bg-muted/20 border border-border/30">
        <TabsTrigger value="pending">Pending Requests ({pendingPayouts.length})</TabsTrigger>
        <TabsTrigger value="history">Payout History ({historyPayouts.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="pending" className="mt-4">
        <AdminDataTable data={pendingPayouts} columns={pendingColumns} keyField="id" searchable searchPlaceholder="Search payouts..." />
      </TabsContent>

      <TabsContent value="history" className="mt-4">
        <AdminDataTable data={historyPayouts} columns={historyColumns} keyField="id" searchable searchPlaceholder="Search history..." />
      </TabsContent>
    </Tabs>
  );
}
