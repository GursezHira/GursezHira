import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getCollection } from 'astro:content';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  const paths = posts.map((post) => ({
    params: { route: `stories/${post.id}` },
    props: { title: post.data.title, description: post.data.excerpt, emoji: post.data.emoji, bg: post.data.bg },
  }));

  paths.push({
    params: { route: 'home' },
    props: { 
      title: "Gursez Singh Hira's Memory Book", 
      description: "Every yawn, every giggle, every tiny milestone — lovingly captured and kept forever.",
      emoji: "🌙",
      bg: "#5cd7ea"
    },
  });

  return paths;
}

export async function GET({ props }: any) {
  const { title, description, emoji, bg } = props;

  // Load fonts
  const fontRegularPath = path.resolve('./public/fonts/DM_Sans/static/DMSans-Regular.ttf');
  const fontBoldPath = path.resolve('./public/fonts/DM_Sans/static/DMSans-Bold.ttf');
  
  const [fontRegularData, fontBoldData] = await Promise.all([
    fs.readFile(fontRegularPath),
    fs.readFile(fontBoldPath),
  ]);

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fffaf6',
          backgroundImage: `linear-gradient(135deg, ${bg}22 0%, #fffaf6 100%)`,
          padding: '40px',
          fontFamily: 'DM Sans',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: '120px',
                marginBottom: '20px',
              },
              children: emoji,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '70px',
                fontWeight: 700,
                color: '#1f2333',
                textAlign: 'center',
                marginBottom: '20px',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '32px',
                fontWeight: 400,
                color: '#5e5550',
                textAlign: 'center',
                maxWidth: '800px',
              },
              children: description,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '40px',
                fontSize: '24px',
                color: '#8e817a',
                fontWeight: 400,
              },
              children: 'gursez.hira.im',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'DM Sans',
          data: fontRegularData,
          weight: 400,
          style: 'normal',
        },
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
    },
  });
}
