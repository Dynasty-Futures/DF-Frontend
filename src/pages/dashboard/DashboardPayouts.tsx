import { ArrowRight, Clock, CheckCircle, XCircle, Landmark, Globe, CircleDollarSign, ArrowUpRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const eligibleAccounts = [
  { id: '1', account: '100K Standard', balance: '$104,800', eligible: '$4,800' },
  { id: '2', account: '150K Dynasty', balance: '$158,500', eligible: '$8,500' },
];

const payoutHistory = [
  { id: '1', date: '2025-01-28', amount: '$3,500', method: 'Wise Transfer', status: 'Completed' },
  { id: '2', date: '2025-01-15', amount: '$2,200', method: 'Bank Transfer', status: 'Completed' },
  { id: '3', date: '2025-02-05', amount: '$4,800', method: 'Wise Transfer', status: 'Processing' },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Completed':
      return <CheckCircle size={16} className="text-primary" />;
    case 'Processing':
      return <Clock size={16} className="text-yellow-500" />;
    case 'Failed':
      return <XCircle size={16} className="text-destructive" />;
    default:
      return null;
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-primary/20 text-primary border-primary/30';
    case 'Processing':
      return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
    case 'Failed':
      return 'bg-destructive/20 text-destructive border-destructive/30';
    default:
      return '';
  }
};

const getMethodIcon = (method: string) => {
  switch (method) {
    case 'Wise Transfer':
      return <Globe size={16} className="text-teal" />;
    case 'Bank Transfer':
      return <Landmark size={16} className="text-soft-blue" />;
    default:
      return <CircleDollarSign size={16} className="text-muted-foreground" />;
  }
};

const DashboardPayouts = () => {
  return (
    <div className="space-y-8 pt-16 lg:pt-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payouts</h1>
          <p className="text-muted-foreground mt-1">Request and track your payouts</p>
        </div>
        <Link 
          to="/rules#plan-rules" 
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          View Full Payout Rules
          <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* Quick Reference Card */}
      <div className="rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Payout Quick Reference</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Processing</p>
              <p className="text-sm font-medium text-foreground">1-10 business days</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
              <Clock size={16} className="text-teal" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cutoff Time</p>
              <p className="text-sm font-medium text-foreground">2:00 PM CT</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-soft-blue/10 flex items-center justify-center flex-shrink-0">
              <Globe size={16} className="text-soft-blue" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Wise Transfer</p>
              <p className="text-sm font-medium text-foreground">Same day - 2 days</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-muted/20 flex items-center justify-center flex-shrink-0">
              <Landmark size={16} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Bank Transfer</p>
              <p className="text-sm font-medium text-foreground">1-3 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Eligible Accounts */}
      <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-hidden">
        <div className="p-6 border-b border-border/30 flex items-center gap-3">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Eligible for Payout</h3>
            <p className="text-sm text-muted-foreground">Accounts ready for withdrawal</p>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium py-5">Account</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5">Balance</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5">Eligible Amount</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eligibleAccounts.map((account, index) => (
              <TableRow 
                key={account.id} 
                className={`border-border/30 hover:bg-muted/20 transition-colors ${
                  index % 2 === 0 ? 'bg-transparent' : 'bg-muted/5'
                }`}
              >
                <TableCell className="font-medium text-foreground py-6">{account.account}</TableCell>
                <TableCell className="text-foreground py-6">{account.balance}</TableCell>
                <TableCell className="py-6">
                  <span className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-bold border border-primary/20">
                    {account.eligible}
                  </span>
                </TableCell>
                <TableCell className="text-right py-6">
                  <Button className="btn-gradient-animated text-primary-foreground">
                    Request Payout
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Payout History */}
      <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-hidden">
        <div className="p-6 border-b border-border/30 flex items-center gap-3">
          <div className="w-1 h-6 bg-teal rounded-full" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Payout History</h3>
            <p className="text-sm text-muted-foreground">Track your previous withdrawals</p>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium py-5">Request Date</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5">Amount</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5">Method</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5">Status</TableHead>
              <TableHead className="text-muted-foreground font-medium py-5 text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payoutHistory.map((payout, index) => (
              <TableRow 
                key={payout.id} 
                className={`border-border/30 hover:bg-muted/20 transition-colors ${
                  index % 2 === 0 ? 'bg-transparent' : 'bg-muted/5'
                }`}
              >
                <TableCell className="font-medium text-foreground py-5">{payout.date}</TableCell>
                <TableCell className="font-bold text-foreground py-5">{payout.amount}</TableCell>
                <TableCell className="py-5">
                  <div className="flex items-center gap-2 text-foreground">
                    {getMethodIcon(payout.method)}
                    {payout.method}
                  </div>
                </TableCell>
                <TableCell className="py-5">
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyle(payout.status)}`}>
                    {getStatusIcon(payout.status)}
                    {payout.status}
                  </span>
                </TableCell>
                <TableCell className="text-right py-5">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                  >
                    View
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

export default DashboardPayouts;
