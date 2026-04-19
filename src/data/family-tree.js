import { PATERNAL_NODES } from "./family-tree-paternal.js";
import { MATERNAL_NODES } from "./family-tree-maternal.js";
import { DADI_BAJWA_NODES, DADI_KAHLON_NODES } from "./family-tree-dadi-side.js";
import { MATERNAL_SABARJEET_NODES } from "./family-tree-maternal-sabarjeet.js";
import { MATERNAL_NORANG_NODES } from "./family-tree-maternal-norang.js";
import { MATERNAL_GURJEET_NODES } from "./family-tree-maternal-gurjeet.js";
import { MATERNAL_BALVEER_NODES } from "./family-tree-maternal-balveer.js";
import { MATERNAL_KAMALJEET_NODES } from "./family-tree-maternal-kamaljeet.js";
import { RANJEET_BISHAN_NODES }     from "./family-tree-ranjeet-bishan.js";
import { RANJEET_SHINGARA_NODES }   from "./family-tree-ranjeet-shingara.js";
import { RANJEET_HARNAM_NODES }     from "./family-tree-ranjeet-harnam.js";
import { RANJEET_RATAN_NODES }      from "./family-tree-ranjeet-ratan.js";
import { RANJEET_BALVIRKAUR_NODES } from "./family-tree-ranjeet-balvirkaur.js";
import { RANJEET_BALVIRSINGH_NODES } from "./family-tree-ranjeet-balvirsingh.js";

// ── Gursez lives here as the shared centre node ──
const GURSEZ_NODE = {
  id: "aaaEJwni",
  data: {
    name: "Gursez Singh Hira",
    relation: "Our Star ⭐",
    side: "Gursez",
    emoji: "👶",
    color: "linear-gradient(135deg, #f8e8d8, #dff8fc)",
    born: "January 13, 2026",
    note: "Born into a family overflowing with love. The tiny hands, the soft sighs, the first smiles — Gursez is the most wonderful chapter in all of our stories.",
    gender: "M",
  },
  rels: {
    spouses: [],
    parents: ["aaaEJwnj", "aaaEJwnk"],
    children: [],
  },
};

