import Layout from "@/components/layout/Layout";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, { breadcrumb, faqPageSchema } from "@/components/seo/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  DollarSign,
  Users,
  TrendingUp,
  Shield,
  Star,
  Crown,
  Award,
  MessageSquare,
  CheckCircle,
  Zap,
  BarChart2,
} from "lucide-react";

const tradeFirstCards = [
  {
    icon: MessageSquare,
    title: "More Authentic Content",
    description:
      "You write from experience, not from a brief. Your audience can feel the difference — and so can the results.",
  },
  {
    icon: Shield,
    title: "Stronger Audience Trust",
    description:
      "People trust recommendations from someone who's made the same decision they're being asked to make.",
  },
  {
    icon: TrendingUp,
    title: "Better Long-Term Results",
    description:
      "Credible affiliates build audiences that stick. Authentic promotion compounds over time in ways paid noise never does.",
  },
];

const affiliateBenefits = [
  {
    icon: DollarSign,
    title: "10% Commission on Every Referred Sale",
    description:
      "Earn on every evaluation, activation, or plan purchase your audience makes through your affiliate link. Straightforward, consistent, and transparent.",
  },
  {
    icon: Shield,
    title: "A Brand Worth Standing Behind",
    description:
      "Dynasty Futures is built on fair pricing, honest structure, and long-term trust — not gimmicks. Promoting it means standing behind something real.",
  },
  {
    icon: BarChart2,
    title: "Grow With an Early-Stage Firm",
    description:
      "Getting in early means building your affiliate presence as Dynasty Futures grows. Position yourself now, not after the market is saturated.",
  },
  {
    icon: Zap,
    title: "Access Partner Support & Campaigns",
    description:
      "Work with the Dynasty team on campaigns, content initiatives, and partnership opportunities. You're not alone in building this.",
  },
];

const tiers = [
  {
    icon: Users,
    name: "Community Affiliate",
    tagline: "For traders and creators building their affiliate foundation",
    description:
      "You've tried the platform, believe in the product, and are ready to start sharing it. This is where your affiliate journey begins.",
    perks: [
      "Affiliate link with tracking dashboard",
      "Access to campaign materials and branded assets",
      "Standard partner support",
      "Early opportunity to build your affiliate history",
    ],
    badge: "Entry Level",
  },
  {
    icon: Award,
    name: "Growth Affiliate",
    tagline: "For affiliates with an active audience and a track record",
    description:
      "You have consistent referral activity, an engaged community, and a real presence in the trading or financial education space.",
    perks: [
      "Everything in Community Affiliate",
      "Priority partner support",
      "Early access to new campaigns and promotions",
      "Affiliate spotlight opportunities across Dynasty channels",
      "Recognition as an established Dynasty partner",
    ],
    badge: "Established",
  },
  {
    icon: Crown,
    name: "Dynasty Partner",
    tagline: "For high-performing affiliates driving meaningful results",
    description:
      "You're building a real brand presence and consistently bringing quality-referred traders to Dynasty Futures. This tier is for serious, long-term partners.",
    perks: [
      "Everything in Growth Affiliate",
      "Dedicated partnership contact",
      "Co-branded content and collaboration opportunities",
      "Exclusive early access to campaigns and product updates",
      "Featured placement across Dynasty Futures promotional channels",
    ],
    badge: "Top Partner",
    featured: true,
  },
];

const steps = [
  {
    number: "01",
    title: "Try Dynasty Futures",
    description:
      "Start a challenge. Go through the platform. Understand what you'd be recommending before you recommend it. This step makes every one that follows more valuable.",
  },
  {
    number: "02",
    title: "Decide If It Fits Your Standards",
    description:
      "If you've been through the challenge and believe in what Dynasty Futures is building, the next step is natural. If it doesn't fit your standards, it probably isn't the right partnership.",
  },
  {
    number: "03",
    title: "Apply to the Affiliate Program",
    description:
      "Reach out through the Dynasty Futures support page. Tell us about yourself, your audience, and how you plan to represent the brand. We'll review your application and follow up.",
  },
  {
    number: "04",
    title: "Get Approved and Start Sharing",
    description:
      "Once approved, you'll receive your affiliate link and onboarding materials. The first 10 approved affiliates also receive their founding affiliate partner code to share with their audience.",
  },
];

