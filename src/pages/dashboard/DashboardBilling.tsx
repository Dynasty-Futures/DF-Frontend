import { Receipt, Calendar, CheckCircle, Download, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const billingHistory = [
  { id: '1', date: '2025-02-01', amount: '$99.00', type: 'Subscription', status: 'Paid' },
  { id: '2', date: '2025-01-01', amount: '$99.00', type: 'Subscription', status: 'Paid' },
  { id: '3', date: '2024-12-15', amount: '$65.00', type: 'Funded Reset', status: 'Paid' },
  { id: '4', date: '2024-12-01', amount: '$99.00', type: 'Subscription', status: 'Paid' },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Subscription':
      return <Calendar size={14} className="text-primary" />;
    case 'Funded Reset':
      return <AlertCircle size={14} className="text-yellow-500" />;
    default:
      return <Receipt size={14} className="text-muted-foreground" />;
  }
};

const DashboardBilling = () => {
  return (
    <div className="space-y-10 pt-16 lg:pt-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Billing</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription and payments</p>
      </div>

      {/* Billing Summary Card */}
      <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 relative overflow-hidden">
        {/* Subtle gradient border glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-teal/5 pointer-events-none" />
        
        <div className="relative flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8">
          <div className="space-y-6 flex-1">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <Receipt size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">100K Standard Plan</h3>
                <p className="text-muted-foreground">Monthly Subscription</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-2xl font-bold text-foreground">$99<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-primary/20 text-primary border border-primary/30">
                    <CheckCircle size={14} />
                    Active
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Next Billing</p>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-muted-foreground" />
                  <span className="font-semibold text-foreground">Mar 1, 2025</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <div className="flex items-center gap-2">
                  <CreditCard size={18} className="text-muted-foreground" />
                  <span className="font-semibold text-foreground">•••• 4242</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 xl:min-w-[200px]">
            <Button variant="outline" className="border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all">
              Update Payment Method
            </Button>
            <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 transition-all">
              Cancel Subscription
            </Button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-hidden">
        <div className="p-6 border-b border-border/30">
          <h3 className="text-lg font-semibold text-foreground">Billing History</h3>
          <p className="text-sm text-muted-foreground mt-1">View your past transactions</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium py-5">Date</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5">Amount</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5">Type</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5">Status</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5 text-right">Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billingHistory.map((item, index) => (
              <TableRow 
                key={item.id} 
                className={`border-border/30 hover:bg-muted/20 transition-colors ${
                  index % 2 === 0 ? 'bg-transparent' : 'bg-muted/5'
                }`}
              >
                <TableCell className="font-medium text-foreground py-5">{item.date}</TableCell>
                <TableCell className="text-foreground font-semibold py-5">{item.amount}</TableCell>
                <TableCell className="py-5">
                  <div className="flex items-center gap-2 text-foreground">
                    {getTypeIcon(item.type)}
                    {item.type}
                  </div>
                </TableCell>
                <TableCell className="py-5">
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-right py-5">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                  >
                    <Download size={14} className="mr-2" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DashboardBilling;
