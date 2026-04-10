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

const BASE_URL = 'https://www.dynastyfuturesdyn.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Dynasty Futures',
  url: BASE_URL,
  logo: `${BASE_URL}/icon-512.png`,
  description:
    'Dynasty Futures is a proprietary trading firm offering simulated funded accounts to qualified futures traders.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@dynastyfuturesdyn.com',
    contactType: 'customer support',
    availableLanguage: 'English',
  },
  sameAs: [
    // Add social profile URLs as they become available
    // 'https://twitter.com/DynastyFutures',
    // 'https://www.linkedin.com/company/dynasty-futures',
    // 'https://discord.gg/dynastyfutures',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'Dynasty Futures',
  url: BASE_URL,
  publisher: { '@id': `${BASE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
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

export const faqPageSchema = (
  faqs: { question: string; answer: string }[],
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Standard plan product schemas
export const productSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Standard Plan — $25K',
    description:
      'Standard evaluation plan with a $25,000 simulated account. $49 evaluation fee, $80 activation fee.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    image: `${BASE_URL}/standardplan.webp`,
    offers: {
      '@type': 'Offer',
      price: '49',
      priceCurrency: 'USD',
      url: `${BASE_URL}/pricing#standard`,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#organization` },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Standard Plan — $50K',
    description:
      'Standard evaluation plan with a $50,000 simulated account. $69 evaluation fee, $80 activation fee.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    image: `${BASE_URL}/standardplan.webp`,
    offers: {
      '@type': 'Offer',
      price: '69',
      priceCurrency: 'USD',
      url: `${BASE_URL}/pricing#standard`,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#organization` },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Standard Plan — $100K',
    description:
      'Standard evaluation plan with a $100,000 simulated account. $119 evaluation fee, $80 activation fee.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    image: `${BASE_URL}/standardplan.webp`,
    offers: {
      '@type': 'Offer',
      price: '119',
      priceCurrency: 'USD',
      url: `${BASE_URL}/pricing#standard`,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#organization` },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Standard Plan — $150K',
    description:
      'Standard evaluation plan with a $150,000 simulated account. $149 evaluation fee, $80 activation fee.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    image: `${BASE_URL}/standardplan.webp`,
    offers: {
      '@type': 'Offer',
      price: '149',
      priceCurrency: 'USD',
      url: `${BASE_URL}/pricing#standard`,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#organization` },
    },
  },
];

// Advanced plan product schemas
export const advancedProductSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Advanced Plan — $25K',
    description:
      'Advanced evaluation plan with a $25,000 simulated account. $79 evaluation fee, no activation fee.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    image: `${BASE_URL}/advancedplan.webp`,
    offers: {
      '@type': 'Offer',
      price: '79',
      priceCurrency: 'USD',
      url: `${BASE_URL}/pricing#advanced`,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#organization` },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Advanced Plan — $50K',
    description:
      'Advanced evaluation plan with a $50,000 simulated account. $109 evaluation fee, no activation fee.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    image: `${BASE_URL}/advancedplan.webp`,
    offers: {
      '@type': 'Offer',
      price: '109',
      priceCurrency: 'USD',
      url: `${BASE_URL}/pricing#advanced`,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#organization` },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Advanced Plan — $100K',
    description:
      'Advanced evaluation plan with a $100,000 simulated account. $179 evaluation fee, no activation fee.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    image: `${BASE_URL}/advancedplan.webp`,
    offers: {
      '@type': 'Offer',
      price: '179',
      priceCurrency: 'USD',
      url: `${BASE_URL}/pricing#advanced`,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#organization` },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Advanced Plan — $150K',
    description:
      'Advanced evaluation plan with a $150,000 simulated account. $229 evaluation fee, no activation fee.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    image: `${BASE_URL}/advancedplan.webp`,
    offers: {
      '@type': 'Offer',
      price: '229',
      priceCurrency: 'USD',
      url: `${BASE_URL}/pricing#advanced`,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#organization` },
    },
  },
];

// Builder plan product schemas
export const builderProductSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Builder Plan — $25K',
    description:
      'Builder evaluation plan with a $25,000 simulated account. $109 evaluation fee, no activation fee, higher max loss limit.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    image: `${BASE_URL}/builderplan.webp`,
    offers: {
      '@type': 'Offer',
      price: '109',
      priceCurrency: 'USD',
      url: `${BASE_URL}/pricing#builder`,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#organization` },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Builder Plan — $50K',
    description:
      'Builder evaluation plan with a $50,000 simulated account. $149 evaluation fee, no activation fee, higher max loss limit.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    image: `${BASE_URL}/builderplan.webp`,
    offers: {
      '@type': 'Offer',
      price: '149',
      priceCurrency: 'USD',
      url: `${BASE_URL}/pricing#builder`,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#organization` },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Builder Plan — $100K',
    description:
      'Builder evaluation plan with a $100,000 simulated account. $239 evaluation fee, no activation fee, higher max loss limit.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    image: `${BASE_URL}/builderplan.webp`,
    offers: {
      '@type': 'Offer',
      price: '239',
      priceCurrency: 'USD',
      url: `${BASE_URL}/pricing#builder`,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#organization` },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Dynasty Futures Builder Plan — $150K',
    description:
      'Builder evaluation plan with a $150,000 simulated account. $299 evaluation fee, no activation fee, higher max loss limit.',
    brand: { '@type': 'Brand', name: 'Dynasty Futures' },
    image: `${BASE_URL}/builderplan.webp`,
    offers: {
      '@type': 'Offer',
      price: '299',
      priceCurrency: 'USD',
      url: `${BASE_URL}/pricing#builder`,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${BASE_URL}/#organization` },
    },
  },
];
