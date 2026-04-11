import { useEffect } from "react";
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
  useEffect(() => {
    document.title = "About Us | Dynasty Futures";
    const meta = document.querySelector('meta[name="description"]');
    const content =
      "Dynasty Futures LLC is a Wyoming-registered proprietary trading firm built for traders who value clarity, discipline, and opportunity. Fair pricing, higher max loss flexibility, and honest payout transparency.";
    if (meta) {
      meta.setAttribute("content", content);
    } else {
      const tag = document.createElement("meta");
      tag.name = "description";
      tag.content = content;
      document.head.appendChild(tag);
    }
    return () => {
      document.title = "Dynasty Futures";
    };
  }, []);

  return (
    <Layout>
      <PageMeta
        title="About Us"
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
                <span>Dynasty Futures LLC — Registered in Wyoming</span>
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
                    Born and raised in Texas, Brock studied and graduated in
                    finance from the University of Utah, where he developed a
                    genuine interest in the financial markets, particularly
                    futures trading. He spent years learning how markets move,
                    what consistent trading actually looks like, and what it
                    takes to perform at a high level over time.
                  </p>
                  <p>
                    Before founding Dynasty Futures, Brock built experience in
                    private equity, capital raising, and leadership, giving him
                    a clear picture of what a well-run firm looks like and what
                    most firms in this space were missing.
                  </p>
                  <p>
                    He founded Dynasty Futures LLC to build something centered
                    on honesty, discipline, fairness, and long-term thinking.
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
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Originally from Georgia, Zachary graduated from the
                      University of Utah with a bachelor's degree in Business
                      Administration. During that time, he developed a serious
                      interest in the financial markets and spent considerable
                      effort understanding how they work.
                    </p>
                    <p>
                      At Dynasty, Zachary brings a thoughtful, strategic
                      perspective to every part of the business, from how the
                      company positions itself to how it grows. His approach
                      helps keep the firm focused on what matters long term.
                    </p>
                  </div>
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
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
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
