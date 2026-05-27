import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { breadcrumb } from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VALID_TABS = ["risk", "terms", "privacy", "refund", "restricted", "rise-payouts", "kyc-aml", "chargebacks", "trading-rules"];

const RULE_EXPLAINERS = [
  { id: "daily-loss", label: "Daily Loss Limit Explained" },
  { id: "drawdown", label: "Drawdown Rules Explained" },
  { id: "news-trading", label: "News Trading Policy" },
  { id: "consistency", label: "Consistency Rule Explained" },
  { id: "position-size", label: "Position Size Limits" },
  { id: "profit-targets", label: "Profit Targets Explained" },
  { id: "payouts-split", label: "Payouts & Profit Split" },
  { id: "violations", label: "Account Violations & Resets" },
  { id: "copy-trading", label: "Copy Trading & Automated Systems Policy" },
];

const Legal = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const ruleParam = searchParams.get("rule");
  const [activeTab, setActiveTab] = useState(
    VALID_TABS.includes(tabParam ?? "") ? tabParam! : "risk"
  );
  const [activeRule, setActiveRule] = useState<string | null>(
    ruleParam && RULE_EXPLAINERS.some(r => r.id === ruleParam) ? ruleParam : null
  );

  const handleSetActiveRule = (id: string | null) => {
    setActiveRule(id);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <Layout>
      <PageMeta
        title="Legal & Risk Disclosure"
        description="Dynasty Futures legal documents including risk disclosure, terms of service, privacy policy, and refund policy."
        path="/legal"
      />
      <JsonLd
        data={breadcrumb([
          { name: 'Home', url: 'https://www.dynastyfuturesdyn.com/' },
          { name: 'Legal & Risk Disclosure', url: 'https://www.dynastyfuturesdyn.com/legal' },
        ])}
      />
      <div className="page-transition py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Legal & <span className="text-gradient">Risk Disclosure</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Important legal information and disclosures for Dynasty Futures
              users.
            </p>
          </ScrollReveal>

          {/* Tabs */}
          <ScrollReveal className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="overflow-x-auto mb-8">
              <TabsList className="flex flex-nowrap w-full min-w-max bg-muted/30 p-1.5 rounded-xl gap-3">
                <TabsTrigger
                  value="risk"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-1"
                >
                  Risk Disclosure
                </TabsTrigger>
                <TabsTrigger
                  value="terms"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-1"
                >
                  Terms of Use
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-1"
                >
                  Privacy Policy
                </TabsTrigger>
                <TabsTrigger
                  value="refund"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-1"
                >
                  Refund & Cancellation
                </TabsTrigger>
                <TabsTrigger
                  value="restricted"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-1"
                >
                  Restricted Countries
                </TabsTrigger>
                <TabsTrigger
                  value="rise-payouts"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-1"
                >
                  Rise Payouts
                </TabsTrigger>
                <TabsTrigger
                  value="kyc-aml"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-1"
                >
                  KYC & AML Policy
                </TabsTrigger>
                <TabsTrigger
                  value="chargebacks"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-1"
                >
                  Payment Disputes
                </TabsTrigger>
                <TabsTrigger
                  value="trading-rules"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-1"
                  onClick={() => handleSetActiveRule(null)}
                >
                  Trading Rules
                </TabsTrigger>
              </TabsList>
              </div>

              <TabsContent value="risk">
                <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Risk Disclosure Statement
                  </h2>

                  <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">IMPORTANT:</strong>{" "}
                      All trading activity through Dynasty Futures LLC takes
                      place in a simulated environment. Evaluations, account
                      performance, and payout eligibility are based on
                      simulated trading results. Participants do not risk
                      personal trading capital, and payouts, if any, are made
                      in accordance with the rules and terms of the applicable
                      program.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Nature of Simulated Trading
                    </h3>
                    <p>
                      All trading at Dynasty Futures takes place in a simulated
                      environment. No live capital is ever traded. You trade
                      using real-time market data, but all orders and
                      executions are simulated. Payouts are based entirely on
                      your simulated trading performance.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      No Guarantee of Payouts
                    </h3>
                    <p>
                      Dynasty Futures makes no representations or guarantees
                      that any trader will achieve payouts. The challenges and
                      simulated funded accounts offered by Dynasty Futures are
                      designed to evaluate trading skills in a simulated
                      environment. Payout eligibility depends on meeting the
                      performance criteria and following all trading rules.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Simulated Environment
                    </h3>
                    <p>
                      Both the challenge phase and the funded phase use
                      simulated accounts with live market data. You never trade
                      live capital at any stage. Performance in a simulated
                      environment is based on your trading decisions and
                      strategy execution within the simulated platform.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Dynasty Futures is Not a Brokerage
                    </h3>
                    <p>
                      Dynasty Futures is a proprietary trading firm, not a
                      brokerage or registered investment advisor. We do not
                      provide investment advice, recommendations, or
                      personalized financial planning services. All trading
                      decisions are made solely by the trader.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Seek Professional Advice
                    </h3>
                    <p>
                      Before engaging with our services, you should carefully
                      consider your financial situation and consult with a
                      qualified financial advisor. Nothing on this website
                      constitutes financial, legal, or tax advice.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="terms">
                <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-10">

                  {/* Header */}
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                      Terms of Use
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Last updated: May 2026 · Governing law: State of Wyoming
                    </p>
                  </div>

                  {/* 1. Acceptance of Policies & Disclosures */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      1. Acceptance of Policies &amp; Disclosures
                    </h3>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        By accessing, registering for, or using any Dynasty Futures LLC website, platform, service, or product, you accept and agree to be bound by these Terms of Use and all of the following policies, which are incorporated herein by reference and form a single master agreement between you and Dynasty Futures:
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
                      {[
                        { label: "Trading Rules", tab: "risk" },
                        { label: "Risk Disclosure", tab: "risk" },
                        { label: "Refund & Cancellation Policy", tab: "refund" },
                        { label: "KYC & AML Policy", tab: "kyc-aml" },
                        { label: "Restricted Countries & Regions Policy", tab: "restricted" },
                        { label: "Chargeback & Payment Dispute Policy", tab: "chargebacks" },
                        { label: "Rise Payout Guide", tab: "rise-payouts" },
                        { label: "Privacy Policy", tab: "privacy" },
                      ].map(({ label, tab }) => (
                        <button
                          key={label}
                          onClick={() => setActiveTab(tab)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 text-left group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                          <span className="text-sm text-primary group-hover:text-primary font-medium">{label} →</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Any additional policies, guidelines, or rules posted on the Dynasty Futures website are also incorporated into this agreement. If you do not agree to these Terms or any incorporated policy, you must immediately stop using Dynasty Futures services.
                    </p>
                    <div className="mt-4 p-4 rounded-xl border border-border/50 bg-muted/20 text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Policy Updates:</strong> Dynasty Futures reserves the right to modify these Terms and any referenced policy at any time. Updates are effective upon posting. Continued use of Dynasty Futures services after any update constitutes your acceptance of the revised terms.
                    </div>
                  </div>

                  {/* 2. Eligibility */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      2. Eligibility
                    </h3>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        You must be at least 18 years old and legally capable of entering into binding contracts to use Dynasty Futures services. By using our services, you represent and warrant that you meet these requirements.
                      </p>
                      <p>
                        Users from restricted countries and regions are not eligible to register for, purchase, or access Dynasty Futures services. See Section 7 and the{" "}
                        <button onClick={() => setActiveTab("restricted")} className="text-primary hover:underline font-medium">Restricted Countries &amp; Regions Policy</button>{" "}
                        for the full list.
                      </p>
                    </div>
                  </div>

                  {/* 3. Account Responsibilities */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      3. Account Responsibilities
                    </h3>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        You are solely responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must notify Dynasty Futures support immediately of any unauthorized access or suspected breach.
                      </p>
                      <p>
                        Accounts are personal and non-transferable. You may not share your account, allow third-party access, or permit another individual to trade on your behalf. Each account must be registered with accurate, truthful identity information matching the account holder.
                      </p>
                    </div>
                  </div>

                  {/* 4. Subscription Renewals & Billing */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      4. Subscription Renewals &amp; Billing
                    </h3>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        Dynasty Futures evaluation accounts are <strong className="text-foreground">subscription-based</strong> and renew monthly unless canceled before the next billing cycle. By purchasing an evaluation account, you authorize recurring monthly charges until you cancel.
                      </p>
                      <p>
                        You are responsible for canceling your subscription before the next billing cycle if you do not wish to be charged for the next period. Cancellation stops future billing only. Cancellations do not create refunds or credits for the current or any prior billing period, or for previously issued account access, platform access, or credentials.
                      </p>
                      <p>
                        <strong className="text-foreground">Reset fees</strong> (evaluation resets and funded resets) are one-time purchases and are never billed on a recurring monthly basis. Reset fees are non-refundable once issued.
                      </p>
                      <p>
                        The Standard Plan requires a separate one-time <strong className="text-foreground">$80 activation fee</strong> after passing the evaluation, in addition to the evaluation subscription fee. The Advanced and Builder Plans have no activation fee.
                      </p>
                    </div>
                    <div className="mt-4 p-4 rounded-xl border border-border/50 bg-muted/20 text-sm text-muted-foreground">
                      For full billing and cancellation terms, see the{" "}
                      <button onClick={() => setActiveTab("refund")} className="text-primary hover:underline font-medium">Refund &amp; Cancellation Policy</button>.
                    </div>
                  </div>

                  {/* 5. Refunds & Cancellations */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      5. Refunds &amp; Cancellations
                    </h3>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        All purchases made through Dynasty Futures are <strong className="text-foreground">generally final</strong>. Due to the digital and performance-based nature of simulated trading evaluations and the immediate delivery of account access, purchases are non-refundable and non-transferable once account access, platform access, or credentials have been issued.
                      </p>
                      <p>
                        Failure to meet trading objectives, rule violations, breaches, or account terminations do not qualify any purchase for refund, credit, or reimbursement.
                      </p>
                      <p>
                        In the event of a verified technical issue directly attributable to Dynasty Futures that materially prevents platform access, Dynasty Futures may, at its sole discretion, provide an account credit, reset, or replacement account. Cash refunds are not guaranteed.
                      </p>
                    </div>
                    <div className="mt-4 p-4 rounded-xl border border-border/50 bg-muted/20 text-sm text-muted-foreground">
                      See the{" "}
                      <button onClick={() => setActiveTab("refund")} className="text-primary hover:underline font-medium">Refund &amp; Cancellation Policy</button>{" "}
                      for complete terms.
                    </div>
                  </div>

                  {/* 6. Trading Rules Compliance */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      6. Trading Rules Compliance
                    </h3>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        All traders must comply with the Dynasty Futures Trading Rules at all times during both the evaluation and funded phases. Trading rules include, but are not limited to:
                      </p>
                      <ul className="list-none space-y-1.5 pl-2">
                        {[
                          "Trailing end-of-day drawdown limits during evaluations",
                          "Static drawdown limits on funded accounts",
                          "Daily loss limits (Standard Plan)",
                          "Profit targets (evaluation phase)",
                          "Weekend hold prohibition — all positions must be closed before market close on Friday",
                          "News trading restriction — no new positions 2 minutes before or after major scheduled events (CPI, PPI, NFP, FOMC)",
                          "No automated trading systems or bots — all trading must be manually executed",
                          "Trading freeze after payout submission until the payout is approved or denied",
                          "50% withdrawal limit per payout request",
                          "Consistency rules where applicable (Standard and Builder plans)",
                          "Maximum account allocation of 3 accounts",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p>
                        Violation of any trading rule may result in account flag, breach, termination, or permanent suspension without refund. Dynasty Futures reserves the right to review, audit, and take action on any account at any time.
                      </p>
                    </div>
                    <div className="mt-4 p-4 rounded-xl border border-border/50 bg-muted/20 text-sm text-muted-foreground">
                      Full rule definitions are available on the{" "}
                      <a href="/rules" className="text-primary hover:underline font-medium">Trading Rules page</a>.
                    </div>
                  </div>

                  {/* 7. KYC, AML & Compliance Reviews */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      7. KYC, AML &amp; Compliance Reviews
                    </h3>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        Dynasty Futures may require Know Your Customer (KYC) and Anti-Money Laundering (AML) verification before approving any payout. KYC and AML compliance are mandatory requirements for funded traders.
                      </p>
                      <p>
                        Dynasty Futures utilizes <strong className="text-foreground">Sumsub</strong>, a regulated identity verification and compliance provider, to conduct identity verification, liveness checks, sanctions screening, politically exposed person (PEP) screening, adverse media review, and ongoing AML compliance monitoring.
                      </p>
                      <p>
                        Separately, <strong className="text-foreground">Rise Works</strong> (Dynasty Futures' primary payout provider) requires its own independent verification and onboarding before any payout can be processed. Completing Dynasty Futures / Sumsub verification does not satisfy Rise verification, and vice versa. Both must be completed independently.
                      </p>
                      <p>
                        Compliance reviews may also include fraud prevention checks, account ownership verification, sanctions screening, and review of trading activity. Dynasty Futures may initiate these reviews at any time during the funded account relationship, not only at the time of a payout request.
                      </p>
                      <p>
                        Failed, incomplete, or fraudulent verification may result in delayed payouts, payout denial, account restriction, or permanent platform termination.
                      </p>
                    </div>
                    <div className="mt-4 p-4 rounded-xl border border-border/50 bg-muted/20 text-sm text-muted-foreground">
                      See the{" "}
                      <button onClick={() => setActiveTab("kyc-aml")} className="text-primary hover:underline font-medium">KYC &amp; AML Policy</button>{" "}
                      and{" "}
                      <button onClick={() => setActiveTab("rise-payouts")} className="text-primary hover:underline font-medium">Rise Payout Guide</button>{" "}
                      for full verification requirements.
                    </div>
                  </div>

                  {/* 8. Restricted Countries & Jurisdictions */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      8. Restricted Countries &amp; Jurisdictions
                    </h3>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        Users from restricted countries and regions may not register for, purchase, access, or use Dynasty Futures services in any capacity. This restriction applies to account registration, evaluation purchases, funded account access, and payout eligibility.
                      </p>
                      <p>
                        Dynasty Futures may restrict access based on U.S. sanctions programs, AML risk, payment processor limitations, identity verification restrictions, fraud prevention controls, VPN or proxy usage, or internal risk management decisions.
                      </p>
                      <p>
                        The list of restricted jurisdictions may change at any time without prior notice. Dynasty Futures reserves the right to deny or terminate access to any jurisdiction at its sole discretion.
                      </p>
                      <p>
                        Attempting to bypass geographic restrictions through VPNs, proxies, false residency information, or any other means is a violation of these Terms and may result in immediate account termination and permanent ban without refund.
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => setActiveTab("restricted")}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/40 bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 hover:border-primary/60 transition-all duration-200"
                      >
                        View Restricted Countries &amp; Regions →
                      </button>
                    </div>
                  </div>

                  {/* 9. Chargebacks & Payment Disputes */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      9. Chargebacks &amp; Payment Disputes
                    </h3>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        By purchasing Dynasty Futures services, you agree that initiating an unauthorized or illegitimate chargeback or payment dispute after services have been delivered, activated, or accessed is a violation of these Terms of Use.
                      </p>
                      <p>
                        Upon receipt of a chargeback or payment dispute notification, Dynasty Futures may immediately suspend, freeze, restrict, or terminate all accounts associated with the disputed transaction, including any pending or in-progress payout requests. Future purchases may also be permanently blocked.
                      </p>
                      <p>
                        Dynasty Futures maintains comprehensive records of all transactions and will actively contest illegitimate disputes. Evidence submitted to payment processors may include transaction records, account activation and delivery confirmation, login history, session records, platform usage and trading activity logs, identity and verification documentation, IP address and device records, and support and communication history.
                      </p>
                      <p>
                        If you have a billing question, technical issue, or account concern, you are strongly encouraged to contact Dynasty Futures support before initiating a payment dispute. Most concerns can be resolved quickly through direct communication.
                      </p>
                    </div>
                    <div className="mt-4 p-4 rounded-xl border border-border/50 bg-muted/20 text-sm text-muted-foreground">
                      See the{" "}
                      <button onClick={() => setActiveTab("chargebacks")} className="text-primary hover:underline font-medium">Chargeback &amp; Payment Dispute Policy</button>{" "}
                      for full terms.
                    </div>
                  </div>

                  {/* 10. Account Suspension & Termination */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      10. Account Suspension &amp; Termination
                    </h3>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        Dynasty Futures reserves the right to suspend, restrict, review, or permanently terminate any account at any time, with or without prior notice, for any of the following reasons:
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
                      {[
                        "Trading rule violations",
                        "Suspicious or unusual account activity",
                        "Fraud concerns or indicators",
                        "Identity misrepresentation or false information",
                        "Account sharing or joint access",
                        "Third-party account operation",
                        "VPN, proxy, or location-masking tool usage",
                        "Payment disputes or chargebacks",
                        "Access from a restricted jurisdiction",
                        "KYC or AML verification failure",
                        "Attempts to exploit platform errors or loopholes",
                        "Breach of any Dynasty Futures policy",
                        "Encouraging or facilitating rule violations by others",
                        "Any conduct deemed harmful to platform integrity",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive/60 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Termination may occur without refund where permitted under Dynasty Futures policies. Dynasty Futures will assess each situation based on account history, compliance records, and applicable platform rules.
                    </p>
                  </div>

                  {/* 11. Payout Eligibility & Verification */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      11. Payout Eligibility &amp; Verification
                    </h3>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        Payouts are not guaranteed. Eligibility for a payout requires full compliance with all Dynasty Futures trading rules, successful completion of KYC and AML verification, completion of Rise payout provider onboarding, and Dynasty Futures internal review approval.
                      </p>
                      <p>
                        <strong className="text-foreground">Passing an evaluation does not guarantee payout approval.</strong> All payout requests remain subject to ongoing compliance review, account standing, trading rule adherence, verification status, and Dynasty Futures internal approval at every stage of processing.
                      </p>
                      <p>
                        Payouts may be delayed, held, or denied due to compliance, fraud, trading rule violations, incomplete verification, payout provider requirements, or any other reason at Dynasty Futures' discretion.
                      </p>
                      <p>
                        The following payout structure applies to funded accounts:
                      </p>
                      <ul className="list-none space-y-1.5 pl-2">
                        {[
                          "90/10 profit split for the first five approved payouts (90% to trader)",
                          "80/20 profit split after five approved payouts (80% to trader)",
                          "Up to 4 payout requests per calendar month",
                          "Minimum 5 qualifying trading days between payout requests",
                          "50% withdrawal limit per payout request",
                          "Payout requests submitted before 2:00 PM CT begin processing same business day",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 p-4 rounded-xl border border-border/50 bg-muted/20 text-sm text-muted-foreground">
                      See the{" "}
                      <button onClick={() => setActiveTab("rise-payouts")} className="text-primary hover:underline font-medium">Rise Payout Guide</button>{" "}
                      and{" "}
                      <button onClick={() => setActiveTab("kyc-aml")} className="text-primary hover:underline font-medium">KYC &amp; AML Policy</button>{" "}
                      for full payout and verification requirements.
                    </div>
                  </div>

                  {/* 12. Prohibited Activities */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      12. Prohibited Activities
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      The following activities are strictly prohibited and may result in immediate account suspension or permanent termination without refund:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "Account sharing or allowing third parties to access or trade your account",
                        "Using false, altered, or fraudulent identity information",
                        "Using stolen, unauthorized, or third-party payment methods",
                        "Exploiting platform errors, system glitches, or pricing anomalies",
                        "Attempting to bypass geographic or jurisdiction restrictions",
                        "Using VPNs, proxies, or location-masking tools to evade compliance controls",
                        "Filing unauthorized, abusive, or fraudulent chargebacks",
                        "Operating multiple accounts in violation of platform rules",
                        "Using automated trading systems, bots, or algorithmic execution tools",
                        "Trading during prohibited news windows",
                        "Holding positions over the weekend",
                        "Engaging in fraudulent or deceptive conduct on or relating to the platform",
                        "Encouraging, facilitating, or enabling rule violations by other users",
                        "Providing false information during KYC, AML, or Rise verification",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive/60 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 13. No Guarantee of Success — Simulated Trading Disclosure */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      13. No Guarantee of Success — Simulated Trading Disclosure
                    </h3>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        Any references on this website to trading, traders, accounts, performance, revenue, profits, or payouts refer to simulated or evaluation-based activity unless expressly stated otherwise. Dynasty Futures provides proprietary trading evaluation services and does not offer investment advice, brokerage services, or live client investment accounts.
                      </p>
                      <p>
                        Futures trading involves substantial risk and is not appropriate for every person. Market conditions can change rapidly, and trading futures or futures-related products can result in significant losses. Only risk capital should ever be used in connection with trading activity. Past performance, whether actual, simulated, or advertised, is not indicative of future results.
                      </p>
                      <p>
                        Any performance information, metrics, results, or examples shown on this website, in dashboards, on social media, in promotional content, or in other materials may be based on simulated, hypothetical, or evaluation account performance. Hypothetical or simulated results have important limitations. Unlike actual trading, simulated results do not reflect real market execution, liquidity constraints, slippage, emotional decision-making, or the impact of live market conditions. Because hypothetical results are often prepared with the benefit of hindsight, they may overstate or understate actual performance.
                      </p>
                      <p>
                        <strong className="text-foreground">There is no guarantee that any participant will pass an evaluation, receive a funded account, earn profits, or receive payouts.</strong> Dynasty Futures makes no representations or warranties regarding evaluation outcomes, payout approvals, or trading profitability.
                      </p>
                      <p>
                        Payout examples, testimonials, and user experiences shown on this website may not be representative of the experience of all users. Testimonials are not a guarantee of future success or performance. Individual results vary based on many factors, including skill, market conditions, risk management, and adherence to program rules.
                      </p>
                    </div>
                  </div>

                  {/* 14. CFTC Rule 4.41 Disclosure */}
                  <div className="p-5 rounded-xl border border-border/50 bg-muted/10">
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      CFTC Rule 4.41 Disclosure
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Hypothetical or simulated performance results have certain inherent limitations. Unlike an actual performance record, simulated results do not represent actual trading. Also, because the trades have not been executed, the results may have under- or over-compensated for the impact, if any, of certain market factors, including lack of liquidity. Simulated trading programs in general are also designed with the benefit of hindsight. No representation is being made that any account will or is likely to achieve profits or losses similar to those shown.
                    </p>
                  </div>

                  {/* 15. Disclaimer of Warranties */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      15. Disclaimer of Warranties
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Dynasty Futures provides its website, services, platforms, and any related content on an "as is" and "as available" basis. To the fullest extent permitted by law, Dynasty Futures disclaims all warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, reliability, or availability. Dynasty Futures does not warrant that the services will be uninterrupted, error-free, secure, or free from defects. Your use of the services is at your sole risk.
                    </p>
                  </div>

                  {/* 16. Limitation of Liability */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      16. Limitation of Liability
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      To the fullest extent permitted by applicable law, Dynasty Futures shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services, including but not limited to loss of profits, loss of data, business interruption, or any other commercial damages or losses, even if Dynasty Futures has been advised of the possibility of such damages.
                    </p>
                  </div>

                  {/* 17. Governing Law */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      17. Governing Law
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      These Terms of Use are governed by and construed in accordance with the laws of the State of Wyoming, without regard to its conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of the State of Wyoming.
                    </p>
                  </div>

                  {/* 18. Modifications to Terms */}
                  <div>
                    <h3 className="text-foreground font-display text-lg font-semibold mb-3">
                      18. Modifications to Terms
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Dynasty Futures reserves the right to modify, update, or replace these Terms of Use and any incorporated policy at any time. Changes are effective upon posting to the website. Continued use of Dynasty Futures services after any modification constitutes your acceptance of the updated Terms. You are responsible for reviewing these Terms periodically.
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="p-6 rounded-2xl border border-border/50 bg-muted/20">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      Questions About These Terms?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      If you have questions about these Terms of Use or any Dynasty Futures policy, please contact our support team.
                    </p>
                    <a
                      href="https://www.dynastyfuturesdyn.com/support"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
                    >
                      Open Support Center
                    </a>
                    <p className="text-xs text-muted-foreground mt-4">
                      support@dynastyfuturesdyn.com · Available 24 hours a day, 7 days a week
                    </p>
                  </div>

                </div>
              </TabsContent>

              <TabsContent value="privacy">
                <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Privacy Policy
                  </h2>

                  <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
                    <h3 className="text-foreground font-display text-lg">
                      Information We Collect
                    </h3>
                    <p>
                      We collect information you provide directly to us,
                      including name, email address, payment information, and
                      identity verification documents for KYC purposes.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      How We Use Your Information
                    </h3>
                    <p>
                      We use the information we collect to provide, maintain,
                      and improve our services, process transactions, send
                      communications, and comply with legal obligations.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Information Sharing
                    </h3>
                    <p>
                      We do not sell your personal information. We may share
                      information with third-party service providers who assist
                      us in operating our services, subject to confidentiality
                      obligations.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Data Security
                    </h3>
                    <p>
                      We implement appropriate technical and organizational
                      measures to protect your personal information against
                      unauthorized access, alteration, disclosure, or
                      destruction.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Cookies and Tracking Technologies
                    </h3>
                    <p>
                      Dynasty Futures uses cookies and similar tracking
                      technologies to enhance user experience, analyze website
                      performance, and support marketing efforts.
                    </p>
                    <p>
                      Cookies are small data files stored on your device that
                      help us understand how users interact with our website.
                      These technologies may collect information such as browser
                      type, device information, pages visited, time spent on
                      pages, and general location data.
                    </p>
                    <p>
                      We may use both first-party cookies (set by Dynasty
                      Futures) and third-party cookies provided by services such
                      as analytics platforms and advertising partners.
                    </p>
                    <p>These technologies are used for purposes including:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Ensuring the website functions properly</li>
                      <li>
                        Improving site performance and user experience
                      </li>
                      <li>Analyzing traffic and usage patterns</li>
                      <li>
                        Supporting marketing and advertising efforts
                      </li>
                    </ul>
                    <p>
                      By using our website, you consent to the use of cookies in
                      accordance with this policy. You may control or disable
                      cookies through your browser settings at any time.
                      However, disabling cookies may impact certain features and
                      functionality of the website.
                    </p>
                    <p>
                      For more information about how we handle your data, please
                      refer to the rest of this Privacy Policy.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Your Rights
                    </h3>
                    <p>
                      Depending on your jurisdiction, you may have rights to
                      access, correct, delete, or port your personal data.
                      Contact us at support@dynastyfuturesdyn.com to exercise
                      these rights.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Contact Us
                    </h3>
                    <p>
                      If you have questions about this Privacy Policy, please
                      contact us at support@dynastyfuturesdyn.com.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="refund">
                <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Refund & Cancellation Policy
                  </h2>

                  <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
                    <h3 className="text-foreground font-display text-lg mt-6">
                      All Sales Final
                    </h3>
                    <p>
                      Due to the digital and performance-based nature of
                      simulated trading evaluations and immediate account
                      delivery, all purchases made through Dynasty Futures are
                      considered final.
                    </p>
                    <p>
                      Once an evaluation account, funded simulation account,
                      platform access, or account credentials have been issued,
                      purchases are non-refundable and non-transferable.
                    </p>
                    <p>
                      Dynasty Futures does not guarantee trading performance,
                      profitability, or evaluation success, and failure to meet
                      trading objectives does not qualify a purchase for refund
                      or reimbursement.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Rule Violations and Terminations
                    </h3>
                    <p>
                      Accounts that are breached, terminated, disabled, or
                      found in violation of Dynasty Futures rules or Terms of
                      Use are not eligible for refunds, credits, or
                      reimbursements.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Subscription Cancellations
                    </h3>
                    <p>
                      Dynasty Futures evaluation accounts are subscription-based
                      and renew monthly unless canceled before the next billing
                      cycle. Users may cancel future billing at any time prior
                      to renewal. Cancellation stops future charges but does not
                      entitle the user to refunds for prior payments, active
                      billing periods, or previously issued account access.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Technical Issues
                    </h3>
                    <p>
                      In the event of a verified technical issue directly
                      attributable to Dynasty Futures that materially prevents
                      platform access, Dynasty Futures may, at its sole
                      discretion, provide an account credit, reset, or
                      replacement account. Cash refunds are not guaranteed.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Contact
                    </h3>
                    <p>
                      For questions regarding this Refund & Cancellation Policy,
                      please contact{" "}
                      <a
                        href="mailto:support@dynastyfuturesdyn.com"
                        className="text-primary hover:underline"
                      >
                        support@dynastyfuturesdyn.com
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="restricted">
                <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Restricted Countries & Regions
                  </h2>

                  <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                    <p>
                      Dynasty Futures does not currently accept users or account
                      registrations from certain countries or regions due to U.S.
                      compliance requirements, sanctions programs, payment
                      processor limitations, identity verification restrictions,
                      fraud prevention, AML risk, or internal risk controls.
                    </p>

                    <p>
                      The following countries and regions are not eligible to
                      register for or access Dynasty Futures services:
                    </p>

                    {/* A–C */}
                    <h3 className="text-foreground font-display text-base font-semibold mt-6 mb-2 not-prose tracking-wide uppercase text-xs">
                      A – C
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 not-prose">
                      {[
                        "Afghanistan",
                        "Albania",
                        "Algeria",
                        "Angola",
                        "Bahamas",
                        "Barbados",
                        "Belarus",
                        "Bosnia & Herzegovina",
                        "Botswana",
                        "Bulgaria",
                        "Burkina Faso",
                        "Burundi",
                        "Cambodia",
                        "Cameroon",
                        "Central African Republic",
                        "China",
                        "Congo (DRC)",
                        "Côte d'Ivoire",
                        "Crimea Region",
                        "Croatia",
                        "Cuba",
                      ].map((country) => (
                        <div
                          key={country}
                          className="flex items-center gap-2 py-1.5 border-b border-border/30 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive/70 flex-shrink-0" />
                          {country}
                        </div>
                      ))}
                    </div>

                    {/* D–L */}
                    <h3 className="text-foreground font-display text-base font-semibold mt-6 mb-2 not-prose tracking-wide uppercase text-xs">
                      D – L
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 not-prose">
                      {[
                        "Donetsk Region",
                        "Ecuador",
                        "Ethiopia",
                        "Ghana",
                        "Haiti",
                        "Hong Kong",
                        "Indonesia",
                        "Iran",
                        "Iraq",
                        "Jamaica",
                        "Jordan",
                        "Kenya",
                        "Kosovo",
                        "Laos",
                        "Lebanon",
                        "Liberia",
                        "Libya",
                        "Luhansk Region",
                      ].map((country) => (
                        <div
                          key={country}
                          className="flex items-center gap-2 py-1.5 border-b border-border/30 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive/70 flex-shrink-0" />
                          {country}
                        </div>
                      ))}
                    </div>

                    {/* M–S */}
                    <h3 className="text-foreground font-display text-base font-semibold mt-6 mb-2 not-prose tracking-wide uppercase text-xs">
                      M – S
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 not-prose">
                      {[
                        "Malaysia",
                        "Mali",
                        "Mauritius",
                        "Mexico",
                        "Mongolia",
                        "Montenegro",
                        "Morocco",
                        "Mozambique",
                        "Myanmar (Burma)",
                        "Namibia",
                        "Nicaragua",
                        "Nigeria",
                        "North Korea",
                        "North Macedonia",
                        "Pakistan",
                        "Panama",
                        "Papua New Guinea",
                        "Philippines",
                        "Qatar",
                        "Romania",
                        "Russia",
                        "Serbia",
                        "Somalia",
                        "South Africa",
                        "South Sudan",
                        "Sri Lanka",
                        "Sudan",
                        "Syria",
                      ].map((country) => (
                        <div
                          key={country}
                          className="flex items-center gap-2 py-1.5 border-b border-border/30 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive/70 flex-shrink-0" />
                          {country}
                        </div>
                      ))}
                    </div>

                    {/* T–Z */}
                    <h3 className="text-foreground font-display text-base font-semibold mt-6 mb-2 not-prose tracking-wide uppercase text-xs">
                      T – Z
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 not-prose">
                      {[
                        "Tanzania",
                        "Trinidad and Tobago",
                        "Tunisia",
                        "Turkey",
                        "Uganda",
                        "Ukraine",
                        "United Arab Emirates",
                        "Venezuela",
                        "Vietnam",
                        "Yemen",
                        "Zimbabwe",
                      ].map((country) => (
                        <div
                          key={country}
                          className="flex items-center gap-2 py-1.5 border-b border-border/30 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive/70 flex-shrink-0" />
                          {country}
                        </div>
                      ))}
                    </div>

                    <h3 className="text-foreground font-display text-lg mt-8">
                      KYC & Verification Requirements
                    </h3>
                    <p>
                      All funded traders must complete identity verification and
                      payout provider verification before receiving payouts.
                      Dynasty Futures may deny, suspend, restrict, or terminate
                      access if verification fails, documents are fraudulent,
                      sanctions screening identifies risk, or a user attempts to
                      bypass jurisdiction restrictions through VPNs, proxies,
                      false information, or third-party account access.
                    </p>

                    <div className="mt-8 p-4 rounded-xl border border-border/50 bg-muted/20 text-sm">
                      <p className="text-muted-foreground">
                        Dynasty Futures reserves the right to restrict or deny
                        access to any jurisdiction at its sole discretion for
                        compliance, fraud prevention, identity verification,
                        operational risk management, AML risk, or payment
                        processor requirements. Restricted jurisdictions may
                        change at any time without notice.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="rise-payouts">
                <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-10">

                  {/* Header */}
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                      Rise Payout Guide
                    </h2>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        Dynasty Futures processes trader payouts through{" "}
                        <strong className="text-foreground">Rise Works</strong>, a modern payout and
                        compliance platform used by trading firms and digital businesses worldwide.
                      </p>
                      <p>
                        Rise helps facilitate payout delivery, identity verification, compliance
                        screening, and secure payment processing for funded traders.
                      </p>
                      <p>
                        Before receiving payouts, traders may be required to complete identity
                        verification and payment onboarding through Rise.
                      </p>
                    </div>
                  </div>

                  {/* Official Rise Resources */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      Official Rise Resources
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { label: "Rise Website", sub: "riseworks.io", href: "https://www.riseworks.io/" },
                        { label: "Rise Help Center", sub: "help.riseworks.io", href: "https://help.riseworks.io/" },
                        { label: "Rise Login", sub: "app.riseworks.io", href: "https://app.riseworks.io/" },
                      ].map(({ label, sub, href }) => (
                        <a
                          key={href}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col gap-1 px-5 py-4 rounded-xl border border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/70 transition-all duration-200 group"
                        >
                          <span className="text-sm font-semibold text-primary group-hover:text-primary">
                            {label} →
                          </span>
                          <span className="text-xs text-muted-foreground">{sub}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* How Payouts Work — Step Cards */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      How Dynasty Futures Payouts Work
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        {
                          step: "01",
                          title: "Meet Payout Eligibility",
                          body: "Become eligible for a payout under Dynasty Futures program rules, including profit targets, consistency requirements, and rule adherence.",
                        },
                        {
                          step: "02",
                          title: "Submit Payout Request",
                          body: "Submit your payout request through the Dynasty Futures trader dashboard. All required fields must be accurately completed.",
                        },
                        {
                          step: "03",
                          title: "Dynasty Futures Review",
                          body: "Dynasty Futures reviews account compliance, rule adherence, payout eligibility, account activity, and completes internal fraud and risk screening.",
                        },
                        {
                          step: "04",
                          title: "Approved Payout Sent to Rise",
                          body: "Once internally approved, the payout request is submitted to Rise Works for secure processing and disbursement.",
                        },
                        {
                          step: "05",
                          title: "Rise Verification & Onboarding",
                          body: "Rise may require identity verification or payment method onboarding before releasing funds. Incomplete verification will delay processing.",
                        },
                        {
                          step: "06",
                          title: "Payout Disbursement",
                          body: "Once verification is complete and approved, funds are processed to your selected payout method through Rise's secure payment infrastructure.",
                        },
                      ].map(({ step, title, body }) => (
                        <div
                          key={step}
                          className="flex gap-4 p-5 rounded-xl border border-border/50 bg-muted/10"
                        >
                          <span className="font-display text-2xl font-bold text-primary/40 leading-none mt-0.5 select-none">
                            {step}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                      Submitting a payout request does not guarantee approval. All requests remain
                      subject to ongoing compliance review, account standing, verification status,
                      and Dynasty Futures internal approval at every stage of processing.
                    </p>
                  </div>

                  {/* KYC / Identity Verification */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      Required Verification (KYC)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      As part of the payout process, Rise may require traders to complete
                      Know Your Customer (KYC) verification. This is a standard compliance
                      requirement across financial platforms designed to protect against fraud,
                      money laundering, sanctions violations, and unauthorized disbursements.
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      KYC verification may include, but is not limited to:
                    </p>
                    <ul className="space-y-2 mb-5">
                      {[
                        "Government-issued photo identification (passport, driver's license, or national ID card)",
                        "Selfie or biometric identity confirmation",
                        "Proof of address documentation (utility bill, bank statement, or equivalent)",
                        "Sanctions and international watchlist screening",
                        "Anti-money laundering (AML) compliance checks",
                        "Payment method ownership verification",
                        "Fraud prevention and identity risk review",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 text-sm text-muted-foreground leading-relaxed mb-3">
                      <strong className="text-foreground">Additional Verification:</strong>{" "}
                      Dynasty Futures and Rise reserve the right to request additional verification
                      documentation at any time for compliance, fraud prevention, payment processor
                      requirements, operational security, or identity verification purposes.
                    </div>
                    <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Warning:</strong>{" "}
                      Incomplete, inaccurate, altered, or fraudulent verification documents may
                      result in delayed payouts, payout denial, account restriction, or permanent
                      platform termination.
                    </div>
                  </div>

                  {/* Supported Payout Methods */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      Supported Payout Methods
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Payout method availability is determined by Rise Works and varies by
                      country and region. Not all payment methods are available in every
                      jurisdiction. Banking providers, local transfer rails, and international
                      payment networks may differ based on your location and residency.
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Payout methods may include, subject to regional availability:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {[
                        { label: "Bank Transfer", desc: "Direct deposit to a verified bank account. Availability and timelines vary by institution and country." },
                        { label: "Local Banking Rails", desc: "Domestic ACH, SEPA, or equivalent local transfer networks where supported by Rise." },
                        { label: "International Transfers", desc: "Cross-border wire or payment transfers for eligible international traders, subject to additional compliance requirements." },
                        { label: "Crypto Payout", desc: "Cryptocurrency payout options may be available in supported regions where Rise permits digital asset disbursements." },
                      ].map(({ label, desc }) => (
                        <div key={label} className="p-4 rounded-xl border border-border/50 bg-muted/10">
                          <p className="text-sm font-semibold text-foreground mb-1">{label}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Dynasty Futures does not guarantee the availability of any specific payout
                      method. Method availability is subject to change based on Rise's supported
                      payment infrastructure and applicable compliance requirements.
                    </p>
                  </div>

                  {/* Processing Times */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      Payout Processing Times
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Approved payout requests typically move through several stages including
                      internal review, compliance screening, Rise processing, and banking or
                      payment settlement. Each stage contributes to the overall processing window.
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Processing times may vary depending on:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {[
                        "Verification status and KYC completion",
                        "Banking provider and payment rails",
                        "Public holidays and weekends",
                        "International transfer requirements",
                        "Compliance and fraud review",
                        "Payout volume and processing queue",
                        "Rise platform processing windows",
                        "Payment method selected",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed p-4 rounded-xl border border-border/40 bg-muted/10">
                      Dynasty Futures does not guarantee specific payout delivery dates or timelines.
                      Processing times are estimates and subject to all stages of review described above.
                    </p>
                  </div>

                  {/* Compliance Notes */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      Important Compliance Notes
                    </h3>
                    <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2.5">
                      {[
                        "VPN, proxy, or location-masking tool usage at the time of payout submission may trigger additional review or result in payout denial.",
                        "Identity mismatches between your account registration and verification documents may delay or deny payouts.",
                        "Third-party payment accounts — accounts not in the trader's legal name — are strictly prohibited.",
                        "Fraudulent activity, document manipulation, or misrepresentation may result in immediate payout denial and permanent account termination.",
                        "Dynasty Futures may pause, hold, or restrict payouts at any time during compliance investigations, audits, or platform reviews.",
                        "All payout requests are subject to Dynasty Futures internal approval and are not guaranteed upon submission.",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="mt-0.5 text-amber-500 font-bold leading-none flex-shrink-0">!</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Restricted Jurisdictions */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                      Restricted Jurisdictions
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Certain jurisdictions are restricted due to sanctions programs, AML requirements,
                      payment processor limitations, fraud prevention policies, or identity verification
                      restrictions. Traders residing in restricted jurisdictions are not eligible to
                      receive payouts regardless of trading performance or account status.
                    </p>
                    <button
                      onClick={() => setActiveTab("restricted")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/40 bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 hover:border-primary/60 transition-all duration-200"
                    >
                      View Restricted Countries & Regions →
                    </button>
                  </div>

                  {/* Support Section */}
                  <div className="p-6 rounded-2xl border border-border/50 bg-muted/20">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      Need Help With Rise or Payout Verification?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                      Our support team can assist with payout onboarding, verification questions,
                      payout status inquiries, and Rise setup support.
                    </p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <a
                        href="https://www.dynastyfuturesdyn.com/support"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
                      >
                        Open Support Center
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      support@dynastyfuturesdyn.com · Available 24 hours a day, 7 days a week
                    </p>
                  </div>

                </div>
              </TabsContent>

              <TabsContent value="kyc-aml">
                <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-10">

                  {/* Introduction */}
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                      KYC &amp; AML Policy
                    </h2>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        Dynasty Futures verifies funded traders through Know Your Customer (KYC) and
                        Anti-Money Laundering (AML) procedures prior to payout approval. These requirements
                        are in place to protect traders, safeguard payout systems, and maintain the integrity
                        of the Dynasty Futures platform.
                      </p>
                      <p>
                        Dynasty Futures utilizes Sumsub, a regulated identity verification and compliance
                        provider, to assist with identity verification and AML screening requirements.
                        AML screening may include sanctions screening, politically exposed person (PEP)
                        screening, adverse media review, and ongoing compliance monitoring.
                      </p>
                      <p>
                        In addition to Dynasty Futures verification, traders must also complete a separate
                        onboarding and verification process with Rise, Dynasty Futures' primary payout
                        provider, before any payouts can be processed. Both verifications must be completed
                        independently — completing one does not satisfy the other.
                      </p>
                    </div>
                  </div>

                  {/* Overview: Two-Step Verification */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      Overview: Two-Step Verification Process
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                      Before payouts can be approved or released, traders are required to complete two
                      separate and independent verification processes. These steps are not interchangeable —
                      each must be completed in full.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                      <div className="flex gap-4 p-5 rounded-xl border border-border/50 bg-muted/10">
                        <span className="font-display text-2xl font-bold text-primary/40 leading-none mt-0.5 select-none">
                          01
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">
                            Dynasty Futures Identity Verification
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Conducted via Sumsub. Includes identity verification, liveness check, sanctions
                            screening, PEP screening, and AML compliance review prior to payout approval.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 p-5 rounded-xl border border-border/50 bg-muted/10">
                        <span className="font-display text-2xl font-bold text-primary/40 leading-none mt-0.5 select-none">
                          02
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-1">
                            Payout Provider Verification (Rise)
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            A separate onboarding and verification process required directly by Rise before
                            funds can be released. Independent of Dynasty Futures verification.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 text-sm text-muted-foreground leading-relaxed">
                      Completing Dynasty Futures verification does not automatically satisfy Rise verification
                      requirements, and vice versa. Both processes must be completed before payouts can be
                      approved or released.
                    </div>
                  </div>

                  {/* Step 1 — Dynasty Futures Identity Verification */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      Step 1 — Dynasty Futures Identity Verification
                    </h3>
                    <p className="text-xs text-primary/80 font-semibold uppercase tracking-wide mb-4">
                      Powered by Sumsub · Identity &amp; AML Compliance
                    </p>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed mb-5">
                      <p>
                        Dynasty Futures uses Sumsub, a regulated identity verification and compliance
                        platform, to conduct KYC and AML screening for funded traders. Traders may complete
                        verification prior to submitting their first payout request, or verification may be
                        required as part of the payout review process.
                      </p>
                      <p>
                        KYC verification becomes a mandatory requirement before any payout can be approved.
                        Dynasty Futures reserves the right to request verification at any point during the
                        funded account relationship.
                      </p>
                    </div>
                    <div className="p-5 rounded-xl border border-border/50 bg-muted/10">
                      <p className="text-sm font-semibold text-foreground mb-3">
                        Verification may include:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          "Government-issued photo ID",
                          "Liveness check / selfie verification",
                          "Sanctions and watchlist screening",
                          "Politically exposed person (PEP) screening",
                          "Adverse media review",
                          "Ongoing AML compliance monitoring",
                        ].map((item) => (
                          <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* When Is Verification Required? */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      When Is Verification Required?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Verification and compliance review requirements are not limited to a single point in
                      the funded relationship. Dynasty Futures may require or initiate verification under
                      any of the following circumstances:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {[
                        "Before first payout request",
                        "During payout review and processing",
                        "After detection of unusual or suspicious activity",
                        "During periodic scheduled compliance reviews",
                        "Following material account changes or updates",
                        "At Dynasty Futures' sole discretion at any time",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Dynasty Futures maintains ongoing compliance and fraud prevention procedures designed
                      to protect traders, payout providers, platform integrity, and operational security.
                      Verification and compliance reviews may occur periodically throughout the funded
                      account relationship.
                    </p>
                  </div>

                  {/* Step 2 — Rise Payout Provider Verification */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      Step 2 — Payout Provider Verification (Rise)
                    </h3>
                    <p className="text-xs text-primary/80 font-semibold uppercase tracking-wide mb-4">
                      Separate Onboarding Required · Independent of Dynasty Futures Verification
                    </p>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed mb-5">
                      <p>
                        Rise is Dynasty Futures' primary payout provider for most supported countries.
                        Traders must complete Rise's own onboarding and verification process before any
                        payouts can be released. This is a separate requirement from Dynasty Futures
                        verification — completing Step 1 does not automatically satisfy Rise requirements.
                      </p>
                      <p>
                        After Dynasty Futures internal review is completed, eligible traders may receive
                        a Rise onboarding invitation to the email address associated with their Dynasty
                        Futures account. Traders must follow that process to completion before payouts
                        can be processed.
                      </p>
                    </div>
                    <div className="p-5 rounded-xl border border-border/50 bg-muted/10 mb-5">
                      <p className="text-sm font-semibold text-foreground mb-3">
                        Rise may require:
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Government-issued photo ID (passport, driver's license, or national ID)",
                          "Proof of address documentation",
                          "Tax documentation where applicable",
                          "Banking or payment method verification",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        Traders must complete Rise account setup, including wallet or payment method
                        configuration, before payouts can be released. Payout method availability may
                        vary by country or jurisdiction.
                      </p>
                      <p>
                        If you already have a verified Rise account using the same email address associated
                        with your Dynasty Futures account, portions of the Rise verification process may
                        be automatically recognized where supported by Rise's platform.
                      </p>
                      <p>
                        If Rise is unavailable in your country or jurisdiction, payout availability may
                        be limited or unavailable. Refer to the Restricted Countries page for details.
                      </p>
                    </div>
                  </div>

                  {/* If Verification Fails */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      If Verification Cannot Be Completed
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      If verification, compliance review, or payout onboarding cannot be completed
                      successfully, Dynasty Futures may delay, deny, restrict, suspend, or terminate
                      payout eligibility or funded account access. Circumstances that may result in
                      such outcomes include, but are not limited to:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {[
                        "Inaccurate or inconsistent account information",
                        "Altered, fraudulent, or misrepresented documentation",
                        "Sanctions, PEP, or watchlist concerns",
                        "Access from restricted or prohibited jurisdictions",
                        "Payment or banking verification failures",
                        "VPN or proxy usage triggering compliance review",
                        "Account ownership inconsistencies",
                        "Incomplete Rise payout provider onboarding",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive/60 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Important Compliance Notes */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      Important Compliance Notes
                    </h3>
                    <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-3">
                      {[
                        "VPN, proxy, or location-masking tool usage may trigger additional compliance review or result in payout denial.",
                        "Third-party account access is strictly prohibited. All accounts must be operated solely by the verified, registered account holder.",
                        "Providing fraudulent, altered, or materially misrepresented information may result in denied payouts, account restriction, or permanent platform termination.",
                        "Dynasty Futures conducts ongoing monitoring throughout the funded account relationship as part of its compliance obligations.",
                        "All payouts remain subject to Dynasty Futures internal approval and compliance review at every stage of the payout process.",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="mt-0.5 text-amber-500 font-bold leading-none flex-shrink-0">!</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Restricted Jurisdictions */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                      Restricted Jurisdictions
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Certain countries and regions are not eligible to register for, access, or receive
                      payouts from Dynasty Futures due to sanctions programs, AML requirements, payment
                      processor limitations, fraud prevention policies, or identity verification restrictions.
                    </p>
                    <button
                      onClick={() => setActiveTab("restricted")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/40 bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 hover:border-primary/60 transition-all duration-200"
                    >
                      View Restricted Countries →
                    </button>
                  </div>

                  {/* FAQ */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-5">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          q: "Do I need to complete both verifications?",
                          a: "Yes. Dynasty Futures verification (via Sumsub) and Rise payout provider verification are two separate and independent requirements. Both must be completed before any payout can be approved or released.",
                        },
                        {
                          q: "Can I complete KYC before requesting a payout?",
                          a: "Yes. Traders are encouraged to complete Dynasty Futures identity verification proactively rather than waiting until a payout is requested. Early completion can help avoid delays during payout processing.",
                        },
                        {
                          q: "How long does verification take?",
                          a: "Dynasty Futures identity verification via Sumsub is typically completed within minutes for standard submissions. Rise onboarding timelines may vary. Additional review may be required in certain circumstances.",
                        },
                        {
                          q: "What happens if my verification is unsuccessful?",
                          a: "If verification cannot be completed, Dynasty Futures may place your payout on hold, request additional documentation, or restrict payout eligibility. Contact our support team for guidance.",
                        },
                        {
                          q: "Do all funded traders need to complete KYC?",
                          a: "KYC and AML verification is required before any payout can be processed. Dynasty Futures may also require verification at other points during the funded account relationship.",
                        },
                        {
                          q: "Is my personal information secure?",
                          a: "Yes. Dynasty Futures uses Sumsub, a regulated compliance platform, for identity verification. All data is handled in accordance with applicable data protection requirements. Refer to the Dynasty Futures Privacy Policy for full details.",
                        },
                        {
                          q: "What AML checks are performed?",
                          a: "AML screening conducted through Sumsub may include sanctions list screening, PEP (politically exposed person) screening, adverse media review, and ongoing compliance monitoring where applicable.",
                        },
                        {
                          q: "I already have a Rise account. Do I still need to verify?",
                          a: "If your existing Rise account uses the same email address associated with your Dynasty Futures account, portions of the Rise verification process may be automatically recognized where supported. You should still complete the Rise onboarding flow to confirm your account is fully verified and ready for payouts.",
                        },
                      ].map(({ q, a }) => (
                        <div key={q} className="p-5 rounded-xl border border-border/50 bg-muted/10">
                          <p className="text-sm font-semibold text-foreground mb-2">{q}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Support */}
                  <div className="p-6 rounded-2xl border border-border/50 bg-muted/20">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      Need Help With Verification or Payout Onboarding?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                      Our support team can assist with KYC verification, Rise onboarding, and
                      compliance-related inquiries.
                    </p>
                    <a
                      href="https://www.dynastyfuturesdyn.com/support"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 mb-4"
                    >
                      Open Support Center
                    </a>
                    <p className="text-xs text-muted-foreground mt-4">
                      support@dynastyfuturesdyn.com · Available 24 hours a day, 7 days a week
                    </p>
                  </div>

                </div>
              </TabsContent>
              <TabsContent value="chargebacks">
                <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-10">

                  {/* Header */}
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                      Chargeback &amp; Payment Dispute Policy
                    </h2>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        Dynasty Futures takes payment fraud, unauthorized disputes, and abusive
                        chargeback activity seriously.
                      </p>
                      <p>
                        By purchasing access to Dynasty Futures services, users agree to the
                        Dynasty Futures Terms of Use, Refund &amp; Cancellation Policy, and all
                        applicable platform rules.
                      </p>
                      <p>
                        Submitting a chargeback or payment dispute for services that were
                        delivered, accessed, activated, or used may be treated as a violation
                        of these agreements.
                      </p>
                    </div>
                  </div>

                  {/* Important highlight box */}
                  <div className="p-5 rounded-xl border border-primary/40 bg-primary/5">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
                      Important
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      If you experience billing, technical, or account-related issues, please
                      contact Dynasty Futures support before initiating a payment dispute or
                      chargeback with your bank or payment provider. Most concerns can be
                      resolved quickly through direct communication.
                    </p>
                  </div>

                  {/* What Happens If a Chargeback Is Filed? */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      What Happens If a Chargeback Is Filed?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Dynasty Futures reserves the right to suspend, restrict, terminate, or
                      permanently ban accounts associated with disputed or reversed transactions.
                      Upon receipt of a chargeback or payment dispute notification, Dynasty
                      Futures may take the following actions:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                      {[
                        {
                          title: "Account Suspension",
                          desc: "All active evaluation or funded accounts associated with the disputed transaction may be immediately suspended or frozen pending review.",
                        },
                        {
                          title: "Payout Hold",
                          desc: "Any pending or in-progress payout requests may be paused during the duration of the dispute investigation.",
                        },
                        {
                          title: "Platform Access Restriction",
                          desc: "Access to the Dynasty Futures platform, dashboard, and trading environment may be restricted without prior notice.",
                        },
                        {
                          title: "Future Purchase Restriction",
                          desc: "Accounts associated with disputed transactions may be permanently restricted from making future purchases on the platform.",
                        },
                        {
                          title: "Associated Account Review",
                          desc: "Accounts linked by email, payment method, device, or identity may also be subject to review and restriction.",
                        },
                        {
                          title: "Permanent Platform Ban",
                          desc: "Dynasty Futures reserves the right to permanently deny platform access to any user associated with fraudulent or abusive dispute activity.",
                        },
                      ].map(({ title, desc }) => (
                        <div key={title} className="p-4 rounded-xl border border-border/50 bg-muted/10">
                          <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Note:</strong>{" "}
                      These actions may be taken regardless of whether the chargeback is ultimately
                      resolved in the user's favor. Dynasty Futures will assess each situation based
                      on account history, service delivery records, and applicable platform rules.
                    </div>
                  </div>

                  {/* Fraud Prevention & Platform Protection */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      Fraud Prevention &amp; Platform Protection
                    </h3>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed mb-5">
                      <p>
                        Filing a chargeback or payment reversal for digital services that were
                        delivered, accessed, or activated may constitute fraudulent activity.
                        Dynasty Futures treats all such disputes with appropriate seriousness.
                      </p>
                      <p>
                        Dynasty Futures maintains comprehensive records to support payment dispute
                        investigations, including:
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                      {[
                        "Transaction and purchase records",
                        "Account activation and delivery confirmation",
                        "Login history and session records",
                        "Platform usage and trading activity logs",
                        "Identity and verification documentation",
                        "IP address and device records",
                        "Communication and support history",
                        "Subscription and billing records",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                      <p>
                        This evidence may be submitted to payment processors, acquiring banks, and
                        card networks during the course of any dispute investigation. Dynasty Futures
                        will actively contest chargebacks filed for services that were rendered and
                        accessible to the user.
                      </p>
                      <p>
                        Disputes determined to involve misrepresentation, unauthorized use claims
                        for delivered services, or patterns of abusive behavior may be escalated
                        through available channels where appropriate.
                      </p>
                    </div>
                  </div>

                  {/* Please Contact Support First */}
                  <div className="p-6 rounded-2xl border border-border/50 bg-muted/20">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      Please Contact Support First
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Before initiating a payment dispute or chargeback with your bank or payment
                      provider, Dynasty Futures strongly encourages users to contact our support team
                      directly. Many concerns can be addressed quickly and efficiently through direct
                      communication, including:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                      {[
                        "Billing questions or unexpected charges",
                        "Subscription cancellation assistance",
                        "Technical issues affecting platform access",
                        "Account review or status inquiries",
                        "Payment method updates or corrections",
                        "General account and service questions",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                      Our support team is available to assist and will work to address any legitimate
                      concern in a timely manner. Direct communication is always preferred over
                      payment disputes, and resolving issues through support helps avoid unnecessary
                      account restrictions.
                    </p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <a
                        href="https://www.dynastyfuturesdyn.com/support"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
                      >
                        Open Support Center
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      support@dynastyfuturesdyn.com · Available 24 hours a day, 7 days a week
                    </p>
                  </div>

                  {/* Acknowledgement */}
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      User Acknowledgement
                    </h3>
                    <div className="p-5 rounded-xl border border-border/50 bg-muted/10 space-y-3 text-sm text-muted-foreground leading-relaxed">
                      <p>
                        By using Dynasty Futures services, users acknowledge and agree that
                        unauthorized payment disputes, abusive chargebacks, or fraudulent reversal
                        attempts may result in account restrictions, payout denial, permanent
                        platform bans, or additional review procedures as described in this policy.
                      </p>
                      <p>
                        Dynasty Futures reserves all rights regarding fraud prevention, payment
                        enforcement, and platform protection. This policy applies to all purchases,
                        subscriptions, and transactions associated with Dynasty Futures services,
                        regardless of the payment method or provider used.
                      </p>
                      <p>
                        This policy is incorporated into and governed by the Dynasty Futures Terms
                        of Use. Dynasty Futures reserves the right to amend this policy at any time.
                        Continued use of Dynasty Futures services constitutes acceptance of the
                        current policy.
                      </p>
                    </div>
                  </div>

                </div>
              </TabsContent>
              {/* ── TRADING RULES KNOWLEDGE BASE ── */}
              <TabsContent value="trading-rules">
                {activeRule === null && (
                  <div className="space-y-8">
                    {/* Overview */}
                    <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-10">
                      <div>
                        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                          Essential Trading Rules Overview
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Dynasty Futures is a proprietary trading firm that provides simulated funded accounts to qualified futures traders. All trading activity takes place in a simulated environment using real-time market data. No live capital is ever at risk. Payouts are based on your simulated trading performance and are subject to compliance with all program rules.
                        </p>
                      </div>

                      {/* Simulated Trading Disclosure */}
                      <div className="p-5 rounded-xl border border-primary/30 bg-primary/5">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Simulated Trading Disclosure</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Both the evaluation and funded phases use simulated accounts with live market data. You never trade live capital at any stage. Performance metrics, profit targets, and payout eligibility are all based on simulated results. Dynasty Futures is not a brokerage and does not provide investment advice.
                        </p>
                      </div>

                      {/* Three Plan Types */}
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Three Plan Types</h3>
                        <div className="overflow-x-auto rounded-xl border border-border/50">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-border/50 bg-muted/20">
                                <th className="text-left px-4 py-3 font-semibold text-foreground">Plan</th>
                                <th className="text-left px-4 py-3 font-semibold text-foreground">Activation Fee</th>
                                <th className="text-left px-4 py-3 font-semibold text-foreground">Consistency Rule</th>
                                <th className="text-left px-4 py-3 font-semibold text-foreground">Min Winning Day</th>
                                <th className="text-left px-4 py-3 font-semibold text-foreground">Daily Loss Limit</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { plan: "Standard", activation: "$80 (after passing)", consistency: "50% (eval only)", minDay: "$150", dll: "Yes" },
                                { plan: "Advanced", activation: "None", consistency: "None", minDay: "$200", dll: "No" },
                                { plan: "Builder", activation: "None", consistency: "50% eval / 40% funded", minDay: "$200", dll: "No" },
                              ].map((row, i) => (
                                <tr key={row.plan} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-muted/5" : ""}`}>
                                  <td className="px-4 py-3 font-semibold text-primary">{row.plan}</td>
                                  <td className="px-4 py-3 text-muted-foreground">{row.activation}</td>
                                  <td className="px-4 py-3 text-muted-foreground">{row.consistency}</td>
                                  <td className="px-4 py-3 text-muted-foreground">{row.minDay}</td>
                                  <td className="px-4 py-3 text-muted-foreground">{row.dll}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Account Size Parameters */}
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Account Size Parameters</h3>
                        <div className="overflow-x-auto rounded-xl border border-border/50">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-border/50 bg-muted/20">
                                <th className="text-left px-4 py-3 font-semibold text-foreground">Account</th>
                                <th className="text-left px-4 py-3 font-semibold text-foreground">Profit Target</th>
                                <th className="text-left px-4 py-3 font-semibold text-foreground">Std/Adv Max Loss</th>
                                <th className="text-left px-4 py-3 font-semibold text-foreground">Builder Max Loss</th>
                                <th className="text-left px-4 py-3 font-semibold text-foreground">Daily Loss (Std)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                { size: "25K", target: "$1,500", stdLoss: "$1,000", builderLoss: "$1,500", dll: "$750" },
                                { size: "50K", target: "$3,000", stdLoss: "$2,000", builderLoss: "$2,500", dll: "$1,500" },
                                { size: "100K", target: "$6,000", stdLoss: "$2,500", builderLoss: "$3,500", dll: "$2,000" },
                                { size: "150K", target: "$8,000", stdLoss: "$4,000", builderLoss: "$5,000", dll: "$3,000" },
                              ].map((row, i) => (
                                <tr key={row.size} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-muted/5" : ""}`}>
                                  <td className="px-4 py-3 font-semibold text-foreground">{row.size}</td>
                                  <td className="px-4 py-3 text-muted-foreground">{row.target}</td>
                                  <td className="px-4 py-3 text-muted-foreground">{row.stdLoss}</td>
                                  <td className="px-4 py-3 text-muted-foreground">{row.builderLoss}</td>
                                  <td className="px-4 py-3 text-muted-foreground">{row.dll}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Universal Rules */}
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Universal Rules — All Plans</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {[
                            { ok: true, text: "Overnight trading allowed within the trading week" },
                            { ok: false, text: "Weekend holds NOT allowed — all positions must be closed before Friday market close" },
                            { ok: false, text: "No news trading — restricted window 2 minutes before and after major scheduled events" },
                            { ok: true, text: "Copy trading allowed on all plans" },
                            { ok: false, text: "No automated bots or algorithmic execution — all trading must be manually executed" },
                            { ok: false, text: "Trading freeze while a payout request is pending approval" },
                            { ok: true, text: "50% withdrawal limit per payout request" },
                            { ok: true, text: "Maximum 3 accounts across all plans" },
                            { ok: true, text: "90/10 profit split for first 5 payouts; 80/20 thereafter" },
                          ].map(({ ok, text }) => (
                            <div key={text} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${ok ? "bg-primary/60" : "bg-destructive/60"}`} />
                              {text}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Evaluation vs Funded */}
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Evaluation vs. Funded Phase</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-5 rounded-xl border border-border/50 bg-muted/10">
                            <p className="text-sm font-semibold text-foreground mb-2">Evaluation (Challenge Phase)</p>
                            <ul className="space-y-1.5 text-sm text-muted-foreground">
                              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />Trailing end-of-day drawdown</li>
                              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />Profit target required</li>
                              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />Consistency rule applies (Standard & Builder)</li>
                              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />Daily loss limit applies (Standard only)</li>
                            </ul>
                          </div>
                          <div className="p-5 rounded-xl border border-border/50 bg-muted/10">
                            <p className="text-sm font-semibold text-foreground mb-2">Funded Phase</p>
                            <ul className="space-y-1.5 text-sm text-muted-foreground">
                              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />Static (fixed) drawdown</li>
                              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />No profit target</li>
                              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />Consistency rule: Builder only (40%)</li>
                              <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />Daily loss limit: Standard only</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Quick Reference */}
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Quick Reference: What Can Close Your Account</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {[
                            "Exceeding the Maximum Loss Limit (MLL)",
                            "Exceeding the Daily Loss Limit (Standard Plan)",
                            "Holding positions over the weekend",
                            "Trading during a restricted news window",
                            "Using automated bots or algorithmic execution",
                            "Violating the consistency rule",
                            "Trading during a payout freeze",
                            "Account sharing or third-party access",
                            "KYC or AML compliance failure",
                            "Fraudulent activity or policy violation",
                          ].map(item => (
                            <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive/60 flex-shrink-0" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Rule Explainers Grid */}
                    <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10">
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">Rule Explainers</h3>
                      <p className="text-sm text-muted-foreground mb-6">Deep-dive explanations for each major rule. Select a topic to learn more.</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {RULE_EXPLAINERS.map(({ id, label }) => (
                          <button
                            key={id}
                            onClick={() => handleSetActiveRule(id)}
                            className="group flex items-center gap-3 px-5 py-4 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 transition-all duration-200 text-left"
                          >
                            <span className="w-2 h-2 rounded-full bg-primary/60 flex-shrink-0 group-hover:bg-primary transition-colors" />
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{label} →</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── DAILY LOSS LIMIT ── */}
                {activeRule === "daily-loss" && (
                  <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-8">
                    <button onClick={() => handleSetActiveRule(null)} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-2">← Back to Trading Rules Overview</button>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-3">Daily Loss Limit Explained</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">The Daily Loss Limit (DLL) applies to the <strong className="text-foreground">Standard Plan only</strong> and is active during both the evaluation and funded phases. It caps how much you can lose in a single trading day, providing an additional layer of risk management on top of the Maximum Loss Limit.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 text-sm text-muted-foreground">
                      <strong className="text-foreground">Important:</strong> The DLL applies to Standard Plan accounts in both the evaluation and funded phases. Advanced and Builder plan accounts do not have a Daily Loss Limit.
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Daily Loss Limit by Account Size (Standard Plan)</h3>
                      <div className="overflow-x-auto rounded-xl border border-border/50">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border/50 bg-muted/20">
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Account Size</th>
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Daily Loss Limit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { size: "25K", dll: "$750" },
                              { size: "50K", dll: "$1,500" },
                              { size: "100K", dll: "$2,000" },
                              { size: "150K", dll: "$3,000" },
                            ].map((row, i) => (
                              <tr key={row.size} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-muted/5" : ""}`}>
                                <td className="px-4 py-3 font-semibold text-foreground">{row.size}</td>
                                <td className="px-4 py-3 text-muted-foreground">{row.dll}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">DLL vs. MLL — What's the Difference?</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl border border-border/50 bg-muted/10">
                          <p className="text-sm font-semibold text-foreground mb-2">Daily Loss Limit (DLL)</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">A per-day loss cap. If your account loses the DLL amount within a single trading day, your account is in violation and no further trading is permitted that day. Resets each trading day.</p>
                        </div>
                        <div className="p-5 rounded-xl border border-border/50 bg-muted/10">
                          <p className="text-sm font-semibold text-foreground mb-2">Maximum Loss Limit (MLL)</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">Your total allowable loss from your starting balance. This is a cumulative limit that does not reset daily. Breaching the MLL results in account termination regardless of daily performance.</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Frequently Asked Questions</h3>
                      <div className="space-y-3">
                        {[
                          { q: "Does the DLL apply on funded accounts?", a: "Yes. For Standard Plan accounts, the Daily Loss Limit applies in both the evaluation and funded phases." },
                          { q: "Does the DLL reset each day?", a: "Yes. The DLL is calculated on a per-day basis and resets at the start of each new trading day." },
                          { q: "What happens if I hit the DLL?", a: "Trading is halted for the remainder of that day. If losses also exceed the MLL, the account is terminated." },
                          { q: "Do Advanced or Builder plans have a DLL?", a: "No. The Daily Loss Limit is exclusive to the Standard Plan." },
                        ].map(({ q, a }) => (
                          <div key={q} className="p-5 rounded-xl border border-border/50 bg-muted/10">
                            <p className="text-sm font-semibold text-foreground mb-2">{q}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── DRAWDOWN RULES ── */}
                {activeRule === "drawdown" && (
                  <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-8">
                    <button onClick={() => handleSetActiveRule(null)} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-2">← Back to Trading Rules Overview</button>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-3">Drawdown Rules Explained</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">Dynasty Futures uses two types of drawdown depending on your phase: trailing end-of-day drawdown during evaluations and static drawdown on funded accounts.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-5 rounded-xl border border-primary/30 bg-primary/5">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Evaluation Phase</p>
                        <p className="text-sm font-semibold text-foreground mb-2">Trailing End-of-Day Drawdown</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">Your Maximum Loss Limit (MLL) trails upward as your end-of-day account balance grows. If your balance increases, your MLL floor rises with it — locking in a higher minimum balance. The trailing stops once the MLL has moved up by the full initial drawdown amount.</p>
                      </div>
                      <div className="p-5 rounded-xl border border-border/50 bg-muted/10">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Funded Phase</p>
                        <p className="text-sm font-semibold text-foreground mb-2">Static Drawdown</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">Your MLL is fixed from the start. It does not move or change based on profits. For example, a $100K funded account with a $2,500 static MLL will be violated if the balance drops below $97,500 at any point — regardless of how much profit was made before.</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">MLL Behavior After a Payout</h3>
                      <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
                        {[
                          "After a payout is processed, the MLL resets to $0.00.",
                          "Your remaining post-payout balance becomes your entire available loss buffer.",
                          "If losses reduce your account balance to $0.00 or below, the account is failed.",
                          "Plan your position sizing carefully after payouts to account for this reset.",
                        ].map(item => (
                          <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="mt-0.5 text-amber-500 font-bold leading-none flex-shrink-0">!</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Drawdown Comparison Table</h3>
                      <div className="overflow-x-auto rounded-xl border border-border/50">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border/50 bg-muted/20">
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Feature</th>
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Evaluation</th>
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Funded</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { feature: "Drawdown Type", eval: "Trailing end-of-day", funded: "Static (fixed)" },
                              { feature: "MLL Moves Up?", eval: "Yes — as EOD balance grows", funded: "No — fixed from start" },
                              { feature: "Resets After Payout?", eval: "N/A", funded: "Yes — resets to $0" },
                              { feature: "Protection Style", eval: "Progressive floor", funded: "Fixed floor" },
                            ].map((row, i) => (
                              <tr key={row.feature} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-muted/5" : ""}`}>
                                <td className="px-4 py-3 font-medium text-foreground">{row.feature}</td>
                                <td className="px-4 py-3 text-muted-foreground">{row.eval}</td>
                                <td className="px-4 py-3 text-muted-foreground">{row.funded}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── NEWS TRADING POLICY ── */}
                {activeRule === "news-trading" && (
                  <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-8">
                    <button onClick={() => handleSetActiveRule(null)} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-2">← Back to Trading Rules Overview</button>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-3">News Trading Policy</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">The News Trading restriction applies to <strong className="text-foreground">all plans</strong> in both evaluation and funded phases. It is designed to protect traders and maintain fair, orderly market conditions during periods of extreme volatility caused by scheduled economic releases.</p>
                    </div>
                    <div className="p-5 rounded-xl border border-destructive/30 bg-destructive/5">
                      <p className="text-sm font-semibold text-foreground mb-2">Restricted Window</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">You may <strong className="text-foreground">not</strong> open new positions, increase existing positions, or place pending orders intended to trigger during the following window:</p>
                      <p className="mt-3 text-center text-lg font-bold text-primary">2 minutes before → 2 minutes after</p>
                      <p className="text-center text-sm text-muted-foreground mt-1">the scheduled release time of any restricted high-impact event</p>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">What Is Allowed During the Window?</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                          <p className="text-sm font-semibold text-foreground mb-1">Allowed</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />Reducing an existing position</li>
                            <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />Closing an existing position</li>
                          </ul>
                        </div>
                        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5">
                          <p className="text-sm font-semibold text-foreground mb-1">Not Allowed</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-1.5 flex-shrink-0" />Opening a new position</li>
                            <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-1.5 flex-shrink-0" />Adding to an existing position</li>
                            <li className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-1.5 flex-shrink-0" />Placing pending orders set to trigger during the window</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Restricted High-Impact Events</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          "Non-Farm Payrolls (NFP)",
                          "FOMC Rate Decision",
                          "Consumer Price Index (CPI)",
                          "Producer Price Index (PPI)",
                          "Gross Domestic Product (GDP)",
                          "Retail Sales",
                          "Purchasing Managers Index (PMI)",
                          "ISM Manufacturing/Services",
                          "Other designated high-impact events",
                        ].map(event => (
                          <div key={event} className="flex items-start gap-2 p-3 rounded-lg border border-border/40 bg-muted/10 text-sm text-muted-foreground">
                            <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-destructive/60 flex-shrink-0" />
                            {event}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">Compliance Consequences</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Trading during a restricted news window is a rule violation. Violations may result in account flag, breach, or termination depending on the nature and frequency of the offense. Dynasty Futures monitors trading activity and reserves the right to review any account at any time.</p>
                    </div>
                  </div>
                )}

                {/* ── CONSISTENCY RULE ── */}
                {activeRule === "consistency" && (
                  <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-8">
                    <button onClick={() => handleSetActiveRule(null)} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-2">← Back to Trading Rules Overview</button>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-3">Consistency Rule Explained</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">The Consistency Rule ensures that no single trading day makes up a disproportionate share of your total account profit. It encourages disciplined, repeatable performance rather than relying on one outsized day.</p>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Consistency Requirements by Plan & Phase</h3>
                      <div className="overflow-x-auto rounded-xl border border-border/50">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border/50 bg-muted/20">
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Plan</th>
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Evaluation</th>
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Funded</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { plan: "Standard", eval: "50% rule applies", funded: "No consistency rule" },
                              { plan: "Advanced", eval: "No consistency rule", funded: "No consistency rule" },
                              { plan: "Builder", eval: "50% rule applies", funded: "40% rule applies" },
                            ].map((row, i) => (
                              <tr key={row.plan} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-muted/5" : ""}`}>
                                <td className="px-4 py-3 font-semibold text-primary">{row.plan}</td>
                                <td className="px-4 py-3 text-muted-foreground">{row.eval}</td>
                                <td className="px-4 py-3 text-muted-foreground">{row.funded}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">How the Rule Works</h3>
                      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                        <p><strong className="text-foreground">50% Consistency Rule:</strong> Your single best trading day must not account for more than 50% of your total account profit at the time of payout eligibility or evaluation completion. If your best day exceeds that threshold, you do not meet the consistency requirement.</p>
                        <p><strong className="text-foreground">40% Consistency Rule (Builder Funded):</strong> The same concept applies but with a stricter 40% cap. Your single best day must represent no more than 40% of total profits.</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">Example</h3>
                      <div className="p-5 rounded-xl border border-border/50 bg-muted/10 text-sm text-muted-foreground space-y-2">
                        <p>Total account profit: <strong className="text-foreground">$3,000</strong></p>
                        <p>Best single day: <strong className="text-foreground">$1,200</strong></p>
                        <p>$1,200 ÷ $3,000 = <strong className="text-foreground">40%</strong></p>
                        <p className="text-primary font-medium">→ Passes the 50% rule. Fails the 40% rule (Builder funded).</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Frequently Asked Questions</h3>
                      <div className="space-y-3">
                        {[
                          { q: "Does the consistency rule apply to all plans?", a: "No. The Advanced Plan has no consistency rule in either phase. The Standard Plan has a 50% rule during evaluation only. The Builder Plan has a 50% rule during evaluation and a 40% rule during the funded phase." },
                          { q: "What if I violate the consistency rule?", a: "You will not be eligible for a payout or evaluation pass until the consistency threshold is met. No account termination occurs solely from a consistency violation — but you must trade additional days to dilute the outsized day's share." },
                          { q: "Is the rule checked per day or per payout period?", a: "The consistency rule is evaluated at the time of payout eligibility or evaluation completion. It looks at your best single day relative to your total profit at that moment." },
                        ].map(({ q, a }) => (
                          <div key={q} className="p-5 rounded-xl border border-border/50 bg-muted/10">
                            <p className="text-sm font-semibold text-foreground mb-2">{q}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── POSITION SIZE LIMITS ── */}
                {activeRule === "position-size" && (
                  <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-8">
                    <button onClick={() => handleSetActiveRule(null)} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-2">← Back to Trading Rules Overview</button>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-3">Position Size Limits</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">Dynasty Futures enforces maximum contract limits on all accounts to ensure appropriate risk management. These limits are applied at the platform level and are designed to prevent excessive position sizing relative to account size.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 text-sm text-muted-foreground">
                      <strong className="text-foreground">Platform-Enforced:</strong> Position size limits are enforced directly by the trading platform where applicable. You may not be able to place orders that exceed these limits.
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Max Contract Limits by Account Size</h3>
                      <div className="overflow-x-auto rounded-xl border border-border/50">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border/50 bg-muted/20">
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Account Size</th>
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Standard / Advanced</th>
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Builder</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { size: "25K", std: "1 mini / 10 micros", builder: "1 mini / 10 micros" },
                              { size: "50K", std: "5 minis / 50 micros", builder: "3 minis / 30 micros" },
                              { size: "100K", std: "10 minis / 100 micros", builder: "6 minis / 60 micros" },
                              { size: "150K", std: "15 minis / 150 micros", builder: "8 minis / 80 micros" },
                            ].map((row, i) => (
                              <tr key={row.size} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-muted/5" : ""}`}>
                                <td className="px-4 py-3 font-semibold text-foreground">{row.size}</td>
                                <td className="px-4 py-3 text-muted-foreground">{row.std}</td>
                                <td className="px-4 py-3 text-muted-foreground">{row.builder}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">Contract limits refer to standard futures contracts (e.g., ES, NQ minis). For questions about your specific account limits, contact support.</p>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">Minis, Micros & Mixed Positions</h3>
                      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                        <p>Contract limits apply to full-sized mini contracts (e.g., E-mini S&P 500). Micro contracts (e.g., Micro E-mini S&P 500) are counted proportionally — 10 micros equal 1 mini for the purposes of position limit calculations.</p>
                        <p>Mixed positions combining minis and micros are aggregated and must remain within the total contract equivalent limit for your account size.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── PROFIT TARGETS ── */}
                {activeRule === "profit-targets" && (
                  <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-8">
                    <button onClick={() => handleSetActiveRule(null)} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-2">← Back to Trading Rules Overview</button>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-3">Profit Targets Explained</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">The profit target is a minimum profit threshold that must be reached to pass the evaluation phase. <strong className="text-foreground">Profit targets apply during the evaluation only.</strong> There is no profit target requirement on funded accounts.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 text-sm text-muted-foreground">
                      <strong className="text-foreground">Funded accounts have no profit target.</strong> Once you pass your evaluation and are funded, there is no minimum profit goal. You simply trade, meet payout eligibility rules, and request payouts.
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Profit Targets by Account Size</h3>
                      <div className="overflow-x-auto rounded-xl border border-border/50">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border/50 bg-muted/20">
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Account Size</th>
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Profit Target (Evaluation)</th>
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Funded Phase</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { size: "25K", target: "$1,500", funded: "No target" },
                              { size: "50K", target: "$3,000", funded: "No target" },
                              { size: "100K", target: "$6,000", funded: "No target" },
                              { size: "150K", target: "$8,000", funded: "No target" },
                            ].map((row, i) => (
                              <tr key={row.size} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-muted/5" : ""}`}>
                                <td className="px-4 py-3 font-semibold text-foreground">{row.size}</td>
                                <td className="px-4 py-3 text-muted-foreground">{row.target}</td>
                                <td className="px-4 py-3 text-primary text-sm font-medium">{row.funded}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">Passing Requires All Rules Satisfied</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">Reaching the profit target alone does not guarantee evaluation pass. All of the following must be met simultaneously:</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {[
                          "Profit target reached",
                          "Maximum Loss Limit not breached",
                          "Daily Loss Limit not breached (Standard Plan)",
                          "Consistency rule met (Standard & Builder)",
                          "No rule violations during the evaluation",
                          "Minimum trading days completed where applicable",
                        ].map(item => (
                          <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── PAYOUTS & PROFIT SPLIT ── */}
                {activeRule === "payouts-split" && (
                  <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-8">
                    <button onClick={() => handleSetActiveRule(null)} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-2">← Back to Trading Rules Overview</button>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-3">Payouts &amp; Profit Split</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">Dynasty Futures pays out through Rise Works, a modern payout and compliance platform. Before any payout can be approved, traders must complete KYC verification through Dynasty Futures (via Sumsub) and separately through Rise.</p>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Payout Eligibility Requirements</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { title: "5 Winning Days", desc: "You must have at least 5 trading days that meet the minimum winning day threshold since your last payout." },
                          { title: "Minimum Winning Day", desc: "Standard Plan: $150 minimum profit per qualifying day. Advanced & Builder: $200 minimum profit per qualifying day." },
                          { title: "$500 Minimum Payout", desc: "The minimum payout amount is $500. You may withdraw up to 50% of your account balance per request." },
                          { title: "5-Day Payout Cycles", desc: "At least 5 qualifying trading days must pass between payout requests. Up to 4 payout requests per calendar month." },
                        ].map(({ title, desc }) => (
                          <div key={title} className="p-5 rounded-xl border border-border/50 bg-muted/10">
                            <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Profit Split Structure</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl border border-primary/30 bg-primary/5">
                          <p className="text-2xl font-bold text-primary mb-1">90/10</p>
                          <p className="text-sm font-semibold text-foreground mb-1">First Five Approved Payouts</p>
                          <p className="text-sm text-muted-foreground">90% of profits go to the trader. Dynasty Futures retains 10%.</p>
                        </div>
                        <div className="p-5 rounded-xl border border-border/50 bg-muted/10">
                          <p className="text-2xl font-bold text-foreground mb-1">80/20</p>
                          <p className="text-sm font-semibold text-foreground mb-1">After Fifth Approved Payout</p>
                          <p className="text-sm text-muted-foreground">80% of profits go to the trader. Dynasty Futures retains 20%.</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">KYC Requirements Before Payout</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">Dynasty Futures KYC (via Sumsub) can be completed at any time and must be completed before requesting a payout. Rise performs a separate payout provider verification independently before payouts are processed. Both must be completed — completing one does not satisfy the other.</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl border border-border/50 bg-muted/10">
                          <p className="text-sm font-semibold text-foreground mb-1">Step 1 — Dynasty Futures KYC</p>
                          <p className="text-sm text-muted-foreground">Identity verification via Sumsub. Complete any time; required before payout approval.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-border/50 bg-muted/10">
                          <p className="text-sm font-semibold text-foreground mb-1">Step 2 — Rise Verification</p>
                          <p className="text-sm text-muted-foreground">Separate onboarding required by Rise before funds can be released. Independent of Dynasty Futures KYC.</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">Payout Processing</h3>
                      <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                        <p>Payout requests submitted before <strong className="text-foreground">2:00 PM CT</strong> begin processing the same business day. Requests submitted after that time begin processing the next business day.</p>
                        <p>After Dynasty Futures approval, payouts are sent to Rise for disbursement. Delivery timing depends on Rise verification status and payment method.</p>
                        <p>A trading freeze is in effect from the time a payout is submitted until it is approved or denied. No new trades may be placed during this period.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── ACCOUNT VIOLATIONS & RESETS ── */}
                {activeRule === "violations" && (
                  <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-8">
                    <button onClick={() => handleSetActiveRule(null)} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-2">← Back to Trading Rules Overview</button>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-3">Account Violations &amp; Resets</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">Account violations occur when a trading rule is breached. Depending on the severity and phase, violations may result in account termination, or may be eligible for a reset.</p>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Common Violations</h3>
                      <div className="overflow-x-auto rounded-xl border border-border/50">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border/50 bg-muted/20">
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Violation</th>
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Applies To</th>
                              <th className="text-left px-4 py-3 font-semibold text-foreground">Result</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { v: "Exceeded Maximum Loss Limit (MLL)", a: "All plans", r: "Account failed / terminated" },
                              { v: "Exceeded Daily Loss Limit (DLL)", a: "Standard Plan only", r: "Trading Blocked Until Day Resets" },
                              { v: "News trading during restricted window", a: "All plans", r: "Account Flag / Possible Payout Rejection" },
                              { v: "Using automated bots", a: "All plans", r: "Immediate termination" },
                              { v: "Account sharing / third-party access", a: "All plans", r: "Immediate termination, no refund" },
                              { v: "Trading during payout freeze", a: "All plans", r: "Account Flag / Payout Rejection" },
                            ].map((row, i) => (
                              <tr key={row.v} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-muted/5" : ""}`}>
                                <td className="px-4 py-3 text-muted-foreground">{row.v}</td>
                                <td className="px-4 py-3 text-muted-foreground">{row.a}</td>
                                <td className="px-4 py-3 text-destructive text-sm">{row.r}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Evaluation Resets</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">If your evaluation account is breached, you may purchase an evaluation reset to start a fresh evaluation on the same account. Resets preserve your account continuity. Purchasing a new account creates a brand-new account with fresh eligibility requirements.</p>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4">Funded Account Resets</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">One funded reset is available per account on all plans. A funded reset restores your account balance and MLL. Reset fees are non-refundable once issued and are a one-time purchase (not recurring).</p>
                      <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 text-sm text-muted-foreground">
                        <strong className="text-foreground">Note:</strong> Funded resets are subject to availability and account standing. Dynasty Futures reserves the right to review accounts before approving a funded reset.
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">Need Help?</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">If you believe your account was flagged in error, or if you have questions about a violation or reset options, contact our support team. We review each situation based on account history and trading records.</p>
                      <a href="https://www.dynastyfuturesdyn.com/support" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-200">Open Support Center</a>
                    </div>
                  </div>
                )}

                {/* ── COPY TRADING & AUTOMATED SYSTEMS ── */}
                {activeRule === "copy-trading" && (
                  <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10 space-y-8">
                    <button onClick={() => handleSetActiveRule(null)} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mb-2">← Back to Trading Rules Overview</button>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-3">Copy Trading &amp; Automated Systems Policy</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">Dynasty Futures permits copy trading but prohibits automated bots and algorithmic execution. All trading must ultimately be initiated by the account holder — not by software acting autonomously on their behalf.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="p-5 rounded-xl border border-primary/30 bg-primary/5">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Allowed</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {[
                            "Copy trading platforms (e.g., trade copiers)",
                            "Social trading tools",
                            "Using your own accounts as master accounts",
                            "Signal-based trading where you manually approve each trade",
                            "Alert systems that notify you to enter manually",
                          ].map(item => (
                            <li key={item} className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-5 rounded-xl border border-destructive/30 bg-destructive/5">
                        <p className="text-xs font-bold uppercase tracking-widest text-destructive mb-3">Not Allowed</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {[
                            "Automated trading bots or EAs that execute without manual input",
                            "Algorithmic execution systems placing orders automatically",
                            "Scripts that open, modify, or close positions autonomously",
                            "High-frequency trading systems",
                            "Third-party bots copying signals and executing automatically",
                          ].map(item => (
                            <li key={item} className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-1.5 flex-shrink-0" />{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">The Key Distinction</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">The line between allowed and prohibited is <strong className="text-foreground">human decision-making in the execution loop</strong>. If a human trader is approving each trade — even via a copy platform — that is permitted. If software is opening and closing positions without a human in the loop for each execution, that is prohibited.</p>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-3">Consequences of Using Prohibited Systems</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">Use of automated bots or prohibited algorithmic execution systems is a serious rule violation that may result in immediate account termination without refund. Dynasty Futures monitors trading patterns and reserves the right to investigate and act on suspicious activity consistent with automated execution.</p>
                    </div>
                  </div>
                )}
              </TabsContent>

            </Tabs>
          </ScrollReveal>
        </div>
      </div>
    </Layout>
  );
};

export default Legal;
