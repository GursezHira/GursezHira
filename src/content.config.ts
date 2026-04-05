import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const milestonesCollection = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/milestones" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    emoji: z.string(),
    color: z.string(),
    desc: z.string(),
    story: z.string(),
  })
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    emoji: z.string(),
    bg: z.string(),
    date: z.string(),
    readTime: z.string(),
    excerpt: z.string(),
  })
});

const familyCollection = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/family" }),
  schema: z.object({
    nodeId: z.string(),
    name: z.string(),
    relation: z.string(),
    side: z.string(),
    emoji: z.string(),
    color: z.string(),
    generation: z.number(),
    born: z.string().optional(),
    note: z.string(),
  })
});

export const collections = {
  'milestones': milestonesCollection,
  'blog': blogCollection,
  'family': familyCollection,
};