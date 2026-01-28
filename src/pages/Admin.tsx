import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, CheckCircle, XCircle, UserCog, DollarSign } from 'lucide-react';

// Mock data - would come from backend
const mockUsers = [
  { id: 'DF-001', name: 'John Smith', email: 'john@example.com', planType: 'Dynasty', accountSize: '$100,000', status: 'Active' },
  { id: 'DF-002', name: 'Sarah Johnson', email: 'sarah@example.com', planType: 'Advanced', accountSize: '$50,000', status: 'Pending' },
  { id: 'DF-003', name: 'Mike Davis', email: 'mike@example.com', planType: 'Standard', accountSize: '$25,000', status: 'Under Review' },
  { id: 'DF-004', name: 'Emily Brown', email: 'emily@example.com', planType: 'Dynasty', accountSize: '$150,000', status: 'Active' },
  { id: 'DF-005', name: 'Chris Wilson', email: 'chris@example.com', planType: 'Standard', accountSize: '$100,000', status: 'Violated' },
  { id: 'DF-006', name: 'Amanda Lee', email: 'amanda@example.com', planType: 'Advanced', accountSize: '$50,000', status: 'Active' },
];

const statusColors: Record<string, string> = {
  Active: 'bg-primary/10 text-primary',
  Pending: 'bg-yellow-500/10 text-yellow-500',
  'Under Review': 'bg-soft-blue/10 text-soft-blue',
  Violated: 'bg-destructive/10 text-destructive',
};

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="page-transition py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <UserCog className="w-5 h-5 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">
                Dynasty <span className="text-gradient">Admin Panel</span>
              </h1>
            </div>
            <p className="text-muted-foreground">
              Manage trader accounts, payouts, and assignments
            </p>
          </div>

          {/* Filters */}
          <div className="bg-gradient-card rounded-2xl border border-border/50 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-muted/30 border-border/50"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 bg-muted/30 border-border/50">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Violated">Violated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-gradient-card rounded-2xl border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30 bg-muted/20">
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium text-sm">User ID</th>
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium text-sm">Name</th>
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium text-sm">Email</th>
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium text-sm">Plan</th>
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium text-sm">Account</th>
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium text-sm">Status</th>
                    <th className="text-left py-4 px-6 text-muted-foreground font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border/20 hover:bg-muted/10 transition-colors">
                      <td className="py-4 px-6 text-foreground font-mono text-sm">{user.id}</td>
                      <td className="py-4 px-6 text-foreground font-medium">{user.name}</td>
                      <td className="py-4 px-6 text-muted-foreground">{user.email}</td>
                      <td className="py-4 px-6 text-foreground">{user.planType}</td>
                      <td className="py-4 px-6 text-foreground">{user.accountSize}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2 text-primary hover:text-primary hover:bg-primary/10"
                            title="Approve Payout"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                            title="Deny Payout"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2 text-teal hover:text-teal hover:bg-teal/10"
                            title="Assign Account"
                          >
                            <UserCog className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 px-2 text-soft-blue hover:text-soft-blue hover:bg-soft-blue/10"
                            title="Mark as Funded"
                          >
                            <DollarSign className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No users found matching your criteria</p>
              </div>
            )}
          </div>

          {/* Footer note */}
          <p className="text-xs text-muted-foreground mt-6 text-center">
            This admin panel is for internal use only. Actions will be connected to the backend system.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
