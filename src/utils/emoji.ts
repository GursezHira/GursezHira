import { writeFileSync, existsSync, readFileSync } from 'fs';
import path from 'path';

// Simple build-time cache to avoid duplicate network requests
const cacheFile = path.resolve('.emoji-cache.json');
let cache: Record<string, string> = {};
if (existsSync(cacheFile)) {
  try {
    cache = JSON.parse(readFileSync(cacheFile, 'utf-8'));
  } catch (e) {}
}

export async function getAnimatedEmojiUrl(name: string | undefined | null): Promise<string | null> {
  if (!name) return null;
  const trimmed = name.trim();
  if (cache[trimmed]) return cache[trimmed];

  const formatted = trimmed.toLowerCase().replace(/ /g, '_');
  const standardUrl = `https://raw.githubusercontent.com/microsoft/fluentui-emoji-animated/main/assets/${encodeURIComponent(trimmed)}/animated/${formatted}_animated.png`;
  const defaultUrl = `https://raw.githubusercontent.com/microsoft/fluentui-emoji-animated/main/assets/${encodeURIComponent(trimmed)}/Default/animated/${formatted}_animated_default.png`;

  try {
    const res = await fetch(standardUrl, { method: 'HEAD' });
    if (res.ok) {
      cache[trimmed] = standardUrl;
      writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
      return standardUrl;
    }
  } catch (e) {}

  try {
    const res = await fetch(defaultUrl, { method: 'HEAD' });
    if (res.ok) {
      cache[trimmed] = defaultUrl;
      writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
      return defaultUrl;
    }
  } catch (e) {}

  // Default fallback guess if offline/fails
  return standardUrl;
}
