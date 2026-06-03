import { getFluentEmojiCDN, getEmoji } from '@lobehub/fluent-emoji';

export async function getAnimatedEmojiUrl(emojiChar: string | undefined | null): Promise<string | null> {
  if (!emojiChar) return null;
  const trimmed = emojiChar.trim();
  
  const emoji = getEmoji(trimmed);
  if (!emoji) return null;

  try {
    return getFluentEmojiCDN(emoji, { type: 'anim', cdn: 'unpkg' });
  } catch (e) {
    console.error('Failed to get Fluent Emoji CDN URL:', e);
    return null;
  }
}
