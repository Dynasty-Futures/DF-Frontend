import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FundingModels from '@/components/home/FundingModels';
import HowItWorks from '@/components/home/HowItWorks';
import SimulatedTrading from '@/components/home/SimulatedTrading';
import PreLaunchModal from '@/components/PreLaunchModal';

const Index = () => {
  return (
    <Layout>
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
