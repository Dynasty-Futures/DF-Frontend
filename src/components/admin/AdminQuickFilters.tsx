import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface QuickFilter {
  id: string;
  label: string;
  count?: number;
}

interface AdminQuickFiltersProps {
  filters: QuickFilter[];
  activeFilter: string | null;
  onFilterChange: (filterId: string | null) => void;
  className?: string;
}

export function AdminQuickFilters({
  filters,
  activeFilter,
  onFilterChange,
  className,
}: AdminQuickFiltersProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      <Button
        variant={activeFilter === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onFilterChange(null)}
        className={cn(
          activeFilter === null
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted/20 border-border/30 hover:bg-muted/40'
        )}
      >
        All
      </Button>
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            activeFilter === filter.id
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/20 border-border/30 hover:bg-muted/40'
          )}
        >
          {filter.label}
          {filter.count !== undefined && (
            <span className="ml-1.5 rounded-full bg-background/20 px-1.5 py-0.5 text-xs">
              {filter.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}
