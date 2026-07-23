import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_IMAGE = "https://zynexta.com/social-banner.png";
const DEFAULT_TITLE = "Web Development & Software Company in Kerala | ZYNEXTA";
const DEFAULT_DESC = "ZYNEXTA is a leading web development and software company in Kerala, India. We build custom websites, web applications, mobile apps, eCommerce solutions, UI/UX design, and business software for startups and enterprises.";
const DEFAULT_CANONICAL = "https://zynexta.com/";

const SEO = ({ 
  title = DEFAULT_TITLE, 
  description = DEFAULT_DESC, 
  canonical = DEFAULT_CANONICAL, 
  image = DEFAULT_IMAGE,
  type = "website",
  robots = "index, follow",
  schemaData = null 
}) => {
  const siteUrl = canonical || DEFAULT_CANONICAL;
  const imageUrl = image || DEFAULT_IMAGE;

  useEffect(() => {
    // Dynamic DOM updates to guarantee tag replacement across SPAs
    if (title) {
      document.title = title;
    }

    const updateMeta = (selector, attrName, attrVal, content) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const updateLink = (rel, href) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', href);
    };

    // Replace Primary Meta & Link Tags
    updateMeta('meta[name="description"]', 'name', 'description', description);
    updateMeta('meta[name="robots"]', 'name', 'robots', robots);
    updateLink('canonical', siteUrl);

    // Replace Open Graph Meta Tags
    updateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    updateMeta('meta[property="og:url"]', 'property', 'og:url', siteUrl);
    updateMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl);
    updateMeta('meta[property="og:type"]', 'property', 'og:type', type);
    updateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'ZYNEXTA');
    updateMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_IN');

    // Replace Twitter Card Meta Tags
    updateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);
  }, [title, description, siteUrl, imageUrl, type, robots]);

  return (
    <Helmet prioritizeSeoTags>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={siteUrl} />
      <meta name="robots" content={robots} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="ZYNEXTA" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
