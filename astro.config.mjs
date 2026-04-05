import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import sveltia from 'astro-loader-sveltia-cms';

export default defineConfig({
  site: 'https://gursez.hira.im',
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
