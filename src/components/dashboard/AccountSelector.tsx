import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockAccounts } from '@/data/mockDashboardData';

// In production, replace mock datasets with live data from PropTradeTech / broker APIs.

interface AccountSelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

const AccountSelector = ({ value = '2', onValueChange }: AccountSelectorProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[300px] bg-card/50 border-border/30 backdrop-blur-sm rounded-xl h-11">
        <SelectValue placeholder="Select account" />
      </SelectTrigger>
      <SelectContent className="bg-card/95 backdrop-blur-xl border-border/30 rounded-xl">
        {mockAccounts.map((account) => (
          <SelectItem 
            key={account.id} 
            value={account.id}
            className="focus:bg-primary/10 focus:text-foreground rounded-lg my-0.5"
          >
            <div className="flex items-center gap-3">
              <span className="font-medium">{account.name}</span>
              <span className="text-xs text-muted-foreground">• {account.stage}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                account.status === 'Active' 
                  ? 'bg-primary/20 text-primary' 
                  : account.status === 'Violated'
                  ? 'bg-destructive/20 text-destructive'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {account.status}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AccountSelector;
