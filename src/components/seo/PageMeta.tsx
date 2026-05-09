import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Dynasty Futures';
const BASE_URL = 'https://www.dynastyfuturesdyn.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

interface PageMetaProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  /** Provide a fully-formed title string to bypass the automatic "| Dynasty Futures" suffix */
  rawTitle?: string;
}

const PageMeta = ({ title, description, path, ogImage, noIndex, rawTitle }: PageMetaProps) => {
  const fullTitle = rawTitle ?? (path === '/' ? title : `${title} | ${SITE_NAME}`);
  const canonicalUrl = `${BASE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {noIndex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  );
};

export default PageMeta;
