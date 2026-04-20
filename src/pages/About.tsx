import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { breadcrumb, organizationSchema } from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  DollarSign,
  Shield,
  Eye,
  Clock,
  MapPin,
  Building2,
} from "lucide-react";

const differentiators = [
  {
    icon: DollarSign,
    title: "Fair Pricing",
    description:
      "Our fees are clear. No inflated costs designed to steer you toward certain options. What you see is what you pay.",
  },
  {
    icon: Shield,
    title: "Higher Max Loss Flexibility",
    description:
      "We give traders more room — more room to manage trades through volatility without getting stopped out unfairly.",
  },
  {
    icon: Eye,
    title: "Transparent Payout Philosophy",
    description:
      "Before you fund an account, you'll know exactly how payouts work, what the limits are, and what to expect. No surprises.",
  },
  {
    icon: Clock,
    title: "Built for the Long Term",
    description:
      "We're not here for a quick run. The structure, rules, and systems we've built are designed to hold up over time.",
  },
];

const About = () => {
  return (
    <Layout>
      <PageMeta
        title="About Us"
        rawTitle="About Dynasty Futures | Our Mission & Leadership"
        description="Dynasty Futures is a proprietary trading firm built on fair pricing, higher max loss flexibility, and transparent payout structures for futures traders."
        path="/about"
      />
      <JsonLd data={breadcrumb([
        { name: 'Home', url: 'https://www.dynastyfuturesdyn.com/' },
        { name: 'About', url: 'https://www.dynastyfuturesdyn.com/about' },
      ])} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Dynasty Futures',
        description: 'Dynasty Futures is a proprietary trading firm built on fair pricing, higher max loss flexibility, and transparent payout structures for futures traders.',
        url: 'https://www.dynastyfuturesdyn.com/about',
        mainEntity: { '@id': 'https://www.dynastyfuturesdyn.com/#organization' },
      }} />
      <div className="page-transition py-12 md:py-20">
        <div className="container mx-auto px-4">

          {/* Hero */}
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Built for Traders Who Value{" "}
                <span className="text-gradient-animated">Clarity, Discipline, and Opportunity</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Dynasty Futures LLC was built to offer something the prop firm
                space was missing: fair pricing, higher max loss flexibility,
                honest payout transparency, and a firm focused on long-term
                trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-gold-dark to-primary text-primary-foreground font-semibold btn-glow"
                >
                  <Link to="/pricing">View Plans</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border/50 hover:border-primary/50 hover:text-primary"
                >
                  <Link to="/rules">Read the Rules</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Our Story */}
          <ScrollReveal>
            <div className="max-w-3xl mx-auto mb-20 md:mb-28">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                Why We Built{" "}
                <span className="text-gradient-animated">This</span>
              </h2>
              <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
                <p>
                  The prop firm space has never been short on options. What it
                  has been short on is clarity.
                </p>
                <p>
                  When Brock started looking seriously at the futures trading
                  world, during his time studying finance at the University of
                  Utah, he quickly became drawn to the markets: the structure,
                  the discipline, the opportunity. But the deeper he got into
                  the prop firm side of things, a pattern kept showing up:
                  confusing rules, gimmicky pricing, and payout structures
                  nobody could actually explain.
                </p>
                <p>
                  Dynasty Futures LLC was incorporated in Wyoming with one
                  clear goal: build the firm the space was missing. Fair
                  pricing, higher max loss limits, and a payout philosophy that
                  doesn't leave people guessing.
                </p>
                <p>
                  The bigger vision was to build something traders could grow
                  with, a firm that scales as its traders scale. As that vision
                  became real, the right people, systems, and partnerships came
                  together. What started as a simple frustration became a
                  company.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Mission & Vision */}
          <div className="mb-20 md:mb-28">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
                Mission &{" "}
                <span className="text-gradient-animated">Vision</span>
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <ScrollReveal delay={0}>
                <div className="bg-gradient-card rounded-2xl border border-border/50 p-8 h-full">
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To give disciplined futures traders a real, fair opportunity
                    — through transparent structure, honest pricing, and a
                    payout philosophy that doesn't leave people guessing.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <div className="bg-gradient-card rounded-2xl border border-border/50 p-8 h-full">
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To build a prop firm that's still standing and still
                    respected years from now. Not built on hype, but on
                    substance, clear systems, and straight communication with
                    every trader we work with.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* What Sets Us Apart */}
          <div className="mb-20 md:mb-28">
            <ScrollReveal>
              <div className="text-center mb-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  What Sets Us{" "}
                  <span className="text-gradient-animated">Apart</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Four things we built into the foundation from day one.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {differentiators.map((item, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="bg-gradient-card rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Commitment to Transparency */}
          <ScrollReveal>
            <div className="glass-card-strong rounded-3xl border border-border/50 p-8 md:p-12 mb-20 md:mb-28 max-w-4xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                Transparency Isn't a Feature.{" "}
                <span className="text-gradient-animated">
                  It's the Foundation.
                </span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Trust starts with clarity. Traders shouldn't have to decode
                  their firm's rules or hunt through fine print to understand
                  what they signed up for.
                </p>
                <p>
                  At Dynasty, we've tried to make everything clear: the rules,
                  the pricing, the payout structure, the expectations. We'd
                  rather tell you something upfront you don't want to hear than
                  leave you confused after the fact.
                </p>
                <p>
                  If you ever have a question, you can reach us. That's not a
                  line — it's how we operate.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/support"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Contact Support <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="mt-6 pt-6 border-t border-border/30 flex items-center gap-2 text-xs text-muted-foreground">
                <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Dynasty Futures LLC, registered in Wyoming</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Meet the Founders & Leadership */}
          <div className="mb-20 md:mb-28">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
                Founders &{" "}
                <span className="text-gradient-animated">Leadership</span>
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
                Dynasty Futures is led by people with real backgrounds in
                finance, strategy, and business, not a faceless operation.
              </p>
            </ScrollReveal>

            {/* Brock Adams — featured card */}
            <ScrollReveal delay={0}>
              <div className="bg-gradient-card rounded-2xl border border-border/50 p-8 md:p-10 max-w-4xl mx-auto mb-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      Brock Adams
                    </h3>
                    <p className="text-primary text-sm font-medium">
                      Chief Executive Officer
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>Texas</span>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                        Founder
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                  <p>
                    Born and raised in Texas, I've always been drawn to
                    performance-driven environments, whether in sports or the
                    financial markets. That interest evolved early into a focus
                    on futures trading, where discipline, risk management, and
                    consistency ultimately determine who lasts.
                  </p>
                  <p>
                    I'm the Founder and CEO of Dynasty Futures, a proprietary
                    trading firm built to create a more sustainable and
                    transparent path for futures traders. The firm is centered
                    around one core belief: longevity matters more than
                    short-term success. In an industry often driven by hype and
                    rapid turnover, we are building infrastructure, systems, and
                    standards designed to hold up over time.
                  </p>
                  <p>
                    At Dynasty, I lead the strategic direction of the company
                    across platform development, trader experience, and risk
                    management. This includes building our proprietary
                    dashboard, integrating real-time market data, and
                    structuring payout systems that are competitive while still
                    protecting the long-term health of the firm.
                  </p>
                  <p>
                    I've also built meaningful experience within the private
                    equity space, an area that continues to influence how I
                    approach performance, psychology, and long-term
                    sustainability in trading.
                  </p>
                  <p>
                    I'm particularly interested in the intersection of trading,
                    performance psychology, and risk discipline. The same
                    principles that separate elite performers from the rest,
                    resilience, consistency, and the ability to execute under
                    pressure, are the same ones that define successful traders.
                  </p>
                  <p>
                    Dynasty Futures is being built with a long-term vision in
                    mind. Not for quick wins, but to create a firm that traders
                    can rely on for years to come.
                  </p>
                </div>
                <blockquote className="border-l-2 border-primary pl-6">
                  <p className="text-foreground italic leading-relaxed">
                    "I got tired of seeing traders deal with firms that made
                    things harder than they needed to be. Dynasty is what I
                    thought the space should already have."
                  </p>
                  <footer className="mt-3 text-sm text-muted-foreground font-medium">
                    — Brock Adams
                  </footer>
                </blockquote>
                <a
                  href="https://www.linkedin.com/in/brock-adams2002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>Connect with me on LinkedIn</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Zachary & Cliff — side by side */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <ScrollReveal delay={100}>
                <div className="bg-gradient-card rounded-2xl border border-border/50 p-8 h-full">
                  <div className="mb-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      Zachary Perez
                    </h3>
                    <p className="text-primary text-sm font-medium">
                      Chief Strategy Officer
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>Georgia</span>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                        Co-Founder
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                    <p>
                      Zachary grew up in Georgia and earned his BBA from the
                      University of Utah, where he became deeply interested in
                      how capital markets function — price discovery, how risk
                      gets mispriced, and what separates traders with real
                      staying power from those who do not. Futures became his
                      focus because of the leverage, the structure, and what the
                      market demands from you when you are wrong.
                    </p>
                    <p>
                      At Dynasty Futures, Zachary works on the strategic side
                      with one priority: building something that lasts. The prop
                      firm space is full of companies that grow quickly and
                      disappear just as fast, and that is exactly what Dynasty
                      is working to avoid. He pushes for decisions that hold up
                      across market conditions, systems that keep traders
                      accountable, and a culture where risk is not just managed
                      on paper.
                    </p>
                  </div>
                  <blockquote className="border-l-2 border-primary pl-6">
                    <p className="text-foreground italic leading-relaxed">
                      "While many firms in this space optimize for the highlight
                      reel, Dynasty is building for year ten."
                    </p>
                    <footer className="mt-3 text-sm text-muted-foreground font-medium">
                      — Zachary Perez
                    </footer>
                  </blockquote>
                  <a
                    href="https://www.linkedin.com/in/zachary-perez-1771zp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>Connect with me on LinkedIn</span>
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="bg-gradient-card rounded-2xl border border-border/50 p-8 h-full">
                  <div className="mb-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      Cliff Adams
                    </h3>
                    <p className="text-primary text-sm font-medium">
                      Chief Financial Officer
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>Texas</span>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                        Co-Founder
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                    <p>
                      Cliff brings more than four decades of experience in
                      mergers and acquisitions, investment banking, and
                      company-building. His background in leading oil and gas
                      firms, combined with a long-standing personal interest in
                      futures trading, gives Dynasty strong financial oversight
                      as the company grows.
                    </p>
                    <p>
                      He helps guide Dynasty's financial discipline with a focus
                      on building the kind of payout reputation and long-term
                      trust the company wants to be known for.
                    </p>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/cliff-adams-9b7b1180"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>Connect with me on LinkedIn</span>
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Join the Dynasty CTA */}
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                For Traders Who Want More Than{" "}
                <span className="text-gradient-animated">Promises</span>
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Dynasty Futures is for traders who value structure, opportunity,
                professionalism, and transparency, not flashy promotions and
                vague claims. If that's you, you're in the right place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-gold-dark to-primary text-primary-foreground font-semibold btn-glow"
                >
                  <Link to="/pricing">
                    Explore Plans <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border/50 hover:border-primary/50 hover:text-primary"
                >
                  <Link to="/rules">Learn How It Works</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </Layout>
  );
};

export default About;
