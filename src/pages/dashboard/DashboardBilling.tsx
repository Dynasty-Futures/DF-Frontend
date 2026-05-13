import {
  Receipt,
  Calendar,
  CreditCard,
  Plus,
  FileText,
} from "lucide-react";
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

// Future-ready data objects — populated from live billing API when available
const subscriptions: unknown[] = [];
const paymentMethods: unknown[] = [];
const billingHistory: unknown[] = [];

const DashboardBilling = () => {
  const hasSubscription = subscriptions.length > 0;
  const hasPaymentMethod = paymentMethods.length > 0;
  const hasBillingHistory = billingHistory.length > 0;

  return (
    <div className="space-y-10 pt-16 lg:pt-0">
      {/* Header */}
      <ScrollReveal>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Billing</h1>
          <p className="text-muted-foreground mt-1">
            Manage your subscription and payments
          </p>
        </div>
      </ScrollReveal>

      {/* Subscription Card */}
      <ScrollReveal delay={150}>
        <div className="p-10 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

          <div className="relative flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8">
            <div className="space-y-6 flex-1">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-muted/30 border border-border/30">
                  <Receipt size={28} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    No Active Subscription
                  </h3>
                  <p className="text-muted-foreground">
                    You do not currently have an active Dynasty Futures account
                    subscription.
                  </p>
                </div>
              </div>

              {!hasSubscription && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-2xl font-bold text-muted-foreground/50">
                      —
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-muted/30 text-muted-foreground border border-border/30">
                      Inactive
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Next Billing
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-muted-foreground/50" />
                      <span className="font-semibold text-muted-foreground/50">
                        —
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Payment Method
                    </p>
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} className="text-muted-foreground/50" />
                      <span className="font-semibold text-muted-foreground/50">
                        —
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-sm text-muted-foreground/70">
                Purchased accounts and billing details will appear here.
              </p>
            </div>

            {hasSubscription && (
              <div className="flex flex-col gap-3 xl:min-w-[200px]">
                <Button
                  variant="outline"
                  className="border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  Update Payment Method
                </Button>
                <Button
                  variant="outline"
                  className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 transition-all"
                >
                  Cancel Subscription
                </Button>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Payment Method Section */}
      <ScrollReveal delay={225}>
        <div className="p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-muted/30 border border-border/30">
                <CreditCard size={22} className="text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Payment Method
                </h3>
                {!hasPaymentMethod && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    No payment method on file.
                  </p>
                )}
              </div>
            </div>

            {!hasPaymentMethod && (
              <Button
                variant="outline"
                className="border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all self-start sm:self-auto"
              >
                <Plus size={16} className="mr-2" />
                Add Payment Method
              </Button>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Billing History */}
      <ScrollReveal delay={300}>
        <div className="rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 overflow-hidden">
          <div className="p-6 border-b border-border/30">
            <h3 className="text-lg font-semibold text-foreground">
              Billing History
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              View your past transactions
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="text-muted-foreground font-medium py-5">
                  Date
                </TableHead>
                <TableHead className="text-muted-foreground font-medium py-5">
                  Amount
                </TableHead>
                <TableHead className="text-muted-foreground font-medium py-5">
                  Type
                </TableHead>
                <TableHead className="text-muted-foreground font-medium py-5">
                  Status
                </TableHead>
                <TableHead className="text-muted-foreground font-medium py-5 text-right">
                  Receipt
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hasBillingHistory ? (
                // Populated from live data when available
                null
              ) : (
                <TableRow className="border-border/30 hover:bg-transparent">
                  <TableCell
                    colSpan={5}
                    className="py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-4 rounded-2xl bg-muted/20 border border-border/20">
                        <FileText size={28} className="text-muted-foreground/40" />
                      </div>
                      <p className="text-muted-foreground font-medium">
                        No billing history available.
                      </p>
                      <p className="text-sm text-muted-foreground/60 max-w-xs">
                        Transactions and receipts will appear here after
                        purchases are completed.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default DashboardBilling;
