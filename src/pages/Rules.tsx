import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { breadcrumb } from "@/components/seo/JsonLd";
import {
  CheckIcon,
  ShieldIcon,
  ClockIcon,
  DollarIcon,
} from "@/components/icons/PlanIcons";
import {
  Moon,
  Calendar,
  Newspaper,
  Copy,
  Bot,
  PauseCircle,
  Lock,
  TrendingDown,
  ChevronDown,
  ChevronRight,
  Search,
  Check,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const universalRules = [
  {
    icon: ShieldIcon,
    title: "Drawdown Rules",
    description:
      "Evaluations use trailing end-of-day drawdown. Funded accounts use static drawdown.",
    allowed: true,
  },
  {
    icon: Moon,
    title: "Overnight Trading Allowed",
    description: "You may hold trades overnight within the trading week.",
    allowed: true,
  },
  {
    icon: Calendar,
    title: "Weekend Holds NOT Allowed",
    description:
      "All trades must be closed before the market closes for the week.",
    allowed: false,
  },
  {
    icon: ClockIcon,
    title: "Daily Scheduled Maintenance",
    description:
      "Dynasty Futures observes a daily scheduled maintenance window from 4:20 PM Eastern Time to 6:00 PM Eastern Time, ending when the futures market reopens. During this time, platform access, account updates, trading availability, and system functions may be temporarily unavailable or limited.",
    allowed: false,
  },
  {
    icon: Newspaper,
    title: "No News Trading",
    label: "News Trading Restriction",
    description:
      "To protect traders and maintain fair market conditions, Dynasty Futures prohibits opening new positions, increasing existing positions, or placing pending orders intended to trigger during major scheduled news events. This restriction applies from 2 minutes before to 2 minutes after the release time of designated events, including CPI, PPI, Non-Farm Payrolls, and FOMC rate decisions. Traders may reduce or close existing positions during this window for risk management purposes.",
    allowed: false,
  },
  {
    icon: Copy,
    title: "Copy Trading Allowed on ALL Plans",
    description:
      "You may use copy trade platforms, trade copiers, your own accounts as masters, and social trading tools.",
    allowed: true,
  },
  {
    icon: Bot,
    title: "No Bots / No Automated Trading Systems",
    description: "All trading must be manually executed. Bots are not allowed.",
    allowed: false,
  },
  {
    icon: PauseCircle,
    title: "Trading Freeze During Payout Processing",
    description:
      "After submitting a payout request, traders may not place any new trades until the payout has been approved and deducted from the simulated account balance, or until the payout request is denied. This rule ensures accurate balance calculations and prevents conflicts during payout processing.",
    allowed: false,
  },
  {
    icon: Lock,
    title: "Withdrawal Buffer Freeze",
    description:
      "Open positions must be closed or hedged before payout processing.",
    allowed: false,
  },
  {
    icon: ClockIcon,
    title: "Payout Processing Window",
    description:
      "Dynasty Futures reviews and approves payout requests on a daily basis. Once approved, payouts are submitted through Rise for processing and verification. Most approved payouts are submitted promptly, though timing may vary depending on verification status and processing requirements.",
    allowed: true,
  },
  {
    icon: ClockIcon,
    title: "Cutoff Time",
    description:
      "Requests submitted before 2:00 PM CT begin processing the same business day. Requests submitted after 2:00 PM CT begin processing the next business day.",
    allowed: true,
  },
  {
    icon: DollarIcon,
    title: "Payout Delivery Time",
    description:
      "After Dynasty Futures approval, payouts are processed through Rise. Delivery timing depends on successful verification and Rise processing timelines. Most payouts are completed within a reasonable processing window once verification is complete.",
    allowed: true,
  },
  {
    icon: DollarIcon,
    title: "50% Withdrawal Limit",
    description:
      "Traders may withdraw up to 50% of their account balance per payout request. The remaining balance must stay in the account.",
    allowed: true,
  },
  {
    icon: Calendar,
    title: "5-Payout Rolling Cap (Universal Rule)",
    description:
      "For all account types across every plan, traders may request up to 4 payouts per calendar month. To be eligible for a payout, the trader must have completed at least 5 separate trading days since their last payout request, and each of those days must meet or exceed the required daily P&L threshold for their specific account size. This rule applies universally to all accounts that operate under the 5-day payout schedule.",
    allowed: true,
  },
  {
    icon: TrendingDown,
    title: "Daily Loss Limit (Standard Plan Evaluation Only)",
    label: "Hard Breach — Account Closed",
    description:
      "The Daily Loss Limit applies only to Standard Plan evaluation accounts. If the Daily Loss Limit is hit or exceeded during the evaluation phase, it is a hard breach and the account will be closed immediately. Traders are responsible for monitoring their daily P&L and stopping before the limit is reached. The Daily Loss Limit does not apply to Advanced or Builder plans, and it does not apply to funded accounts.",
    allowed: false,
  },
  {
    icon: TrendingDown,
    title: "Post-Payout MLL Reset",
    description:
      "After a payout is processed, your Maximum Loss Limit (MLL) is reset to $0.00. Your remaining post-payout balance becomes your entire loss buffer. If losses reduce your account balance to $0.00 or below, the account is failed.",
    allowed: false,
  },
  {
    icon: ShieldIcon,
    title: "Resets vs. New Accounts",
    description:
      "Resets preserve account continuity, payout eligibility, and trading history. Purchasing a new account creates a brand-new account with fresh eligibility requirements and payout restrictions.",
    allowed: true,
  },
  {
    icon: DollarIcon,
    title: "Funded Profit Split",
    description:
      "Funded accounts operate on a 90/10 profit split, with traders keeping 90% of approved profits. After five (5) approved payouts, accounts may be internally reviewed for potential live trading consideration based on consistency, risk management, compliance history, operational availability, broker/platform support, and jurisdictional eligibility. Live trading placement is not guaranteed and remains subject to Dynasty Futures approval and applicable legal/compliance requirements.",
    allowed: true,
  },
  {
    icon: ClockIcon,
    title: "Minimum Trade Duration Requirement",
    label: "10-Second Minimum Hold",
    description:
      "All trades must be held for a minimum of ten (10) seconds. Trading activity that consistently enters and exits positions in less than ten seconds may impact funded status eligibility, payout eligibility, or continued participation in Dynasty Futures programs. Dynasty Futures reserves the right to review trading activity and determine compliance with the intended purpose of the evaluation and funded account programs.",
    allowed: false,
  },
  {
    icon: Lock,
    title: "Account Ownership Requirement",
    description:
      "All Dynasty Futures accounts must be traded solely by the individual who purchased and registered the account. Purchasing an account for another person, allowing another individual to trade on your behalf, sharing account credentials, or otherwise transferring account control is strictly prohibited. Accounts must remain under the control of the original account holder at all times. Violations may result in account review, suspension, payout denial, account termination, or loss of funded eligibility.",
    allowed: false,
  },
  {
    icon: ShieldIcon,
    title: "IP Address & Device Compliance",
    description:
      "Dynasty Futures monitors account activity for compliance and risk management purposes. Multiple traders operating from the same IP address, device, network, VPN environment, or location may be subject to additional review. Users may be asked to verify account ownership and trading activity when unusual account relationships or coordinated trading behavior are detected. Activity designed to circumvent account ownership rules, create artificial trading performance, manipulate evaluations, or coordinate trading between multiple individuals may result in account restrictions, payout review, funded-status review, or account termination.",
    allowed: false,
  },
  {
    icon: TrendingDown,
    title: "Hedging Policy",
    label: "Hedging Prohibited",
    description:
      "Hedging is prohibited within the Dynasty Futures ecosystem. This includes hedging positions between multiple Dynasty Futures accounts; hedging positions between accounts owned by different individuals; coordinated trading designed to offset risk across multiple traders; hedging correlated assets with the intent of reducing or eliminating market exposure; and trading opposite positions across accounts using shared IP addresses, shared devices, shared households, shared business entities, or coordinated groups. Accounts identified as participating in hedging activity may be subject to investigation, payout denial, funded-status review, account suspension, or account termination.",
    allowed: false,
  },
];

const accountRules = [
  {
    size: "25K Account",
    profitTarget: "$1,500",
    standardAdvancedMaxDrawdown: "$1,000",
    builderMaxDrawdown: "$1,500",
    dailyLoss: "$750",
  },
  {
    size: "50K Account",
    profitTarget: "$3,000",
    standardAdvancedMaxDrawdown: "$2,000",
    builderMaxDrawdown: "$2,500",
    dailyLoss: "$1,500",
  },
  {
    size: "100K Account",
    profitTarget: "$6,000",
    standardAdvancedMaxDrawdown: "$2,500",
    builderMaxDrawdown: "$3,500",
    dailyLoss: "$2,000",
  },
  {
    size: "150K Account",
    profitTarget: "$9,000",
    standardAdvancedMaxDrawdown: "$4,000",
    builderMaxDrawdown: "$4,500",
    dailyLoss: "$3,000",
  },
];

const planRules = [
  {
    name: "Standard Plan",
    tagline: "Pass First, Activate Later",
    features: [
      "Evaluation Fee + $80 Activation Fee (after passing)",
      "Evaluations use trailing end-of-day drawdown. Funded accounts use static drawdown.",
      "50% consistency rule (evaluation only)",
      "5-day payout cycles",
      "Copy trading allowed",
      "One funded reset allowed per account",
    ],
    eligibility:
      "Payout Eligibility: To be eligible for a payout, traders must have at least 5 Winning Days, each with a profit of $150 or more.",
  },
  {
    name: "Advanced Plan",
    tagline: "Instant Activation, No Activation Fee",
    features: [
      "You pay only the evaluation fee. No extra costs.",
      "Evaluations use trailing end-of-day drawdown. Funded accounts use static drawdown.",
      "No consistency rule",
      "Immediate activation",
      "5-day payout cycles",
      "Copy trading allowed",
      "One funded reset allowed per account",
    ],
    eligibility:
      "Payout Eligibility: To be eligible for a payout, traders must have at least 5 Winning Days, each with a profit of $200 or more.",
  },
  {
    name: "Builder Plan",
    tagline: "More Room to Execute",
    features: [
      "Higher max loss limit than Standard",
      "50% consistency rule (evaluation) / 40% consistency rule (funded)",
      "No activation fee",
      "5-day payout cycles",
      "Evaluations use trailing end-of-day drawdown. Funded accounts use static drawdown.",
      "Copy trading allowed",
      "One funded reset allowed per account",
    ],
    eligibility:
      "Payout Eligibility: To be eligible for a payout, traders must have at least 5 Winning Days, each with a profit of $200 or more.",
  },
];

// Universal Rules Accordion Component
const UniversalRulesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "allowed" | "restricted"
  >("all");
  const [expandedRules, setExpandedRules] = useState<string[]>([]);
  const [subAccordionValue, setSubAccordionValue] = useState<string[]>([]);

  const allowedRules = universalRules.filter((rule) => rule.allowed);
  const restrictedRules = universalRules.filter((rule) => !rule.allowed);

  const filterRules = (rules: typeof universalRules) => {
    if (!searchQuery) return rules;
    return rules.filter(
      (rule) =>
        rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const filteredAllowedRules = useMemo(
    () => filterRules(allowedRules),
    [searchQuery],
  );
  const filteredRestrictedRules = useMemo(
    () => filterRules(restrictedRules),
    [searchQuery],
  );

  const visibleAllowedRules =
    activeFilter === "restricted" ? [] : filteredAllowedRules;
  const visibleRestrictedRules =
    activeFilter === "allowed" ? [] : filteredRestrictedRules;

  const totalVisibleRules =
    visibleAllowedRules.length + visibleRestrictedRules.length;

  const handleExpandAll = () => {
    const allRuleIds = universalRules.map((r) => r.title);
    setExpandedRules(allRuleIds);
    setSubAccordionValue(["allowed", "restricted"]);
  };

  const handleCollapseAll = () => {
    setExpandedRules([]);
    setSubAccordionValue([]);
  };

  const toggleRule = (title: string) => {
    setExpandedRules((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const RuleRow = ({ rule }: { rule: (typeof universalRules)[0] }) => {
    const Icon = rule.icon;
    const isExpanded = expandedRules.includes(rule.title);

    return (
      <div className="border-b border-border/20 last:border-b-0">
        <button
          onClick={() => toggleRule(rule.title)}
          className="w-full flex items-center justify-between p-3 hover:bg-muted/10 transition-colors text-left"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center bg-muted/30">
              {rule.allowed ? (
                <Check size={14} className="text-muted-foreground" />
              ) : (
                <X size={14} className="text-muted-foreground" />
              )}
            </div>
            <span className="text-sm font-medium text-foreground truncate">
              {rule.title}
            </span>
          </div>
          <ChevronRight
            size={16}
            className={cn(
              "text-muted-foreground flex-shrink-0 transition-transform duration-200",
              isExpanded && "rotate-90",
            )}
          />
        </button>
        {isExpanded && (
          <div className="px-3 pb-3 pl-12">
            {"label" in rule && rule.label && (
              <p className="text-sm font-semibold text-foreground mb-1">{rule.label}</p>
            )}
            <p className="text-sm text-muted-foreground">{rule.description}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Accordion type="single" collapsible className="mb-20">
      <AccordionItem
        value="universal-rules"
        className="bg-gradient-card rounded-2xl border border-border/50 overflow-hidden"
      >
        <AccordionTrigger className="px-6 py-5 hover:no-underline [&[data-state=open]>div>.chevron]:rotate-180">
          <div className="flex items-center justify-between w-full pr-4">
            <div className="text-left">
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                Universal Rules
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Applies to ALL Accounts & ALL Plans
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-md">
                {universalRules.length} rules
              </span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-6">
          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pt-2">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Search Input */}
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Search rules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-8 text-sm w-[180px] bg-muted/20 border-border/30"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-muted/20 border border-border/30">
                {(["all", "allowed", "restricted"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "px-3 py-1 rounded-md text-xs font-medium transition-all capitalize",
                      activeFilter === filter
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Expand/Collapse All */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleExpandAll}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Expand all
              </button>
              <span className="text-muted-foreground/50">|</span>
              <button
                onClick={handleCollapseAll}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Collapse all
              </button>
            </div>
          </div>

          {/* Sub-Accordions */}
          <Accordion
            type="multiple"
            value={subAccordionValue}
            onValueChange={setSubAccordionValue}
            className="space-y-4"
          >
            {/* Allowed & Approved */}
            {visibleAllowedRules.length > 0 && (
              <ScrollReveal delay={0}>
                <AccordionItem
                  value="allowed"
                  className="rounded-xl border border-border/30 bg-card/30 overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/10">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md flex items-center justify-center bg-muted/30">
                        <Check size={12} className="text-muted-foreground" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        Allowed & Approved
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({visibleAllowedRules.length})
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pb-0">
                    <div className="border-t border-border/20">
                      {visibleAllowedRules.map((rule, index) => (
                        <ScrollReveal key={rule.title} delay={index * 100}>
                          <RuleRow rule={rule} />
                        </ScrollReveal>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            )}

            {/* Restricted & Prohibited */}
            {visibleRestrictedRules.length > 0 && (
              <ScrollReveal delay={150}>
                <AccordionItem
                  value="restricted"
                  className="rounded-xl border border-border/30 bg-card/30 overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/10">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md flex items-center justify-center bg-muted/30">
                        <X size={12} className="text-muted-foreground" />
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        Restricted & Prohibited
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({visibleRestrictedRules.length})
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pb-0">
                    <div className="border-t border-border/20">
                      {visibleRestrictedRules.map((rule, index) => (
                        <ScrollReveal key={rule.title} delay={index * 100}>
                          <RuleRow rule={rule} />
                        </ScrollReveal>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </ScrollReveal>
            )}
          </Accordion>

          {totalVisibleRules === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No rules match your search.</p>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const Rules = () => {
  return (
    <Layout>
      <PageMeta
        title="Trading Rules"
        description="Dynasty Futures trading rules and objectives for Standard, Advanced, and Builder evaluation plans. Daily loss limits, trailing drawdowns, profit targets, and more."
        path="/rules"
      />
      <JsonLd
        data={breadcrumb([
          { name: 'Home', url: 'https://www.dynastyfuturesdyn.com/' },
          { name: 'Trading Rules', url: 'https://www.dynastyfuturesdyn.com/rules' },
        ])}
      />
      <div className="page-transition py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Rules &{" "}
                <span className="text-gradient-animated">Definitions</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Official Trading Rules for Dynasty Futures. Applies to ALL plans
                unless otherwise stated.
              </p>
              <p className="text-sm text-muted-foreground/80 mt-3">
                Max allocation is currently 3 accounts. We plan to increase
                this as the firm continues to grow.
              </p>
            </div>
          </ScrollReveal>

          {/* Universal Rules */}
          <ScrollReveal as="section">
            <UniversalRulesSection />
          </ScrollReveal>

          {/* Account-Specific Rules */}
          <section id="account-rules" className="mb-20 scroll-mt-24">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                <span className="text-gradient-animated">
                  Account-Specific Rules
                </span>
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accountRules.map((account, index) => (
                <ScrollReveal key={account.size} delay={index * 100}>
                  <div className="bg-gradient-card rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]">
                    <h3 className="font-display text-xl font-bold text-gradient-animated mb-4">
                      {account.size}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border/30">
                        <span className="text-sm text-muted-foreground">
                          Profit Target
                        </span>
                        <span className="font-semibold text-foreground">
                          {account.profitTarget}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/30">
                        <span className="text-sm text-muted-foreground">
                          Standard/Advanced Max Loss
                        </span>
                        <span className="font-semibold text-foreground">
                          {account.standardAdvancedMaxDrawdown}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/30">
                        <span className="text-sm text-muted-foreground">
                          Builder Max Loss
                        </span>
                        <span className="font-semibold text-foreground">
                          {account.builderMaxDrawdown}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border/30">
                        <span className="text-sm text-muted-foreground">
                          Daily Loss Limit (Standard Plan Only)
                        </span>
                        <span className="font-semibold text-foreground">
                          {account.dailyLoss}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-muted-foreground">
                          Overnight
                        </span>
                        <span className="text-primary text-sm">Allowed</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-muted-foreground">
                          Weekend Holds
                        </span>
                        <span className="text-destructive text-sm">
                          Not Allowed
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Plan Rules */}
          <section id="plan-rules" className="mb-20 scroll-mt-24">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                <span className="text-gradient-animated">Plan Rules</span>
              </h2>
            </ScrollReveal>

            <div className="grid lg:grid-cols-3 gap-6">
              {planRules.map((plan, index) => (
                <ScrollReveal key={plan.name} delay={index * 100}>
                  <div className="bg-gradient-card rounded-2xl border border-border/50 p-6 transition-all duration-300 hover:border-primary/30 hover:scale-[1.02]">
                    <div className="mb-4">
                      <Link
                        to={`/pricing#${
                          index === 0
                            ? "standard"
                            : index === 1
                              ? "advanced"
                              : "builder"
                        }`}
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 hover:scale-105 transition-transform ${
                          index === 0
                            ? "bg-primary/20 text-primary hover:bg-primary/30"
                            : index === 1
                              ? "bg-gold-dark/20 text-gold-dark hover:bg-gold-dark/30"
                              : "bg-gold-light/20 text-gold-light hover:bg-gold-light/30"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}. {plan.name}
                      </Link>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        "{plan.tagline}"
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-primary mt-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {plan.eligibility && (
                      <div className="mt-4 pt-4 border-t border-border/30">
                        <p className="text-sm text-primary font-medium">
                          {plan.eligibility}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Static Drawdown Explanation */}
          <section className="mb-20">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                  <span className="text-gradient-animated">
                    Drawdown Rules
                  </span>{" "}
                  Explained
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground mb-4">
                    <strong className="text-foreground">Evaluations</strong>{" "}
                    use trailing end-of-day drawdown. This means the drawdown
                    level follows your highest end-of-day balance, reducing
                    your available drawdown as your account grows.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    <strong className="text-foreground">Funded accounts</strong>{" "}
                    use static drawdown — a fixed maximum loss limit that does
                    not change based on your account's equity. For example, if
                    you have a $100,000 funded account with a $2,500 static
                    drawdown, your account will be violated if your balance
                    drops below $97,500 at any point, regardless of profits
                    made.
                  </p>
                  <p className="text-muted-foreground">
                    Static drawdown on funded accounts provides traders with
                    more flexibility and reduces the pressure that comes with
                    trailing drawdown systems.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Builder Plan */}
          <section className="mb-20">
            <ScrollReveal delay={0}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                <span className="text-gradient-animated">
                  Builder Plan
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="bg-gradient-card rounded-2xl border border-border/50 overflow-hidden">
                <div className="p-8 md:p-10 space-y-5">
                  <p className="text-muted-foreground">
                    Builder Plan is designed for traders who want more room to operate. With higher maximum loss limits, traders have increased flexibility to manage positions, navigate volatility, and avoid getting stopped out prematurely.
                  </p>
                  <p className="text-muted-foreground">
                    At Dynasty Futures, we are focused on building structures that give traders a real opportunity to succeed. The Builder Plan reflects that philosophy by prioritizing sustainability, flexibility, and long-term consistency over restrictive conditions.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Simulated vs Funded */}
          <section id="funded-trading" className="mb-20 scroll-mt-24">
            <ScrollReveal>
              <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Simulated Trading vs{" "}
                  <span className="text-gradient-animated">Funded Trading</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-display font-semibold text-xl text-foreground mb-4">
                      Challenge Phase (Simulated)
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      You trade in a simulated environment with real-time or
                      near real-time price data. All orders are simulated. This
                      phase evaluates your trading discipline and strategy
                      execution.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl text-foreground mb-4">
                      Funded Phase (Simulated Payout Account)
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      After passing your challenge, you continue trading in a
                      simulated environment. You never trade live capital.
                      Instead, payouts are based on your simulated performance
                      according to your plan's payout schedule.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Rules;
