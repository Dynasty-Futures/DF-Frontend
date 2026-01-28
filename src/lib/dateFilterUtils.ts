// Date filtering utility for admin filters

export function isWithinDateRange(dateString: string, range: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  
  switch (range) {
    case 'today':
      return date.toDateString() === now.toDateString();
    case '7d':
      return date >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case '30d':
      return date >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case '90d':
      return date >= new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    case 'custom':
      return true; // Custom date range would need additional start/end dates
    default:
      return true;
  }
}

export function filterByPlan<T extends { plan: string }>(items: T[], planFilter: string): T[] {
  if (planFilter === 'all') return items;
  return items.filter(item => item.plan.toLowerCase() === planFilter.toLowerCase());
}

export function filterByStatus<T extends { status: string }>(items: T[], statusFilter: string): T[] {
  if (statusFilter === 'all') return items;
  return items.filter(item => item.status.toLowerCase() === statusFilter.toLowerCase());
}