export const BRANCHES = [

  // ── Royal Blue ──
  {
    id: "Paternal",
    label: "Paternal Side",
    nodes: PATERNAL_NODES,
    theme: {
      dot: "linear-gradient(135deg,#dbeafe,#3b82f6)",
      boxBg: "rgba(219,234,254,0.55)",
      boxBorder: "rgba(59,130,246,0.38)",
      nodeBorder: "#3b82f6",
      nodeBg: "linear-gradient(to bottom, rgba(219,234,254,0.25), white)",
      stroke: "rgba(59,130,246,0.75)",
      gridBefore: "linear-gradient(90deg,#dbeafe,#bfdbfe)",
      gridBadgeBg: "#dbeafe",
      gridBadgeText: "#1e3a8a",
    },
  },

  // ── Deep Violet ──
  {
    id: "Maternal",
    label: "Maternal Side",
    nodes: MATERNAL_NODES,
    theme: {
      dot: "linear-gradient(135deg,#ede9fe,#7c3aed)",
      boxBg: "rgba(237,233,254,0.55)",
      boxBorder: "rgba(124,58,237,0.38)",
      nodeBorder: "#7c3aed",
      nodeBg: "linear-gradient(to bottom, rgba(237,233,254,0.25), white)",
      stroke: "rgba(124,58,237,0.75)",
      gridBefore: "linear-gradient(90deg,#ede9fe,#ddd6fe)",
      gridBadgeBg: "#ede9fe",
      gridBadgeText: "#3b0764",
    },
  },

  // ── Deep Amber ──
  {
    id: "Dadi-Bajwa",
    label: "Dadi's Side (Bajwa)",
    nodes: DADI_BAJWA_NODES,
    theme: {
      dot: "linear-gradient(135deg,#fef3c7,#d97706)",
      boxBg: "rgba(254,243,199,0.55)",
      boxBorder: "rgba(217,119,6,0.38)",
      nodeBorder: "#d97706",
      nodeBg: "linear-gradient(to bottom, rgba(254,243,199,0.25), white)",
      stroke: "rgba(217,119,6,0.75)",
      gridBefore: "linear-gradient(90deg,#fef3c7,#fde68a)",
      gridBadgeBg: "#fef3c7",
      gridBadgeText: "#78350f",
    },
  },

  // ── Magenta Pink ──
  {
    id: "Dadi-Kahlon",
    label: "Kahlon Family",
    nodes: DADI_KAHLON_NODES,
    theme: {
      dot: "linear-gradient(135deg,#fce7f3,#be185d)",
      boxBg: "rgba(252,231,243,0.55)",
      boxBorder: "rgba(190,24,93,0.38)",
      nodeBorder: "#be185d",
      nodeBg: "linear-gradient(to bottom, rgba(252,231,243,0.25), white)",
      stroke: "rgba(190,24,93,0.75)",
      gridBefore: "linear-gradient(90deg,#fce7f3,#fbcfe8)",
      gridBadgeBg: "#fce7f3",
      gridBadgeText: "#831843",
    },
  },

  // ── Deep Teal ──
  {
    id: "Ranjeet-Bishan",
    label: "Bishan's Line (Bakhtaur & Ranjeet's Family)",
    nodes: RANJEET_BISHAN_NODES,
    theme: {
      dot: "linear-gradient(135deg,#ccfbf1,#0d9488)",
      boxBg: "rgba(204,251,241,0.55)",
      boxBorder: "rgba(13,148,136,0.38)",
      nodeBorder: "#0d9488",
      nodeBg: "linear-gradient(to bottom, rgba(204,251,241,0.25), white)",
      stroke: "rgba(13,148,136,0.75)",
      gridBefore: "linear-gradient(90deg,#ccfbf1,#99f6e4)",
      gridBadgeBg: "#ccfbf1",
      gridBadgeText: "#134e4a",
    },
  },

  // ── Mustard Yellow ──
  {
    id: "Ranjeet-Shingara",
    label: "Shingara's Line",
    nodes: RANJEET_SHINGARA_NODES,
    theme: {
      dot: "linear-gradient(135deg,#fefce8,#ca8a04)",
      boxBg: "rgba(254,252,232,0.55)",
      boxBorder: "rgba(202,138,4,0.38)",
      nodeBorder: "#ca8a04",
      nodeBg: "linear-gradient(to bottom, rgba(254,252,232,0.25), white)",
      stroke: "rgba(202,138,4,0.75)",
      gridBefore: "linear-gradient(90deg,#fefce8,#fef08a)",
      gridBadgeBg: "#fefce8",
      gridBadgeText: "#713f12",
    },
  },

  // ── Deep Fuchsia ──
  {
    id: "Ranjeet-Harnam",
    label: "Harnam Singh's Line",
    nodes: RANJEET_HARNAM_NODES,
    theme: {
      dot: "linear-gradient(135deg,#fdf4ff,#a21caf)",
      boxBg: "rgba(253,244,255,0.55)",
      boxBorder: "rgba(162,28,175,0.38)",
      nodeBorder: "#a21caf",
      nodeBg: "linear-gradient(to bottom, rgba(253,244,255,0.25), white)",
      stroke: "rgba(162,28,175,0.75)",
      gridBefore: "linear-gradient(90deg,#fdf4ff,#f5d0fe)",
      gridBadgeBg: "#fdf4ff",
      gridBadgeText: "#581c87",
    },
  },

  // ── Forest Green ──
  {
    id: "Ranjeet-Ratan",
    label: "Ratan Singh's Line",
    nodes: RANJEET_RATAN_NODES,
    theme: {
      dot: "linear-gradient(135deg,#f0fdf4,#15803d)",
      boxBg: "rgba(240,253,244,0.55)",
      boxBorder: "rgba(21,128,61,0.38)",
      nodeBorder: "#15803d",
      nodeBg: "linear-gradient(to bottom, rgba(240,253,244,0.25), white)",
      stroke: "rgba(21,128,61,0.75)",
      gridBefore: "linear-gradient(90deg,#f0fdf4,#bbf7d0)",
      gridBadgeBg: "#f0fdf4",
      gridBadgeText: "#14532d",
    },
  },

  // ── Burnt Orange ──
  {
    id: "Ranjeet-BalvirKaur",
    label: "Balvir Kaur's Line",
    nodes: RANJEET_BALVIRKAUR_NODES,
    theme: {
      dot: "linear-gradient(135deg,#fff7ed,#ea580c)",
      boxBg: "rgba(255,247,237,0.55)",
      boxBorder: "rgba(234,88,12,0.38)",
      nodeBorder: "#ea580c",
      nodeBg: "linear-gradient(to bottom, rgba(255,247,237,0.25), white)",
      stroke: "rgba(234,88,12,0.75)",
      gridBefore: "linear-gradient(90deg,#fff7ed,#fed7aa)",
      gridBadgeBg: "#fff7ed",
      gridBadgeText: "#7c2d12",
    },
  },

  // ── Deep Indigo ──
  {
    id: "Ranjeet-BalvirSingh",
    label: "Balvir Singh's Line",
    nodes: RANJEET_BALVIRSINGH_NODES,
    theme: {
      dot: "linear-gradient(135deg,#eef2ff,#4338ca)",
      boxBg: "rgba(238,242,255,0.55)",
      boxBorder: "rgba(67,56,202,0.38)",
      nodeBorder: "#4338ca",
      nodeBg: "linear-gradient(to bottom, rgba(238,242,255,0.25), white)",
      stroke: "rgba(67,56,202,0.75)",
      gridBefore: "linear-gradient(90deg,#eef2ff,#c7d2fe)",
      gridBadgeBg: "#eef2ff",
      gridBadgeText: "#1e1b4b",
    },
  },

  // ── Deep Rose ──
  {
    id: "Maternal-Sabarjeet",
    label: "Maternal: Sabarjeet's Line",
    nodes: MATERNAL_SABARJEET_NODES,
    theme: {
      dot: "linear-gradient(135deg,#fdf2f8,#db2777)",
      boxBg: "rgba(253,242,248,0.55)",
      boxBorder: "rgba(219,39,119,0.38)",
      nodeBorder: "#db2777",
      nodeBg: "linear-gradient(to bottom, rgba(253,242,248,0.25), white)",
      stroke: "rgba(219,39,119,0.75)",
      gridBefore: "linear-gradient(90deg,#fdf2f8,#fbcfe8)",
      gridBadgeBg: "#fdf2f8",
      gridBadgeText: "#831843",
    },
  },

  // ── Ocean Cyan ──
  {
    id: "Maternal-Norang",
    label: "Maternal: Norang's Line",
    nodes: MATERNAL_NORANG_NODES,
    theme: {
      dot: "linear-gradient(135deg,#f0fdfa,#0891b2)",
      boxBg: "rgba(240,253,250,0.55)",
      boxBorder: "rgba(8,145,178,0.38)",
      nodeBorder: "#0891b2",
      nodeBg: "linear-gradient(to bottom, rgba(240,253,250,0.25), white)",
      stroke: "rgba(8,145,178,0.75)",
      gridBefore: "linear-gradient(90deg,#f0fdfa,#a5f3fc)",
      gridBadgeBg: "#f0fdfa",
      gridBadgeText: "#164e63",
    },
  },

  // ── Crimson Red ──
  {
    id: "Maternal-Gurjeet",
    label: "Maternal: Gurjeet's Line",
    nodes: MATERNAL_GURJEET_NODES,
    theme: {
      dot: "linear-gradient(135deg,#fff1f2,#e11d48)",
      boxBg: "rgba(255,241,242,0.55)",
      boxBorder: "rgba(225,29,72,0.38)",
      nodeBorder: "#e11d48",
      nodeBg: "linear-gradient(to bottom, rgba(255,241,242,0.25), white)",
      stroke: "rgba(225,29,72,0.75)",
      gridBefore: "linear-gradient(90deg,#fff1f2,#fecdd3)",
      gridBadgeBg: "#fff1f2",
      gridBadgeText: "#881337",
    },
  },

  // ── Steel Teal / Dark Cyan ──
  {
    id: "Maternal-Balveer",
    label: "Maternal: Balveer's Line",
    nodes: MATERNAL_BALVEER_NODES,
    theme: {
      dot: "linear-gradient(135deg,#ecfeff,#0e7490)",
      boxBg: "rgba(236,254,255,0.55)",
      boxBorder: "rgba(14,116,144,0.38)",
      nodeBorder: "#0e7490",
      nodeBg: "linear-gradient(to bottom, rgba(236,254,255,0.25), white)",
      stroke: "rgba(14,116,144,0.75)",
      gridBefore: "linear-gradient(90deg,#ecfeff,#a5f3fc)",
      gridBadgeBg: "#ecfeff",
      gridBadgeText: "#083344",
    },
  },

  // ── Olive Lime ──
  {
    id: "Maternal-Kamaljeet",
    label: "Maternal: Kamaljeet's Line",
    nodes: MATERNAL_KAMALJEET_NODES,
    theme: {
      dot: "linear-gradient(135deg,#f7fee7,#65a30d)",
      boxBg: "rgba(247,254,231,0.55)",
      boxBorder: "rgba(101,163,13,0.38)",
      nodeBorder: "#65a30d",
      nodeBg: "linear-gradient(to bottom, rgba(247,254,231,0.25), white)",
      stroke: "rgba(101,163,13,0.75)",
      gridBefore: "linear-gradient(90deg,#f7fee7,#d9f99d)",
      gridBadgeBg: "#f7fee7",
      gridBadgeText: "#1a2e05",
    },
  },

];

export const TREE_DATA = {
  treeData: [GURSEZ_NODE, ...BRANCHES.flatMap((b) => b.nodes)],
  branches: BRANCHES,
};