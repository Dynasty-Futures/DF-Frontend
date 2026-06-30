import { useState } from "react";
import {
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  Globe,
  CircleDollarSign,
  Info,
  CircleOff,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  useEligibleAccounts,
  usePayoutHistory,
  useRequestPayout,
} from "@/hooks/usePayouts";
import type { EligibleAccount, Payout, PayoutStatus } from "@/services/payouts";

const formatCurrency = (value: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);

const statusLabel: Record<PayoutStatus, string> = {
  PENDING: "Pending",
  APPROVED: "Approved",
  PROCESSING: "Processing",
  COMPLETED: "Completed",
  REJECTED: "Rejected",
  FAILED: "Failed",
};

const getStatusIcon = (status: PayoutStatus) => {
  switch (status) {
    case "COMPLETED":
    case "APPROVED":
      return <CheckCircle size={16} className="text-primary" />;
    case "PROCESSING":
    case "PENDING":
      return <Clock size={16} className="text-yellow-500" />;
    case "REJECTED":
    case "FAILED":
      return <XCircle size={16} className="text-destructive" />;
    default:
      return null;
  }
};

const getStatusStyle = (status: PayoutStatus) => {
  switch (status) {
    case "COMPLETED":
    case "APPROVED":
      return "bg-primary/20 text-primary border-primary/30";
    case "PROCESSING":
    case "PENDING":
      return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    case "REJECTED":
    case "FAILED":
      return "bg-destructive/20 text-destructive border-destructive/30";
    default:
      return "";
  }
};

// =============================================================================
// Request Payout Modal
// =============================================================================

