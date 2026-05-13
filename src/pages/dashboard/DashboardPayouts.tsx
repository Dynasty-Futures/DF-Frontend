import {
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  Globe,
  CircleDollarSign,
  Info,
  CircleOff,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ScrollReveal from "@/components/ui/ScrollReveal";

// Future integration: populate these from API response for the authenticated trader
const eligibleAccounts: {
  id: string;
  account: string;
  balance: string;
  eligible: string;
}[] = [];

const payoutHistory: {
  id: string;
  date: string;
  amount: string;
  method: string;
  status: string;
}[] = [];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle size={16} className="text-primary" />;
    case "Processing":
      return <Clock size={16} className="text-yellow-500" />;
    case "Failed":
      return <XCircle size={16} className="text-destructive" />;
    default:
      return null;
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-primary/20 text-primary border-primary/30";
    case "Processing":
      return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    case "Failed":
      return "bg-destructive/20 text-destructive border-destructive/30";
    default:
      return "";
  }
};

const getMethodIcon = (method: string) => {
  switch (method) {
    case "Rise Works":
      return <Globe size={16} className="text-gold-dark" />;
    default:
      return <CircleDollarSign size={16} className="text-muted-foreground" />;
  }
};

const DashboardPayouts = () => {
  return (
    <div className="space-y-8 pt-16 lg:pt-0">
      {/* Header */}
      <ScrollReveal>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Payouts</h1>
            <p className="text-muted-foreground mt-1">
              Request and track your payouts
            </p>
          </div>
          <Link
            to="/rules#plan-rules"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
          >
            View Full Payout Rules
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </ScrollReveal>

      {/* Quick Reference Card */}
      <ScrollReveal delay={150}>
        <div className="rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Info size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Payout Quick Reference
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Processing</p>
                <p className="text-sm font-medium text-foreground">
                  1-10 business days
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-dark/10 flex items-center justify-center flex-shrink-0">
                <Clock size={16} className="text-gold-dark" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Cutoff Time</p>
                <p className="text-sm font-medium text-foreground">
                  2:00 PM CT
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 col-span-2">
              <div className="w-8 h-8 rounded-lg bg-gold-light/10 flex items-center justify-center flex-shrink-0">
                <Globe size={16} className="text-gold-light" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Payment Method</p>
                <p className="text-sm font-medium text-foreground">
                  Payments processed through Rise Works
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={300} className="space-y-8">
        {/* Eligible Accounts */}
        <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-hidden">
          <div className="p-6 border-b border-border/30 flex items-center gap-3">
            <div className="w-1 h-6 bg-primary rounded-full" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Eligible for Payout
              </h3>
              <p className="text-sm text-muted-foreground">
                Accounts ready for withdrawal
              </p>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium py-5">
                  Account
                </TableHead>
                <TableHead className="text-muted-foreground font-medium py-5">
                  Balance
                </TableHead>
                <TableHead className="text-muted-foreground font-medium py-5">
                  Eligible Amount
                </TableHead>
                <TableHead className="text-muted-foreground font-medium py-5 text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eligibleAccounts.length === 0 ? (
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableCell colSpan={4} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center">
                        <CircleOff size={20} className="text-muted-foreground/50" />
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        No funded accounts are currently eligible for payout.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Eligible funded accounts will appear here once payout requirements are met.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                eligibleAccounts.map((account, index) => (
                  <TableRow
                    key={account.id}
                    className={`border-border/30 hover:bg-muted/20 transition-colors ${
                      index % 2 === 0 ? "bg-transparent" : "bg-muted/5"
                    }`}
                  >
                    <TableCell className="font-medium text-foreground py-6">
                      {account.account}
                    </TableCell>
                    <TableCell className="text-foreground py-6">
                      {account.balance}
                    </TableCell>
                    <TableCell className="py-6">
                      <span className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-bold border border-primary/20">
                        {account.eligible}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-6">
                      {/* Request Payout button — rendered when account data is live */}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Rise Works Info */}
        <div className="rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info size={16} className="text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Payouts at Dynasty Futures are processed through Rise Works, a third-party payment provider. Rise handles payment processing, compliance, and verification to ensure all payouts are secure and accurate.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info size={16} className="text-primary" />
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>To receive a payout, traders may be required to complete identity and payment verification through Rise Works. This process helps protect both the trader and the platform.</p>
              <p>Payouts are not arbitrarily denied. As long as your information is accurate and verification is completed successfully, your payout will be processed. Issues only arise in cases of incomplete verification or fraudulent information.</p>
            </div>
          </div>
        </div>

        {/* Payout History */}
        <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-hidden">
          <div className="p-6 border-b border-border/30 flex items-center gap-3">
            <div className="w-1 h-6 bg-gold-dark rounded-full" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Payout History
              </h3>
              <p className="text-sm text-muted-foreground">
                Track your previous withdrawals
              </p>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium py-5">
                  Request Date
                </TableHead>
                <TableHead className="text-muted-foreground font-medium py-5">
                  Amount
                </TableHead>
                <TableHead className="text-muted-foreground font-medium py-5">
                  Method
                </TableHead>
                <TableHead className="text-muted-foreground font-medium py-5">
                  Status
                </TableHead>
                <TableHead className="text-muted-foreground font-medium py-5 text-right">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payoutHistory.length === 0 ? (
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableCell colSpan={5} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center">
                        <CircleOff size={20} className="text-muted-foreground/50" />
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        No payout history available.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Completed payout requests will appear here.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                payoutHistory.map((payout, index) => (
                  <TableRow
                    key={payout.id}
                    className={`border-border/30 hover:bg-muted/20 transition-colors ${
                      index % 2 === 0 ? "bg-transparent" : "bg-muted/5"
                    }`}
                  >
                    <TableCell className="font-medium text-foreground py-5">
                      {payout.date}
                    </TableCell>
                    <TableCell className="font-bold text-foreground py-5">
                      {payout.amount}
                    </TableCell>
                    <TableCell className="py-5">
                      <div className="flex items-center gap-2 text-foreground">
                        {getMethodIcon(payout.method)}
                        {payout.method}
                      </div>
                    </TableCell>
                    <TableCell className="py-5">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyle(payout.status)}`}
                      >
                        {getStatusIcon(payout.status)}
                        {payout.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-5">
                      {/* View button — rendered when payout data is live */}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default DashboardPayouts;
