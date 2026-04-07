import { PATERNAL_NODES }  from "./family-tree-paternal.js";
import { MATERNAL_NODES }  from "./family-tree-maternal.js";
import { DADI_SIDE_NODES } from "./family-tree-dadi-side.js";
import { RANJEET_SIDE_NODES } from "./family-tree-ranjeet-side.js";

// ── Gursez lives here as the shared centre node ──
const GURSEZ_NODE = {
  "id": "node-gursez",
  "data": {
    "name": "Gursez Singh Hira",
    "relation": "Our Star ⭐",
    "side": "Gursez",
    "emoji": "👶",
    "color": "linear-gradient(135deg, #f8e8d8, #dff8fc)",
    "born": "January 13, 2026",
    "note": "Born into a family overflowing with love. The tiny hands, the soft sighs, the first smiles — Gursez is the most wonderful chapter in all of our stories.",
    "gender": "M"
  },
  "rels": {
    "spouses": [],
    "parents": ["node-dad", "node-mum"],
    "children": []
  }
};

export const BRANCHES = [
  {
    id: 'Paternal',
    label: 'Paternal Side',
    nodes: PATERNAL_NODES,
    theme: {
      dot: 'linear-gradient(135deg,#dff8fc,#c9f4f8)',         // Replaces .ft-dot--paternal
      boxBg: 'rgba(223,248,252,0.45)',                        // Replaces .ft-couple-box--pat
      boxBorder: 'rgba(92,215,234,0.38)',                     
      nodeBorder: '#5cd7ea',                                  // Replaces .ft-node--paternal
      nodeBg: 'linear-gradient(to bottom, rgba(223,248,252,0.18), white)',
      stroke: 'rgba(92,215,234,0.75)',                        
      gridBefore: 'linear-gradient(90deg,var(--sky),var(--sage-light))', 
      gridBadgeBg: 'var(--blush-light)',                      
      gridBadgeText: '#3a6e8a'                                
    }
  },
  {
    id: 'Maternal',
    label: 'Maternal Side',
    nodes: MATERNAL_NODES,
    theme: {
      dot: 'linear-gradient(135deg,#bda2df,#f8f0ff)',         // Replaces .ft-dot--maternal
      boxBg: 'rgba(237,228,248,0.45)',                        // Replaces .ft-couple-box--mat
      boxBorder: 'rgba(154,126,200,0.38)',                     
      nodeBorder: '#9a7ec8',                                  // Replaces .ft-node--maternal
      nodeBg: 'linear-gradient(to bottom, rgba(237,228,248,0.18), white)',
      stroke: 'rgba(154,126,200,0.75)',
      gridBefore: 'linear-gradient(90deg,var(--lavender),var(--blush-light))', 
      gridBadgeBg: '#d0c8e0',                      
      gridBadgeText: '#6a4ea0'
    }
  },
  {
    id: 'Dadi-Side',
    label: "Dadi's Side",
    nodes: DADI_SIDE_NODES,
    theme: {
      dot: 'linear-gradient(135deg,#f8e8d8,#dff8fc)',         // Replaces .ft-dot--dadi-side
      boxBg: 'rgba(254,243,226,0.55)',                        // Replaces .ft-couple-box--dadi
      boxBorder: 'rgba(230,160,80,0.38)',
      nodeBorder: '#e6a050',                                  // Replaces .ft-node--dadi
      nodeBg: 'linear-gradient(to bottom, rgba(254,243,226,0.25), white)',
      stroke: 'rgba(230,160,80,0.75)',
      gridBefore: 'linear-gradient(90deg,#fde8c8,#fef3e2)', 
      gridBadgeBg: '#fde8c8',                      
      gridBadgeText: '#a05a10'
    }
  },
  {
    id: 'Ranjeet-Side',
    label: "Ranjeet's Side",
    nodes: RANJEET_SIDE_NODES,
    theme: {
      dot: 'linear-gradient(135deg, #fde8f0, #fce4ee)',
      boxBg: 'rgba(254,232,240,0.55)',
      boxBorder: 'rgba(235,130,170,0.38)',
      nodeBorder: '#ebb0c5',
      nodeBg: 'linear-gradient(to bottom, rgba(254,232,240,0.25), white)',
      stroke: 'rgba(235,130,170,0.75)',
      gridBefore: 'linear-gradient(90deg,#fed8e5,#fdf3f6)', 
      gridBadgeBg: '#fed8e5',                      
      gridBadgeText: '#b04a70'
    }
  }
];

export const TREE_DATA = {
  treeData: [
    GURSEZ_NODE,
    ...BRANCHES.flatMap(b => b.nodes)
  ],
  branches: BRANCHES
};
