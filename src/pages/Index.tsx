import Layout from '@/components/layout/Layout';
import PageMeta from '@/components/seo/PageMeta';
import JsonLd, { organizationSchema, websiteSchema, breadcrumb } from '@/components/seo/JsonLd';
import Hero from '@/components/home/Hero';
import FundingModels from '@/components/home/FundingModels';
import HowItWorks from '@/components/home/HowItWorks';
import DiscordCTA from '@/components/home/DiscordCTA';
import SimulatedTrading from '@/components/home/SimulatedTrading';
import PreLaunchModal from '@/components/PreLaunchModal';
import SponsorTicker, { DefaultSponsors } from '@/components/ui/SponsorTicker';
import ScrollReveal from '@/components/ui/ScrollReveal';

const Index = () => {
  return (
    <Layout>
      <PageMeta
        title="Dynasty Futures — Simulated Funded Futures Trading Accounts"
        description="Dynasty Futures is a proprietary trading firm offering simulated funded accounts to qualified futures traders. Choose your plan, pass the evaluation, and trade with confidence."
        path="/"
      />
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd
        data={breadcrumb([
          { name: 'Home', url: 'https://www.dynastyfuturesdyn.com/' },
        ])}
      />
      <PreLaunchModal />
      <div className="page-transition">
        {/* Quotable definition block for AI citation and SEO */}
        <p className="sr-only">
          Dynasty Futures is a proprietary trading firm that offers simulated funded futures accounts
          to qualified traders. Traders complete an evaluation challenge on a simulated account with
          real-time market data, and successful traders receive funded accounts with profit-sharing
          arrangements. Dynasty Futures offers three plan tiers — Standard, Advanced, and Builder —
          with account sizes ranging from $25,000 to $150,000. All trading is 100% simulated; traders
          never trade live capital.
        </p>
        <Hero />
        
        {/* Sponsor Ticker */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
          <ScrollReveal className="text-center mb-6 relative z-10">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Powered by leading trading infrastructure
            </p>
          </ScrollReveal>
          <div className="relative z-10">
            <SponsorTicker sponsors={DefaultSponsors} speed={40} />
          </div>
        </section>
        
        <FundingModels />
        <HowItWorks />
        <DiscordCTA />
        <SimulatedTrading />
      </div>
    </Layout>
  );
};

export default Index;
