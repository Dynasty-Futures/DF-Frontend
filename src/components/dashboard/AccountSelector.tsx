import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTradingAccounts } from '@/hooks/useTrading';
import type { TradingAccount } from '@/types/trading';

interface AccountSelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

const stageLabel = (status: TradingAccount['status']): string =>
  status === 'PASSED' || status === 'FUNDED' ? 'Funded' : 'Evaluation';

const statusLabel = (status: TradingAccount['status']): 'Active' | 'Violated' | 'Closed' => {
  if (status === 'CLOSED') return 'Closed';
  if (status === 'FAILED' || status === 'SUSPENDED') return 'Violated';
  return 'Active';
};

const AccountSelector = ({ value, onValueChange }: AccountSelectorProps) => {
  const { data, isLoading } = useTradingAccounts();
  const accounts = data?.data ?? [];

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
        {accounts.map((account) => {
          const stage = stageLabel(account.status);
          const status = statusLabel(account.status);
          const name =
            account.accountType.displayName || account.accountType.name;
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
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    status === 'Active'
                      ? 'bg-primary/20 text-primary'
                      : status === 'Violated'
                      ? 'bg-destructive/20 text-destructive'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {status}
                </span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default AccountSelector;
