import { createContext, useContext, useState, ReactNode } from 'react';

export interface AdminFilters {
  dateRange: string;
  planFilter: string;
  statusFilter: string;
}

interface AdminFiltersContextType {
  filters: AdminFilters;
  setDateRange: (range: string) => void;
  setPlanFilter: (plan: string) => void;
  setStatusFilter: (status: string) => void;
}

const AdminFiltersContext = createContext<AdminFiltersContextType | undefined>(undefined);

export function AdminFiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<AdminFilters>({
    dateRange: '7d',
    planFilter: 'all',
    statusFilter: 'all',
  });

  const setDateRange = (range: string) => setFilters(prev => ({ ...prev, dateRange: range }));
  const setPlanFilter = (plan: string) => setFilters(prev => ({ ...prev, planFilter: plan }));
  const setStatusFilter = (status: string) => setFilters(prev => ({ ...prev, statusFilter: status }));

  return (
    <AdminFiltersContext.Provider value={{ filters, setDateRange, setPlanFilter, setStatusFilter }}>
      {children}
    </AdminFiltersContext.Provider>
  );
}

export function useAdminFilters() {
  const context = useContext(AdminFiltersContext);
  if (!context) {
    throw new Error('useAdminFilters must be used within AdminFiltersProvider');
  }
  return context;
}
