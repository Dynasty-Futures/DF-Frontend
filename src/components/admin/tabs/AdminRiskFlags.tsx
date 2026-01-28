import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminStatusBadge, AdminSeverityBadge, AdminConfidenceBadge } from '../AdminStatusBadge';
import { AdminExposureChart } from '../AdminExposureChart';
import { mockViolations, mockPatternFlags, getExposureData, type MockViolation, type MockPatternFlag } from '@/data/mockAdminData';
import { useAdminFilters } from '@/contexts/AdminFiltersContext';
import { isWithinDateRange } from '@/lib/dateFilterUtils';
import { CheckCircle, FileSearch, Pause, AlertTriangle } from 'lucide-react';

export function AdminRiskFlags() {
  const [activeTab, setActiveTab] = useState('violations');
  const exposureData = getExposureData();
  const { filters } = useAdminFilters();

  // Apply global date filter to violations
  const filteredViolations = useMemo(() => {
    return mockViolations.filter(v => isWithinDateRange(v.timestamp, filters.dateRange));
  }, [filters.dateRange]);

  // Apply global date filter to pattern flags
  const filteredFlags = useMemo(() => {
    return mockPatternFlags.filter(f => isWithinDateRange(f.timestamp, filters.dateRange));
  }, [filters.dateRange]);

  const violationColumns: Column<MockViolation>[] = [
    { key: 'timestamp', header: 'Timestamp', sortable: true },
    { key: 'userName', header: 'User', sortable: true },
    { key: 'accountId', header: 'Account', sortable: true },
    { key: 'type', header: 'Violation Type', sortable: true },
    { key: 'severity', header: 'Severity', render: (item) => <AdminSeverityBadge severity={item.severity} /> },
    { key: 'status', header: 'Status', render: (item) => <AdminStatusBadge status={item.status} /> },
    { key: 'assignedTo', header: 'Assigned To', render: (item) => item.assignedTo || <span className="text-muted-foreground">—</span> },
    { key: 'notesCount', header: 'Notes', render: (item) => item.notesCount > 0 ? item.notesCount : <span className="text-muted-foreground">0</span> },
    { key: 'actions', header: 'Actions', render: () => (
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" className="h-7 px-2"><CheckCircle className="h-3 w-3" /></Button>
        <Button size="sm" variant="ghost" className="h-7 px-2"><FileSearch className="h-3 w-3" /></Button>
      </div>
    )},
  ];

  const flagColumns: Column<MockPatternFlag>[] = [
    { key: 'timestamp', header: 'Timestamp', sortable: true },
    { key: 'userName', header: 'User', sortable: true },
    { key: 'accountId', header: 'Account', sortable: true },
    { key: 'type', header: 'Flag Type', sortable: true },
    { key: 'severity', header: 'Severity', render: (item) => <AdminSeverityBadge severity={item.severity} /> },
    { key: 'confidence', header: 'Confidence', render: (item) => <AdminConfidenceBadge confidence={item.confidence} /> },
    { key: 'status', header: 'Status', render: (item) => <AdminStatusBadge status={item.status} /> },
    { key: 'actions', header: 'Actions', render: () => (
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" className="h-7 px-2"><FileSearch className="h-3 w-3" /></Button>
        <Button size="sm" variant="ghost" className="h-7 px-2"><AlertTriangle className="h-3 w-3" /></Button>
        <Button size="sm" variant="ghost" className="h-7 px-2"><Pause className="h-3 w-3" /></Button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      {/* Exposure Snapshot */}
      <div className="rounded-2xl border border-border/30 bg-gradient-card p-6">
        <AdminExposureChart data={exposureData} />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/20 border border-border/30">
          <TabsTrigger value="violations">Violations ({filteredViolations.length})</TabsTrigger>
          <TabsTrigger value="flags">Pattern Flags ({filteredFlags.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="violations" className="mt-4">
          <AdminDataTable data={filteredViolations} columns={violationColumns} keyField="id" searchable searchPlaceholder="Search violations..." />
        </TabsContent>

        <TabsContent value="flags" className="mt-4">
          <AdminDataTable data={filteredFlags} columns={flagColumns} keyField="id" searchable searchPlaceholder="Search flags..." />
        </TabsContent>
      </Tabs>
    </div>
  );
}
