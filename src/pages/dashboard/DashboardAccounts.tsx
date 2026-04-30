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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BuyChallengeButton from "@/components/dashboard/BuyChallengeButton";
import { useTradingAccounts, useResetAccount } from "@/hooks/useTrading";
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

const DashboardAccounts = () => {
  const { data, isLoading, isError, error } = useTradingAccounts();
  const resetMutation = useResetAccount();

  const [statusFilter, setStatusFilter] = useState<FilterStatus>("All");
  const [planFilter, setPlanFilter] = useState<string>("All");

  const accounts = useMemo<AccountView[]>(
    () => (data?.data ?? []).map(toView),
    [data],
  );

  // Build the plan filter from real accountType names — only show options
  // that exist in the user's accounts. Avoids the old hard-coded list that
  // didn't match what's actually seeded.
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

  const handleReset = (id: string) => {
    resetMutation.mutate(id, {
      onSuccess: () => toast.success("Account reset to starting balance"),
      onError: (err) =>
        toast.error(err.message || "Reset failed. Please try again."),
    });
  };

  return (
    <div className="space-y-10 pt-16 lg:pt-0">
      {/* Header */}
      <ScrollReveal>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Accounts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your trading accounts
          </p>
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
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-border/40 text-muted-foreground hover:text-foreground"
                                disabled={resetMutation.isPending}
                              >
                                <RotateCcw size={14} className="mr-2" />
                                Reset
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Reset evaluation account?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This resets the account to its starting
                                  balance. All progress on the current
                                  evaluation phase will be lost. This cannot be
                                  undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleReset(account.id)}
                                >
                                  Reset Account
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
    </div>
  );
};

export default DashboardAccounts;
