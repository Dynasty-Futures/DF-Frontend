import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { breadcrumb, organizationSchema } from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, DollarSign, Shield, Eye, Clock, MapPin } from "lucide-react";

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
                About{" "}
                <span className="text-gradient-animated">Dynasty Futures</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We built this firm because traders deserved better. Clearer
                rules. Fairer pricing. Higher max loss flexibility. And a
                company that actually communicates.
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
                  world during his time studying finance at the University of
                  Utah, he quickly became drawn to the markets — the structure,
                  the discipline, and the opportunity. But the deeper he got
                  into the prop firm side of things, a pattern kept showing up:
                  confusing rules, gimmicky pricing, and payout structures
                  nobody could actually explain.
                </p>
                <p>
                  Dynasty Futures started as an answer to that. Build a firm
                  with fair pricing, higher max loss limits, and a
                  straightforward payout philosophy. Build it right. Build it
                  so traders can grow with it over time.
                </p>
                <p>
                  As the idea became real, the right people, systems, and
                  partnerships came together. What started as a simple
                  frustration became a company.
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
                    substance, clear systems, and honest communication with
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
                  At Dynasty, we've tried to make everything clear — the rules,
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
            </div>
          </ScrollReveal>

          {/* Meet the Founder */}
          <div className="mb-20 md:mb-28">
            <ScrollReveal>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
                Meet the{" "}
                <span className="text-gradient-animated">Founder</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="bg-gradient-card rounded-2xl border border-border/50 p-8 md:p-10 max-w-3xl mx-auto">
                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    Brock Adams
                  </h3>
                  <p className="text-primary text-sm font-medium">
                    Founder, Dynasty Futures
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>Texas</span>
                  </div>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                  <p>
                    Born and raised in Texas, Brock studied finance at the
                    University of Utah, where he developed a genuine interest in
                    the markets — particularly futures trading. He spent years
                    learning how markets move, what consistent trading actually
                    looks like, and what separates firms worth using from the
                    ones that aren't.
                  </p>
                  <p>
                    He built Dynasty Futures to put those lessons into practice
                    — a firm grounded in fairness, transparency, and long-term
                    thinking.
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
          </div>

          {/* Join the Dynasty CTA */}
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Ready to{" "}
                <span className="text-gradient-animated">Get Started?</span>
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Dynasty Futures is for traders who want structure, clarity, and
                a firm that communicates honestly. If that's you, you're in the
                right place.
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