const affiliateFaqs = [
  {
    question: "Who can become a Dynasty Futures affiliate?",
    answer:
      "Anyone with an audience interested in futures trading, prop firms, or financial education can apply. We prioritize applicants who have tried the platform and can speak to the product from real experience. Traders, content creators, educators, and community leaders are all welcome to apply.",
  },
  {
    question: "How much commission do affiliates earn?",
    answer:
      "All Dynasty Futures affiliates earn a 10% commission on every referred sale, regardless of tier. This includes evaluations, activations, and plan purchases made through your affiliate link.",
  },
  {
    question: "Do all affiliate tiers earn the same commission?",
    answer:
      "Yes. Every affiliate tier earns the same 10% commission rate. The tier system is based on recognition, access, support level, and partnership opportunities — not commission percentage. We believe in a consistent, transparent rate for all partners.",
  },
  {
    question: "What is the Founding Affiliate perk?",
    answer:
      "The first 10 approved Dynasty Futures affiliates receive a private 20% partner code — an exclusive offer they can share directly with their audience. This is a founding affiliate benefit available only to the first 10 approved partners. It is not available after those spots are filled.",
  },
  {
    question: "Do I need to be a Dynasty Futures user first?",
    answer:
      "We strongly recommend it. The strongest affiliates are ones who have experienced the platform themselves. Trying the challenge first gives you the knowledge, credibility, and context to represent Dynasty Futures effectively and authentically. It also signals to your audience that your recommendation is real.",
  },
  {
    question: "How do I apply?",
    answer:
      "Reach out through the Dynasty Futures support page to express your interest. Include details about yourself, your audience, and how you plan to promote. We review applications and follow up directly.",
  },
  {
    question: "When do I get my affiliate link or code?",
    answer:
      "You will receive your affiliate link and onboarding materials after your application is approved. For the first 10 approved affiliates, the founding affiliate partner code is issued at the time of approval.",
  },
];

