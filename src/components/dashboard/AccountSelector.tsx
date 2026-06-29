import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTradingAccounts } from '@/hooks/useTrading';
import type { TradingAccount } from '@/types/trading';

interface AccountSelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

type StatusLabel = 'Active' | 'Violated' | 'Closed' | 'Upgraded';

const stageLabel = (status: TradingAccount['status']): string =>
  status === 'PASSED' || status === 'FUNDED' || status === 'UPGRADED'
    ? 'Funded'
    : 'Evaluation';

const statusLabel = (status: TradingAccount['status']): StatusLabel => {
  if (status === 'UPGRADED') return 'Upgraded';
  if (status === 'CLOSED') return 'Closed';
  if (status === 'FAILED' || status === 'SUSPENDED') return 'Violated';
  return 'Active';
};

const badgeClass = (status: StatusLabel): string => {
  switch (status) {
    case 'Active':
      return 'bg-primary/20 text-primary';
    case 'Violated':
      return 'bg-destructive/20 text-destructive';
    case 'Upgraded':
      return 'bg-gold-dark/20 text-gold-dark';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

// Group accounts of the same plan/size together: rank by plan family, then by
// account size ascending, so the dropdown reads in a predictable order rather
// than the arbitrary order the API returns.
const planRank = (name: string): number => {
  const n = name.toLowerCase();
  if (n.includes('standard')) return 0;
  if (n.includes('advanced')) return 1;
  return 2; // Builder / Dynasty
};

const sortByTypeAndSize = (a: TradingAccount, b: TradingAccount): number => {
  const an = a.accountType.displayName || a.accountType.name;
  const bn = b.accountType.displayName || b.accountType.name;
  const rank = planRank(an) - planRank(bn);
  if (rank !== 0) return rank;
  const sizeDiff = Number(a.accountType.accountSize) - Number(b.accountType.accountSize);
  if (sizeDiff !== 0) return sizeDiff;
  return an.localeCompare(bn);
};

const AccountSelector = ({ value, onValueChange }: AccountSelectorProps) => {
  const { data, isLoading } = useTradingAccounts();
  const accounts = data?.data ?? [];

  // Active accounts first, inactive (violated / closed / upgraded) after — each
  // sorted by plan family + size.
  const isActive = (a: TradingAccount) => statusLabel(a.status) === 'Active';
  const activeAccounts = accounts.filter(isActive).sort(sortByTypeAndSize);
  const inactiveAccounts = accounts.filter((a) => !isActive(a)).sort(sortByTypeAndSize);

  const renderItem = (account: TradingAccount) => {
    const stage = stageLabel(account.status);
    const status = statusLabel(account.status);
    const name = account.accountType.displayName || account.accountType.name;
    return (
      <SelectItem
        key={account.id}
        value={account.id}
        className="focus:bg-primary/10 focus:text-foreground rounded-lg my-0.5"
      >
        <div className="flex items-center gap-3">
          <span className="font-medium">{name}</span>
          <span className="text-xs text-muted-foreground">• {stage}</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeClass(status)}`}
          >
            {status}
          </span>
        </div>
      </SelectItem>
    );
  };

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full sm:w-[300px] bg-card/50 border-border/30 backdrop-blur-sm rounded-xl h-11">
        <SelectValue
          placeholder={isLoading ? 'Loading accounts…' : 'Select account'}
        />
      </SelectTrigger>
      <SelectContent className="bg-card/95 backdrop-blur-xl border-border/30 rounded-xl">
        {accounts.length === 0 && !isLoading && (
          <div className="px-3 py-2 text-xs text-muted-foreground">
            No accounts yet
          </div>
        )}

        {activeAccounts.length > 0 && (
          <SelectGroup>
            <SelectLabel className="text-xs uppercase tracking-wide text-muted-foreground">
              Active Accounts
            </SelectLabel>
            {activeAccounts.map(renderItem)}
          </SelectGroup>
        )}

        {inactiveAccounts.length > 0 && (
          <SelectGroup>
            <SelectLabel className="text-xs uppercase tracking-wide text-muted-foreground">
              Inactive Accounts
            </SelectLabel>
            {inactiveAccounts.map(renderItem)}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
};

export default AccountSelector;
