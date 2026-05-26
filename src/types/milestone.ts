/**
 * milestone.ts
 *
 * TypeScript definitions for Milestone data.
 */

export interface Milestone {
  id: string;
  title: string;
  date: string;
  category: string;
  emoji: string;
  animatedEmoji?: string;
  animatedEmojiUrl?: string | null;
  color: string;
  desc: string;
  story: string;
}

export type MilestoneCategory = 
  | 'Firsts' 
  | 'Monthly' 
  | 'Growth' 
  | 'Funny' 
  | 'Health' 
  | 'Celebration';

export type SortOrder = 'newest' | 'oldest';