const Affiliates = () => {
  return (
    <Layout>
      <PageMeta
        title="Affiliate Program"
        description="Join the Dynasty Futures affiliate program. Earn 10% commission on every referred sale. Trade first, partner second. Built for traders, creators, and educators who believe in the platform."
        path="/affiliates"
      />
      <JsonLd
        data={breadcrumb([
          { name: "Home", url: "https://www.dynastyfuturesdyn.com/" },
          {
            name: "Affiliate Program",
            url: "https://www.dynastyfuturesdyn.com/affiliates",
          },
        ])}
      />
      <JsonLd data={faqPageSchema(affiliateFaqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Dynasty Futures Affiliate Program",
          description:
            "Join the Dynasty Futures affiliate program. Earn 10% commission on every referred sale. Trade first, partner second.",
          url: "https://www.dynastyfuturesdyn.com/affiliates",
          mainEntity: {
            "@id": "https://www.dynastyfuturesdyn.com/#organization",
          },
        }}
      />

      <div className="page-transition py-12 md:py-20">
        <div className="container mx-auto px-4">

          {/* ─── Hero ─────────────────────────────────────────────────── */}
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
                Affiliate Program
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Trade First.{" "}
                <span className="text-gradient-animated">Partner Second.</span>
                <br />
                Build Your Dynasty.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Dynasty Futures is looking for affiliates who've actually been
                in the seat — traders, educators, and creators who know what
                they're promoting because they've lived it. The strongest
                recommendation doesn't come from a template. It comes from
                someone who made the same decision they're asking their audience
                to make.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="btn-gradient-animated text-primary-foreground font-semibold btn-glow"
                >
                  <Link to="/pricing">
                    Try Dynasty Futures{" "}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border/50 hover:border-primary/50 hover:text-primary"
                >
                  <Link to="/support">Apply to Become an Affiliate</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* ─── Why Dynasty Futures Affiliates Are Different ─────────── */}
          <div className="mb-20 md:mb-28">
            <ScrollReveal>
              <div className="glass-card-strong rounded-3xl border border-border/50 p-8 md:p-12 max-w-4xl mx-auto">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Why Dynasty Futures Affiliates Are{" "}
                  <span className="text-gradient-animated">Different</span>
                </h2>
                <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
                  <p>
                    Most affiliate programs in this space treat promotion as a
                    numbers game. More links, more noise, more conversions.
                    Dynasty Futures is built differently.
                  </p>
                  <p>
                    We want affiliates who can speak to the experience honestly
                    — people who understand what a futures evaluation involves,
                    what the rules actually mean, and why transparent structure
                    matters. That kind of credibility can't be scripted. It has
                    to come from actually going through it.
                  </p>
                  <p>
                    That's why we ask affiliates to try the platform first. Not
                    as a requirement designed to slow you down — but because
                    traders and creators who know the product are the ones who
                    build the most lasting trust with their audience.
                  </p>
                  <p>
                    This program is selective, authentic, and built for
                    long-term partnerships — not quick campaigns. If that's the
                    kind of affiliate relationship you're looking for, you're in
                    the right place.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ─── Why Trade First ──────────────────────────────────────── */}
          <div className="mb-20 md:mb-28">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Why{" "}
                  <span className="text-gradient-animated">Trade First</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  When you've been through the challenge yourself, your
                  recommendation means something. You're not forwarding a link —
                  you're telling people what you actually experienced. That
                  changes everything.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {tradeFirstCards.map((card, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="bg-gradient-card rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                      <card.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* ─── Affiliate Benefits ───────────────────────────────────── */}
          <div className="mb-20 md:mb-28">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  What Affiliates{" "}
                  <span className="text-gradient-animated">Earn</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  A straightforward structure with real upside. No confusion,
                  no shifting terms.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {affiliateBenefits.map((benefit, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="bg-gradient-card rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <benefit.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* ─── Tiered Structure ─────────────────────────────────────── */}
          <div className="mb-20 md:mb-28">
            <ScrollReveal>
              <div className="text-center mb-4">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Tiered{" "}
                  <span className="text-gradient-animated">
                    Affiliate Structure
                  </span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-2">
                  All affiliates earn the same{" "}
                  <span className="text-primary font-semibold">
                    10% commission
                  </span>{" "}
                  on every referred sale. Tiers reflect your level of
                  partnership — recognition, access, and support that grows with
                  you.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10">
              {tiers.map((tier, index) => (
                <ScrollReveal key={index} delay={index * 120}>
                  <div
                    className={`rounded-2xl border p-7 h-full flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                      tier.featured
                        ? "bg-gradient-to-b from-primary/10 to-card border-primary/40 hover:border-primary/60"
                        : "bg-gradient-card border-border/50 hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center">
                        <tier.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                          tier.featured
                            ? "bg-primary/20 text-primary border-primary/30"
                            : "bg-muted text-muted-foreground border-border/50"
                        }`}
                      >
                        {tier.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-primary font-medium mb-3">
                      {tier.tagline}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {tier.description}
                    </p>
                    <ul className="space-y-2.5 mt-auto">
                      {tier.perks.map((perk, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">
                            {perk}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 pt-5 border-t border-border/30">
                      <p className="text-xs text-center text-muted-foreground">
                        <span className="text-primary font-semibold">
                          10% commission
                        </span>{" "}
                        on all referred sales
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* ─── Founding Affiliate Perk ──────────────────────────────── */}
          <ScrollReveal>
            <div className="mb-20 md:mb-28 max-w-4xl mx-auto">
              <div className="relative rounded-3xl border border-primary/40 p-8 md:p-12 overflow-hidden bg-gradient-to-br from-primary/10 via-card to-gold-dark/10">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-widest block mb-0.5">
                        Limited Availability
                      </span>
                      <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                        Founding Affiliate Perk
                      </h2>
                    </div>
                  </div>
                  <div className="md:flex md:items-start md:gap-10">
                    <div className="flex-1">
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                        The first{" "}
                        <span className="text-foreground font-semibold">
                          10 approved Dynasty Futures affiliates
                        </span>{" "}
                        will receive a{" "}
                        <span className="text-primary font-semibold">
                          private 20% partner code
                        </span>{" "}
                        — an exclusive offer they can share directly with their
                        audience.
                      </p>
                      <p className="text-muted-foreground text-base leading-relaxed mb-4">
                        This is a founding affiliate benefit. It's designed to
                        give early supporters something meaningful to bring to
                        their communities at launch — something that adds real
                        value and signals that their recommendation comes with
                        substance.
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Once the first 10 spots are filled, this founding
                        affiliate code will no longer be available to new
                        partners. It won't come back.
                      </p>
                    </div>
                    <div className="mt-8 md:mt-0 md:w-64 flex-shrink-0">
                      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
                        <p className="text-5xl font-display font-bold text-gradient-animated mb-2">
                          20%
                        </p>
                        <p className="text-sm text-muted-foreground mb-1">
                          Founding partner code
                        </p>
                        <p className="text-xs text-primary font-medium">
                          First 10 affiliates only
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ─── How to Get Involved ──────────────────────────────────── */}
          <div className="mb-20 md:mb-28">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  How to Get{" "}
                  <span className="text-gradient-animated">Involved</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Four straightforward steps from first trade to active
                  affiliate.
                </p>
              </div>
            </ScrollReveal>
            <div className="max-w-3xl mx-auto space-y-4">
              {steps.map((step, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="bg-gradient-card rounded-2xl border border-border/50 p-6 hover:border-primary/30 transition-all duration-300 flex items-start gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <span className="font-display text-sm font-bold text-primary">
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={500}>
              <div className="text-center mt-10">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-gold-dark to-primary text-primary-foreground font-semibold btn-glow"
                >
                  <Link to="/pricing">
                    Start With a Challenge{" "}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* ─── FAQ ──────────────────────────────────────────────────── */}
          <div className="mb-20 md:mb-28">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Frequently Asked{" "}
                  <span className="text-gradient">Questions</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Answers to the most common questions about the Dynasty Futures
                  affiliate program.
                </p>
              </div>
            </ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {affiliateFaqs.map((faq, index) => (
                  <ScrollReveal key={index} delay={index * 60}>
                    <AccordionItem
                      value={`faq-${index}`}
                      className="bg-gradient-card rounded-2xl border border-border/50 px-6 overflow-hidden data-[state=open]:border-primary/30 transition-colors duration-300"
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

            {/* SEO: Always-rendered FAQ content for crawlers */}
            <div className="sr-only" aria-hidden="true">
              {affiliateFaqs.map((faq, index) => (
                <div key={`seo-faq-${index}`}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Final CTA ────────────────────────────────────────────── */}
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Trade First. Partner Second.{" "}
                <span className="text-gradient-animated">
                  Build Your Dynasty.
                </span>
              </h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                The best affiliates are ones who believe in what they're
                promoting. Start with the challenge. See what Dynasty Futures is
                building. Then decide whether it's worth putting your name
                behind it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="btn-gradient-animated text-primary-foreground font-semibold btn-glow"
                >
                  <Link to="/pricing">
                    Try Dynasty Futures{" "}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-border/50 hover:border-primary/50 hover:text-primary"
                >
                  <Link to="/support">Apply to Become an Affiliate</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </Layout>
  );
};

export default Affiliates;
