import Layout from '@/components/layout/Layout';
import PageMeta from '@/components/seo/PageMeta';
import JsonLd, { organizationSchema, websiteSchema, breadcrumb } from '@/components/seo/JsonLd';
import Hero from '@/components/home/Hero';
import FundingModels from '@/components/home/FundingModels';
import HowItWorks from '@/components/home/HowItWorks';
import SimulatedTrading from '@/components/home/SimulatedTrading';
import PreLaunchModal from '@/components/PreLaunchModal';

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
        <FundingModels />
        <HowItWorks />
        <SimulatedTrading />
      </div>
    </Layout>
  );
};

export default Index;
