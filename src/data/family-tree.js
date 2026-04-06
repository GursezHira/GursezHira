import { PATERNAL_NODES }  from "./family-tree-paternal.js";
import { MATERNAL_NODES }  from "./family-tree-maternal.js";
import { DADI_SIDE_NODES } from "./family-tree-dadi-side.js";

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

export const TREE_DATA = {
  treeData: [
    GURSEZ_NODE,
    ...PATERNAL_NODES,
    ...MATERNAL_NODES,
    ...DADI_SIDE_NODES,
  ]
};
