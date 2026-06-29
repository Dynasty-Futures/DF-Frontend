import { useMemo, useState } from "react";
import { Eye, ChevronRight, RotateCcw, AlertCircle, Loader2, Plus } from "lucide-react";
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
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useTradingAccounts } from "@/hooks/useTrading";
import ResetAccountModal, {
  type ResetAccountTarget,
} from "@/components/dashboard/ResetAccountModal";
import type { TradingAccount, AccountStatus } from "@/types/trading";

type StageLabel = "Evaluation" | "Funded" | "Closed";
type StatusLabel = "Active" | "Violated" | "Closed" | "Upgraded";

interface AccountView {
  id: string;
  startDate: string;
  planType: string;
  accountSize: string;
  accountSizeUsd: number;
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
  UPGRADED: "Funded",
};

const STATUS_LABEL_BY_STATUS: Record<AccountStatus, StatusLabel> = {
  EVALUATION: "Active",
  PHASE_2: "Active",
  PASSED: "Active",
  FUNDED: "Active",
  SUSPENDED: "Violated",
  FAILED: "Violated",
  CLOSED: "Closed",
  UPGRADED: "Upgraded",
};

const toView = (a: TradingAccount): AccountView => ({
  id: a.id,
  startDate: fmtDate(a.activatedAt ?? a.createdAt),
  planType: a.accountType.displayName || a.accountType.name,
  accountSize: fmtUsd(a.accountType.accountSize),
  accountSizeUsd: Number(a.accountType.accountSize) || 0,
  stage: STAGE_BY_STATUS[a.status],
  status: STATUS_LABEL_BY_STATUS[a.status],
  rawStatus: a.status,
  balance: fmtUsd(a.currentBalance),
  // Reset applies to violated (breached) accounts — restart the evaluation in
  // the same program. Not active accounts (no reason to reset a live one) and
  // not permanently CLOSED/disabled accounts (YPF won't reset those).
  isResettable: a.status === "FAILED" || a.status === "SUSPENDED",
});

