import { useState } from 'react';
import { Megaphone, Plus, Eye, Bell, AlertTriangle, Info, Edit, Power, PowerOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AdminDataTable, Column } from '../AdminDataTable';
import { AdminStatusBadge } from '../AdminStatusBadge';
import { mockAnnouncements, type MockAnnouncement } from '@/data/mockAdminData';

export function AdminAnnouncements() {
  const [createOpen, setCreateOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Banner',
    title: '',
    message: '',
    severity: 'Info',
    startTime: '',
    endTime: '',
    target: 'all',
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Info': return <Info className="h-4 w-4 text-blue-400" />;
      case 'Warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'Critical': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      Banner: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Modal: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      Notification: 'bg-primary/20 text-primary border-primary/30',
    };
    return <Badge variant="outline" className={colors[type]}>{type}</Badge>;
  };

  const columns: Column<MockAnnouncement>[] = [
    { key: 'title', header: 'Title', sortable: true },
    { key: 'type', header: 'Type', render: (item) => getTypeBadge(item.type) },
    { key: 'severity', header: 'Severity', render: (item) => (
      <div className="flex items-center gap-1">
        {getSeverityIcon(item.severity)}
        <span>{item.severity}</span>
      </div>
    )},
    { key: 'target', header: 'Target', sortable: true },
    { key: 'status', header: 'Status', render: (item) => <AdminStatusBadge status={item.status} /> },
    { key: 'startTime', header: 'Start', sortable: true },
    { key: 'endTime', header: 'End', render: (item) => item.endTime || '—' },
    { key: 'createdAt', header: 'Created', sortable: true },
    { key: 'actions', header: 'Actions', render: (item) => (
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" className="h-7 px-2">
          <Edit className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="ghost" className="h-7 px-2">
          {item.status === 'Live' ? <PowerOff className="h-3 w-3" /> : <Power className="h-3 w-3" />}
        </Button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Trader Communications</h2>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {/* Type */}
              <div className="grid grid-cols-3 gap-3">
                {['Banner', 'Modal', 'Notification'].map((type) => (
                  <Button
                    key={type}
                    variant={formData.type === type ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setFormData({ ...formData, type })}
                  >
                    {type === 'Banner' && <Megaphone className="h-4 w-4 mr-2" />}
                    {type === 'Modal' && <Eye className="h-4 w-4 mr-2" />}
                    {type === 'Notification' && <Bell className="h-4 w-4 mr-2" />}
                    {type}
                  </Button>
                ))}
              </div>

              {/* Title & Message */}
              <div>
                <label className="text-sm text-muted-foreground">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Announcement title..."
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Announcement message..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              {/* Severity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Severity</label>
                  <Select value={formData.severity} onValueChange={(v) => setFormData({ ...formData, severity: v })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Info">Info</SelectItem>
                      <SelectItem value="Warning">Warning</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Target Audience</label>
                  <Select value={formData.target} onValueChange={(v) => setFormData({ ...formData, target: v })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="standard">Standard Plan</SelectItem>
                      <SelectItem value="advanced">Advanced Plan</SelectItem>
                      <SelectItem value="dynasty">Dynasty Plan</SelectItem>
                      <SelectItem value="funded">Funded Only</SelectItem>
                      <SelectItem value="evaluation">Evaluation Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Schedule */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Start Time</label>
                  <Input
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">End Time (optional)</label>
                  <Input
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Preview */}
              {formData.title && (
                <div className="p-4 rounded-lg border border-border/30 bg-muted/10">
                  <p className="text-xs text-muted-foreground mb-2">Preview</p>
                  <div className={`p-3 rounded-lg ${
                    formData.severity === 'Critical' ? 'bg-destructive/10 border-destructive/30' :
                    formData.severity === 'Warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                    'bg-blue-500/10 border-blue-500/30'
                  } border`}>
                    <div className="flex items-center gap-2 mb-1">
                      {getSeverityIcon(formData.severity)}
                      <span className="font-medium">{formData.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{formData.message}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
                <Button onClick={() => setCreateOpen(false)}>Publish</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Announcements Table */}
      <AdminDataTable
        data={mockAnnouncements}
        columns={columns}
        keyField="id"
        searchable
        searchPlaceholder="Search announcements..."
      />
    </div>
  );
}
