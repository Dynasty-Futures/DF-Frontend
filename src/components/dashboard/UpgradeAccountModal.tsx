import { ArrowUpCircle, Loader2, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpgradeAccount } from "@/hooks/useTrading";
import type { ApiError } from "@/types/api";

// =============================================================================
// Upgrade Account modal (dashboard)
// =============================================================================
// Promotes an evaluation account that has met its profit target to a funded
// account. Mirrors YPF's own "Upgrade Account" button — it calls our backend,
// which hits YPF's `/upgrade` endpoint (the one gated on `isLevelUpReached`).
// Unlike the reset flow this is live: YPF is the final authority and may still
// reject, in which case we surface the error.
// =============================================================================

export interface UpgradeAccountTarget {
  accountId: string;
  accountName: string;
  currentProgram?: string;
  nextProgram?: string;
}

interface UpgradeAccountModalProps {
  account: UpgradeAccountTarget | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpgradeAccountModal = ({
  account,
  open,
  onOpenChange,
}: UpgradeAccountModalProps) => {
  const upgrade = useUpgradeAccount({
    onSuccess: () => {
      toast.success("Account upgraded", {
        description:
          "Your account has been upgraded to funded. Your dashboard will refresh shortly.",
      });
      onOpenChange(false);
    },
    onError: (err: ApiError) => {
      toast.error("Couldn't upgrade account", {
        description:
          err.message ?? "Please try again, or contact support if this persists.",
      });
    },
  });

  const handleConfirm = () => {
    if (!account) return;
    upgrade.mutate(account.accountId);
  };

  return (
    <Dialog open={open} onOpenChange={upgrade.isPending ? undefined : onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpCircle size={18} className="text-primary" />
            Upgrade to Funded
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4 pt-1">
              <p className="text-sm text-muted-foreground">
                You've hit your profit target — congratulations. Upgrading moves
                this account to its funded phase, where your profits become
                eligible for payouts.
              </p>

              {account && (
                <div className="rounded-xl border border-border/30 bg-muted/20 p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account</span>
                    <span className="text-foreground font-medium">
                      {account.accountName}
                    </span>
                  </div>
                  {(account.currentProgram || account.nextProgram) && (
                    <div className="flex items-center justify-between border-t border-border/20 pt-2 mt-2">
                      <span className="text-muted-foreground">
                        {account.currentProgram ?? "Evaluation"}
                      </span>
                      <span className="flex items-center gap-1.5 text-foreground font-medium">
                        <TrendingUp size={14} className="text-primary" />
                        {account.nextProgram ?? "Funded"}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                This action is final and is handled by the trading platform.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={upgrade.isPending}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!account || upgrade.isPending}>
            {upgrade.isPending ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Upgrading…
              </>
            ) : (
              "Confirm Upgrade"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeAccountModal;
