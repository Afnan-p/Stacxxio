import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { generateSitemap } from './scripts/generate-sitemap.js'

function sitemapPlugin() {
  return {
    name: 'vite-plugin-sitemap',
    buildStart() {
      generateSitemap();
    },
    closeBundle() {
      generateSitemap();
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sitemapPlugin()],
  base: '/',
});