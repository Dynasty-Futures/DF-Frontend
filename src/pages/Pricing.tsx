import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StandardIcon, AdvancedIcon, DynastyIcon, CheckIcon, CrossIcon, ClockIcon, DollarIcon, ShieldIcon } from '@/components/icons/PlanIcons';
import pricingBg from '@/assets/pricing-background.png';
import PreLaunchModal from '@/components/PreLaunchModal';

const standardPricing = [
  { size: '$25,000', evalFee: '$39', activationFee: '$80', evalReset: '$35', fundedReset: '$150' },
  { size: '$50,000', evalFee: '$59', activationFee: '$80', evalReset: '$45', fundedReset: '$200' },
  { size: '$100,000', evalFee: '$99', activationFee: '$80', evalReset: '$65', fundedReset: '$250' },
  { size: '$150,000', evalFee: '$129', activationFee: '$80', evalReset: '$75', fundedReset: '$300' },
];

const advancedPricing = [
  { size: '$25,000', evalFee: '$65', activationFee: '$0', evalReset: '$35', fundedReset: '$175' },
  { size: '$50,000', evalFee: '$95', activationFee: '$0', evalReset: '$45', fundedReset: '$225' },
  { size: '$100,000', evalFee: '$160', activationFee: '$0', evalReset: '$65', fundedReset: '$275' },
  { size: '$150,000', evalFee: '$199', activationFee: '$0', evalReset: '$75', fundedReset: '$325' },
];

const dynastyPricing = [
  { size: '$25,000', price: '$99', fundedReset: '$200' },
  { size: '$50,000', price: '$129', fundedReset: '$275' },
  { size: '$100,000', price: '$199', fundedReset: '$325' },
  { size: '$150,000', price: '$239', fundedReset: '$375' },
];

const accountRules = {
  '$25,000': { profitTarget: '$1,500', maxDrawdown: '$1,500', dailyLoss: '$750' },
  '$50,000': { profitTarget: '$3,000', maxDrawdown: '$2,500', dailyLoss: '$1,500' },
  '$100,000': { profitTarget: '$6,000', maxDrawdown: '$3,000', dailyLoss: '$2,000' },
  '$150,000': { profitTarget: '$8,000', maxDrawdown: '$4,500', dailyLoss: '$3,000' },
};

const tradableMarkets = [
  { product: 'Micro E-mini Nasdaq-100', symbol: 'MNQ' },
  { product: 'Micro E-mini S&P 500', symbol: 'MES' },
  { product: 'E-mini Nasdaq-100', symbol: 'NQ' },
  { product: 'E-mini S&P 500', symbol: 'ES' },
  { product: 'Crude Oil', symbol: 'CL' },
  { product: 'Gold', symbol: 'GC' },
];

const contractLimits = {
  '25K': { MNQ: 4, MES: 6, NQ: 1, ES: 1, CL: 1, GC: 1 },
  '50K': { MNQ: 8, MES: 12, NQ: 2, ES: 2, CL: 2, GC: 2 },
  '100K': { MNQ: 16, MES: 20, NQ: 4, ES: 4, CL: 3, GC: 3 },
  '150K': { MNQ: 24, MES: 30, NQ: 6, ES: 6, CL: 4, GC: 4 },
};

