import { PATERNAL_NODES }  from "./family-tree-paternal.js";
import { MATERNAL_NODES }  from "./family-tree-maternal.js";
import { DADI_SIDE_NODES } from "./family-tree-dadi-side.js";
import { RANJEET_SIDE_NODES } from "./family-tree-ranjeet-side.js";
import { MATERNAL_SABARJEET_NODES } from "./family-tree-maternal-sabarjeet.js";
import { MATERNAL_NORANG_NODES } from "./family-tree-maternal-norang.js";
import { MATERNAL_GURJEET_NODES } from "./family-tree-maternal-gurjeet.js";
import { MATERNAL_BALVEER_NODES } from "./family-tree-maternal-balveer.js";
import { MATERNAL_KAMALJEET_NODES } from "./family-tree-maternal-kamaljeet.js";

// ── Gursez lives here as the shared centre node ──
const GURSEZ_NODE = {
  "id": "aaaEJwni",
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
    "parents": ["aaaEJwnj", "aaaEJwnk"],
    "children": []
  }
};

export const BRANCHES = [
  {
    id: 'Paternal',
    label: 'Paternal Side',
    nodes: PATERNAL_NODES,
    theme: {
      dot: 'linear-gradient(135deg,#dff8fc,#c9f4f8)',         
      boxBg: 'rgba(223,248,252,0.45)',                       
      boxBorder: 'rgba(92,215,234,0.38)',                     
      nodeBorder: '#5cd7ea',                                
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
      dot: 'linear-gradient(135deg,#bda2df,#f8f0ff)',      
      boxBg: 'rgba(237,228,248,0.45)',                      
      boxBorder: 'rgba(154,126,200,0.38)',                     
      nodeBorder: '#9a7ec8',                                 
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
      dot: 'linear-gradient(135deg,#f8e8d8,#dff8fc)',         
      boxBg: 'rgba(254,243,226,0.55)',                        
      boxBorder: 'rgba(230,160,80,0.38)',
      nodeBorder: '#e6a050',                                 
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
  },
  {
    id: 'Maternal-Sabarjeet',
    label: "Maternal: Sabarjeet's Line",
    nodes: MATERNAL_SABARJEET_NODES,
    theme: {
      dot: 'linear-gradient(135deg,#fce3c5,#fef0df)',
      boxBg: 'rgba(254,238,218,0.45)',
      boxBorder: 'rgba(235,170,110,0.38)',
      nodeBorder: '#ebaa6e',
      nodeBg: 'linear-gradient(to bottom, rgba(254,238,218,0.18), white)',
      stroke: 'rgba(235,170,110,0.75)',
      gridBefore: 'linear-gradient(90deg,#fce3c5,var(--wheat))',
      gridBadgeBg: '#fce3c5',
      gridBadgeText: '#9b6a38'
    }
  },
  {
    id: 'Maternal-Norang',
    label: "Maternal: Norang's Line",
    nodes: MATERNAL_NORANG_NODES,
    theme: {
      dot: 'linear-gradient(135deg,#d2f3db,#e5faeb)',
      boxBg: 'rgba(225,248,232,0.45)',
      boxBorder: 'rgba(125,205,150,0.38)',
      nodeBorder: '#7dcd96',
      nodeBg: 'linear-gradient(to bottom, rgba(225,248,232,0.18), white)',
      stroke: 'rgba(125,205,150,0.75)',
      gridBefore: 'linear-gradient(90deg,var(--sage-light),var(--wheat))',
      gridBadgeBg: '#d2f3db',
      gridBadgeText: '#4b8e61'
    }
  },
  {
    id: 'Maternal-Gurjeet',
    label: "Maternal: Gurjeet's Line",
    nodes: MATERNAL_GURJEET_NODES,
    theme: {
      dot: 'linear-gradient(135deg,#fedfe8,#fff0f5)',
      boxBg: 'rgba(254,230,240,0.45)',
      boxBorder: 'rgba(235,130,170,0.38)',
      nodeBorder: '#ebb0c5',
      nodeBg: 'linear-gradient(to bottom, rgba(254,230,240,0.18), white)',
      stroke: 'rgba(235,130,170,0.75)',
      gridBefore: 'linear-gradient(90deg,#fedfe8,#fdf3f6)',
      gridBadgeBg: '#fedfe8',
      gridBadgeText: '#b04a70'
    }
  },
  {
    id: 'Maternal-Balveer',
    label: "Maternal: Balveer's Line",
    nodes: MATERNAL_BALVEER_NODES,
    theme: {
      dot: 'linear-gradient(135deg,#d0f0eb,#e4f7f4)',
      boxBg: 'rgba(222,246,242,0.45)',
      boxBorder: 'rgba(110,200,185,0.38)',
      nodeBorder: '#6ec8b9',
      nodeBg: 'linear-gradient(to bottom, rgba(222,246,242,0.18), white)',
      stroke: 'rgba(110,200,185,0.75)',
      gridBefore: 'linear-gradient(90deg,#d0f0eb,var(--sky))',
      gridBadgeBg: '#d0f0eb',
      gridBadgeText: '#3a877d'
    }
  },
  {
    id: 'Maternal-Kamaljeet',
    label: "Maternal: Kamaljeet's Line",
    nodes: MATERNAL_KAMALJEET_NODES,
    theme: {
      dot: 'linear-gradient(135deg,#fdf3b8,#fef9d6)',
      boxBg: 'rgba(254,248,198,0.45)',
      boxBorder: 'rgba(230,210,95,0.38)',
      nodeBorder: '#e6d25f',
      nodeBg: 'linear-gradient(to bottom, rgba(254,248,198,0.18), white)',
      stroke: 'rgba(230,210,95,0.75)',
      gridBefore: 'linear-gradient(90deg,#fdf3b8,var(--wheat))',
      gridBadgeBg: '#fdf3b8',
      gridBadgeText: '#857820'
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