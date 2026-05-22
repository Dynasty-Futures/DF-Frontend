import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { breadcrumb } from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Legal = () => {
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
            <Tabs defaultValue="risk" className="w-full">
              <TabsList className="w-full overflow-x-auto flex md:grid md:grid-cols-4 bg-muted/30 p-1 rounded-xl mb-8 gap-1 md:gap-0">
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
                      Subscription Cancellations (If Applicable)
                    </h3>
                    <p>
                      If a subscription-based product is offered, users may
                      cancel future billing at any time prior to the next
                      billing cycle. Cancellation stops future charges but does
                      not entitle the user to refunds for prior payments.
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
            </Tabs>
          </ScrollReveal>
        </div>
      </div>
    </Layout>
  );
};

export default Legal;
