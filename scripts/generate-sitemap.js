import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://zynexta.com';
const TODAY = new Date().toISOString().split('T')[0];

// Only real, active, working public pages in ZYNEXTA project
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/portfolio', priority: '0.9', changefreq: 'weekly' },
  
  // Real active service detail pages
  { path: '/services/business-website-development', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/custom-web-application-development', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/e-commerce-development', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/portfolio-personal-branding-websites', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/website-maintenance-support', priority: '0.8', changefreq: 'weekly' },
  { path: '/services/mobile-app-development', priority: '0.8', changefreq: 'weekly' }
];

export function generateSitemap() {
  const urlEntries = routes.map(route => {
    return `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('\n');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  const publicPath = path.resolve(__dirname, '../public/sitemap.xml');
  const distPath = path.resolve(__dirname, '../dist/sitemap.xml');

  // Write to public/
  fs.writeFileSync(publicPath, xmlContent, 'utf8');
  console.log(`[SEO] sitemap.xml generated successfully at ${publicPath}`);

  // Write to dist/ if build folder exists
  const distDir = path.resolve(__dirname, '../dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(distPath, xmlContent, 'utf8');
    console.log(`[SEO] sitemap.xml updated in build output at ${distPath}`);
  }
}

// Execute script if called directly via node
if (process.argv[1] && process.argv[1].endsWith('generate-sitemap.js')) {
  generateSitemap();
}
