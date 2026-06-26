import { Receipt, FileText, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useTradingAccounts } from "@/hooks/useTrading";
import { Link } from "react-router-dom";
import type { TradingAccount, AccountStatus } from "@/types/trading";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const formatCurrency = (value: string | number | null | undefined): string => {
  if (value == null) return "—";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const getAmountPaid = (account: TradingAccount): string => {
  const paid = account.challenges?.[0]?.amountPaid;
  return formatCurrency(paid ?? account.accountType.price);
};

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<
  AccountStatus,
  { label: string; className: string }
> = {
  EVALUATION: {
    label: "In Evaluation",
    className:
      "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20",
  },
  PHASE_2: {
    label: "Phase 2",
    className: "text-blue-400 bg-blue-400/10 border border-blue-400/20",
  },
  PASSED: {
    label: "Passed",
    className: "text-blue-400 bg-blue-400/10 border border-blue-400/20",
  },
  FUNDED: {
    label: "Funded",
    className: "text-green-400 bg-green-400/10 border border-green-400/20",
  },
  SUSPENDED: {
    label: "Suspended",
    className:
      "text-orange-400 bg-orange-400/10 border border-orange-400/20",
  },
  FAILED: {
    label: "Failed",
    className:
      "text-destructive bg-destructive/10 border border-destructive/20",
  },
  CLOSED: {
    label: "Closed",
    className:
      "text-muted-foreground bg-muted/30 border border-border/30",
  },
};

const StatusBadge = ({ status }: { status: AccountStatus }) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.CLOSED;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Active account card
// ---------------------------------------------------------------------------

const AccountCard = ({ account }: { account: TradingAccount }) => (
  <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-muted/30 border border-border/30">
            <Receipt size={20} className="text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {account.accountType.displayName}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(account.accountType.accountSize)} account &middot; purchased{" "}
              {formatDate(account.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Amount paid </span>
            <span className="font-semibold text-foreground">
              {getAmountPaid(account)}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Profit split </span>
            <span className="font-semibold text-foreground">
              {account.accountType.profitSplit}%
            </span>
          </div>
        </div>
      </div>
      <StatusBadge status={account.status} />
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const DashboardBilling = () => {
  const { data, isLoading, isError } = useTradingAccounts();
  const accounts = data?.data ?? [];
  const activeAccounts = accounts.filter(
    (a) => a.status !== "FAILED" && a.status !== "CLOSED"
  );

  return (
    <div className="space-y-10 pt-16 lg:pt-0">
      {/* Header */}
      <ScrollReveal>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Billing</h1>
          <p className="text-muted-foreground mt-1">
            Your purchased accounts and payment history
          </p>
        </div>
      </ScrollReveal>

      {/* Active Accounts */}
      <ScrollReveal delay={150}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Active Accounts
            </h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/pricing">
                <ExternalLink size={14} className="mr-2" />
                Buy New Challenge
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-muted-foreground gap-2">
              <Loader2 size={18} className="animate-spin" />
              <span>Loading accounts…</span>
            </div>
          ) : isError ? (
            <div className="py-12 text-center text-muted-foreground">
              Could not load account data. Try refreshing.
            </div>
          ) : activeAccounts.length > 0 ? (
            <div className="space-y-3">
              {activeAccounts.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
            </div>
          ) : (
            <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-2xl bg-muted/30 border border-border/30">
                  <Receipt size={28} className="text-muted-foreground" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  No active accounts
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Purchase a challenge to get started.
                </p>
              </div>
              <Button asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          )}
        </div>
      </ScrollReveal>

      {/* Billing History */}
      <ScrollReveal delay={300}>
        <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-hidden">
          <div className="p-6 border-b border-border/30">
            <h2 className="text-lg font-semibold text-foreground">
              Billing History
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              All account purchases
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium py-4">
                  Date
                </TableHead>
                <TableHead className="text-muted-foreground font-medium py-4">
                  Plan
                </TableHead>
                <TableHead className="text-muted-foreground font-medium py-4">
                  Amount
                </TableHead>
                <TableHead className="text-muted-foreground font-medium py-4">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableCell colSpan={4} className="py-12 text-center">
                    <Loader2
                      size={18}
                      className="animate-spin text-muted-foreground mx-auto"
                    />
                  </TableCell>
                </TableRow>
              ) : accounts.length > 0 ? (
                accounts.map((account) => (
                  <TableRow
                    key={account.id}
                    className="border-border/30 hover:bg-muted/10"
                  >
                    <TableCell className="py-4 text-muted-foreground">
                      {formatDate(account.createdAt)}
                    </TableCell>
                    <TableCell className="py-4 font-medium text-foreground">
                      {account.accountType.displayName}
                    </TableCell>
                    <TableCell className="py-4 font-semibold text-foreground">
                      {getAmountPaid(account)}
                    </TableCell>
                    <TableCell className="py-4">
                      <StatusBadge status={account.status} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableCell colSpan={4} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 rounded-2xl bg-muted/20 border border-border/20">
                        <FileText
                          size={28}
                          className="text-muted-foreground/40"
                        />
                      </div>
                      <p className="text-muted-foreground font-medium">
                        No purchases yet
                      </p>
                      <p className="text-sm text-muted-foreground/60 max-w-xs">
                        Transactions will appear here after your first
                        purchase.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default DashboardBilling;
