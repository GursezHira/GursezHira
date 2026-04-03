import { defineCollection } from 'astro:content';
import { sveltiaLoader } from 'astro-loader-sveltia-cms/loader';

const milestonesCollection = defineCollection({
  loader: sveltiaLoader('milestones'),
});

const blogCollection = defineCollection({
  loader: sveltiaLoader('blog'),
});

export const collections = {
  milestones: milestonesCollection,
  blog: blogCollection,
};