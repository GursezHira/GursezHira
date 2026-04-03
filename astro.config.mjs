// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// export default defineConfig({
//   site: 'https://gursez.hira.im',
//   integrations: [sitemap()],
// });

export default defineConfig({
  site: 'https://gursezhira.github.io',
  base: '/GursezHira/',
  integrations: [sitemap()],
});