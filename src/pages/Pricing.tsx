import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, {
  productSchemas,
  advancedProductSchemas,
  builderProductSchemas,
  breadcrumb,
} from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PlanImage,
  CheckIcon,
  ClockIcon,
  DollarIcon,
  ShieldIcon,
} from "@/components/icons/PlanIcons";
import { useAuth } from "@/hooks/useAuth";
import { checkoutApi } from "@/services/checkout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ApiError } from "@/types/api";
import { toast } from "sonner";

const standardPricing = [
  {
    size: "$25,000",
    evalFee: "$59",
    activationFee: "$80",
    evalReset: "$25",
    fundedReset: "$359",
  },
  {
    size: "$50,000",
    evalFee: "$69",
    activationFee: "$80",
    evalReset: "$33",
    fundedReset: "$509",
  },
  {
    size: "$100,000",
    evalFee: "$119",
    activationFee: "$80",
    evalReset: "$54",
    fundedReset: "$789",
  },
  {
    size: "$150,000",
    evalFee: "$149",
    activationFee: "$80",
    evalReset: "$63",
    fundedReset: "$1,079",
  },
];

const advancedPricing = [
  {
    size: "$25,000",
    evalFee: "$79",
    activationFee: "$0",
    evalReset: "$49",
    fundedReset: "$369",
  },
  {
    size: "$50,000",
    evalFee: "$109",
    activationFee: "$0",
    evalReset: "$65",
    fundedReset: "$529",
  },
  {
    size: "$100,000",
    evalFee: "$179",
    activationFee: "$0",
    evalReset: "$103",
    fundedReset: "$819",
  },
  {
    size: "$150,000",
    evalFee: "$229",
    activationFee: "$0",
    evalReset: "$126",
    fundedReset: "$1,119",
  },
];

const builderPricing = [
  {
    size: "$25,000",
    evalFee: "$109",
    activationFee: "$0",
    evalReset: "$60",
    fundedReset: "$379",
  },
  {
    size: "$50,000",
    evalFee: "$149",
    activationFee: "$0",
    evalReset: "$78",
    fundedReset: "$539",
  },
  {
    size: "$100,000",
    evalFee: "$239",
    activationFee: "$0",
    evalReset: "$119",
    fundedReset: "$839",
  },
  {
    size: "$150,000",
    evalFee: "$299",
    activationFee: "$0",
    evalReset: "$142",
    fundedReset: "$1,149",
  },
];

const standardAdvancedRules = {
  "$25,000": {
    profitTarget: "$1,500",
    maxDrawdown: "$1,000",
    dailyLoss: "$750",
  },
  "$50,000": {
    profitTarget: "$3,000",
    maxDrawdown: "$2,000",
    dailyLoss: "$1,500",
  },
  "$100,000": {
    profitTarget: "$6,000",
    maxDrawdown: "$3,000",
    dailyLoss: "$2,000",
  },
  "$150,000": {
    profitTarget: "$9,000",
    maxDrawdown: "$4,500",
    dailyLoss: "$3,000",
  },
};

const builderRules = {
  "$25,000": {
    profitTarget: "$1,500",
    maxDrawdown: "$1,500",
    dailyLoss: "$750",
  },
  "$50,000": {
    profitTarget: "$3,000",
    maxDrawdown: "$2,500",
    dailyLoss: "$1,500",
  },
  "$100,000": {
    profitTarget: "$6,000",
    maxDrawdown: "$4,000",
    dailyLoss: "$2,000",
  },
  "$150,000": {
    profitTarget: "$9,000",
    maxDrawdown: "$5,500",
    dailyLoss: "$3,000",
  },
};

const positionSizingGuidance = [
  {
    accountSize: "25K Account",
    description:
      "Designed for smaller position sizing with controlled contract exposure.",
  },
  {
    accountSize: "50K Account",
    description:
      "Allows increased contract capacity while maintaining structured risk limits.",
  },
  {
    accountSize: "100K Account",
    description:
      "Supports larger trade sizes suitable for more experienced traders.",
  },
  {
    accountSize: "150K Account",
    description:
      "Maximum contract capacity designed for advanced strategy deployment.",
  },
];

