import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());

  return rss({
    title: "Gursez Singh Hira's Stories",
    description: "Every yawn, every giggle, every tiny milestone — lovingly captured and kept forever.",
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt,
      link: `/stories/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
