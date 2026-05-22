import { useMemo, useState } from "react";
import { Eye, ChevronRight, RotateCcw, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BuyChallengeButton from "@/components/dashboard/BuyChallengeButton";
import { useTradingAccounts } from "@/hooks/useTrading";
import type { TradingAccount, AccountStatus } from "@/types/trading";

type StageLabel = "Evaluation" | "Funded" | "Closed";
type StatusLabel = "Active" | "Violated" | "Closed";

interface AccountView {
  id: string;
  startDate: string;
  planType: string;
  accountSize: string;
  stage: StageLabel;
  status: StatusLabel;
  rawStatus: AccountStatus;
  balance: string;
  isResettable: boolean;
}

const fmtUsd = (value: string | number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(typeof value === "string" ? Number(value) : value);

const fmtDate = (iso: string | null): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toISOString().slice(0, 10);
};

const STAGE_BY_STATUS: Record<AccountStatus, StageLabel> = {
  EVALUATION: "Evaluation",
  PHASE_2: "Evaluation",
  PASSED: "Funded",
  FUNDED: "Funded",
  SUSPENDED: "Funded",
  FAILED: "Closed",
  CLOSED: "Closed",
};

const STATUS_LABEL_BY_STATUS: Record<AccountStatus, StatusLabel> = {
  EVALUATION: "Active",
  PHASE_2: "Active",
  PASSED: "Active",
  FUNDED: "Active",
  SUSPENDED: "Violated",
  FAILED: "Violated",
  CLOSED: "Closed",
};

const toView = (a: TradingAccount): AccountView => ({
  id: a.id,
  startDate: fmtDate(a.activatedAt ?? a.createdAt),
  planType: a.accountType.displayName || a.accountType.name,
  accountSize: fmtUsd(a.accountType.accountSize),
  stage: STAGE_BY_STATUS[a.status],
  status: STATUS_LABEL_BY_STATUS[a.status],
  rawStatus: a.status,
  balance: fmtUsd(a.currentBalance),
  isResettable: a.status === "EVALUATION" || a.status === "PHASE_2",
});

const getStatusBadge = (status: StatusLabel): string => {
  const styles: Record<StatusLabel, string> = {
    Active: "bg-primary/20 text-primary border-primary/30",
    Violated: "bg-destructive/20 text-destructive border-destructive/30",
    Closed: "bg-muted text-muted-foreground border-border",
  };
  return styles[status];
};

const getStageBadge = (stage: StageLabel): string => {
  const styles: Record<StageLabel, string> = {
    Funded: "bg-gold-dark/20 text-gold-dark border-gold-dark/30",
    Evaluation: "bg-gold-light/20 text-gold-light border-gold-light/30",
    Closed: "bg-muted text-muted-foreground border-border",
  };
  return styles[stage];
};

type FilterStatus = "All" | StatusLabel;

const STATUS_FILTERS: FilterStatus[] = ["All", "Active", "Violated", "Closed"];

// =============================================================================
// Reset pricing
// TODO: Replace with real plan/size pricing data from CRM or pricing API once
//       account billing integration is complete.
// =============================================================================

type PlanKey = "standard" | "advanced" | "builder";
type SizeKey = "25k" | "50k" | "100k" | "150k";

interface ResetPricing {
  evalReset: number;
  fundedReset: number;
}

const RESET_PRICING: Record<PlanKey, Record<SizeKey, ResetPricing>> = {
  standard: {
    "25k": { evalReset: 30, fundedReset: 119 },
    "50k": { evalReset: 40, fundedReset: 159 },
    "100k": { evalReset: 65, fundedReset: 259 },
    "150k": { evalReset: 80, fundedReset: 319 },
  },
  advanced: {
    "25k": { evalReset: 40, fundedReset: 159 },
    "50k": { evalReset: 55, fundedReset: 219 },
    "100k": { evalReset: 90, fundedReset: 359 },
    "150k": { evalReset: 115, fundedReset: 459 },
  },
  builder: {
    "25k": { evalReset: 55, fundedReset: 219 },
    "50k": { evalReset: 75, fundedReset: 299 },
    "100k": { evalReset: 120, fundedReset: 479 },
    "150k": { evalReset: 150, fundedReset: 599 },
  },
};

function resolvePlanKey(planType: string): PlanKey {
  const lc = planType.toLowerCase();
  if (lc.includes("builder")) return "builder";
  if (lc.includes("advanced")) return "advanced";
  return "standard";
}

function resolveSizeKey(rawSize: number): SizeKey {
  if (rawSize <= 25000) return "25k";
  if (rawSize <= 50000) return "50k";
  if (rawSize <= 100000) return "100k";
  return "150k";
}

interface ResetPriceInfo {
  price: number;
  resetType: "Evaluation Reset" | "Funded Reset";
}

function getResetPriceInfo(account: AccountView): ResetPriceInfo | null {
  const planKey = resolvePlanKey(account.planType);
  const rawSize = parseInt(account.accountSize.replace(/[^0-9]/g, ""), 10);
  if (isNaN(rawSize) || rawSize === 0) return null;
  const sizeKey = resolveSizeKey(rawSize);
  const pricing = RESET_PRICING[planKey]?.[sizeKey];
  if (!pricing) return null;
  const isFunded = account.stage === "Funded";
  return {
    price: isFunded ? pricing.fundedReset : pricing.evalReset,
    resetType: isFunded ? "Funded Reset" : "Evaluation Reset",
  };
}

// =============================================================================
// Component
// =============================================================================

const DashboardAccounts = () => {
  const { data, isLoading, isError, error } = useTradingAccounts();

  const [statusFilter, setStatusFilter] = useState<FilterStatus>("All");
  const [planFilter, setPlanFilter] = useState<string>("All");
  // Account staged for the reset confirmation modal (null = modal closed)
  const [resetModalAccount, setResetModalAccount] = useState<AccountView | null>(null);

  const accounts = useMemo<AccountView[]>(
    () => (data?.data ?? []).map(toView),
    [data],
  );

  const planOptions = useMemo<string[]>(() => {
    const set = new Set<string>();
    for (const a of accounts) set.add(a.planType);
    return ["All", ...Array.from(set).sort()];
  }, [accounts]);

  const filteredAccounts = useMemo(
    () =>
      accounts.filter((a) => {
        if (statusFilter !== "All" && a.status !== statusFilter) return false;
        if (planFilter !== "All" && a.planType !== planFilter) return false;
        return true;
      }),
    [accounts, statusFilter, planFilter],
  );

  // First resettable account across all accounts (used by the header button).
  const firstResettable = useMemo(
    () => accounts.find((a) => a.isResettable) ?? null,
    [accounts],
  );

  const hasResettableAccounts = firstResettable !== null;

  const openResetModal = (account: AccountView) => setResetModalAccount(account);
  const closeResetModal = () => setResetModalAccount(null);

  // TODO: Connect to CRM account lookup, billing/checkout, and account reset
  //       API once integration is complete. Required values:
  //         selectedAccountId, selectedPlan, selectedAccountSize,
  //         selectedAccountStatus, resetType, resetPrice.
  const handleContinueToReset = () => {
    toast.info(
      "Reset checkout will be available once account billing is connected.",
    );
    closeResetModal();
  };

  const resetPriceInfo = resetModalAccount
    ? getResetPriceInfo(resetModalAccount)
    : null;

  return (
    <div className="space-y-10 pt-16 lg:pt-0">
      {/* Header */}
      <ScrollReveal>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Accounts</h1>
            <p className="text-muted-foreground mt-1">
              Manage your trading accounts
            </p>
          </div>

          {/* Header-level Reset Account button — enabled when a resettable account exists */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="border-border/40 text-muted-foreground hover:text-foreground hover:border-border/70 transition-all"
              disabled={!hasResettableAccounts || isLoading}
              onClick={() => firstResettable && openResetModal(firstResettable)}
            >
              <RotateCcw size={14} className="mr-2" />
              Reset Account
            </Button>
            {!isLoading && !hasResettableAccounts && accounts.length > 0 && (
              <p className="text-xs text-muted-foreground/60">
                Account reset available on active evaluations
              </p>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="animate-spin mr-2" size={18} /> Loading accounts…
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-6 flex items-start gap-3">
          <AlertCircle className="text-destructive shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-medium text-foreground">
              Failed to load accounts
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {error?.message ?? "Please try again."}
            </p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && accounts.length === 0 && (
        <ScrollReveal delay={150}>
          <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-12 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              No accounts yet
            </h2>
            <p className="text-muted-foreground mt-2 mb-6">
              Purchase a challenge to get started.
            </p>
            <div className="flex items-center justify-center gap-3">
              <BuyChallengeButton size="default" />
              <Button asChild variant="outline">
                <Link to="/pricing">Browse Plans</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Filters + table */}
      {!isLoading && !isError && accounts.length > 0 && (
        <ScrollReveal delay={150} className="space-y-10">
          <div className="flex flex-wrap gap-6">
            {/* Plan Type Filter */}
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Plan Type</span>
              <div className="flex items-center gap-2 flex-wrap">
                {planOptions.map((plan) => (
                  <Button
                    key={plan}
                    variant="ghost"
                    size="sm"
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      planFilter === plan
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground border border-border/30"
                    }`}
                    onClick={() => setPlanFilter(plan)}
                  >
                    {plan}
                  </Button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <div className="flex items-center gap-2">
                {STATUS_FILTERS.map((status) => (
                  <Button
                    key={status}
                    variant="ghost"
                    size="sm"
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      statusFilter === status
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground border border-border/30"
                    }`}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Accounts Table */}
          <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-medium py-5">
                    Start Date
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium py-5">
                    Plan Type
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium py-5">
                    Account Size
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium py-5">
                    Stage
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium py-5">
                    Status
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium py-5">
                    Balance
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium py-5 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.map((account, index) => (
                  <TableRow
                    key={account.id}
                    className={`border-border/30 hover:bg-muted/20 transition-colors ${
                      index % 2 === 0 ? "bg-transparent" : "bg-muted/5"
                    } ${account.status === "Active" ? "border-l-2 border-l-primary" : ""}`}
                  >
                    <TableCell className="font-medium text-foreground py-5">
                      {account.startDate}
                    </TableCell>
                    <TableCell className="text-foreground py-5">
                      {account.planType}
                    </TableCell>
                    <TableCell className="text-foreground py-5">
                      {account.accountSize}
                    </TableCell>
                    <TableCell className="py-5">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStageBadge(account.stage)}`}
                      >
                        {account.stage}
                      </span>
                    </TableCell>
                    <TableCell className="py-5">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusBadge(account.status)}`}
                      >
                        {account.status}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground py-5">
                      {account.balance}
                    </TableCell>
                    <TableCell className="text-right py-5">
                      <div className="flex items-center justify-end gap-2">
                        {account.isResettable && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-border/40 text-muted-foreground hover:text-foreground hover:border-border/70 transition-all"
                            onClick={() => openResetModal(account)}
                          >
                            <RotateCcw size={14} className="mr-2" />
                            Reset Account
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all"
                          asChild
                        >
                          <Link to={`/dashboard?account=${account.id}`}>
                            <Eye size={16} className="mr-2" />
                            View
                            <ChevronRight size={14} className="ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollReveal>
      )}

      {/* Reset Account confirmation modal */}
      <Dialog open={resetModalAccount !== null} onOpenChange={(open) => !open && closeResetModal()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset Account</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4 pt-1">
                {resetModalAccount && (
                  <>
                    {/* Account details summary */}
                    <div className="rounded-xl border border-border/30 bg-muted/20 p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account</span>
                        <span className="text-foreground font-medium">
                          {resetModalAccount.accountSize} {resetModalAccount.planType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Stage</span>
                        <span className="text-foreground">{resetModalAccount.stage}</span>
                      </div>
                      {resetPriceInfo && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Reset Type</span>
                            <span className="text-foreground">{resetPriceInfo.resetType}</span>
                          </div>
                          <div className="flex justify-between border-t border-border/20 pt-2 mt-2">
                            <span className="text-muted-foreground">Reset Price</span>
                            <span className="text-foreground font-semibold">
                              ${resetPriceInfo.price.toLocaleString()}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Resetting this account will require a reset purchase.
                      {resetPriceInfo
                        ? ` The reset price for this account is $${resetPriceInfo.price.toLocaleString()}.`
                        : " Reset pricing will be calculated at checkout."}
                    </p>
                  </>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={closeResetModal}>
              Cancel
            </Button>
            <Button onClick={handleContinueToReset}>
              Continue to Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardAccounts;
