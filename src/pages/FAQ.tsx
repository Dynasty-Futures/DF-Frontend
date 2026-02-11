import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "plans-difference",
    question:
      "What's the difference between Standard, Advanced, and Dynasty plans?",
    answer:
      "Standard Plan has a low evaluation fee with an $80 activation fee after passing. Advanced Plan has a slightly higher evaluation fee but no activation fee—you're activated immediately upon passing. Dynasty Plan offers instant funding with no evaluation needed, plus the ability to unlock daily payouts once you build a $3,000 profit buffer.",
  },
  {
    id: "simulated-trading",
    question: "How does simulated trading work?",
    answer:
      "During the challenge phase, you trade in a simulated environment that mirrors real futures markets. Price data is real-time or near real-time, and orders are routed through supported platforms like Tradovate with Rithmic data feed integration. You never trade live capital—simulated trading is used in both the evaluation and funded phases.",
  },
  {
    id: "payouts",
    question: "When do payouts happen?",
    answer:
      "For Standard and Advanced plans, payouts occur on 5-day cycles once you're funded. For Dynasty Plan, you can unlock daily payouts after building a $3,000 profit buffer, with a $1,400/day maximum or you can use the 5-day payout method with a $7,000 weekly cap. All plans have a $28,000 monthly cap (except Standard at $20,000/month).",
  },
  {
    id: "static-drawdown",
    question: "What is a static drawdown?",
    answer:
      "Static drawdown is a fixed maximum loss limit that doesn't trail your account's peak equity. For example, if you have a $100,000 account with a $3,000 static drawdown, your account will be violated if your balance drops below $97,000 at any point. This level stays constant regardless of profits made, giving you more flexibility than trailing drawdown systems.",
  },
  {
    id: "post-payout-drawdown",
    question: "What happens to my drawdown after a payout?",
    answer:
      "After a payout, your Maximum Loss Limit (MLL) is reset to $0.00. Your remaining account balance becomes your entire loss buffer. If losses reduce your account balance to $0.00 or below, the account is failed.",
  },
  {
    id: "profit-buffer",
    question: "What is a Profit Buffer?",
    answer:
      "A profit buffer is a threshold amount you must earn before unlocking certain payout options. For example, on the Dynasty Plan, traders must build a $3,000 profit buffer before they can request daily payouts. The buffer protects against account drawdown and ensures sustainable trading before withdrawals begin.",
  },
  {
    id: "copy-trading",
    question: "Can I use copy trading or bots?",
    answer:
      "Copy trading is allowed on all plans. You can use copy trade platforms, trade copiers, your own accounts as masters, and social trading tools. However, bots and automated trading systems are NOT allowed—all trading must be manually executed.",
  },
  {
    id: "platforms",
    question: "What platforms do you support?",
    answer:
      "We support connections to platforms like Tradovate with Rithmic data feed integration. These are third-party platforms and feeds—Dynasty Futures is a proprietary trading firm, not a brokerage.",
  },
  {
    id: "rule-violation",
    question: "What happens if I break a rule?",
    answer:
      "If you violate any of the trading rules (such as exceeding the daily loss limit, Max Loss Limit, holding over the weekend, or trading during high-impact news), your account may be flagged or terminated depending on the severity. Always review the rules carefully before trading.",
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
      "Yes — but only on the Standard Plan evaluation.\n\nThe Standard Plan includes a 50% consistency rule during the evaluation phase only, meaning no single trading day may account for more than 50% of the total profit target.\n\nOnce the evaluation is passed and the account is approved for funding, the consistency rule is removed.\n\nNo other plans include a consistency rule, and no funded accounts are subject to a consistency rule.",
  },
  {
    id: "getting-started",
    question: "How do I get started?",
    answer:
      "Simply visit our Pricing page, choose your preferred plan and account size, and complete the checkout process. For Standard and Advanced plans, you'll begin your evaluation challenge. For Dynasty Plan, you'll start trading immediately after purchase.",
  },
  {
    id: "profit-target",
    question: "What is the profit target?",
    answer:
      "The profit target varies by account size. For $25K accounts it's $1,500, for $50K accounts it's $3,000, for $100K accounts it's $6,000, and for $150K accounts it's $8,000. Once you reach your profit target while following all rules, you pass the challenge.",
  },
  {
    id: "five-payouts",
    question: "What happens after I receive five payouts?",
    answer:
      "After a trader has completed five (5) payouts, all future payouts are subject to an 80/20 profit split, with 80% paid to the trader and 20% retained by Dynasty Futures.",
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
      <div className="page-transition py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about Dynasty Futures and our
              trading challenges.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
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
              ))}
            </Accordion>
          </div>

          {/* Contact CTA */}
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
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
