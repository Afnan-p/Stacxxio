import { Helmet } from "react-helmet-async";

const DEFAULT_IMAGE = "https://zynexta.com/social-banner.png";
const DEFAULT_TITLE = "Web Development & Software Company in Kerala | ZYNEXTA";
const DEFAULT_DESC =
  "ZYNEXTA is a leading web development and software company in Kerala, India. We build custom websites, web applications, mobile apps, eCommerce solutions, UI/UX design, and business software for startups and enterprises.";
const DEFAULT_CANONICAL = "https://zynexta.com/";

const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonical = DEFAULT_CANONICAL,
  image = DEFAULT_IMAGE,
  type = "website",
  robots = "index, follow",
  schemaData = null,
}) => {
  return (
    <Helmet prioritizeSeoTags>
      {/* Primary SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="ZYNEXTA" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

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