interface PayoutModalProps {
  account: EligibleAccount | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PayoutRequestModal = ({ account, open, onOpenChange }: PayoutModalProps) => {
  const [amount, setAmount] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [swiftBic, setSwiftBic] = useState("");

  const requestPayout = useRequestPayout({
    onSuccess: () => {
      toast.success("Payout request submitted for review.");
      onOpenChange(false);
      setAmount("");
      setAccountHolder("");
      setAccountNumber("");
      setSwiftBic("");
    },
    onError: (err) => {
      toast.error(err.message || "Could not submit payout request.");
    },
  });

  if (!account) return null;

  const minAmount = account.minAmount ?? 0;
  const maxAmount = account.maxAmount ?? account.availableProfit;
  const numericAmount = Number(amount);
  const amountValid =
    Number.isFinite(numericAmount) &&
    numericAmount > 0 &&
    numericAmount >= minAmount &&
    numericAmount <= maxAmount;
  const detailsValid =
    accountHolder.trim() !== "" &&
    accountNumber.trim() !== "" &&
    swiftBic.trim() !== "";
  const canSubmit =
    account.eligible && amountValid && detailsValid && !requestPayout.isPending;

  // Net after the profit split (YPF keeps the rest). 0/undefined split = no split.
  const split = account.profitSplit ?? 0;
  const netAmount =
    amountValid && split > 0 ? (numericAmount * split) / 100 : numericAmount;

  // Rules the engine actually enforced — the meaningful checklist for the trader.
  const enforcedRules = account.rules?.filter((r) => r.enforced) ?? [];

  const handleSubmit = () => {
    if (!canSubmit) return;
    requestPayout.mutate({
      accountId: account.accountId,
      amount: numericAmount,
      payoutDetails: {
        accountHolder: accountHolder.trim(),
        accountNumber: accountNumber.trim(),
        swiftBic: swiftBic.trim().toUpperCase(),
        currency: account.currency,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Payout</DialogTitle>
          <DialogDescription>
            {account.accountName} — up to{" "}
            {formatCurrency(account.availableProfit, account.currency)} available.
            Payments are processed through Rise after Dynasty Futures approval.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Eligibility checklist */}
          {enforcedRules.length > 0 && (
            <div className="rounded-lg border border-border/40 bg-muted/10 p-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">
                Payout requirements
              </p>
              <ul className="space-y-1.5">
                {enforcedRules.map((rule) => (
                  <li
                    key={rule.key}
                    className="flex items-center gap-2 text-xs"
                  >
                    {rule.passed ? (
                      <CheckCircle
                        size={14}
                        className="text-primary flex-shrink-0"
                      />
                    ) : (
                      <XCircle
                        size={14}
                        className="text-destructive flex-shrink-0"
                      />
                    )}
                    <span
                      className={
                        rule.passed
                          ? "text-muted-foreground"
                          : "text-foreground"
                      }
                    >
                      {rule.label}
                      {rule.required !== undefined &&
                        rule.current !== undefined &&
                        ` (${rule.current}/${rule.required})`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Blocked banner */}
          {!account.eligible && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3">
              <AlertCircle
                size={16}
                className="text-destructive flex-shrink-0 mt-0.5"
              />
              <p className="text-xs text-destructive">
                {account.blockingReason ??
                  "This account is not eligible for a payout right now."}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ({account.currency})</Label>
            <Input
              id="amount"
              type="number"
              min={minAmount}
              max={maxAmount}
              step="0.01"
              placeholder="0.00"
              value={amount}
              disabled={!account.eligible}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {minAmount > 0
                ? `Between ${formatCurrency(minAmount, account.currency)} and ${formatCurrency(maxAmount, account.currency)}.`
                : `Up to ${formatCurrency(maxAmount, account.currency)} available.`}
            </p>
            {amount !== "" && !amountValid && (
              <p className="text-xs text-destructive">
                {minAmount > 0
                  ? `Enter an amount between ${formatCurrency(minAmount, account.currency)} and ${formatCurrency(maxAmount, account.currency)}.`
                  : `Enter an amount between $0 and ${formatCurrency(maxAmount, account.currency)}.`}
              </p>
            )}
            {amountValid && split > 0 && (
              <p className="text-xs text-muted-foreground">
                After your {split}% profit split, you'll receive approximately{" "}
                <span className="font-semibold text-foreground">
                  {formatCurrency(netAmount, account.currency)}
                </span>
                .
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountHolder">Account Holder Name</Label>
            <Input
              id="accountHolder"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Full name on the bank account"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number / IBAN</Label>
            <Input
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Bank account number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="swiftBic">SWIFT / BIC</Label>
            <Input
              id="swiftBic"
              value={swiftBic}
              onChange={(e) => setSwiftBic(e.target.value)}
              placeholder="e.g. CHASUS33"
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Your bank details are forwarded securely to Rise for processing and are
            not stored by Dynasty Futures.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            {requestPayout.isPending && (
              <Loader2 size={16} className="mr-2 animate-spin" />
            )}
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// =============================================================================
// Page
// =============================================================================

const DashboardPayouts = () => {
  const eligibleQ = useEligibleAccounts();
  const historyQ = usePayoutHistory();

  const eligibleAccounts = eligibleQ.data?.data ?? [];
  const payoutHistory = historyQ.data?.data ?? [];

  const [selectedAccount, setSelectedAccount] = useState<EligibleAccount | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (account: EligibleAccount) => {
    setSelectedAccount(account);
    setModalOpen(true);
  };

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
                <p className="text-sm font-medium text-foreground">2:00 PM CT</p>
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
                Funded accounts with withdrawable profit
              </p>
            </div>
          </div>
          {eligibleQ.isLoading ? (
            <div className="py-12 text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="animate-spin" size={18} /> Loading accounts…
              </div>
            </div>
          ) : eligibleQ.isError ? (
            <div className="py-12 text-center">
              <div className="flex flex-col items-center gap-2 text-destructive">
                <AlertCircle size={20} />
                <p className="text-sm">
                  {eligibleQ.error?.message ??
                    "Failed to load eligible accounts."}
                </p>
              </div>
            </div>
          ) : eligibleAccounts.length === 0 ? (
            <div className="py-12 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center">
                  <CircleOff size={20} className="text-muted-foreground/50" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  No funded accounts are currently eligible for payout.
                </p>
                <p className="text-xs text-muted-foreground">
                  Eligible funded accounts will appear here once payout
                  requirements are met.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Mobile: stacked cards (no horizontal scroll) */}
              <div className="md:hidden p-4 space-y-3">
                {eligibleAccounts.map((account) => (
                  <div
                    key={account.accountId}
                    className="rounded-xl bg-muted/10 border border-border/30 p-4 space-y-3"
                  >
                    <p className="font-medium text-foreground">
                      {account.accountName}
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Balance
                        </p>
                        <p className="text-foreground">
                          {formatCurrency(
                            account.currentBalance,
                            account.currency,
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Available Profit
                        </p>
                        <p className="text-primary font-bold">
                          {formatCurrency(
                            account.availableProfit,
                            account.currency,
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="pt-1">
                      {account.hasPendingPayout ? (
                        <span className="text-xs text-muted-foreground">
                          Request in progress
                        </span>
                      ) : account.eligible ? (
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => openModal(account)}
                        >
                          Request Payout
                        </Button>
                      ) : (
                        <div className="space-y-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                            onClick={() => openModal(account)}
                          >
                            View Requirements
                          </Button>
                          {account.blockingReason && (
                            <span className="block text-[11px] text-muted-foreground">
                              {account.blockingReason}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* md+: full table */}
              <div className="hidden md:block">
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
                        Available Profit
                      </TableHead>
                      <TableHead className="text-muted-foreground font-medium py-5 text-right">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eligibleAccounts.map((account, index) => (
                      <TableRow
                        key={account.accountId}
                        className={`border-border/30 hover:bg-muted/20 transition-colors ${
                          index % 2 === 0 ? "bg-transparent" : "bg-muted/5"
                        }`}
                      >
                        <TableCell className="font-medium text-foreground py-6">
                          {account.accountName}
                        </TableCell>
                        <TableCell className="text-foreground py-6">
                          {formatCurrency(
                            account.currentBalance,
                            account.currency,
                          )}
                        </TableCell>
                        <TableCell className="py-6">
                          <span className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-bold border border-primary/20">
                            {formatCurrency(
                              account.availableProfit,
                              account.currency,
                            )}
                          </span>
                        </TableCell>
                        <TableCell className="text-right py-6">
                          {account.hasPendingPayout ? (
                            <span className="text-xs text-muted-foreground">
                              Request in progress
                            </span>
                          ) : account.eligible ? (
                            <Button size="sm" onClick={() => openModal(account)}>
                              Request Payout
                            </Button>
                          ) : (
                            <div className="flex flex-col items-end gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openModal(account)}
                              >
                                View Requirements
                              </Button>
                              {account.blockingReason && (
                                <span className="text-[11px] text-muted-foreground max-w-[180px] text-right">
                                  {account.blockingReason}
                                </span>
                              )}
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>

        {/* Rise Works Info */}
        <div className="rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info size={16} className="text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Payouts at Dynasty Futures are processed through Rise Works, a
              third-party payment provider. Rise handles payment processing,
              compliance, and verification to ensure all payouts are secure and
              accurate.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info size={16} className="text-primary" />
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                To receive a payout, traders may be required to complete identity
                and payment verification through Rise Works. This process helps
                protect both the trader and the platform.
              </p>
              <p>
                Payouts are not arbitrarily denied. As long as your information is
                accurate and verification is completed successfully, your payout
                will be processed. Issues only arise in cases of incomplete
                verification or fraudulent information.
              </p>
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
          {historyQ.isLoading ? (
            <div className="py-12 text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="animate-spin" size={18} /> Loading history…
              </div>
            </div>
          ) : payoutHistory.length === 0 ? (
            <div className="py-12 text-center">
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
            </div>
          ) : (
            <>
              {/* Mobile: stacked cards (no horizontal scroll) */}
              <div className="md:hidden p-4 space-y-3">
                {payoutHistory.map((payout: Payout) => (
                  <div
                    key={payout.id}
                    className="rounded-xl bg-muted/10 border border-border/30 p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Requested
                        </p>
                        <p className="font-medium text-foreground">
                          {new Date(payout.requestedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyle(payout.status)}`}
                        title={payout.rejectionReason ?? undefined}
                      >
                        {getStatusIcon(payout.status)}
                        {statusLabel[payout.status]}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Amount
                        </p>
                        <p className="font-bold text-foreground">
                          {formatCurrency(payout.amount, payout.currency)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Net Transfer
                        </p>
                        <p className="text-foreground">
                          {payout.transferAmount !== null
                            ? formatCurrency(
                                payout.transferAmount,
                                payout.currency,
                              )
                            : "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* md+: full table */}
              <div className="hidden md:block">
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
                        Net Transfer
                      </TableHead>
                      <TableHead className="text-muted-foreground font-medium py-5">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payoutHistory.map((payout: Payout, index) => (
                      <TableRow
                        key={payout.id}
                        className={`border-border/30 hover:bg-muted/20 transition-colors ${
                          index % 2 === 0 ? "bg-transparent" : "bg-muted/5"
                        }`}
                      >
                        <TableCell className="font-medium text-foreground py-5">
                          {new Date(payout.requestedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-bold text-foreground py-5">
                          {formatCurrency(payout.amount, payout.currency)}
                        </TableCell>
                        <TableCell className="text-foreground py-5">
                          {payout.transferAmount !== null
                            ? formatCurrency(
                                payout.transferAmount,
                                payout.currency,
                              )
                            : "—"}
                        </TableCell>
                        <TableCell className="py-5">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyle(payout.status)}`}
                            title={payout.rejectionReason ?? undefined}
                          >
                            {getStatusIcon(payout.status)}
                            {statusLabel[payout.status]}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </ScrollReveal>

      <PayoutRequestModal
        account={selectedAccount}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default DashboardPayouts;
