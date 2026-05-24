import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { breadcrumb } from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VALID_TABS = ["risk", "terms", "privacy", "refund", "restricted", "rise-payouts"];

const Legal = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    VALID_TABS.includes(tabParam ?? "") ? tabParam! : "risk"
  );

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
          <ScrollReveal className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full overflow-x-auto flex md:grid md:grid-cols-6 bg-muted/30 p-1 rounded-xl mb-8 gap-1 md:gap-0">
                <TabsTrigger
                  value="risk"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-shrink-0"
                >
                  Risk Disclosure
                </TabsTrigger>
                <TabsTrigger
                  value="terms"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-shrink-0"
                >
                  Terms of Use
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-shrink-0"
                >
                  Privacy Policy
                </TabsTrigger>
                <TabsTrigger
                  value="refund"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-shrink-0"
                >
                  Refund & Cancellation
                </TabsTrigger>
                <TabsTrigger
                  value="restricted"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-shrink-0"
                >
                  Restricted Countries
                </TabsTrigger>
                <TabsTrigger
                  value="rise-payouts"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap px-3 py-2 text-xs sm:text-sm flex-shrink-0"
                >
                  Rise Payouts
                </TabsTrigger>
              </TabsList>

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
                <div className="bg-gradient-card rounded-3xl border border-border/50 p-8 md:p-10">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Terms of Use
                  </h2>

                  <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
                    <h3 className="text-foreground font-display text-lg">
                      Acceptance of Terms
                    </h3>
                    <p>
                      By accessing and using the Dynasty Futures website and
                      services, you accept and agree to be bound by these Terms
                      of Use. If you do not agree to these terms, you should not
                      use our services.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Eligibility
                    </h3>
                    <p>
                      You must be at least 18 years old and legally able to
                      enter into contracts to use Dynasty Futures services. By
                      using our services, you represent that you meet these
                      requirements.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Account Responsibilities
                    </h3>
                    <p>
                      You are responsible for maintaining the confidentiality of
                      your account credentials and for all activities that occur
                      under your account. You agree to notify us immediately of
                      any unauthorized use of your account.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Trading Rules Compliance
                    </h3>
                    <p>
                      All traders must comply with the trading rules outlined on
                      our Rules page. Violation of these rules may result in
                      account termination without refund.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Modifications to Terms
                    </h3>
                    <p>
                      Dynasty Futures reserves the right to modify these terms
                      at any time. Continued use of our services after changes
                      constitutes acceptance of the new terms.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Disclaimer of Warranties
                    </h3>
                    <p>
                      Dynasty Futures provides its website, services, platforms,
                      and any related content on an "as is" and "as available"
                      basis. To the fullest extent permitted by law, Dynasty
                      Futures disclaims all warranties of any kind, whether
                      express or implied, including but not limited to implied
                      warranties of merchantability, fitness for a particular
                      purpose, non-infringement, accuracy, reliability, or
                      availability. Dynasty Futures does not warrant that the
                      services will be uninterrupted, error-free, secure, or
                      free from defects. Your use of the services is at your
                      sole risk.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Governing Law
                    </h3>
                    <p>
                      These Terms of Use are governed by and construed in
                      accordance with the laws of the State of Wyoming, without
                      regard to its conflict of law principles.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Limitation of Liability
                    </h3>
                    <p>
                      Dynasty Futures shall not be liable for any indirect,
                      incidental, special, consequential, or punitive damages
                      resulting from your use of our services or any related
                      matter.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      Simulated Trading Disclosure
                    </h3>
                    <p>
                      Any references on this website to trading, traders,
                      accounts, performance, revenue, profits, or payouts refer
                      to simulated or evaluation-based activity unless expressly
                      stated otherwise. Dynasty Futures provides proprietary
                      trading evaluation services and does not offer investment
                      advice, brokerage services, or live client investment
                      accounts.
                    </p>

                    <p>
                      Futures trading involves substantial risk and is not
                      appropriate for every person. Market conditions can change
                      rapidly, and trading futures or futures-related products
                      can result in significant losses. Only risk capital should
                      ever be used in connection with trading activity. Past
                      performance, whether actual, simulated, or advertised, is
                      not indicative of future results.
                    </p>

                    <p>
                      Any performance information, metrics, results, or examples
                      shown on this website, in dashboards, on social media, in
                      promotional content, or in other materials may be based on
                      simulated, hypothetical, or evaluation account performance.
                      Hypothetical or simulated results have important
                      limitations. Unlike actual trading, simulated results do
                      not reflect real market execution, liquidity constraints,
                      slippage, emotional decision-making, or the impact of live
                      market conditions. Because hypothetical results are often
                      prepared with the benefit of hindsight, they may overstate
                      or understate actual performance.
                    </p>

                    <p>
                      No representation is being made that any user, trader, or
                      account will achieve profits or losses similar to those
                      referenced on this website or in any Dynasty Futures
                      material. There is no guarantee that any participant will
                      pass an evaluation, receive a funded account, earn profits,
                      or receive payouts.
                    </p>

                    <p>
                      Payout examples, testimonials, and user experiences shown
                      on this website may not be representative of the experience
                      of all users. Testimonials are not a guarantee of future
                      success or performance. Individual results vary based on
                      many factors, including skill, market conditions, risk
                      management, and adherence to program rules.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">
                      CFTC Rule 4.41 Disclosure
                    </h3>
                    <p>
                      Hypothetical or simulated performance results have certain
                      inherent limitations. Unlike an actual performance record,
                      simulated results do not represent actual trading. Also,
                      because the trades have not been executed, the results may
                      have under- or over-compensated for the impact, if any, of
                      certain market factors, including lack of liquidity.
                      Simulated trading programs in general are also designed
                      with the benefit of hindsight. No representation is being
                      made that any account will or is likely to achieve profits
                      or losses similar to those shown.
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
                        href="/support"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors duration-200"
                      >
                        Open Support Center
                      </a>
                      <a
                        href="/support"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/40 bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 hover:border-primary/60 transition-all duration-200"
                      >
                        Contact Support
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      support@dynastyfuturesdyn.com · Available 24 hours a day, 7 days a week
                    </p>
                  </div>

                </div>
              </TabsContent>
            </Tabs>
          </ScrollReveal>
        </div>
      </div>
    </Layout>
  );
};

export default Legal;
