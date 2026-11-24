import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const env = loadEnv(mode, process.cwd(), 'SITE_URL');
const site = (process.env.SITE_URL || env.SITE_URL || 'https://lisere.pages.dev').replace(/\/$/, '');

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const path = new URL(item.url).pathname;
        item.changefreq = 'monthly';

        if (path === '/') {
          item.priority = 1;
        } else if (path.startsWith('/telecharger')) {
          item.priority = 0.9;
        } else if (path.startsWith('/fonctionnalites')) {
          item.priority = 0.8;
        } else if (path.startsWith('/galerie')) {
          item.priority = 0.7;
        } else if (path.startsWith('/code-source')) {
          item.priority = 0.6;
        } else {
          item.priority = 0.5;
        }

        return item;
      },
    }),
  ],
});
