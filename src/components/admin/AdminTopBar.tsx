import { Search, Filter, ChevronDown, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAdminFilters } from '@/contexts/AdminFiltersContext';
import { AdminExportCenter } from './AdminExportCenter';

export function AdminTopBar() {
  const { filters, setDateRange, setPlanFilter, setStatusFilter } = useAdminFilters();

  return (
    <div className="sticky top-0 z-40 border-b border-border/30 bg-card/95 backdrop-blur-xl">
      <div className="px-6 py-4">
        {/* Top row: Admin Mode badge + Search + Quick Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
          <Badge className="w-fit bg-primary/20 text-primary border-primary/30 hover:bg-primary/20">
            Admin Mode
          </Badge>
          
          {/* Global Search */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search user email, name, account ID, payout ID..."
              className="pl-10 bg-muted/20 border-border/30"
            />
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-muted/20 border-border/30">
                  <MoreHorizontal className="h-4 w-4 mr-2" />
                  Quick Actions
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Pause Account</DropdownMenuItem>
                <DropdownMenuItem>Resume Account</DropdownMenuItem>
                <DropdownMenuItem>Fail Account</DropdownMenuItem>
                <DropdownMenuItem>Reset Evaluation</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Approve Payout</DropdownMenuItem>
                <DropdownMenuItem>Hold Payout</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Add Internal Note</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AdminExportCenter />
          </div>
        </div>

        {/* Bottom row: Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Range */}
          <div className="flex items-center gap-1 rounded-lg border border-border/30 bg-muted/20 p-1">
            {['Today', '7D', '30D', '90D', 'Custom'].map((range) => (
              <Button
                key={range}
                variant="ghost"
                size="sm"
                className={
                  filters.dateRange === range.toLowerCase()
                    ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                    : 'hover:bg-muted/40'
                }
                onClick={() => setDateRange(range.toLowerCase())}
              >
                {range}
              </Button>
            ))}
          </div>

          {/* Plan Filter */}
          <Select value={filters.planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-[140px] bg-muted/20 border-border/30">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="dynasty">Dynasty</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={filters.statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] bg-muted/20 border-border/30">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="evaluation">Evaluation</SelectItem>
              <SelectItem value="funded">Funded</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
