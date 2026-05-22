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
import { PlanImage } from "@/components/icons/PlanIcons";
import { useAuth } from "@/hooks/useAuth";
import { checkoutApi } from "@/services/checkout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ApiError } from "@/types/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const standardPricing = [
  {
    size: "$25,000",
    evalFee: "$59",
    activationFee: "$80",
    evalReset: "$30",
    fundedReset: "$119",
  },
  {
    size: "$50,000",
    evalFee: "$79",
    activationFee: "$80",
    evalReset: "$40",
    fundedReset: "$159",
  },
  {
    size: "$100,000",
    evalFee: "$129",
    activationFee: "$80",
    evalReset: "$65",
    fundedReset: "$259",
  },
  {
    size: "$150,000",
    evalFee: "$159",
    activationFee: "$80",
    evalReset: "$80",
    fundedReset: "$319",
  },
];

const advancedPricing = [
  {
    size: "$25,000",
    evalFee: "$79",
    activationFee: "$0",
    evalReset: "$40",
    fundedReset: "$159",
  },
  {
    size: "$50,000",
    evalFee: "$109",
    activationFee: "$0",
    evalReset: "$55",
    fundedReset: "$219",
  },
  {
    size: "$100,000",
    evalFee: "$179",
    activationFee: "$0",
    evalReset: "$90",
    fundedReset: "$359",
  },
  {
    size: "$150,000",
    evalFee: "$229",
    activationFee: "$0",
    evalReset: "$115",
    fundedReset: "$459",
  },
];

const builderPricing = [
  {
    size: "$25,000",
    evalFee: "$109",
    activationFee: "$0",
    evalReset: "$55",
    fundedReset: "$219",
  },
  {
    size: "$50,000",
    evalFee: "$149",
    activationFee: "$0",
    evalReset: "$75",
    fundedReset: "$299",
  },
  {
    size: "$100,000",
    evalFee: "$239",
    activationFee: "$0",
    evalReset: "$120",
    fundedReset: "$479",
  },
  {
    size: "$150,000",
    evalFee: "$299",
    activationFee: "$0",
    evalReset: "$150",
    fundedReset: "$599",
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
    maxDrawdown: "$2,500",
    dailyLoss: "$2,000",
  },
  "$150,000": {
    profitTarget: "$8,000",
    maxDrawdown: "$4,000",
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
    maxDrawdown: "$3,500",
    dailyLoss: "$2,000",
  },
  "$150,000": {
    profitTarget: "$8,000",
    maxDrawdown: "$5,000",
    dailyLoss: "$3,000",
  },
};

const maxPositionSizes = {
  standard: {
    "$25,000": "1 mini / 10 micros",
    "$50,000": "5 minis / 50 micros",
    "$100,000": "10 minis / 100 micros",
    "$150,000": "15 minis / 150 micros",
  },
  advanced: {
    "$25,000": "1 mini / 10 micros",
    "$50,000": "5 minis / 50 micros",
    "$100,000": "10 minis / 100 micros",
    "$150,000": "15 minis / 150 micros",
  },
  builder: {
    "$25,000": "1 mini / 10 micros",
    "$50,000": "3 minis / 30 micros",
    "$100,000": "6 minis / 60 micros",
    "$150,000": "8 minis / 80 micros",
  },
};

type PlanKey = "standard" | "advanced" | "builder";

const planConfig: Record<
  PlanKey,
  {
    label: string;
    tagline: string;
    description: string;
    evalConsistencyRule: string;
    fundedConsistencyRule: string;
    pricing: typeof standardPricing;
    rules: typeof standardAdvancedRules;
    maxPositionSize: Record<string, string>;
  }
