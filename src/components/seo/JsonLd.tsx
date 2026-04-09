import { Helmet } from 'react-helmet-async';

interface JsonLdProps {
  data: Record<string, unknown>;
}

const JsonLd = ({ data }: JsonLdProps) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Helmet>
);

export default JsonLd;

// Pre-built schema objects for Dynasty Futures

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dynasty Futures',
  url: 'https://www.dynastyfuturesdyn.com',
  logo: 'https://www.dynastyfuturesdyn.com/favicon.png',
  description:
    'Dynasty Futures is a proprietary trading firm offering simulated funded accounts to qualified futures traders.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@dynastyfuturesdyn.com',
    contactType: 'customer support',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Dynasty Futures',
  url: 'https://www.dynastyfuturesdyn.com',
};

export const breadcrumb = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

export const productSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Standard Plan — $25K',
    description:
      'Standard evaluation plan with a $25,000 simulated account. $49 evaluation fee, $80 activation fee.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    offers: {
      '@type': 'Offer',
      price: '49',
      priceCurrency: 'USD',
      url: 'https://www.dynastyfuturesdyn.com/pricing#standard',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Standard Plan — $50K',
    description:
      'Standard evaluation plan with a $50,000 simulated account. $69 evaluation fee, $80 activation fee.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    offers: {
      '@type': 'Offer',
      price: '69',
      priceCurrency: 'USD',
      url: 'https://www.dynastyfuturesdyn.com/pricing#standard',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Standard Plan — $100K',
    description:
      'Standard evaluation plan with a $100,000 simulated account. $119 evaluation fee, $80 activation fee.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    offers: {
      '@type': 'Offer',
      price: '119',
      priceCurrency: 'USD',
      url: 'https://www.dynastyfuturesdyn.com/pricing#standard',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Standard Plan — $150K',
    description:
      'Standard evaluation plan with a $150,000 simulated account. $149 evaluation fee, $80 activation fee.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    offers: {
      '@type': 'Offer',
      price: '149',
      priceCurrency: 'USD',
      url: 'https://www.dynastyfuturesdyn.com/pricing#standard',
    },
  },
];