const getStatusBadge = (status: StatusLabel): string => {
  const styles: Record<StatusLabel, string> = {
    Active: "bg-primary/20 text-primary border-primary/30",
    Violated: "bg-destructive/20 text-destructive border-destructive/30",
    Closed: "bg-muted text-muted-foreground border-border",
    Upgraded: "bg-gold-dark/20 text-gold-dark border-gold-dark/30",
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

// Group accounts of the same plan family + size together so each section reads
// in a predictable order rather than the arbitrary order the API returns.
const planRank = (name: string): number => {
  const n = name.toLowerCase();
  if (n.includes("standard")) return 0;
  if (n.includes("advanced")) return 1;
  return 2; // Builder / Dynasty
};

const byTypeAndSize = (a: AccountView, b: AccountView): number => {
  const rank = planRank(a.planType) - planRank(b.planType);
  if (rank !== 0) return rank;
  const sizeDiff = a.accountSizeUsd - b.accountSizeUsd;
  if (sizeDiff !== 0) return sizeDiff;
  return a.planType.localeCompare(b.planType);
};

const truncateId = (id: string) => (id.length > 12 ? `${id.slice(0, 8)}…` : id);

// =============================================================================
// Sub-components
// =============================================================================

const ViewButton = ({ id }: { id: string }) => (
  <Button
    variant="outline"
    size="sm"
    className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all"
    asChild
  >
    <Link to={`/dashboard?account=${id}`}>
      <Eye size={16} className="mr-2" />
      View
      <ChevronRight size={14} className="ml-1" />
    </Link>
  </Button>
);

const ResetButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    variant="outline"
    size="sm"
    className="border-border/40 text-muted-foreground hover:text-foreground hover:border-border/70 transition-all"
    onClick={onClick}
  >
    <RotateCcw size={14} className="mr-2" />
    Reset
  </Button>
);

const ActiveAccountsTable = ({ accounts }: { accounts: AccountView[] }) => {
  if (accounts.length === 0) {
    return (
      <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-10 text-center text-muted-foreground">
        <p className="font-medium text-foreground mb-1">No active accounts yet</p>
        <p className="text-sm">Purchase a challenge to get started.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border/30 hover:bg-transparent">
            <TableHead className="text-muted-foreground font-medium py-4">Account ID</TableHead>
            <TableHead className="text-muted-foreground font-medium py-4">Plan</TableHead>
            <TableHead className="text-muted-foreground font-medium py-4">Account Size</TableHead>
            <TableHead className="text-muted-foreground font-medium py-4">Stage</TableHead>
            <TableHead className="text-muted-foreground font-medium py-4">Status</TableHead>
            <TableHead className="text-muted-foreground font-medium py-4">Balance</TableHead>
            <TableHead className="text-muted-foreground font-medium py-4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account, index) => (
            <TableRow
              key={account.id}
              className={`border-border/30 hover:bg-muted/20 transition-colors border-l-2 border-l-primary ${
                index % 2 === 0 ? "bg-transparent" : "bg-muted/5"
              }`}
            >
              <TableCell className="font-mono text-xs text-muted-foreground py-4">
                {truncateId(account.id)}
              </TableCell>
              <TableCell className="text-foreground py-4">{account.planType}</TableCell>
              <TableCell className="text-foreground py-4">{account.accountSize}</TableCell>
              <TableCell className="py-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStageBadge(account.stage)}`}>
                  {account.stage}
                </span>
              </TableCell>
              <TableCell className="py-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusBadge(account.status)}`}>
                  {account.status}
                </span>
              </TableCell>
              <TableCell className="font-semibold text-foreground py-4">{account.balance}</TableCell>
              <TableCell className="text-right py-4">
                <div className="flex items-center justify-end gap-2">
                  <ViewButton id={account.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

interface InactiveAccountsTableProps {
  accounts: AccountView[];
  onReset: (account: AccountView) => void;
}

const InactiveAccountsTable = ({ accounts, onReset }: InactiveAccountsTableProps) => {
  if (accounts.length === 0) {
    return (
      <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 p-10 text-center text-muted-foreground">
        <p className="font-medium text-foreground mb-1">No inactive accounts</p>
        <p className="text-sm">Closed or violated accounts will appear here.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border/30 hover:bg-transparent">
            <TableHead className="text-muted-foreground font-medium py-4">Account ID</TableHead>
            <TableHead className="text-muted-foreground font-medium py-4">Plan</TableHead>
            <TableHead className="text-muted-foreground font-medium py-4">Account Size</TableHead>
            <TableHead className="text-muted-foreground font-medium py-4">Stage</TableHead>
            <TableHead className="text-muted-foreground font-medium py-4">Status</TableHead>
            <TableHead className="text-muted-foreground font-medium py-4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account, index) => (
            <TableRow
              key={account.id}
              className={`border-border/30 hover:bg-muted/20 transition-colors ${
                index % 2 === 0 ? "bg-transparent" : "bg-muted/5"
              }`}
            >
              <TableCell className="font-mono text-xs text-muted-foreground py-4">
                {truncateId(account.id)}
              </TableCell>
              <TableCell className="text-foreground py-4">{account.planType}</TableCell>
              <TableCell className="text-foreground py-4">{account.accountSize}</TableCell>
              <TableCell className="py-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStageBadge(account.stage)}`}>
                  {account.stage}
                </span>
              </TableCell>
              <TableCell className="py-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusBadge(account.status)}`}>
                  {account.status}
                </span>
              </TableCell>
              <TableCell className="text-right py-4">
                <div className="flex items-center justify-end gap-2">
                  {account.isResettable && (
                    <ResetButton onClick={() => onReset(account)} />
                  )}
                  <ViewButton id={account.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// =============================================================================
// Main Component
// =============================================================================

const DashboardAccounts = () => {
  const { data, isLoading, isError, error } = useTradingAccounts();

  const [resetTarget, setResetTarget] = useState<ResetAccountTarget | null>(null);
  const [resetOpen, setResetOpen] = useState(false);

  const accounts = useMemo<AccountView[]>(
    () => (data?.data ?? []).map(toView),
    [data],
  );

  const activeAccounts = useMemo(
    () => accounts.filter((a) => a.status === "Active").sort(byTypeAndSize),
    [accounts],
  );

  const inactiveAccounts = useMemo(
    () => accounts.filter((a) => a.status !== "Active").sort(byTypeAndSize),
    [accounts],
  );

  const openReset = (account: AccountView) => {
    setResetTarget({
      planType: account.planType,
      accountSizeUsd: account.accountSizeUsd,
      isFunded: account.stage === "Funded",
    });
    setResetOpen(true);
  };

  return (
    <div className="space-y-10 pt-16 lg:pt-0">
      {/* Header */}
      <ScrollReveal>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Accounts</h1>
            <p className="text-muted-foreground mt-1">Manage your trading accounts</p>
          </div>
          <Button asChild size="sm">
            <Link to="/pricing">
              <Plus size={14} className="mr-2" />
              New Challenge
            </Link>
          </Button>
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
            <p className="font-medium text-foreground">Failed to load accounts</p>
            <p className="text-sm text-muted-foreground mt-1">
              {error?.message ?? "Please try again."}
            </p>
          </div>
        </div>
      )}

      {/* Active Accounts */}
      {!isLoading && !isError && (
        <ScrollReveal delay={150} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <h2 className="text-lg font-semibold text-foreground">Active Accounts</h2>
            {activeAccounts.length > 0 && (
              <span className="text-xs text-muted-foreground bg-muted/40 border border-border/30 px-2 py-0.5 rounded-full">
                {activeAccounts.length}
              </span>
            )}
          </div>
          <ActiveAccountsTable accounts={activeAccounts} />
        </ScrollReveal>
      )}

      {/* Inactive Accounts */}
      {!isLoading && !isError && (
        <ScrollReveal delay={250} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
            <h2 className="text-lg font-semibold text-foreground">Inactive Accounts</h2>
            {inactiveAccounts.length > 0 && (
              <span className="text-xs text-muted-foreground bg-muted/40 border border-border/30 px-2 py-0.5 rounded-full">
                {inactiveAccounts.length}
              </span>
            )}
          </div>
          <InactiveAccountsTable accounts={inactiveAccounts} onReset={openReset} />
        </ScrollReveal>
      )}

      <ResetAccountModal
        account={resetTarget}
        open={resetOpen}
        onOpenChange={setResetOpen}
      />
    </div>
  );
};

export default DashboardAccounts;
