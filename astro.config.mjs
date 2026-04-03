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
              { name: 'id',          label: 'ID',           widget: 'number' },
              { name: 'title',       label: 'Title',        widget: 'string' },
              { name: 'date',        label: 'Date',         widget: 'string', hint: 'ISO date, e.g. 2024-01-15' },
              { name: 'displayDate', label: 'Display Date', widget: 'string', hint: 'e.g. January 15, 2024' },
              { name: 'age',         label: 'Age',          widget: 'string', hint: 'e.g. 2 years old' },
              { name: 'category',    label: 'Category',     widget: 'string' },
              { name: 'emoji',       label: 'Emoji',        widget: 'string' },
              { name: 'color',       label: 'Color',        widget: 'color' },
              { name: 'desc',        label: 'Description',  widget: 'text' },
              { name: 'story',       label: 'Story',        widget: 'markdown' },
            ],
          },
          {
            name: 'blog',
            label: 'Blog',
            label_singular: 'Blog Post',
            folder: 'src/content/blog',
            format: 'frontmatter',
            extension: 'md',
            create: true,
            fields: [
              { name: 'id',       label: 'ID',        widget: 'number' },
              { name: 'title',    label: 'Title',     widget: 'string' },
              { name: 'tag',      label: 'Tag',       widget: 'string' },
              { name: 'tagColor', label: 'Tag Color', widget: 'color' },
              { name: 'emoji',    label: 'Emoji',     widget: 'string' },
              { name: 'bg',       label: 'Background',widget: 'color' },
              { name: 'date',     label: 'Date',      widget: 'datetime', date_format: 'YYYY-MM-DD', time_format: false },
              { name: 'readTime', label: 'Read Time', widget: 'string', hint: 'e.g. 5 min read' },
              { name: 'excerpt',  label: 'Excerpt',   widget: 'text' },
            ],
          },
        ],
      },
    }),
  ],
});
