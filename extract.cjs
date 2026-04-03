const fs = require('fs');
const html = fs.readFileSync('.example/index.html', 'utf8');

const milesMatch = html.match(/const ALL_MILESTONES = (\[[\s\S]*?\]);/);
const postsMatch = html.match(/const ALL_POSTS = (\[[\s\S]*?\]);/);

if (!milesMatch || !postsMatch) {
  console.error("Failed to parse arrays");
  process.exit(1);
}

const milestones = eval(milesMatch[1]);
const posts = eval(postsMatch[1]);

fs.mkdirSync('src/content/milestones', {recursive: true});
fs.mkdirSync('src/content/blog', {recursive: true});

milestones.forEach(m => {
  fs.writeFileSync(`src/content/milestones/${m.id}.json`, JSON.stringify(m, null, 2));
});

posts.forEach(p => {
  const frontmatter = `---
id: ${p.id}
title: "${p.title.replace(/"/g, '\\"')}"
tag: "${p.tag.replace(/"/g, '\\"')}"
tagColor: "${p.tagColor}"
emoji: "${p.emoji}"
bg: "${p.bg}"
date: "${p.date}"
readTime: "${p.readTime}"
excerpt: "${p.excerpt.replace(/"/g, '\\"')}"
---
`;
  fs.writeFileSync(`src/content/blog/post-${p.id}.md`, frontmatter + p.body);
});
console.log('Extraction complete');
