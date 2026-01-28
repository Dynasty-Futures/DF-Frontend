import { useState } from 'react';
import { MessageSquare, Clock, User, AlertCircle, ExternalLink, Send, Paperclip, ArrowUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { mockSupportCases, type MockSupportCase } from '@/data/mockAdminData';

export function AdminSupport() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedCase, setSelectedCase] = useState<MockSupportCase | null>(null);

  const filteredCases = mockSupportCases.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (typeFilter !== 'all' && c.type !== typeFilter) return false;
    if (priorityFilter !== 'all' && c.priority !== priorityFilter) return false;
    return true;
  });

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      Low: 'bg-muted text-muted-foreground',
      Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      High: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      Critical: 'bg-destructive/20 text-destructive border-destructive/30',
    };
    return <Badge variant="outline" className={colors[priority]}>{priority}</Badge>;
  };

  const columns: Column<MockSupportCase>[] = [
    { key: 'id', header: 'Case ID', sortable: true },
    { key: 'userName', header: 'User', sortable: true },
    { key: 'accountId', header: 'Account', render: (item) => item.accountId || '—' },
    { key: 'type', header: 'Type', sortable: true },
    { key: 'priority', header: 'Priority', render: (item) => getPriorityBadge(item.priority) },
    { key: 'status', header: 'Status', render: (item) => <AdminStatusBadge status={item.status} /> },
    { key: 'createdAt', header: 'Created', sortable: true },
    { key: 'updatedAt', header: 'Last Updated', sortable: true },
    { key: 'assignedTo', header: 'Assigned', render: (item) => item.assignedTo || <span className="text-muted-foreground">Unassigned</span> },
    { key: 'actions', header: 'Actions', render: (item) => (
      <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => setSelectedCase(item)}>
        <ExternalLink className="h-3 w-3 mr-1" /> View
      </Button>
    )},
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px] bg-muted/20 border-border/30">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="Waiting on User">Waiting on User</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[140px] bg-muted/20 border-border/30">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Payout">Payout</SelectItem>
            <SelectItem value="Rule Dispute">Rule Dispute</SelectItem>
            <SelectItem value="KYC">KYC</SelectItem>
            <SelectItem value="Billing">Billing</SelectItem>
            <SelectItem value="Technical">Technical</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[140px] bg-muted/20 border-border/30">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cases Table */}
      <AdminDataTable
        data={filteredCases}
        columns={columns}
        keyField="id"
        searchable
        searchPlaceholder="Search cases..."
      />

      {/* Case Detail Drawer */}
      <Sheet open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedCase && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {selectedCase.id}
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Case Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">User</p>
                    <p className="font-medium">{selectedCase.userName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Account</p>
                    <p className="font-medium">{selectedCase.accountId || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="font-medium">{selectedCase.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Priority</p>
                    {getPriorityBadge(selectedCase.priority)}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <AdminStatusBadge status={selectedCase.status} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Assigned</p>
                    <p className="font-medium">{selectedCase.assignedTo || 'Unassigned'}</p>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Subject</p>
                  <p className="font-medium">{selectedCase.subject}</p>
                </div>

                {/* Timeline */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Timeline</p>
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-3">
                      {selectedCase.timeline.map((event, i) => (
                        <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted/10 border border-border/30">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            event.type === 'user' ? 'bg-primary/20' : 'bg-muted'
                          }`}>
                            <User className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">{event.author}</span>
                              <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{event.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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
                  <Button size="sm" variant="outline">
                    <Clock className="h-3 w-3 mr-1" /> Change Status
                  </Button>
                  <Button size="sm" variant="outline">
                    <ArrowUp className="h-3 w-3 mr-1" /> Escalate to Compliance
                  </Button>
                  {selectedCase.type === 'Payout' && (
                    <Button size="sm" variant="outline" className="text-yellow-400">
                      <AlertCircle className="h-3 w-3 mr-1" /> Hold Payout
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
