import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// =============================================================================
// Reset Account modal (shared by the Accounts page + the dashboard)
// =============================================================================
// Paid account resets are GATED: YPF has not configured reset checkout URLs /
// products yet (probe 2026-06-27 found 0/27 programs with an accountResetUrl,
// and the direct checkout-reset API resets without payment). So this surfaces
// the reset price + a "coming soon" state instead of a dead-end action. Flip
// `RESET_ENABLED` + wire the checkout link once YPF provides it.
// =============================================================================

const RESET_ENABLED = false;

type PlanKey = "standard" | "advanced" | "builder";
type SizeKey = "25k" | "50k" | "100k" | "150k";

interface ResetPricing {
  evalReset: number;
  fundedReset: number;
}

// TODO: replace with real pricing once the YPF reset checkout is available.
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

const resolvePlanKey = (planType: string): PlanKey => {
  const lc = planType.toLowerCase();
  if (lc.includes("builder") || lc.includes("dynasty")) return "builder";
  if (lc.includes("advanced")) return "advanced";
  return "standard";
};

const resolveSizeKey = (rawSize: number): SizeKey => {
  if (rawSize <= 25000) return "25k";
  if (rawSize <= 50000) return "50k";
  if (rawSize <= 100000) return "100k";
  return "150k";
};

interface ResetPriceInfo {
  price: number;
  resetType: "Evaluation Reset" | "Funded Reset";
}

const getResetPriceInfo = (
  planType: string,
  accountSizeUsd: number,
  isFunded: boolean,
): ResetPriceInfo | null => {
  if (!Number.isFinite(accountSizeUsd) || accountSizeUsd <= 0) return null;
  const pricing =
    RESET_PRICING[resolvePlanKey(planType)]?.[resolveSizeKey(accountSizeUsd)];
  if (!pricing) return null;
  return {
    price: isFunded ? pricing.fundedReset : pricing.evalReset,
    resetType: isFunded ? "Funded Reset" : "Evaluation Reset",
  };
};

export interface ResetAccountTarget {
  planType: string;
  accountSizeUsd: number;
  isFunded: boolean;
}

interface ResetAccountModalProps {
  account: ResetAccountTarget | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ResetAccountModal = ({
  account,
  open,
  onOpenChange,
}: ResetAccountModalProps) => {
  const priceInfo = account
    ? getResetPriceInfo(account.planType, account.accountSizeUsd, account.isFunded)
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reset Account</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4 pt-1">
              {account && (
                <>
                  <div className="rounded-xl border border-border/30 bg-muted/20 p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account</span>
                      <span className="text-foreground font-medium">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        }).format(account.accountSizeUsd)}{" "}
                        {account.planType}
                      </span>
                    </div>
                    {priceInfo && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Reset Type</span>
                          <span className="text-foreground">
                            {priceInfo.resetType}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-border/20 pt-2 mt-2">
                          <span className="text-muted-foreground">Reset Price</span>
                          <span className="text-foreground font-semibold">
                            ${priceInfo.price.toLocaleString()}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 p-3">
                    <Clock
                      size={16}
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    <p className="text-sm text-muted-foreground">
                      Account resets are coming soon. You'll be able to reset this
                      account and start a fresh evaluation in the same program
                      directly from here.
                    </p>
                  </div>
                </>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button disabled={!RESET_ENABLED}>
            {RESET_ENABLED ? "Continue to Reset" : "Coming Soon"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetAccountModal;
