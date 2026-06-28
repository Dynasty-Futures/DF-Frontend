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

const CHECKOUT_BASE = "https://checkout.dynastyfuturesdyn.com/product/";

type PlanKey = "standard" | "advanced" | "builder";
type SizeKey = "25k" | "50k" | "100k" | "150k";

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Checkout URLs
// Note: 25k Standard eval slug is missing "standard" — matches WooCommerce as-is.
// Note: 50k Advanced funded slug is "25k-advanced-funded-reset-2" — WooCommerce
//       naming issue on their end; URL is correct per Trey's confirmation.
// ---------------------------------------------------------------------------

const RESET_URLS: Record<PlanKey, Record<SizeKey, { eval: string; funded: string }>> = {
  standard: {
    "25k": {
      eval:   `${CHECKOUT_BASE}25k-evaluation-reset/`,
      funded: `${CHECKOUT_BASE}25k-standard-funded-reset/`,
    },
    "50k": {
      eval:   `${CHECKOUT_BASE}50k-standard-evaluation-reset/`,
      funded: `${CHECKOUT_BASE}50k-standard-funded-reset/`,
    },
    "100k": {
      eval:   `${CHECKOUT_BASE}100k-standard-evaluation-reset/`,
      funded: `${CHECKOUT_BASE}100k-standard-funded-reset/`,
    },
    "150k": {
      eval:   `${CHECKOUT_BASE}150k-standard-evaluation-reset/`,
      funded: `${CHECKOUT_BASE}150k-standard-funded-reset/`,
    },
  },
  advanced: {
    "25k": {
      eval:   `${CHECKOUT_BASE}25k-advanced-evaluation-reset/`,
      funded: `${CHECKOUT_BASE}25k-advanced-funded-reset/`,
    },
    "50k": {
      eval:   `${CHECKOUT_BASE}50k-advanced-evaluation-reset/`,
      funded: `${CHECKOUT_BASE}25k-advanced-funded-reset-2/`,
    },
    "100k": {
      eval:   `${CHECKOUT_BASE}100k-advanced-evaluation-reset/`,
      funded: `${CHECKOUT_BASE}100k-advanced-funded-reset/`,
    },
    "150k": {
      eval:   `${CHECKOUT_BASE}150k-advanced-evaluation-reset/`,
      funded: `${CHECKOUT_BASE}150k-advanced-funded-reset/`,
    },
  },
  builder: {
    "25k": {
      eval:   `${CHECKOUT_BASE}25k-builder-evaluation-reset/`,
      funded: `${CHECKOUT_BASE}25k-builder-funded-reset/`,
    },
    "50k": {
      eval:   `${CHECKOUT_BASE}50k-builder-evaluation-reset/`,
      funded: `${CHECKOUT_BASE}50k-builder-funded-reset/`,
    },
    "100k": {
      eval:   `${CHECKOUT_BASE}100k-builder-evaluation-reset/`,
      funded: `${CHECKOUT_BASE}100k-builder-funded-reset/`,
    },
    "150k": {
      eval:   `${CHECKOUT_BASE}150k-builder-evaluation-reset/`,
      funded: `${CHECKOUT_BASE}150k-builder-funded-reset/`,
    },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

interface ResetInfo {
  price: number;
  resetType: "Evaluation Reset" | "Funded Reset";
  checkoutUrl: string;
}

const getResetInfo = (
  planType: string,
  accountSizeUsd: number,
  isFunded: boolean,
): ResetInfo | null => {
  if (!Number.isFinite(accountSizeUsd) || accountSizeUsd <= 0) return null;
  const planKey = resolvePlanKey(planType);
  const sizeKey = resolveSizeKey(accountSizeUsd);
  const pricing = RESET_PRICING[planKey]?.[sizeKey];
  const urls = RESET_URLS[planKey]?.[sizeKey];
  if (!pricing || !urls) return null;
  return {
    price: isFunded ? pricing.fundedReset : pricing.evalReset,
    resetType: isFunded ? "Funded Reset" : "Evaluation Reset",
    checkoutUrl: isFunded ? urls.funded : urls.eval,
  };
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const ResetAccountModal = ({
  account,
  open,
  onOpenChange,
}: ResetAccountModalProps) => {
  const resetInfo = account
    ? getResetInfo(account.planType, account.accountSizeUsd, account.isFunded)
    : null;

  const handleReset = () => {
    if (resetInfo?.checkoutUrl) {
      window.location.href = resetInfo.checkoutUrl;
    }
  };

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
                    {resetInfo && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Reset Type</span>
                          <span className="text-foreground">
                            {resetInfo.resetType}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-border/20 pt-2 mt-2">
                          <span className="text-muted-foreground">Reset Price</span>
                          <span className="text-foreground font-semibold">
                            ${resetInfo.price.toLocaleString()}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    You'll be taken to the checkout page to complete your reset purchase.
                    Once payment is confirmed your new account will appear in your
                    dashboard within a few minutes — no need to sign up again.
                  </p>
                </>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleReset} disabled={!resetInfo}>
            Continue to Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetAccountModal;
