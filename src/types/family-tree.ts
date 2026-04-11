/**
 * family-tree.ts
 *
 * TypeScript definitions for Family Tree data.
 */

export interface FamilyMember {
  id: string;
  data: {
    name: string;
    relation: string;
    side: string;
    emoji: string;
    color: string;
    born?: string;
    died?: string;
    note?: string;
    gender: 'M' | 'F';
    familyName?: string;
  };
  rels: {
    spouses: string[];
    parents: string[];
    children: string[];
  };
}

export interface BranchTheme {
  dot: string;
  boxBg: string;
  boxBorder: string;
  nodeBorder: string;
  nodeBg: string;
  stroke: string;
  gridBefore: string;
  gridBadgeBg: string;
  gridBadgeText: string;
}

export interface Branch {
  id: string;
  label: string;
  nodes: FamilyMember[];
  theme: BranchTheme;
}

export interface FamilyTreeData {
  treeData: FamilyMember[];
  branches: Branch[];
}
