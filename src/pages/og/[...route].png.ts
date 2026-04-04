import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getCollection } from 'astro:content';
import fs from 'node:fs/promises';
import path from 'node:path';

// Helper to get emoji code point
function getEmojiCode(emoji: string) {
  return Array.from(emoji)
    .map(char => char.codePointAt(0)!.toString(16))
    .join('-');
}

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  const milestones = await getCollection('milestones');
  
  const postPaths = posts.map((post) => ({
    params: { route: `stories/${post.id}` },
    props: { emoji: post.data.emoji, bg: post.data.bg },
  }));

  const milestonePaths = milestones.map((milestone) => ({
    params: { route: `milestones/${milestone.id}` },
    props: { emoji: milestone.data.emoji, bg: milestone.data.color },
  }));

  const homePath = {
    params: { route: 'home' },
    props: { emoji: "🍼", bg: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)" },
  };

  return [...postPaths, ...milestonePaths, homePath];
}

export async function GET({ props }: any) {
  const { emoji, bg } = props;

  // Load font
  const fontBoldPath = path.resolve('./public/fonts/DM_Sans/static/DMSans-Bold.ttf');
  const fontBoldData = await fs.readFile(fontBoldPath);

  // Fetch emoji as a PNG Data URI
  let emojiBase64 = '';
  try {
    const code = getEmojiCode(emoji);
    // Use Twitter's official assets for maximum reliability
    const url = `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/${code}.png`;
    const emojiRes = await fetch(url);
    if (emojiRes.ok) {
      const arrayBuffer = await emojiRes.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      emojiBase64 = `data:image/png;base64,${base64}`;
    }
  } catch (e) {
    console.error('Emoji fetch failed:', e);
  }

  const containerStyle: any = {
    height: '630px',
    width: '1200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: bg.includes('gradient') ? bg : bg,
  };

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: containerStyle,
        children: emojiBase64 ? [
          {
            type: 'img',
            props: {
              src: emojiBase64,
              style: {
                width: '320px',
                height: '320px',
              },
            },
          },
        ] : [
          {
            type: 'div',
            props: {
              style: { fontSize: '240px' },
              children: emoji,
            },
          }
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'DM Sans',
          data: fontBoldData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
