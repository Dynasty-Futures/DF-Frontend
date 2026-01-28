import { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { CheckIcon, CrossIcon, ShieldIcon, ClockIcon, DollarIcon } from '@/components/icons/PlanIcons';
import { Moon, Calendar, Newspaper, Copy, Bot, PauseCircle, Lock, TrendingDown, ChevronDown, ChevronRight, Search, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const universalRules = [
  {
    icon: ShieldIcon,
    title: 'Static Drawdown (No Trailing)',
    description: 'All accounts use a static max drawdown that does not trail equity. Drawdown level is fixed at the amount listed for each account size.',
    allowed: true,
  },
  {
    icon: Moon,
    title: 'Overnight Trading Allowed',
    description: 'You may hold trades overnight within the trading week.',
    allowed: true,
  },
  {
    icon: Calendar,
    title: 'Weekend Holds NOT Allowed',
    description: 'All trades must be closed before the market closes for the week.',
    allowed: false,
  },
  {
    icon: Newspaper,
    title: 'No News Trading',
    description: 'Trading is not allowed during major high-impact news releases.',
    allowed: false,
  },
  {
    icon: Copy,
    title: 'Copy Trading Allowed on ALL Plans',
    description: 'You may use copy trade platforms, trade copiers, your own accounts as masters, and social trading tools.',
    allowed: true,
  },
  {
    icon: Bot,
    title: 'No Bots / No Automated Trading Systems',
    description: 'All trading must be manually executed. Bots are not allowed.',
    allowed: false,
  },
  {
    icon: PauseCircle,
    title: 'Trading Freeze During Payout Processing',
    description: 'After submitting a payout request, traders may not place any new trades until the payout has been approved and deducted from the simulated account balance, or until the payout request is denied. This rule ensures accurate balance calculations and prevents conflicts during payout processing.',
    allowed: false,
  },
  {
    icon: Lock,
    title: 'Withdrawal Buffer Freeze',
    description: 'Open positions must be closed or hedged before payout processing.',
    allowed: false,
  },
  {
    icon: ClockIcon,
    title: 'Payout Processing Window',
    description: 'Dynasty Futures processes payout requests on a daily basis. Most approved payouts are submitted for processing within 1–3 business days, though in some cases payouts may take up to 10 business days to fully reach your account.',
    allowed: true,
  },
  {
    icon: ClockIcon,
    title: 'Cutoff Time',
    description: 'Requests submitted before 2:00 PM CT begin processing the same business day. Requests submitted after 2:00 PM CT begin processing the next business day.',
    allowed: true,
  },
  {
    icon: DollarIcon,
    title: 'Payout Delivery Time',
    description: 'After internal approval: Wise Transfer typically same day to 2 business days. Bank Transfer / ACH typically 1–3 business days after approval.',
    allowed: true,
  },
  {
    icon: DollarIcon,
    title: '50% Withdrawal Limit',
    description: 'Traders may withdraw up to 50% of their account balance per payout request. The remaining balance must stay in the account.',
    allowed: true,
  },
  {
    icon: Calendar,
    title: '5-Payout Rolling Cap (Universal Rule)',
    description: 'For all account types across every plan, traders may request up to 4 payouts per calendar month. To be eligible for a payout, the trader must have completed at least 5 separate trading days since their last payout request, and each of those days must meet or exceed the required daily P&L threshold for their specific account size. This rule applies universally to all accounts that operate under the 5-day payout schedule.',
    allowed: true,
  },
  {
    icon: TrendingDown,
    title: 'Post-Payout MLL Reset',
    description: 'After a payout is processed, your Maximum Loss Limit (MLL) is reset to $0.00. Your remaining post-payout balance becomes your entire loss buffer. If losses reduce your account balance to $0.00 or below, the account is failed.',
    allowed: false,
  },
  {
    icon: ShieldIcon,
    title: 'Resets vs. New Accounts',
    description: 'Resets preserve account continuity, payout eligibility, and trading history. Purchasing a new account creates a brand-new account with fresh eligibility requirements and payout restrictions.',
    allowed: true,
  },
  {
    icon: DollarIcon,
    title: 'Post-5 Payout Profit Split Adjustment',
    description: 'After a trader has successfully completed five (5) payouts, all future payouts will be subject to an 80/20 profit split, with 80% paid to the trader and 20% retained by Dynasty Futures.',
    allowed: true,
  },
];

const accountRules = [
  {
    size: '25K Account',
    profitTarget: '$1,500',
    maxDrawdown: '$1,500',
    dailyLoss: '$750',
  },
  {
    size: '50K Account',
    profitTarget: '$3,000',
    maxDrawdown: '$2,500',
    dailyLoss: '$1,500',
  },
  {
    size: '100K Account',
    profitTarget: '$6,000',
    maxDrawdown: '$3,000',
    dailyLoss: '$2,000',
  },
  {
    size: '150K Account',
    profitTarget: '$8,000',
    maxDrawdown: '$4,500',
    dailyLoss: '$3,000',
  },
];

const planRules = [
  {
    name: 'Standard Plan',
    tagline: 'Pass Now, Pay Later',
    features: [
      'Evaluation Fee + $80 Activation Fee (after passing)',
      'Static drawdown',
      '50% consistency rule (evaluation only)',
      '5-day payout cycles',
      'Copy trading allowed',
    ],
    eligibility: 'Payout Eligibility: To be eligible for a payout, traders must have at least 5 Winning Days, each with a profit of $150 or more.',
  },
  {
    name: 'Advanced Plan',
    tagline: 'Instant Activation, No Activation Fee',
    features: [
      'You pay only the evaluation fee. No extra costs.',
      'Static drawdown',
      'No consistency rule',
      'Immediate activation',
      '5-day payout cycles',
      'Priority support',
      'Copy trading allowed',
    ],
    eligibility: 'Payout Eligibility: To be eligible for a payout, traders must have at least 5 Winning Days, each with a profit of $200 or more.',
  },
  {
    name: 'Dynasty Plan',
    tagline: 'Instant Funding + Daily Payouts',
    features: [
      'Instant funding once purchased',
      'Build $3,000 buffer → unlock daily payouts',
      'Optional: $1,400/day payout cap or take full 5-day payout',
      'No consistency rule',
      'Static drawdown',
      'Copy trading allowed',
    ],
    eligibility: null,
    dynastyEligibility: {
      fiveDay: 'Payout Eligibility (5-Day Method): If you choose the 5-Day Payout Method for the month, you must have at least 5 Winning Days, each with a profit of $500 or more, to be eligible for a payout.',
      daily: 'Payout Eligibility (Daily Method): If you choose the Daily Payout Method, the 5 Winning Days rule does not apply. To be eligible for a daily payout, you must: • Have a fully built $3,000 buffer, and • Have a daily profit of at least $500 on the day of your payout request, and • Place at least one trade on that same day.',
    },
  },
];

// Universal Rules Accordion Component
const UniversalRulesSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'allowed' | 'restricted'>('all');
  const [expandedRules, setExpandedRules] = useState<string[]>([]);
  const [subAccordionValue, setSubAccordionValue] = useState<string[]>([]);

  const allowedRules = universalRules.filter(rule => rule.allowed);
  const restrictedRules = universalRules.filter(rule => !rule.allowed);

  const filterRules = (rules: typeof universalRules) => {
    if (!searchQuery) return rules;
    return rules.filter(rule => 
      rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredAllowedRules = useMemo(() => filterRules(allowedRules), [searchQuery]);
  const filteredRestrictedRules = useMemo(() => filterRules(restrictedRules), [searchQuery]);

  const visibleAllowedRules = activeFilter === 'restricted' ? [] : filteredAllowedRules;
  const visibleRestrictedRules = activeFilter === 'allowed' ? [] : filteredRestrictedRules;

  const totalVisibleRules = visibleAllowedRules.length + visibleRestrictedRules.length;

  const handleExpandAll = () => {
    const allRuleIds = universalRules.map(r => r.title);
    setExpandedRules(allRuleIds);
    setSubAccordionValue(['allowed', 'restricted']);
  };

  const handleCollapseAll = () => {
    setExpandedRules([]);
    setSubAccordionValue([]);
  };

  const toggleRule = (title: string) => {
    setExpandedRules(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const RuleRow = ({ rule }: { rule: typeof universalRules[0] }) => {
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
            <span className="text-sm font-medium text-foreground truncate">{rule.title}</span>
          </div>
          <ChevronRight 
            size={16} 
            className={cn(
              "text-muted-foreground flex-shrink-0 transition-transform duration-200",
              isExpanded && "rotate-90"
            )} 
          />
        </button>
        {isExpanded && (
          <div className="px-3 pb-3 pl-12">
            <p className="text-sm text-muted-foreground">{rule.description}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Accordion type="single" collapsible className="mb-20">
      <AccordionItem value="universal-rules" className="bg-gradient-card rounded-2xl border border-border/50 overflow-hidden">
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
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search rules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-8 text-sm w-[180px] bg-muted/20 border-border/30"
                />
              </div>
              
              {/* Filter Pills */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-muted/20 border border-border/30">
                {(['all', 'allowed', 'restricted'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "px-3 py-1 rounded-md text-xs font-medium transition-all capitalize",
                      activeFilter === filter 
                        ? 'bg-card text-foreground shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
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
              <AccordionItem value="allowed" className="rounded-xl border border-border/30 bg-card/30 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/10">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center bg-muted/30">
                      <Check size={12} className="text-muted-foreground" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">Allowed & Approved</span>
                    <span className="text-xs text-muted-foreground">({visibleAllowedRules.length})</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="border-t border-border/20">
                    {visibleAllowedRules.map((rule) => (
                      <RuleRow key={rule.title} rule={rule} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Restricted & Prohibited */}
            {visibleRestrictedRules.length > 0 && (
              <AccordionItem value="restricted" className="rounded-xl border border-border/30 bg-card/30 overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/10">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center bg-muted/30">
                      <X size={12} className="text-muted-foreground" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">Restricted & Prohibited</span>
                    <span className="text-xs text-muted-foreground">({visibleRestrictedRules.length})</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-0 pb-0">
                  <div className="border-t border-border/20">
                    {visibleRestrictedRules.map((rule) => (
                      <RuleRow key={rule.title} rule={rule} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
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
      <div className="page-transition py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Rules & <span className="text-gradient-animated">Definitions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Dynasty Futures — Official Trading Rules. Applies to ALL plans unless otherwise stated.
            </p>
          </div>

          {/* Universal Rules */}
          <section>
            <UniversalRulesSection />
          </section>

          {/* Account-Specific Rules */}
          <section id="account-rules" className="mb-20 scroll-mt-24">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="text-gradient-animated">Account-Specific Rules</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accountRules.map((account) => (
                <div
                  key={account.size}
                  className="bg-gradient-card rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <h3 className="font-display text-xl font-bold text-gradient-animated mb-4">
                    {account.size}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-sm text-muted-foreground">Profit Target</span>
                      <span className="font-semibold text-foreground">{account.profitTarget}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-sm text-muted-foreground">Max Drawdown</span>
                      <span className="font-semibold text-foreground">{account.maxDrawdown}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-sm text-muted-foreground">Daily Loss Limit</span>
                      <span className="font-semibold text-foreground">{account.dailyLoss}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-muted-foreground">Overnight</span>
                      <span className="text-primary text-sm">Allowed</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-muted-foreground">Weekend Holds</span>
                      <span className="text-destructive text-sm">Not Allowed</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Plan Rules */}
          <section id="plan-rules" className="mb-20 scroll-mt-24">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="text-gradient-animated">Plan Rules</span>
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {planRules.map((plan, index) => (
                <div
                  key={plan.name}
                  className="bg-gradient-card rounded-2xl border border-border/50 p-6 transition-all duration-300 hover:border-primary/30 hover:scale-[1.02]"
                >
                  <div className="mb-4">
                  <Link 
                    to={`/pricing#${index === 0 ? 'standard' : index === 1 ? 'advanced' : 'dynasty'}`}
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 hover:scale-105 transition-transform ${
                      index === 0 ? 'bg-primary/20 text-primary hover:bg-primary/30' :
                      index === 1 ? 'bg-teal/20 text-teal hover:bg-teal/30' :
                      'bg-soft-blue/20 text-soft-blue hover:bg-soft-blue/30'
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
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-teal mt-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {plan.eligibility && (
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <p className="text-sm text-primary font-medium">{plan.eligibility}</p>
                    </div>
                  )}
                  {plan.dynastyEligibility && (
                    <div className="mt-4 pt-4 border-t border-border/30 space-y-3">
                      <p className="text-sm text-primary font-medium">{plan.dynastyEligibility.fiveDay}</p>
                      <p className="text-sm text-primary font-medium">{plan.dynastyEligibility.daily}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Static Drawdown Explanation */}
          <section className="mb-20">
            <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                What is <span className="text-gradient-animated">Static Drawdown</span>?
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  Static drawdown is a fixed maximum loss limit that does not change based on your account's highest equity. Unlike trailing drawdown, which follows your peak equity and reduces your available drawdown as profits grow, static drawdown remains constant.
                </p>
                <p className="text-muted-foreground mb-4">
                  For example, if you have a $100,000 account with a $3,000 static drawdown, your account will be violated if your balance drops below $97,000 at any point. This level does not change regardless of how much profit you make.
                </p>
                <p className="text-muted-foreground">
                  This provides traders with more flexibility and reduces the pressure that comes with trailing drawdown systems.
                </p>
              </div>
            </div>
          </section>

          {/* Dynasty Plan Payout Rules */}
          <section className="mb-20">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="text-gradient-animated">Dynasty Plan Payout Rules</span>
            </h2>
            
            <div className="bg-gradient-card rounded-2xl border border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30 bg-muted/10">
                      <th className="text-left py-4 px-6 text-foreground font-semibold">Rule</th>
                      <th className="text-left py-4 px-6 text-foreground font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/20 hover:bg-muted/10 transition-colors">
                      <td className="py-4 px-6 text-primary font-medium">Monthly "Flush" on Dynasty</td>
                      <td className="py-4 px-6 text-muted-foreground">Any profits above $10,000 in a calendar week are carried forward to the next week.</td>
                    </tr>
                    <tr className="border-b border-border/20 hover:bg-muted/10 transition-colors">
                      <td className="py-4 px-6 text-primary font-medium">Payout Eligibility – Dynasty (5-Day Payout Method)</td>
                      <td className="py-4 px-6 text-muted-foreground">If you choose the 5-Day Payout Method for the month, you must have at least 5 Winning Days, each with a profit of $500 or more, to be eligible for a payout. Weekly cap: $7,000. Monthly cap: $28,000.</td>
                    </tr>
                    <tr className="border-b border-border/20 hover:bg-muted/10 transition-colors">
                      <td className="py-4 px-6 text-primary font-medium">Payout Eligibility – Dynasty (Daily Payout Method)</td>
                      <td className="py-4 px-6 text-muted-foreground">If you choose the Daily Payout Method, the 5 Winning Days rule does not apply. To be eligible for a daily payout, you must: • Have a fully built $3,000 buffer, and • Have a daily profit of at least $500 on the day of your payout request, and • Place at least one trade on that same day. Minimum payout: $500. Maximum daily payout: $1,400. Monthly cap: $28,000.</td>
                    </tr>
                    <tr className="border-b border-border/20 hover:bg-muted/10 transition-colors">
                      <td className="py-4 px-6 text-primary font-medium">Daily Payout Method</td>
                      <td className="py-4 px-6 text-muted-foreground">Dynasty traders may request one payout per day, with a maximum of $1,400 per day, once the required $3,000 buffer is fully built.</td>
                    </tr>
                    <tr className="border-b border-border/20 hover:bg-muted/10 transition-colors">
                      <td className="py-4 px-6 text-primary font-medium">Payout Method Lock-In</td>
                      <td className="py-4 px-6 text-muted-foreground">Dynasty traders may choose either the Daily Payout Method or the 5-Day Payout Method. Once selected, the payout method is locked in for the remainder of the calendar month. Switching payout methods is only allowed on the 1st day of the next month. This prevents overlapping payout cycles and ensures consistent scheduling.</td>
                    </tr>
                    <tr className="hover:bg-muted/10 transition-colors">
                      <td className="py-4 px-6 text-primary font-medium">Payout Notes</td>
                      <td className="py-4 px-6 text-muted-foreground">All payouts require full compliance with plan rules and verification requirements. Additional review time may be required for large withdrawals, unusual trading activity, or incomplete account documentation. Payout timelines may vary on weekends, U.S. bank holidays, or during periods of high volume.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Simulated vs Funded */}
          <section id="funded-trading" className="mb-20 scroll-mt-24">
            <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                Simulated Trading vs <span className="text-gradient-animated">Funded Trading</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-4">Challenge Phase (Simulated)</h3>
                  <p className="text-muted-foreground text-sm">
                    You trade in a simulated environment with real-time or near real-time price data. All orders are simulated. This phase evaluates your trading discipline and strategy execution.
                  </p>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-4">Funded Phase (Simulated Payout Account)</h3>
                  <p className="text-muted-foreground text-sm">
                    After passing your challenge, you continue trading in a simulated environment. You never trade live capital. Instead, payouts are based on your simulated performance according to your plan's payout schedule.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Rules;