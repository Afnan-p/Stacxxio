import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title = "ZYNEXTA | Premium Web & Software Agency", 
  description = "We build modern websites and software solutions engineered for performance, scalability, and growth.", 
  canonical = "https://zynexta.com/", 
  type = "website",
  schemaData = null 
}) => {
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      
      {/* Twitter Tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
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
