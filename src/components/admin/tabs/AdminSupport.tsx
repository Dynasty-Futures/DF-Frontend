import { useState } from 'react';
import { MessageSquare, Clock, User, AlertCircle, ExternalLink, Send, Paperclip, ArrowUp, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { useTickets, useResolveTicket, useCloseTicket } from '@/hooks/useSupport';
import type { SupportTicket, TicketStatus, TicketPriority } from '@/types/support';

// Map backend enum values to display-friendly labels for the AdminStatusBadge
const statusDisplayMap: Record<TicketStatus, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  WAITING_RESPONSE: 'Waiting on User',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

const priorityColors: Record<TicketPriority, string> = {
  LOW: 'bg-muted text-muted-foreground',
  MEDIUM: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  HIGH: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  URGENT: 'bg-destructive/20 text-destructive border-destructive/30',
};

/** Get the display name for a ticket's creator (or anonymous submitter). */
const getTicketUserName = (ticket: SupportTicket): string => {
  if (ticket.creator) {
    return `${ticket.creator.firstName} ${ticket.creator.lastName}`;
  }
  return ticket.name || ticket.email || 'Anonymous';
};

/** Format an ISO date string for display in the table. */
const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

export function AdminSupport() {
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');
  const [selectedCase, setSelectedCase] = useState<SupportTicket | null>(null);

  const resolveTicket = useResolveTicket();
  const closeTicket = useCloseTicket();

  // Build query filters from the dropdowns
  const filters = {
    ...(statusFilter !== 'all' && { status: statusFilter }),
    ...(priorityFilter !== 'all' && { priority: priorityFilter }),
    limit: 50,
  };

  const { data: ticketsResponse, isLoading, isError, error } = useTickets(filters);
  const tickets = ticketsResponse?.data ?? [];

  const getPriorityBadge = (priority: TicketPriority) => (
    <Badge variant="outline" className={priorityColors[priority]}>
      {priority.charAt(0) + priority.slice(1).toLowerCase()}
    </Badge>
  );

  const columns: Column<SupportTicket>[] = [
    {
      key: 'id',
      header: 'Case ID',
      sortable: true,
      render: (item) => (
        <span className="font-mono text-xs">{item.id.slice(0, 8)}...</span>
      ),
    },
    { key: 'userName', header: 'User', render: (item) => getTicketUserName(item) },
    { key: 'subject', header: 'Subject', sortable: true },
    {
      key: 'priority',
      header: 'Priority',
      render: (item) => getPriorityBadge(item.priority),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => <AdminStatusBadge status={statusDisplayMap[item.status]} />,
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortable: true,
      render: (item) => formatDate(item.createdAt),
    },
    {
      key: 'updatedAt',
      header: 'Last Updated',
      sortable: true,
      render: (item) => formatDate(item.updatedAt),
    },
    {
      key: 'assignee',
      header: 'Assigned',
      render: (item) =>
        item.assignee
          ? `${item.assignee.firstName} ${item.assignee.lastName}`
          : <span className="text-muted-foreground">Unassigned</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => setSelectedCase(item)}>
          <ExternalLink className="h-3 w-3 mr-1" /> View
        </Button>
      ),
    },
  ];

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load tickets</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          {error?.message || 'Something went wrong. Make sure the backend is running.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as TicketStatus | 'all')}>
          <SelectTrigger className="w-[180px] bg-muted/20 border-border/30">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="WAITING_RESPONSE">Waiting on User</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v as TicketPriority | 'all')}>
          <SelectTrigger className="w-[140px] bg-muted/20 border-border/30">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="URGENT">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cases Table */}
      <AdminDataTable
        data={tickets}
        columns={columns}
        keyField="id"
        searchable
        searchPlaceholder="Search tickets..."
        loading={isLoading}
        emptyMessage="No support tickets found"
      />

      {/* Case Detail Drawer */}
      <Sheet open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedCase && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Ticket {selectedCase.id.slice(0, 8)}
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Case Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">User</p>
                    <p className="font-medium">{getTicketUserName(selectedCase)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">
                      {selectedCase.creator?.email || selectedCase.email || '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Priority</p>
                    {getPriorityBadge(selectedCase.priority)}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <AdminStatusBadge status={statusDisplayMap[selectedCase.status]} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Assigned</p>
                    <p className="font-medium">
                      {selectedCase.assignee
                        ? `${selectedCase.assignee.firstName} ${selectedCase.assignee.lastName}`
                        : 'Unassigned'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Created</p>
                    <p className="font-medium">{formatDate(selectedCase.createdAt)}</p>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Subject</p>
                  <p className="font-medium">{selectedCase.subject}</p>
                </div>

                {/* Description */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Description</p>
                  <ScrollArea className="h-[160px] pr-4">
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {selectedCase.description}
                    </p>
                  </ScrollArea>
                </div>

                {/* Internal Notes */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Internal Notes (Admin Only)</p>
                  <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                    <Textarea
                      placeholder="Add internal note..."
                      className="min-h-[80px] bg-transparent border-0 p-0 focus-visible:ring-0"
                    />
                    <div className="flex justify-end mt-2">
                      <Button size="sm" variant="ghost">
                        <Send className="h-3 w-3 mr-1" /> Add Note
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Attachments</p>
                  <div className="p-4 rounded-lg border border-dashed border-border/50 text-center">
                    <Paperclip className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Drop files here or click to upload</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
                  <Button size="sm" variant="outline">
                    <User className="h-3 w-3 mr-1" /> Assign
                  </Button>
                  {selectedCase.status !== 'RESOLVED' && selectedCase.status !== 'CLOSED' && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={resolveTicket.isPending}
                      onClick={() => {
                        resolveTicket.mutate(selectedCase.id, {
                          onSuccess: () => setSelectedCase(null),
                        });
                      }}
                    >
                      {resolveTicket.isPending ? (
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      Resolve
                    </Button>
                  )}
                  {selectedCase.status !== 'CLOSED' && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={closeTicket.isPending}
                      onClick={() => {
                        closeTicket.mutate(selectedCase.id, {
                          onSuccess: () => setSelectedCase(null),
                        });
                      }}
                    >
                      {closeTicket.isPending ? (
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      Close
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <ArrowUp className="h-3 w-3 mr-1" /> Escalate
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
