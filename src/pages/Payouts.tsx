import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { DollarSign, Clock, TrendingUp, History, ArrowUpRight } from 'lucide-react';

// Mock data - would come from backend
const mockData = {
  currentBalance: 108450.00,
  withdrawableAmount: 6340.00,
  nextPayoutWindow: '3 days',
  planType: 'Dynasty Plan',
  accountSize: '$100,000',
  payoutHistory: [
    { id: 1, date: '2025-01-15', amount: 2500.00, status: 'Completed' },
    { id: 2, date: '2025-01-08', amount: 1800.00, status: 'Completed' },
    { id: 3, date: '2025-01-01', amount: 3200.00, status: 'Completed' },
    { id: 4, date: '2024-12-25', amount: 2100.00, status: 'Completed' },
  ],
};

const Payouts = () => {
  return (
    <Layout>
      <div className="page-transition py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              <span className="text-gradient">Payouts</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your withdrawals and view payout history
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-card rounded-2xl border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Current Balance</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                ${mockData.currentBalance.toLocaleString()}
              </p>
            </div>

            <div className="bg-gradient-card rounded-2xl border border-primary/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Withdrawable</span>
              </div>
              <p className="font-display text-2xl font-bold text-primary">
                ${mockData.withdrawableAmount.toLocaleString()}
              </p>
            </div>

            <div className="bg-gradient-card rounded-2xl border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-teal" />
                </div>
                <span className="text-sm text-muted-foreground">Next Payout Window</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">
                {mockData.nextPayoutWindow}
              </p>
            </div>

            <div className="bg-gradient-card rounded-2xl border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-muted-foreground">Plan / Account</span>
              </div>
              <p className="font-display text-lg font-bold text-foreground">
                {mockData.planType}
              </p>
              <p className="text-sm text-muted-foreground">{mockData.accountSize}</p>
            </div>
          </div>

          {/* Actions & History */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Request Payout */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-card rounded-2xl border border-border/50 p-6 sticky top-24">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  Request Payout
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  You can request a payout once per payout cycle. Your withdrawable balance will be transferred to your registered payment method.
                </p>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-teal text-primary-foreground font-semibold btn-glow"
                >
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  Request Payout
                </Button>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Available: ${mockData.withdrawableAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Payout History */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-card rounded-2xl border border-border/50 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <History className="w-5 h-5 text-muted-foreground" />
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Payout History
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-left py-4 px-4 text-muted-foreground font-medium text-sm">Date</th>
                        <th className="text-left py-4 px-4 text-muted-foreground font-medium text-sm">Amount</th>
                        <th className="text-left py-4 px-4 text-muted-foreground font-medium text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.payoutHistory.map((payout) => (
                        <tr key={payout.id} className="border-b border-border/20 hover:bg-muted/10 transition-colors">
                          <td className="py-4 px-4 text-foreground">{payout.date}</td>
                          <td className="py-4 px-4 text-primary font-semibold">
                            ${payout.amount.toLocaleString()}
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {payout.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {mockData.payoutHistory.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No payout history yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payouts;
