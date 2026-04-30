import { useState } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { checkoutApi } from '@/services/checkout';
import { ApiError } from '@/types/api';

type Plan = 'standard' | 'advanced' | 'dynasty';
type Size = 25000 | 50000 | 100000 | 150000;

const PLAN_LABELS: Record<Plan, string> = {
  standard: 'Standard (Evaluation)',
  advanced: 'Advanced (Instant Activation)',
  dynasty: 'Dynasty (Instant Funding)',
};

const SIZE_OPTIONS: Size[] = [25000, 50000, 100000, 150000];

interface BuyChallengeButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  label?: string;
}

const BuyChallengeButton = ({
  variant = 'default',
  size = 'sm',
  className,
  label = 'Buy Challenge',
}: BuyChallengeButtonProps) => {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<Plan>('standard');
  const [accountSize, setAccountSize] = useState<Size>(50000);
  const [submitting, setSubmitting] = useState(false);

  const handleCheckout = async () => {
    setSubmitting(true);
    try {
      const res = await checkoutApi.createSession(plan, accountSize);
      const url = res.data?.checkoutUrl;
      if (!url) {
        toast.error('Could not create checkout session.');
        return;
      }
      window.location.href = url;
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : 'Checkout failed';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const formatSize = (n: number) =>
    `$${n.toLocaleString()}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Plus size={14} className="mr-2" />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle>Buy a Challenge</DialogTitle>
          <DialogDescription>
            Choose a plan and account size. You'll be redirected to Stripe to
            complete payment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              Plan
            </label>
            <Select value={plan} onValueChange={(v) => setPlan(v as Plan)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(PLAN_LABELS) as Plan[]).map((p) => (
                  <SelectItem key={p} value={p}>
                    {PLAN_LABELS[p]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              Account Size
            </label>
            <Select
              value={String(accountSize)}
              onValueChange={(v) => setAccountSize(Number(v) as Size)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SIZE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={String(s)}>
                    {formatSize(s)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button onClick={handleCheckout} disabled={submitting}>
            {submitting && (
              <Loader2 size={14} className="mr-2 animate-spin" />
            )}
            Continue to Checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyChallengeButton;
