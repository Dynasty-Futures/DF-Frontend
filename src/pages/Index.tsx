import Layout from '@/components/layout/Layout';
import PageMeta from '@/components/seo/PageMeta';
import JsonLd, { organizationSchema, websiteSchema } from '@/components/seo/JsonLd';
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
      <PreLaunchModal />
      <div className="page-transition">
        <Hero />
        <FundingModels />
        <HowItWorks />
        <SimulatedTrading />
      </div>
    </Layout>
  );
};

export default Index;
