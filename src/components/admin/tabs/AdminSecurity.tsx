import { useState } from 'react';
import { Shield, Users, Lock, Globe, LogOut, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { AdminDataTable, Column } from '../AdminDataTable';
import { mockRoles, mockAdminSessions, type MockRole, type MockAdminSession } from '@/data/mockAdminData';

const permissions = [
  'View Users',
  'Manage Accounts',
  'Approve Payouts',
  'Hold Payouts',
  'Edit Rules',
  'View Audit Logs',
  'Manage Billing',
  'Manage Integrations',
];

export function AdminSecurity() {
  const [activeTab, setActiveTab] = useState('roles');
  const [roles, setRoles] = useState(mockRoles);
  const [securitySettings, setSecuritySettings] = useState({
    require2FA: true,
    sessionTimeout: 30,
    ipAllowlist: '',
  });

  const togglePermission = (roleId: string, permission: string) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const perms = role.permissions.includes(permission)
          ? role.permissions.filter(p => p !== permission)
          : [...role.permissions, permission];
        return { ...role, permissions: perms };
      }
      return role;
    }));
  };

  const sessionColumns: Column<MockAdminSession>[] = [
    { key: 'adminUser', header: 'Admin User', sortable: true },
    { key: 'role', header: 'Role', render: (item) => (
      <Badge variant="outline" className="bg-muted/20">{item.role}</Badge>
    )},
    { key: 'loginTime', header: 'Login Time', sortable: true },
    { key: 'ip', header: 'IP Address' },
    { key: 'device', header: 'Device' },
    { key: 'lastActive', header: 'Last Active', sortable: true },
    { key: 'status', header: 'Status', render: (item) => (
      <Badge variant="outline" className={item.status === 'Active' ? 'bg-primary/20 text-primary border-primary/30' : 'bg-muted/20'}>
        {item.status}
      </Badge>
    )},
    { key: 'actions', header: 'Actions', render: (item) => (
      item.status === 'Active' && (
        <Button size="sm" variant="ghost" className="h-7 px-2 text-destructive">
          <LogOut className="h-3 w-3 mr-1" /> Force Logout
        </Button>
      )
    )},
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/20 border border-border/30">
          <TabsTrigger value="roles">Role Matrix</TabsTrigger>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
          <TabsTrigger value="sessions">Session Log</TabsTrigger>
        </TabsList>

        {/* Role Matrix */}
        <TabsContent value="roles" className="mt-4">
          <div className="rounded-2xl border border-border/30 bg-gradient-card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Permission Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Permission</th>
                    {roles.map(role => (
                      <th key={role.id} className="text-center p-3 text-sm font-medium">
                        <Badge variant="outline" className="bg-muted/20">{role.name}</Badge>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permissions.map(permission => (
                    <tr key={permission} className="border-b border-border/30 hover:bg-muted/10">
                      <td className="p-3 text-sm">{permission}</td>
                      {roles.map(role => (
                        <td key={role.id} className="text-center p-3">
                          <Checkbox
                            checked={role.permissions.includes(permission)}
                            onCheckedChange={() => togglePermission(role.id, permission)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="mt-4">
          <div className="rounded-2xl border border-border/30 bg-gradient-card p-6 space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Security Settings
            </h3>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/30">
              <div>
                <p className="font-medium">Require 2FA for Admins</p>
                <p className="text-sm text-muted-foreground">All admin users must have two-factor authentication enabled</p>
              </div>
              <Switch
                checked={securitySettings.require2FA}
                onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, require2FA: checked })}
              />
            </div>

            <div className="p-4 rounded-lg bg-muted/10 border border-border/30">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium">Session Timeout</p>
                  <p className="text-sm text-muted-foreground">Automatically log out after inactivity (minutes)</p>
                </div>
              </div>
              <Input
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })}
                className="w-32"
              />
            </div>

            <div className="p-4 rounded-lg bg-muted/10 border border-border/30">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-4 w-4" />
                <div>
                  <p className="font-medium">IP Allowlist</p>
                  <p className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses (comma-separated)</p>
                </div>
              </div>
              <Input
                placeholder="e.g., 192.168.1.1, 10.0.0.0/24"
                value={securitySettings.ipAllowlist}
                onChange={(e) => setSecuritySettings({ ...securitySettings, ipAllowlist: e.target.value })}
              />
            </div>

            <div className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Session Log */}
        <TabsContent value="sessions" className="mt-4">
          <AdminDataTable
            data={mockAdminSessions}
            columns={sessionColumns}
            keyField="id"
            searchable
            searchPlaceholder="Search sessions..."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
