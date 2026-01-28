import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Legal = () => {
  return (
    <Layout>
      <div className="page-transition py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Legal & <span className="text-gradient">Risk Disclosure</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Important legal information and disclosures for Dynasty Futures users.
            </p>
          </div>

          {/* Tabs */}
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="risk" className="w-full">
            <TabsList className="w-full grid grid-cols-4 bg-muted/30 p-1 rounded-xl mb-8">
                <TabsTrigger value="risk" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Risk Disclosure
                </TabsTrigger>
                <TabsTrigger value="terms" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Terms of Use
                </TabsTrigger>
                <TabsTrigger value="privacy" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Privacy Policy
                </TabsTrigger>
                <TabsTrigger value="refund" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
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
                      <strong className="text-foreground">IMPORTANT:</strong> All trading on Dynasty Futures is simulated. Payouts are based on simulated trading performance. This is not real trading, and no real capital is ever at risk. Past simulated performance does not guarantee future results.
                    </p>
                    
                    <h3 className="text-foreground font-display text-lg mt-6">Nature of Simulated Trading</h3>
                    <p>
                      All trading at Dynasty Futures takes place in a simulated environment. No live capital is ever traded. You trade using real-time or near real-time market data, but all orders and executions are simulated. Payouts are based entirely on your simulated trading performance.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">No Guarantee of Payouts</h3>
                    <p>
                      Dynasty Futures makes no representations or guarantees that any trader will achieve payouts. The challenges and simulated funded accounts offered by Dynasty Futures are designed to evaluate trading skills in a simulated environment. Payout eligibility depends on meeting the performance criteria and following all trading rules.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Simulated Environment</h3>
                    <p>
                      Both the challenge phase and the funded phase use simulated accounts with live market data. You never trade live capital at any stage. Performance in a simulated environment is based on your trading decisions and strategy execution within the simulated platform.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Dynasty Futures is Not a Brokerage</h3>
                    <p>
                      Dynasty Futures is a proprietary trading firm, not a brokerage or registered investment advisor. We do not provide investment advice, recommendations, or personalized financial planning services. All trading decisions are made solely by the trader.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Seek Professional Advice</h3>
                    <p>
                      Before engaging with our services, you should carefully consider your financial situation and consult with a qualified financial advisor. Nothing on this website constitutes financial, legal, or tax advice.
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
                    <h3 className="text-foreground font-display text-lg">Acceptance of Terms</h3>
                    <p>
                      By accessing and using the Dynasty Futures website and services, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, you should not use our services.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Eligibility</h3>
                    <p>
                      You must be at least 18 years old and legally able to enter into contracts to use Dynasty Futures services. By using our services, you represent that you meet these requirements.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Account Responsibilities</h3>
                    <p>
                      You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Trading Rules Compliance</h3>
                    <p>
                      All traders must comply with the trading rules outlined on our Rules page. Violation of these rules may result in account termination without refund.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Modifications to Terms</h3>
                    <p>
                      Dynasty Futures reserves the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Disclaimer of Warranties</h3>
                    <p>
                      Dynasty Futures provides its website, services, platforms, and any related content on an "as is" and "as available" basis. To the fullest extent permitted by law, Dynasty Futures disclaims all warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, reliability, or availability. Dynasty Futures does not warrant that the services will be uninterrupted, error-free, secure, or free from defects. Your use of the services is at your sole risk.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Governing Law</h3>
                    <p>
                      These Terms of Use are governed by and construed in accordance with the laws of the State of Wyoming, without regard to its conflict of law principles.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Limitation of Liability</h3>
                    <p>
                      Dynasty Futures shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services or any related matter.
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
                    <h3 className="text-foreground font-display text-lg">Information We Collect</h3>
                    <p>
                      We collect information you provide directly to us, including name, email address, payment information, and identity verification documents for KYC purposes.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">How We Use Your Information</h3>
                    <p>
                      We use the information we collect to provide, maintain, and improve our services, process transactions, send communications, and comply with legal obligations.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Information Sharing</h3>
                    <p>
                      We do not sell your personal information. We may share information with third-party service providers who assist us in operating our services, subject to confidentiality obligations.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Data Security</h3>
                    <p>
                      We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Your Rights</h3>
                    <p>
                      Depending on your jurisdiction, you may have rights to access, correct, delete, or port your personal data. Contact us at support@dynastyfuturesdyn.com to exercise these rights.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Contact Us</h3>
                    <p>
                      If you have questions about this Privacy Policy, please contact us at support@dynastyfuturesdyn.com.
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
                    <p>
                      All purchases made through Dynasty Futures are for access to simulated trading evaluations and related services.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">No Refunds After Account Activation</h3>
                    <p>
                      Once an evaluation account or simulated funded account is activated, all sales are final and non-refundable. This includes situations where a user fails to meet trading objectives, violates trading rules, or chooses to discontinue participation.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Refunds Prior to Account Activation</h3>
                    <p>
                      A refund may be considered only if a request is submitted before the evaluation account has been activated and no trading activity has occurred on the account. Refund requests must be submitted by contacting <a href="mailto:support@dynastyfuturesdyn.com" className="text-primary hover:underline">support@dynastyfuturesdyn.com</a>.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Rule Violations and Terminations</h3>
                    <p>
                      Accounts that are breached, terminated, or disabled due to violations of trading rules or terms of use are not eligible for refunds, credits, or reimbursements.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Subscription Cancellations (If Applicable)</h3>
                    <p>
                      If a subscription-based product is offered, users may cancel future billing at any time prior to the next billing cycle. Cancellation stops future charges but does not entitle the user to a refund for any prior payments.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Technical Issues</h3>
                    <p>
                      In the event of a verified technical issue directly attributable to Dynasty Futures that materially prevents access to the services, Dynasty Futures may, at its sole discretion, provide a credit, account reset, or replacement. Cash refunds are not guaranteed.
                    </p>

                    <h3 className="text-foreground font-display text-lg mt-6">Contact</h3>
                    <p>
                      For questions regarding this Refund & Cancellation Policy, please contact <a href="mailto:support@dynastyfuturesdyn.com" className="text-primary hover:underline">support@dynastyfuturesdyn.com</a>.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Legal;