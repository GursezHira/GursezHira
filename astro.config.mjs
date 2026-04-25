import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sveltia from 'astro-loader-sveltia-cms';

export default defineConfig({
  site: 'https://gursez.hira.im',

  // GitHub Pages serves files with long-lived cache headers for hashed assets
  // Astro's default asset hashing already handles cache busting for /_astro/* files.
  // Setting trailingSlash and build output helps GH Pages serve correctly.
  trailingSlash: 'ignore',

  build: {
    // Inline small stylesheets (<4kb) directly into HTML to eliminate render-blocking CSS requests.
    // Your Layout.CMtM6yVA.css is 9 KiB so it won't be inlined, but any smaller component
    // styles will be, reducing round trips.
    inlineStylesheets: 'auto',

    // Astro already fingerprints /_astro/* assets with content hashes.
    // GitHub Pages CDN caches these aggressively on repeat visits automatically.
    assets: '_astro',
  },

  vite: {
    build: {
      // Raise the chunk size warning limit (optional, keeps build output clean)
      chunkSizeWarningLimit: 1000,

      rollupOptions: {
        output: {
          // Keep CSS in a single file to minimise requests
          manualChunks: undefined,
        },
      },
    },

    // Optimise image handling during dev
    assetsInclude: ['**/*.webp', '**/*.avif'],
  },

  integrations: [
    sitemap(),
    sveltia({
      config: {
        backend: {
          name: 'github',
          repo: 'GursezHira/GursezHira',
          branch: 'Site',
        },
        media_folder: 'public/images/uploads',
        public_folder: '/images/uploads',
        collections: [
          {
            name: 'milestones',
            label: 'Milestones',
            label_singular: 'Milestone',
            folder: 'src/content/milestones',
            format: 'json',
            extension: 'json',
            create: true,
            fields: [
              { name: 'title', label: 'Title', widget: 'string' },
              {
                name: 'date',
                label: 'Date',
                widget: 'datetime',
                type: 'date',
                format: 'MMMM D, YYYY',
                picker_utc: true,
                default: '{{now}}'
              },
              {
                name: 'category',
                label: 'Category',
                widget: 'select',
                options: ['Firsts', 'Monthly', 'Growth', 'Funny', 'Health', 'Celebration']
              },
              { name: 'emoji', label: 'Emoji', widget: 'string' },
              { name: 'color', label: 'Color', widget: 'color' },
              { name: 'desc', label: 'Description', widget: 'text' },
              { name: 'story', label: 'Story', widget: 'markdown' },
            ],
          },
          {
            name: 'blog',
            label: 'Blog',
            slug: '{{slug}}',
            label_singular: 'Blog Post',
            folder: 'src/content/blog',
            format: 'frontmatter',
            extension: 'md',
            create: true,
            fields: [
              { name: 'title',    label: 'Title',     widget: 'string' },
              { name: 'tag',      label: 'Tag',       widget: 'string' },
              { name: 'emoji',    label: 'Emoji',     widget: 'string' },
              { name: 'bg',       label: 'Background',widget: 'string' },
              { name: 'date',     label: 'Date',      widget: 'datetime', date_format: 'YYYY-MM-DD', format: 'MMMM D, YYYY', time_format: false },
              { name: 'readTime', label: 'Read Time', widget: 'string', hint: 'e.g. 5 min read' },
              { name: 'excerpt',  label: 'Excerpt',   widget: 'text' },
              { name: 'body',     label: 'Body Text', widget: 'markdown' },
            ],
          },
        ],
      },
    }),
  ],
});