const Pricing = () => {
  const location = useLocation();
  const [showPreLaunchModal, setShowPreLaunchModal] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <Layout>
      {/* Atmospheric background wrapper */}
      <div className="relative min-h-screen">
        {/* Background image layer */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${pricingBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        {/* Dark overlay for readability */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-background/60 via-background/40 to-background/60" />
        
        <div className="page-transition py-12 md:py-20 relative z-10">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Pricing & <span className="text-gradient">Plans</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Choose the plan that fits your trading style. All plans include static drawdown and no consistency rules.
              </p>
            </div>

            {/* Standard Plan */}
            <section id="standard" className="mb-20 scroll-mt-24">
              <div className="glass-card-strong rounded-3xl border border-border/50 overflow-hidden">
                <div className="p-8 md:p-12 border-b border-border/30">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-teal p-0.5">
                      <div className="w-full h-full rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center">
                        <StandardIcon size={40} />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Standard Plan</h2>
                      <p className="text-xl text-primary font-medium mb-2">"Pass Now, Pay Later"</p>
                      <p className="text-muted-foreground max-w-xl">Lower evaluation fee up front. If passed, a one-time $80 activation fee is required to activate your funded account.</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="overflow-x-auto mb-10">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/30">
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Account Size</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Evaluation Fee</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Activation Fee</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Eval Reset</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Funded Reset</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Profit Target</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Max Loss Limit</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Daily Loss Limit</th>
                          <th className="py-4 px-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {standardPricing.map((row) => {
                          const rules = accountRules[row.size as keyof typeof accountRules];
                          return (
                            <tr key={row.size} className="border-b border-border/20 hover:bg-primary/5 transition-colors">
                              <td className="py-4 px-4 font-semibold text-foreground">{row.size}</td>
                              <td className="py-4 px-4 text-primary font-bold">{row.evalFee}</td>
                              <td className="py-4 px-4 text-muted-foreground">{row.activationFee}</td>
                              <td className="py-4 px-4 text-muted-foreground">{row.evalReset}</td>
                              <td className="py-4 px-4 text-muted-foreground">{row.fundedReset}</td>
                              <td className="py-4 px-4 text-foreground">{rules.profitTarget}</td>
                              <td className="py-4 px-4 text-foreground">{rules.maxDrawdown}</td>
                              <td className="py-4 px-4 text-foreground">{rules.dailyLoss}</td>
                              <td className="py-4 px-4"><Button size="sm" className="bg-gradient-to-r from-primary to-teal text-primary-foreground" onClick={() => setShowPreLaunchModal(true)}>Select</Button></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
<div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><CheckIcon size={20} /><span className="text-sm text-foreground">50% consistency rule (evaluation only)</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><ClockIcon size={20} /><span className="text-sm text-foreground">5-day payout cycles</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><CheckIcon size={20} /><span className="text-sm text-foreground">Copy trading allowed</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><DollarIcon size={20} /><span className="text-sm text-foreground">Low activation fee</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><CheckIcon size={20} /><span className="text-sm text-foreground">Overnight trading allowed</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><ShieldIcon size={20} /><span className="text-sm text-foreground">Evaluations use a trailing end-of-day drawdown. Funded accounts use a static drawdown.</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6 text-center">All plans renew monthly. Cancel anytime. Reset fees are one-time and never billed monthly.</p>
                </div>
              </div>
            </section>

            {/* Advanced Plan */}
            <section id="advanced" className="mb-20 scroll-mt-24">
              <div className="glass-card-strong rounded-3xl border border-teal/40 overflow-hidden relative">
                <div className="p-8 md:p-12 border-b border-border/30">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal to-soft-blue p-0.5">
                      <div className="w-full h-full rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center"><AdvancedIcon size={40} /></div>
                    </div>
                    <div>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Advanced Plan</h2>
                      <p className="text-xl text-teal font-medium mb-2">"Instant Activation, No Activation Fee"</p>
                      <p className="text-muted-foreground max-w-xl">Pay once. When you pass, you're activated with no extra activation cost.</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <div className="overflow-x-auto mb-10">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/30">
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Account Size</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Evaluation Fee</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Activation Fee</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Eval Reset</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Funded Reset</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Profit Target</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Max Loss Limit</th>
                          <th className="py-4 px-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {advancedPricing.map((row) => {
                          const rules = accountRules[row.size as keyof typeof accountRules];
                          return (
                            <tr key={row.size} className="border-b border-border/20 hover:bg-teal/5 transition-colors">
                              <td className="py-4 px-4 font-semibold text-foreground">{row.size}</td>
                              <td className="py-4 px-4 text-teal font-bold">{row.evalFee}</td>
                              <td className="py-4 px-4 text-muted-foreground">{row.activationFee}</td>
                              <td className="py-4 px-4 text-muted-foreground">{row.evalReset}</td>
                              <td className="py-4 px-4 text-muted-foreground">{row.fundedReset}</td>
                              <td className="py-4 px-4 text-foreground">{rules.profitTarget}</td>
                              <td className="py-4 px-4 text-foreground">{rules.maxDrawdown}</td>
                              <td className="py-4 px-4"><Button size="sm" className="bg-gradient-to-r from-teal to-soft-blue text-foreground" onClick={() => setShowPreLaunchModal(true)}>Select</Button></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><CheckIcon size={20} /><span className="text-sm text-foreground">No consistency rule</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><CheckIcon size={20} /><span className="text-sm text-foreground">Immediate activation</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><ClockIcon size={20} /><span className="text-sm text-foreground">5-day payout cycles</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><CheckIcon size={20} /><span className="text-sm text-foreground">Priority support</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><CheckIcon size={20} /><span className="text-sm text-foreground">Copy trading allowed</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><ShieldIcon size={20} /><span className="text-sm text-foreground">Evaluations use a trailing end-of-day drawdown. Funded accounts use a static drawdown.</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6 text-center">All plans renew monthly. Cancel anytime.</p>
                </div>
              </div>
            </section>

            {/* Dynasty Plan */}
            <section id="dynasty" className="mb-20 scroll-mt-24">
              <div className="glass-card-strong rounded-3xl border border-primary/40 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-primary/40 to-teal/40 backdrop-blur-sm text-primary text-xs font-semibold rounded-full border border-primary/40">PREMIUM</div>
                <div className="p-8 md:p-12 border-b border-border/30 relative">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-teal to-soft-blue p-0.5">
                      <div className="w-full h-full rounded-2xl bg-card/90 backdrop-blur-sm flex items-center justify-center"><DynastyIcon size={40} /></div>
                    </div>
                    <div>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Dynasty Plan</h2>
                      <p className="text-xl text-primary font-medium mb-2">"Instant Funding + Daily Payouts"</p>
                      <p className="text-muted-foreground max-w-xl">Trade instantly with the ability to unlock daily payouts after you build a $3,000 <Link to="/faq#profit-buffer" className="text-muted-foreground hover:text-primary hover:underline transition-all duration-300">profit buffer</Link>.</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12 relative">
                  <div className="overflow-x-auto mb-10">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/30">
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Account Size</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Price</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Funded Reset</th>
                          <th className="text-left py-4 px-4 text-muted-foreground font-medium">Max Loss Limit</th>
                          <th className="py-4 px-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {dynastyPricing.map((row) => {
                          const rules = accountRules[row.size as keyof typeof accountRules];
                          return (
                            <tr key={row.size} className="border-b border-border/20 hover:bg-primary/5 transition-colors">
                              <td className="py-4 px-4 font-semibold text-foreground">{row.size}</td>
                              <td className="py-4 px-4 text-primary font-bold">{row.price}</td>
                              <td className="py-4 px-4 text-muted-foreground">{row.fundedReset}</td>
                              <td className="py-4 px-4 text-foreground">{rules.maxDrawdown}</td>
                              <td className="py-4 px-4"><Button size="sm" className="bg-gradient-to-r from-primary to-teal text-primary-foreground" onClick={() => setShowPreLaunchModal(true)}>Select</Button></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/15 backdrop-blur-sm border border-primary/25"><DollarIcon size={20} /><span className="text-sm text-foreground">Start trading instantly</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/15 backdrop-blur-sm border border-primary/25"><CheckIcon size={20} /><span className="text-sm text-foreground">Build $3,000 buffer → unlock daily payouts</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><ClockIcon size={20} /><span className="text-sm text-foreground">$1,400/day cap or full 5-day payout</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><CheckIcon size={20} /><span className="text-sm text-foreground">No consistency rule</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><ShieldIcon size={20} /><span className="text-sm text-foreground">Static drawdown</span></div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/20"><CheckIcon size={20} /><span className="text-sm text-foreground">Copy trading allowed</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6 text-center">All plans renew monthly. Cancel anytime.</p>
                </div>
              </div>
            </section>

            {/* Payout Limits Table */}
            <section className="mb-20">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Weekly <span className="text-gradient-animated">Payout Limits</span></h2>
                <p className="text-muted-foreground">Each plan has structured payout limits to ensure sustainable trading and consistent withdrawals.</p>
              </div>
              <div className="glass-card rounded-2xl border border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/30 bg-muted/10">
                        <th className="text-left py-5 px-6 text-foreground font-semibold">Plan</th>
                        <th className="text-left py-5 px-6 text-foreground font-semibold">Weekly Minimum</th>
                        <th className="text-left py-5 px-6 text-foreground font-semibold">Weekly Maximum</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/20 hover:bg-primary/5 transition-colors">
                        <td className="py-5 px-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-teal p-0.5"><div className="w-full h-full rounded-xl bg-card/90 backdrop-blur-sm flex items-center justify-center"><StandardIcon size={20} /></div></div><div><span className="font-semibold text-foreground">Standard</span><p className="text-xs text-muted-foreground">Monthly sub, normal funded</p></div></div></td>
                        <td className="py-5 px-6 text-primary font-bold text-lg">$500</td>
                        <td className="py-5 px-6 text-foreground font-semibold">$5,000/week</td>
                      </tr>
                      <tr className="border-b border-border/20 hover:bg-teal/5 transition-colors">
                        <td className="py-5 px-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal to-soft-blue p-0.5"><div className="w-full h-full rounded-xl bg-card/90 backdrop-blur-sm flex items-center justify-center"><AdvancedIcon size={20} /></div></div><div><span className="font-semibold text-foreground">Advanced</span><p className="text-xs text-muted-foreground">Monthly sub, no activation</p></div></div></td>
                        <td className="py-5 px-6 text-teal font-bold text-lg">$500</td>
                        <td className="py-5 px-6 text-foreground font-semibold">$7,000/week</td>
                      </tr>
                      <tr className="hover:bg-primary/5 transition-colors">
                        <td className="py-5 px-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-teal to-soft-blue p-0.5"><div className="w-full h-full rounded-xl bg-card/90 backdrop-blur-sm flex items-center justify-center"><DynastyIcon size={20} /></div></div><div><span className="font-semibold text-foreground">Dynasty</span><p className="text-xs text-muted-foreground">Instant funding + daily payouts</p></div></div></td>
                        <td className="py-5 px-6 text-primary font-bold text-lg">$500</td>
                        <td className="py-5 px-6 text-foreground font-semibold">$7,000/week</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 p-6 rounded-xl bg-muted/15 backdrop-blur-sm border border-border/30">
                  <h4 className="font-display font-semibold text-foreground mb-4">Monthly Maximum Payout Caps</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card/60 backdrop-blur-sm"><span className="text-sm text-muted-foreground">Standard Plan</span><span className="font-semibold text-primary">$20,000/month</span></div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card/60 backdrop-blur-sm"><span className="text-sm text-muted-foreground">Advanced Plan</span><span className="font-semibold text-teal">$28,000/month</span></div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-card/60 backdrop-blur-sm"><span className="text-sm text-muted-foreground">Dynasty Plan</span><span className="font-semibold text-primary">$28,000/month</span></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tradable Markets Section */}
            <section className="mb-12">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Tradable Futures Markets <span className="text-gradient">(Tradovate)</span></h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">All Dynasty Futures accounts trade via Tradovate. Product availability is consistent across all plans.</p>
              </div>
              <div className="glass-card rounded-2xl border border-border/50 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30 bg-muted/10">
                      <th className="text-left py-4 px-6 text-foreground font-semibold">Product</th>
                      <th className="text-left py-4 px-6 text-foreground font-semibold">Symbol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradableMarkets.map((market) => (
                      <tr key={market.symbol} className="border-b border-border/20 hover:bg-primary/5 transition-colors">
                        <td className="py-3 px-6 text-foreground">{market.product}</td>
                        <td className="py-3 px-6 text-primary font-semibold">{market.symbol}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Contract Limits by Account Size */}
            <section className="mb-20">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Contract Limits <span className="text-gradient">by Account Size</span></h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Contract limits apply universally across all plans and depend only on account size.</p>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                {Object.entries(contractLimits).map(([size, limits]) => (
                  <AccordionItem key={size} value={size} className="glass-card rounded-xl border border-border/50 px-6">
                    <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline py-5">{size} Account – Contract Limits</AccordionTrigger>
                    <AccordionContent>
                      <div className="overflow-x-auto pb-4">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border/30">
                              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Product</th>
                              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Symbol</th>
                              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Max Contracts</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tradableMarkets.map((market) => (
                              <tr key={market.symbol} className="border-b border-border/20">
                                <td className="py-3 px-4 text-foreground">{market.product}</td>
                                <td className="py-3 px-4 text-muted-foreground">{market.symbol}</td>
                                <td className="py-3 px-4 text-primary font-semibold">{limits[market.symbol as keyof typeof limits]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className="text-xs text-muted-foreground mt-3">Limits represent maximum simultaneous open contracts per product.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <p className="text-sm text-muted-foreground text-center mt-6">Contract limits control risk exposure and are enforced automatically. Attempting to exceed limits will result in order rejection.</p>
            </section>
          </div>
        </div>
      </div>
      <PreLaunchModal 
        externalOpen={showPreLaunchModal} 
        onExternalClose={() => setShowPreLaunchModal(false)} 
      />
    </Layout>
  );
};

export default Pricing;