> = {
  standard: {
    label: "Standard Plan",
    tagline: "Pass First, Activate Later",
    description:
      "Lower evaluation fee up front. If passed, a one-time $80 activation fee is required to activate your funded account.",
    evalConsistencyRule: "50%",
    fundedConsistencyRule: "None",
    pricing: standardPricing,
    rules: standardAdvancedRules,
    maxPositionSize: maxPositionSizes.standard,
  },
  advanced: {
    label: "Advanced Plan",
    tagline: "Instant Activation, No Activation Fee",
    description:
      "Pay once. When you pass, you're activated with no extra activation cost.",
    evalConsistencyRule: "None",
    fundedConsistencyRule: "None",
    pricing: advancedPricing,
    rules: standardAdvancedRules,
    maxPositionSize: maxPositionSizes.advanced,
  },
  builder: {
    label: "Builder Plan",
    tagline: "More Room to Execute",
    description:
      "Designed for traders who want more room to execute their strategy. With a higher max loss limit than the Standard Plan, it provides additional flexibility while maintaining a structured evaluation model.",
    evalConsistencyRule: "50%",
    fundedConsistencyRule: "40%",
    pricing: builderPricing,
    rules: builderRules,
    maxPositionSize: maxPositionSizes.builder,
  },
};

const accountSizeOptions = [
  { label: "25K", value: "$25,000" },
  { label: "50K", value: "$50,000" },
  { label: "100K", value: "$100,000" },
  { label: "150K", value: "$150,000" },
];

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
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("standard");
  const [selectedSize, setSelectedSize] = useState<string>("$50,000");

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

  const handlePlanChange = (plan: PlanKey) => {
    setSelectedPlan(plan);
    setSelectedSize("$50,000");
  };

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

  const currentPlan = planConfig[selectedPlan];
  const currentPricing = currentPlan.pricing.find(
    (p) => p.size === selectedSize,
  )!;
  const currentRules =
    currentPlan.rules[selectedSize as keyof typeof currentPlan.rules];
  const currentMaxPosition =
    currentPlan.maxPositionSize[selectedSize] ?? "N/A";
  const sizeNum = parseInt(selectedSize.replace(/[$,]/g, ""));
  const isLoading = loadingKey === `${selectedPlan}-${sizeNum}`;

  const tableRows = [
    {
      label: "Profit Target",
      evaluation: currentRules?.profitTarget ?? "N/A",
      funded: "None",
    },
    {
      label: "Max Drawdown",
      evaluation: currentRules?.maxDrawdown ?? "N/A",
      funded: currentRules?.maxDrawdown ?? "N/A",
    },
    {
      label: "Daily Loss Limit",
      evaluation:
        selectedPlan === "standard"
          ? (currentRules?.dailyLoss ?? "N/A")
          : "N/A",
      funded:
        selectedPlan === "standard"
          ? (currentRules?.dailyLoss ?? "N/A")
          : "N/A",
    },
    {
      label: "Max Position Size",
      evaluation: currentMaxPosition,
      funded: currentMaxPosition,
    },
    {
      label: "Consistency Rule",
      evaluation: currentPlan.evalConsistencyRule,
      funded: currentPlan.fundedConsistencyRule,
    },
    {
      label: "Activation Fee",
      evaluation: "N/A",
      funded:
        currentPricing?.activationFee === "$0"
          ? "None"
          : (currentPricing?.activationFee ?? "N/A"),
    },
    {
      label: "Eval Reset",
      evaluation: currentPricing?.evalReset ?? "N/A",
      funded: "N/A",
    },
    {
      label: "Funded Reset",
      evaluation: "N/A",
      funded: currentPricing?.fundedReset ?? "N/A",
    },
    { label: "Payout Cycle", evaluation: "N/A", funded: "5-day cycles" },
    { label: "Funded Profit Split", evaluation: "N/A", funded: "90/10" },
    { label: "Copy Trading", evaluation: "Allowed", funded: "Allowed" },
  ];

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
          { name: "Home", url: "https://www.dynastyfuturesdyn.com/" },
          {
            name: "Pricing & Plans",
            url: "https://www.dynastyfuturesdyn.com/pricing",
          },
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
                Our evaluations are extremely straightforward. Plans include
                end-of-day trailing drawdown on all evaluations, and static
                drawdown on all funded accounts. No hidden rules, just the max
                drawdown rule. Prove you can trade profitably and manage risk,
                pass your evaluation, and become a Dynasty Futures Funded
                Trader.
              </p>
              <p className="text-sm text-muted-foreground/80 mt-3">
                Max allocation is currently 3 accounts. We plan to increase
                this as the firm continues to grow.
              </p>
            </ScrollReveal>

            {/* Interactive Pricing Selector */}
            <section className="mb-20">
              <ScrollReveal className="glass-card-strong rounded-3xl border border-border/50 overflow-hidden p-8 md:p-12">
                {/* Plan Selector */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {(Object.keys(planConfig) as PlanKey[]).map((plan) => (
                    <button
                      key={plan}
                      onClick={() => handlePlanChange(plan)}
                      className={cn(
                        "px-8 py-6 rounded-xl font-display font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex flex-col items-center gap-2.5 min-w-[180px]",
                        selectedPlan === plan
                          ? "bg-gradient-to-r from-gold-dark via-primary to-gold-light text-white border border-primary/60 shadow-lg shadow-primary/20"
                          : "border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground bg-transparent",
                      )}
                    >
                      <PlanImage
                        plan={plan}
                        size={36}
                        className={
                          selectedPlan === plan
                            ? "brightness-0 invert drop-shadow-sm"
                            : undefined
                        }
                      />
                      <span>{planConfig[plan].label}</span>
                      <span
                        className={cn(
                          "text-xs font-normal font-sans leading-tight text-center",
                          selectedPlan === plan
                            ? "text-white/80"
                            : "text-muted-foreground/70",
                        )}
                      >
                        {planConfig[plan].tagline}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Account Size Selector */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {accountSizeOptions.map((opt) => {
                    const evalFee =
                      currentPlan.pricing.find((p) => p.size === opt.value)
                        ?.evalFee ?? "";
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedSize(opt.value)}
                        className={cn(
                          "px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 min-w-[88px] text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                          selectedSize === opt.value
                            ? "bg-primary/15 text-primary border border-primary/60 shadow-sm"
                            : "border border-border/40 text-muted-foreground hover:border-primary/30 hover:text-foreground bg-transparent",
                        )}
                      >
                        <div className="font-bold">{opt.label}</div>
                        <div className="text-xs mt-0.5 opacity-90">
                          {evalFee}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Data Display Table */}
                <div className="rounded-xl border border-border/30 overflow-hidden mb-8">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/30 bg-muted/20">
                        <th className="text-left py-4 px-5 font-semibold text-foreground">
                          Rule
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-foreground">
                          Evaluation
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-foreground">
                          Funded
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((row, idx) => (
                        <tr
                          key={row.label}
                          className={cn(
                            "border-b border-border/20 last:border-0 transition-colors",
                            idx % 2 === 0 ? "bg-transparent" : "bg-muted/5",
                          )}
                        >
                          <td className="py-4 px-5 text-muted-foreground">
                            {row.label}
                          </td>
                          <td className="py-4 px-4 text-center font-semibold text-foreground">
                            {row.evaluation}
                          </td>
                          <td className="py-4 px-4 text-center font-semibold text-foreground">
                            {row.funded}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <Button
                    size="lg"
                    variant="gradient"
                    disabled={isLoading}
                    onClick={() => handleSelect(selectedPlan, sizeNum)}
                    className="px-10"
                  >
                    {isLoading ? "Loading..." : `Get Started — ${selectedSize}`}
                  </Button>
                </div>

                {/* Disclaimer */}
                <p className="text-sm text-muted-foreground mt-6 text-center">
                  Evaluation accounts are subscription-based and renew monthly unless canceled prior to the next billing cycle. You may cancel at any time before renewal. Reset fees are one-time purchases and are never billed monthly.
                </p>
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
                  Profit Split & Long Term Payout Structure
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                  Funded accounts operate on a <span className="text-foreground font-semibold">90/10 profit split</span> — you keep 90% of all profits. After five approved payouts, traders move into our long-term payout structure with an <span className="text-foreground font-semibold">80/20 profit split</span>, with 80% going to the trader. There is no forced transition to a live account at that stage. Many traders prefer staying in the environment they already know, and we built this structure to support that choice.
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