const Pricing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    if (searchParams.get("checkout") === "cancelled") {
      toast.info(
        "Checkout was cancelled. You can select a plan whenever you're ready.",
      );
      searchParams.delete("checkout");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleSelect = async (planType: string, accountSize: number) => {
    const key = `${planType}-${accountSize}`;

    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/pricing" } });
      return;
    }

    setLoadingKey(key);
    try {
      const res = await checkoutApi.createSession(planType, accountSize);
      window.location.href = res.data.checkoutUrl;
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("Unable to start checkout. Please try again.");
      }
      setLoadingKey(null);
    }
  };

  return (
    <Layout>
      <PageMeta
        title="Pricing & Plans"
        description="Compare Dynasty Futures evaluation plans — Standard, Advanced, and Builder. Account sizes from $25K to $150K with competitive evaluation fees and payout structures."
        path="/pricing"
      />
      {productSchemas.map((schema, i) => (
        <JsonLd key={`std-${i}`} data={schema} />
      ))}
      {advancedProductSchemas.map((schema, i) => (
        <JsonLd key={`adv-${i}`} data={schema} />
      ))}
      {builderProductSchemas.map((schema, i) => (
        <JsonLd key={`bld-${i}`} data={schema} />
      ))}
      <JsonLd
        data={breadcrumb([
          { name: 'Home', url: 'https://www.dynastyfuturesdyn.com/' },
          { name: 'Pricing & Plans', url: 'https://www.dynastyfuturesdyn.com/pricing' },
        ])}
      />
      <div className="relative min-h-screen">
        <div className="page-transition py-12 md:py-20 relative z-10">
          <div className="container mx-auto px-4">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Pricing & <span className="text-gradient">Plans</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Choose the plan that fits your trading style. Plans include
                static drawdown with plan-specific consistency requirements.
              </p>
              <p className="text-sm text-muted-foreground/80 mt-3">
                Max allocation is currently limited to 2 accounts per trader. This limit is expected to increase as the firm continues to grow.
              </p>
            </ScrollReveal>

            <section id="standard" className="mb-20 scroll-mt-24">
              <ScrollReveal className="glass-card-strong rounded-3xl border border-border/50 overflow-hidden">
                <div className="p-8 md:p-12 border-b border-border/30">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-dark to-primary p-0.5">
                      <div className="w-full h-full rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center p-1">
                        <PlanImage plan="standard" size={64} />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Standard Plan
                      </h2>
                      <p className="text-xl text-primary font-medium mb-2">
                        "Pass First, Activate Later"
                      </p>
                      <p className="text-muted-foreground max-w-xl">
                        Lower evaluation fee up front. If passed, a one-time $80
                        activation fee is required to activate your funded
                        account.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="overflow-x-auto mb-10">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/30">
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Account Size
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Evaluation Fee
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Activation Fee
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Eval Reset
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Funded Reset
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Profit Target
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Max Loss Limit
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Daily Loss Limit
                          </th>
                          <th className="py-4 px-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {standardPricing.map((row) => {
                          const rules =
                            standardAdvancedRules[
                              row.size as keyof typeof standardAdvancedRules
                            ];
                          return (
                            <tr
                              key={row.size}
                              className="border-b border-border/20 hover:bg-primary/5 transition-colors"
                            >
                              <td className="py-4 px-4 font-semibold text-foreground">
                                {row.size}
                              </td>
                              <td className="py-4 px-4 text-primary font-bold">
                                {row.evalFee}
                              </td>
                              <td className="py-4 px-4 text-muted-foreground">
                                {row.activationFee}
                              </td>
                              <td className="py-4 px-4 text-muted-foreground">
                                {row.evalReset}
                              </td>
                              <td className="py-4 px-4 text-muted-foreground">
                                {row.fundedReset}
                              </td>
                              <td className="py-4 px-4 text-foreground">
                                {rules.profitTarget}
                              </td>
                              <td className="py-4 px-4 text-foreground">
                                {rules.maxDrawdown}
                              </td>
                              <td className="py-4 px-4 text-foreground">
                                {rules.dailyLoss}
                              </td>
                              <td className="py-4 px-4">
                                <Button
                                  size="sm"
                                  variant="gradient-outline"
                                  disabled={
                                    loadingKey ===
                                    `standard-${parseInt(
                                      row.size.replace(/[$,]/g, ""),
                                    )}`
                                  }
                                  onClick={() =>
                                    handleSelect(
                                      "standard",
                                      parseInt(row.size.replace(/[$,]/g, "")),
                                    )
                                  }
                                >
                                  {loadingKey ===
                                  `standard-${parseInt(row.size.replace(/[$,]/g, ""))}`
                                    ? "Loading..."
                                    : "Select"}
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* Universal rules — same across all plans */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <ClockIcon size={20} />
                      <span className="text-sm text-foreground">
                        5-day payout cycles
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <CheckIcon size={20} />
                      <span className="text-sm text-foreground">
                        Copy trading allowed
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <ShieldIcon size={28} />
                      <span className="text-sm text-foreground">
                        Evaluations use a trailing end-of-day drawdown. Funded
                        accounts use a static drawdown.
                      </span>
                    </div>
                    {/* Plan-specific rules */}
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <CheckIcon size={20} />
                      <span className="text-sm text-foreground">
                        50% consistency rule (evaluation only)
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <DollarIcon size={20} />
                      <span className="text-sm text-foreground">
                        Low activation fee
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <CheckIcon size={20} />
                      <span className="text-sm text-foreground">
                        Overnight trading allowed
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6 text-center">
                    All plans renew monthly. Cancel anytime. Reset fees are
                    one-time and never billed monthly.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            <section id="advanced" className="mb-20 scroll-mt-24">
              <ScrollReveal className="glass-card-strong rounded-3xl border border-primary/40 overflow-hidden relative">
                <div className="p-8 md:p-12 border-b border-border/30">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-gold-light p-0.5">
                      <div className="w-full h-full rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center p-1">
                        <PlanImage plan="advanced" size={64} />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Advanced Plan
                      </h2>
                      <p className="text-xl text-gold-light font-medium mb-2">
                        "Instant Activation, No Activation Fee"
                      </p>
                      <p className="text-muted-foreground max-w-xl">
                        Pay once. When you pass, you're activated with no extra
                        activation cost.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="overflow-x-auto mb-10">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/30">
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Account Size
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Evaluation Fee
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Activation Fee
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Eval Reset
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Funded Reset
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Profit Target
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Max Loss Limit
                          </th>
                          <th className="py-4 px-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {advancedPricing.map((row) => {
                          const rules =
                            standardAdvancedRules[
                              row.size as keyof typeof standardAdvancedRules
                            ];
                          return (
                            <tr
                              key={row.size}
                              className="border-b border-border/20 hover:bg-primary/5 transition-colors"
                            >
                              <td className="py-4 px-4 font-semibold text-foreground">
                                {row.size}
                              </td>
                              <td className="py-4 px-4 text-gold-light font-bold">
                                {row.evalFee}
                              </td>
                              <td className="py-4 px-4 text-muted-foreground">
                                {row.activationFee}
                              </td>
                              <td className="py-4 px-4 text-muted-foreground">
                                {row.evalReset}
                              </td>
                              <td className="py-4 px-4 text-muted-foreground">
                                {row.fundedReset}
                              </td>
                              <td className="py-4 px-4 text-foreground">
                                {rules.profitTarget}
                              </td>
                              <td className="py-4 px-4 text-foreground">
                                {rules.maxDrawdown}
                              </td>
                              <td className="py-4 px-4">
                                <Button
                                  size="sm"
                                  variant="gradient"
                                  disabled={
                                    loadingKey ===
                                    `advanced-${parseInt(
                                      row.size.replace(/[$,]/g, ""),
                                    )}`
                                  }
                                  onClick={() =>
                                    handleSelect(
                                      "advanced",
                                      parseInt(row.size.replace(/[$,]/g, "")),
                                    )
                                  }
                                >
                                  {loadingKey ===
                                  `advanced-${parseInt(row.size.replace(/[$,]/g, ""))}`
                                    ? "Loading..."
                                    : "Select"}
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* Universal rules — same across all plans */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <ClockIcon size={20} />
                      <span className="text-sm text-foreground">
                        5-day payout cycles
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <CheckIcon size={20} />
                      <span className="text-sm text-foreground">
                        Copy trading allowed
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <ShieldIcon size={28} />
                      <span className="text-sm text-foreground">
                        Evaluations use a trailing end-of-day drawdown. Funded
                        accounts use a static drawdown.
                      </span>
                    </div>
                    {/* Plan-specific rules */}
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <CheckIcon size={20} />
                      <span className="text-sm text-foreground">
                        No consistency rule
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <CheckIcon size={20} />
                      <span className="text-sm text-foreground">
                        Immediate activation
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <CheckIcon size={20} />
                      <span className="text-sm text-foreground">
                        Priority support
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6 text-center">
                    All plans renew monthly. Cancel anytime.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            <section id="builder" className="mb-20 scroll-mt-24">
              <ScrollReveal className="glass-card-strong rounded-3xl border border-primary/40 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-primary/40 to-gold-light/40 backdrop-blur-sm text-primary text-xs font-semibold rounded-full border border-primary/40">
                  NEW
                </div>
                <div className="p-8 md:p-12 border-b border-border/30 relative">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-dark via-primary to-gold-light p-0.5">
                      <div className="w-full h-full rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center p-1">
                        <PlanImage plan="builder" size={64} />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Builder Plan
                      </h2>
                      <p className="text-xl text-primary font-medium mb-2">
                        "More Room to Execute"
                      </p>
                      <p className="text-muted-foreground max-w-xl">
                        Builder Plan is designed for traders who want more room
                        to execute their strategy. With a higher max loss limit
                        than the Standard Plan, it provides additional
                        flexibility while maintaining a structured evaluation
                        model.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12 relative">
                  <div className="overflow-x-auto mb-10">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/30">
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Account Size
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Evaluation Fee
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Activation Fee
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Eval Reset
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Funded Reset
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Profit Target
                          </th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">
                            Max Loss Limit
                          </th>
                          <th className="py-4 px-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {builderPricing.map((row) => {
                          const rules =
                            builderRules[row.size as keyof typeof builderRules];
                          return (
                            <tr
                              key={row.size}
                              className="border-b border-border/20 hover:bg-primary/5 transition-colors"
                            >
                              <td className="py-4 px-4 font-semibold text-foreground">
                                {row.size}
                              </td>
                              <td className="py-4 px-4 text-primary font-bold">
                                {row.evalFee}
                              </td>
                              <td className="py-4 px-4 text-muted-foreground">
                                {row.activationFee}
                              </td>
                              <td className="py-4 px-4 text-muted-foreground">
                                {row.evalReset}
                              </td>
                              <td className="py-4 px-4 text-muted-foreground">
                                {row.fundedReset}
                              </td>
                              <td className="py-4 px-4 text-foreground">
                                {rules.profitTarget}
                              </td>
                              <td className="py-4 px-4 text-foreground">
                                {rules.maxDrawdown}
                              </td>
                              <td className="py-4 px-4">
                                <Button
                                  size="sm"
                                  variant="gradient-outline"
                                  disabled={
                                    loadingKey ===
                                    `builder-${parseInt(
                                      row.size.replace(/[$,]/g, ""),
                                    )}`
                                  }
                                  onClick={() =>
                                    handleSelect(
                                      "builder",
                                      parseInt(row.size.replace(/[$,]/g, "")),
                                    )
                                  }
                                >
                                  {loadingKey ===
                                  `builder-${parseInt(row.size.replace(/[$,]/g, ""))}`
                                    ? "Loading..."
                                    : "Select"}
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {/* Universal rules — same across all plans */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <ClockIcon size={20} />
                      <span className="text-sm text-foreground">
                        5-day payout cycles
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <CheckIcon size={20} />
                      <span className="text-sm text-foreground">
                        Copy trading allowed
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <ShieldIcon size={28} />
                      <span className="text-sm text-foreground">
                        Evaluations use a trailing end-of-day drawdown. Funded
                        accounts use a static drawdown.
                      </span>
                    </div>
                    {/* Plan-specific rules */}
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <CheckIcon size={20} />
                      <span className="text-sm text-foreground">
                        50% consistency rule (evaluation only)
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <ShieldIcon size={20} />
                      <span className="text-sm text-foreground">
                        Largest max loss limits in the industry
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20">
                      <DollarIcon size={20} />
                      <span className="text-sm text-foreground">
                        No activation fee
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6 text-center">
                    All plans renew monthly. Cancel anytime.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            <section className="mb-20">
              <ScrollReveal className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Weekly{" "}
                  <span className="text-gradient-animated">Payout Limits</span>
                </h2>
                <p className="text-muted-foreground">
                  Plan comparison for the currently available offerings.
                </p>
              </ScrollReveal>
              <ScrollReveal
                className="glass-card rounded-2xl border border-border/50 overflow-hidden"
                delay={150}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/30 bg-muted/10">
                        <th className="text-left py-5 px-6 text-foreground font-semibold">
                          Plan
                        </th>
                        <th className="text-left py-5 px-6 text-foreground font-semibold">
                          Weekly Minimum
                        </th>
                        <th className="text-left py-5 px-6 text-foreground font-semibold">
                          Weekly Maximum
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/20 hover:bg-primary/5 transition-colors">
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-dark to-primary p-0.5">
                              <div className="w-full h-full rounded-xl bg-card/90 backdrop-blur-sm flex items-center justify-center p-0.5">
                                <PlanImage plan="standard" size={32} />
                              </div>
                            </div>
                            <div>
                              <span className="font-semibold text-foreground">
                                Standard
                              </span>
                              <p className="text-xs text-muted-foreground">
                                Monthly subscription, activation fee after pass
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-primary font-bold text-lg">
                          $500
                        </td>
                        <td className="py-5 px-6 text-foreground font-semibold">
                          $5,000/week
                        </td>
                      </tr>
                      <tr className="border-b border-border/20 hover:bg-primary/5 transition-colors">
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-gold-light p-0.5">
                              <div className="w-full h-full rounded-xl bg-card/90 backdrop-blur-sm flex items-center justify-center p-0.5">
                                <PlanImage plan="advanced" size={32} />
                              </div>
                            </div>
                            <div>
                              <span className="font-semibold text-foreground">
                                Advanced
                              </span>
                              <p className="text-xs text-muted-foreground">
                                Monthly subscription, no activation fee
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-gold-light font-bold text-lg">
                          $500
                        </td>
                        <td className="py-5 px-6 text-foreground font-semibold">
                          $7,000/week
                        </td>
                      </tr>
                      <tr className="hover:bg-primary/5 transition-colors">
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-dark via-primary to-gold-light p-0.5">
                              <div className="w-full h-full rounded-xl bg-card/90 backdrop-blur-sm flex items-center justify-center p-0.5">
                                <PlanImage plan="builder" size={32} />
                              </div>
                            </div>
                            <div>
                              <span className="font-semibold text-foreground">
                                Builder
                              </span>
                              <p className="text-xs text-muted-foreground">
                                Higher max loss limit, no activation fee
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6 text-primary font-bold text-lg">
                          $500
                        </td>
                        <td className="py-5 px-6 text-foreground font-semibold">
                          $7,000/week
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 p-6 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/30">
                  <h4 className="font-display font-semibold text-foreground mb-4">
                    Monthly Maximum Payout Caps
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card/60 backdrop-blur-sm">
                      <span className="text-sm text-muted-foreground">
                        Standard Plan
                      </span>
                      <span className="font-semibold text-primary">
                        $20,000/month
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card/60 backdrop-blur-sm">
                      <span className="text-sm text-muted-foreground">
                        Advanced Plan
                      </span>
                      <span className="font-semibold text-gold-light">
                        $28,000/month
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card/60 backdrop-blur-sm">
                      <span className="text-sm text-muted-foreground">
                        Builder Plan
                      </span>
                      <span className="font-semibold text-primary">
                        $28,000/month
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            <ScrollReveal as="section" className="mb-12">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Tradable Futures Markets
                </h2>
              </div>
              <div className="glass-card rounded-2xl border border-border/50 overflow-hidden">
                <div className="p-6 md:p-8">
                  <p className="text-muted-foreground max-w-3xl mx-auto text-center">
                    Dynasty Futures traders can trade a wide range of globally
                    recognized futures markets through our professional trading
                    infrastructure. Available instruments include major equity
                    index futures, energy markets, metals, and other commonly
                    traded futures contracts.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <section className="mb-20">
              <ScrollReveal className="text-center mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Position Sizing{" "}
                  <span className="text-gradient">by Account Size</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Position sizing limits are determined by account size to
                  promote responsible risk management. Larger account sizes
                  allow for increased contract capacity while maintaining
                  structured exposure limits.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <Accordion type="single" collapsible className="space-y-4">
                  {positionSizingGuidance.map((item) => (
                    <AccordionItem
                      key={item.accountSize}
                      value={item.accountSize}
                      className="glass-card rounded-xl border border-border/50 px-6"
                    >
                      <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline py-5">
                        {item.accountSize}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground pb-4">
                          {item.description}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollReveal>
              <p className="text-sm text-muted-foreground text-center mt-6">
                Position sizing controls risk exposure and is enforced
                automatically.
              </p>
            </section>

            <ScrollReveal as="section" className="mb-12">
              <div className="glass-card rounded-2xl border border-border/50 p-6 md:p-8 text-center">
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  Long Term Payout Structure
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                  After five approved payouts, traders move into an 80/20 profit
                  split with eighty percent going to the trader. There is no
                  forced transition to a live account at that stage. Many traders
                  prefer staying in the environment they already know, and we
                  built this structure to support that choice.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
