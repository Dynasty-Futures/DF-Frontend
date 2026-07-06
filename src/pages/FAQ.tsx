import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { faqPageSchema, breadcrumb } from "@/components/seo/JsonLd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const faqs = [
  {
    id: "plans-difference",
    question:
      "What's the difference between Standard, Advanced, and Builder plans?",
    answer:
      "Standard Plan has a lower evaluation fee with an $80 activation fee after passing. Advanced Plan has a higher evaluation fee with no activation fee. Builder Plan is designed for traders who want more room to execute with a higher max loss limit than Standard and no activation fee.",
  },
  {
    id: "simulated-trading",
    question: "How does simulated trading work?",
    answer:
      "During the challenge phase, you trade in a simulated environment that mirrors real futures markets. Price data is real-time, and orders are routed through supported platforms like Volumetrica with DeepCharts data feed integration. You never trade live capital; simulated trading is used in both the evaluation and funded phases.",
  },
  {
    id: "how-payouts-work",
    question: "How do payouts work?",
    answer:
      "All payouts are processed through Rise Works, a trusted third-party payment provider. Rise manages payment processing, identity verification, and compliance to ensure payouts are handled securely and efficiently.\n\nOnce you are eligible for a payout, you will complete a verification process through Rise Works. This typically includes confirming your identity and payment details.\n\nPayouts are not denied without cause. As long as your information is accurate and verification is completed successfully, your payout will be processed. Issues only arise in cases of incomplete verification or fraudulent information.",
  },
  {
    id: "payouts",
    question: "When do payouts happen?",
    answer:
      "For Standard, Advanced, and Builder plans, payouts occur on 5-day cycles once you're funded. Each plan has a maximum payout per request / eligible payout cycle after meeting 5 qualifying winning days — Standard $3,000, Advanced $2,000, and Builder $3,000. Payouts are processed through Rise Works after approval and may require standard verification before funds are released.",
  },
  {
    id: "static-drawdown",
    question: "What is a static drawdown?",
    answer:
      "Static drawdown is a fixed maximum loss limit that doesn't trail your account's peak equity. For example, if you have a $100,000 account with a $2,500 static drawdown, your account will be violated if your balance drops below $97,500 at any point. This level stays constant regardless of profits made, giving you more flexibility than trailing drawdown systems.",
  },
  {
    id: "post-payout-drawdown",
    question: "What happens to my drawdown after a payout?",
    answer:
      "After a payout, your Maximum Loss Limit (MLL) is reset to $0.00. Your remaining account balance becomes your entire loss buffer. If losses reduce your account balance to $0.00 or below, the account is failed.",
  },
  {
    id: "copy-trading",
    question: "Can I use copy trading or bots?",
    answer:
      "Copy trading is allowed on all plans. You can use copy trade platforms, trade copiers, your own accounts as masters, and social trading tools. However, bots and automated trading systems are NOT allowed—all trading must be manually executed.",
  },
  {
    id: "signal-sharing",
    question: "Can I follow another trader's signals or trade calls?",
    answer:
      "No. Dynasty Futures requires traders to make independent trading decisions. Public market discussion and educational content are allowed, but using another person's real-time trade signals, entries, exits, targets, stop losses, or trade management instructions is prohibited and may impact funded status, payouts, or account eligibility.",
  },
  {
    id: "platforms",
    question: "What platforms do you support?",
    answer:
      "We support connections to platforms like Volumetrica with DeepCharts data feed integration. These are third-party platforms and feeds—Dynasty Futures is a proprietary trading firm, not a brokerage.",
  },
  {
    id: "daily-loss-limit",
    question: "Does the Daily Loss Limit close my account?",
    answer:
      "Yes. The Daily Loss Limit applies to Standard Plan evaluation accounts only. If the Daily Loss Limit is hit or exceeded during the evaluation phase, it is a hard breach and the account will be closed. It does not apply to Advanced or Builder plans, and it does not apply to funded accounts.",
  },
  {
    id: "rule-violation",
    question: "What happens if I break a rule?",
    answer:
      "If you violate any of the trading rules (such as exceeding the Daily Loss Limit on a Standard evaluation account, Max Loss Limit, holding over the weekend, or trading during high-impact news), your account may be flagged or closed depending on the severity. Always review the rules carefully before trading.",
  },
  {
    id: "news-trading",
    question: "Is news trading allowed?",
    answer:
      "News trading is restricted during major scheduled economic events. Dynasty Futures prohibits opening new positions, increasing existing positions, or placing pending orders intended to trigger from 2 minutes before to 2 minutes after major releases, including CPI, PPI, Non-Farm Payrolls, and FOMC rate decisions. Traders are allowed to reduce or close existing positions during this time for risk management.",
  },
  {
    id: "real-money",
    question: "Do I trade real money during the challenge?",
    answer:
      "No. During ANY phase, you trade in a simulated environment with live market prices. All trading is simulated—you never trade live capital or customer funds. Payouts are based entirely on your simulated trading performance.",
  },
  {
    id: "overnight",
    question: "Can I hold trades overnight?",
    answer:
      "Yes, overnight trading is allowed on all plans. However, you must close all positions before the market closes for the weekend—weekend holds are NOT permitted.",
  },
  {
    id: "consistency",
    question: "Is there a consistency rule?",
    answer:
      "Yes, on Standard and Builder, with different rules for each. Standard includes a 50% consistency rule during the evaluation phase only, meaning no single trading day may account for more than 50% of the total profit target. The consistency rule is removed once funded. Builder includes a 50% consistency rule during the evaluation phase and a 40% consistency rule during the funded stage, meaning no single trading day may account for more than 40% of the total profit target in the funded phase. Advanced does not include a consistency rule.",
  },
  {
    id: "getting-started",
    question: "How do I get started?",
    answer:
      "Simply visit our Pricing page, choose your preferred plan and account size, and complete the checkout process. For Standard, Advanced, and Builder plans, you'll begin your evaluation challenge.",
  },
  {
    id: "evaluation-renewal",
    question: "Do evaluation accounts renew monthly?",
    answer:
      "Yes. Dynasty Futures evaluation accounts are subscription-based and renew monthly unless canceled before the next billing cycle. You may cancel future billing at any time prior to renewal. Cancellation stops future charges but does not entitle you to refunds for prior payments, active billing periods, or previously issued account access.",
  },
  {
    id: "are-purchases-refundable",
    question: "Are purchases refundable?",
    answer:
      "No. Due to the digital and performance-based nature of simulated trading evaluations and immediate account delivery, all purchases made through Dynasty Futures are generally considered final once account access or platform credentials have been issued.\n\nIf you have a verified technical issue directly attributable to Dynasty Futures, our team may review the situation and provide an account credit, reset, or replacement at our sole discretion.",
  },
  {
    id: "profit-target",
    question: "What is the profit target?",
    answer:
      "The profit target varies by account size. For $25K accounts it's $1,500, for $50K accounts it's $3,000, for $100K accounts it's $6,000, and for $150K accounts it's $9,000. Once you reach your profit target while following all rules, you pass the challenge.",
  },
  {
    id: "profit-split",
    question: "What is the profit split for funded traders?",
    answer:
      "Dynasty Futures funded accounts operate on a 90/10 profit split. Traders keep 90% of approved profits, while Dynasty Futures retains 10%. The profit split does not automatically change after five payouts.",
  },
  {
    id: "five-payouts",
    question: "What happens after I receive five payouts?",
    answer:
      "After five approved payouts, Dynasty Futures may internally review the account for potential live trading consideration. Reviews may include trading consistency, compliance history, payout history, risk management, operational availability, and jurisdictional eligibility. Transition to a live environment is not guaranteed and remains at the sole discretion of Dynasty Futures.",
  },
  {
    id: "account-ownership",
    question: "Can someone else trade my account?",
    answer:
      "No. All accounts must be traded exclusively by the original purchaser and registered account holder. Purchasing an account for another person, allowing another individual to trade on your behalf, sharing account credentials, or otherwise transferring account control is strictly prohibited. Violations may result in account review, suspension, payout denial, account termination, or loss of funded eligibility.",
  },
  {
    id: "shared-ip",
    question: "Can multiple traders use the same IP address?",
    answer:
      "Shared IP addresses may be reviewed for compliance purposes. Dynasty Futures monitors account activity and may request verification when account activity appears related or coordinated. Multiple traders operating from the same IP address, device, network, VPN environment, or location may be subject to additional review.",
  },
  {
    id: "hedging",
    question: "Is hedging allowed?",
    answer:
      "No. Hedging is prohibited within the Dynasty Futures ecosystem. This includes hedging across Dynasty Futures accounts, hedging between accounts owned by different individuals, coordinated trading activity designed to offset risk, and correlated offsetting positions. Accounts identified as participating in hedging activity may be subject to investigation, payout denial, funded-status review, account suspension, or account termination.",
  },
  {
    id: "min-trade-duration",
    question: "Is there a minimum trade duration?",
    answer:
      "Yes. Trades should remain open for a minimum of 10 seconds. Consistently opening and closing trades in under 10 seconds may negatively impact funded eligibility, payout eligibility, or account approval decisions. Dynasty Futures reserves the right to review accounts that demonstrate excessive ultra-short-duration trading activity.",
  },
];

