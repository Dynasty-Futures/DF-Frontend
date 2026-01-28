import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, Search, FileX2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (item: T) => React.ReactNode;
}

interface AdminDataTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  searchable?: boolean;
  searchPlaceholder?: string;
  selectable?: boolean;
  onRowClick?: (item: T) => void;
  selectedRows?: string[];
  onSelectionChange?: (ids: string[]) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function AdminDataTable<T extends object>({
  data,
  columns,
  keyField,
  searchable = false,
  searchPlaceholder = 'Search...',
  selectable = false,
  onRowClick,
  selectedRows = [],
  onSelectionChange,
  loading = false,
  emptyMessage = 'No results found',
  className,
}: AdminDataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filter data based on search
  const filteredData = searchTerm
    ? data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  // Sort data
  const sortedData = sortKey
    ? [...filteredData].sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[sortKey];
        const bVal = (b as Record<string, unknown>)[sortKey];
        if (aVal === bVal) return 0;
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;
        const comparison = aVal < bVal ? -1 : 1;
        return sortDirection === 'asc' ? comparison : -comparison;
      })
    : filteredData;

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === sortedData.length) {
      onSelectionChange?.([]);
    } else {
      onSelectionChange?.(sortedData.map((item) => String(item[keyField])));
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      onSelectionChange?.(selectedRows.filter((rowId) => rowId !== id));
    } else {
      onSelectionChange?.([...selectedRows, id]);
    }
  };

  const getSortIcon = (key: string) => {
    if (sortKey !== key) return <ChevronsUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
        {searchable && <Skeleton className="h-10 w-full max-w-sm" />}
        <div className="rounded-xl border border-border/30 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20">
                {selectable && <TableHead className="w-12" />}
                {columns.map((col) => (
                  <TableHead key={col.key} style={{ width: col.width }}>
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {selectable && (
                    <TableCell>
                      <Skeleton className="h-4 w-4" />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {searchable && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-muted/20 border-border/30"
          />
        </div>
      )}

      <div className="rounded-xl border border-border/30 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20">
                {selectable && (
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedRows.length === sortedData.length && sortedData.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                )}
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    style={{ width: col.width }}
                    className={cn(col.sortable && 'cursor-pointer select-none')}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-2">
                      {col.header}
                      {col.sortable && getSortIcon(col.key)}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="h-32 text-center"
                  >
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <FileX2 className="h-8 w-8" />
                      <p>{emptyMessage}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((item) => {
                  const id = String(item[keyField]);
                  return (
                    <TableRow
                      key={id}
                      className={cn(
                        'transition-colors',
                        onRowClick && 'cursor-pointer hover:bg-muted/30',
                        selectedRows.includes(id) && 'bg-primary/5'
                      )}
                      onClick={() => onRowClick?.(item)}
                    >
                      {selectable && (
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedRows.includes(id)}
                            onCheckedChange={() => handleSelectRow(id)}
                          />
                        </TableCell>
                      )}
                      {columns.map((col) => (
                        <TableCell key={col.key}>
                          {col.render
                            ? col.render(item)
                            : String((item as Record<string, unknown>)[col.key] ?? '')}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination placeholder */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {sortedData.length} of {data.length} results
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