const FAQ = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <Layout>
      <PageMeta
        title="FAQ"
        description="Frequently asked questions about Dynasty Futures evaluation plans, trading rules, payouts, and account management."
        path="/faq"
      />
      <JsonLd data={faqPageSchema(faqs)} />
      <JsonLd
        data={breadcrumb([
          { name: 'Home', url: 'https://www.dynastyfuturesdyn.com/' },
          { name: 'FAQ', url: 'https://www.dynastyfuturesdyn.com/faq' },
        ])}
      />
      <div className="page-transition py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Frequently Asked{" "}
                <span className="text-gradient">Questions</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about Dynasty Futures and our
                trading challenges.
              </p>
            </div>
          </ScrollReveal>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <AccordionItem
                    value={`item-${index}`}
                    id={faq.id}
                    className="bg-gradient-card rounded-2xl border border-border/50 px-6 overflow-hidden data-[state=open]:border-primary/30 transition-colors duration-300 scroll-mt-24"
                  >
                    <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary transition-colors py-6 [&[data-state=open]]:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </div>

          {/* SEO: Always-rendered FAQ content for crawlers (accordion content may be hidden) */}
          <div className="sr-only" aria-hidden="true">
            {faqs.map((faq) => (
              <div key={`seo-${faq.id}`}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <ScrollReveal delay={150}>
            <div className="text-center mt-16">
              <p className="text-muted-foreground mb-4">
                Still have questions? We're here to help.
              </p>
              <Link
                to="/support"
                onClick={handleLinkClick}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                Contact Support →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
