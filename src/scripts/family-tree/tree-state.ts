/* ─── TREE STATE & CONSTANTS ─────────────────────────────
   Central state object and ID sets shared across modules.
─────────────────────────────────────────────────────── */

export interface TreeState {
  x: number;
  y: number;
  scale: number;
  dragging: boolean;
  startX: number;
  startY: number;
  visibleSides: { paternal: boolean; maternal: boolean };
}

/**
 * Pan/zoom/filter state for the tree viewport.
 * All modules read and write this object directly.
 */
export const treeState: TreeState = {
  x: 0,
  y: 0,
  scale: 0.85,
  dragging: false,
  startX: 0,
  startY: 0,
  visibleSides: { paternal: true, maternal: true },
};

/**
 * IDs of nodes that are currently rendered as full cards
 * (as opposed to collapsed ghost nodes).
 */
export const expandedNodeIds = new Set<string>([
  'aaaEJwni',
  'aaaEJwnj', 'aaaEJwnk',
  'aaaEJwnn', 'aaaEJwnp',
  'aaaEJwnH', 'aaaEJwnJ',
  'aaaEJwnq', 'aaaEJwns', 'aaaEJwnu',
  'aaaEJwnr', 'aaaEJwnt', 'aaaEJwnM', 'aaaEJwnN',
  'aaaEJwnK', 'aaaEJwnL',
]);

/**
 * "Core" nodes that the user cannot collapse — always visible.
 * Populated once from the initial expandedNodeIds set.
 */
export const CORE_NODES = new Set<string>([...expandedNodeIds]);

/** IDs that belong directly to the central (Gursez) family unit. */
export const CENTER_NODES = new Set<string>(['aaaEJwni', 'aaaEJwnj', 'aaaEJwnk']);

/** IDs of the direct paternal ancestors (used for sort ordering). */
export const DIRECT_PATS = new Set<string>([
  'aaaEJwnn', 'aaaEJwnp',
  'aaaEJwnq', 'aaaEJwnr',
  'aaaEJwns', 'aaaEJwnt', 'aaaEJwnu',
]);

/** IDs of the direct maternal ancestors (used for sort ordering). */
export const DIRECT_MATS = new Set<string>([
  'aaaEJwnH', 'aaaEJwnJ',
  'aaaEJwnK', 'aaaEJwnL',
  'aaaEJwnM', 'aaaEJwnN',
]);

/** Layout constants (pixels). Must match CSS where noted. */
export const LAYOUT = {
  CARD_W:    150,
  CARD_H:    100,
  GHOST_W:   44,   // Must match CSS .ft-node--ghost width
  GHOST_H:   44,
  HEART_W:   24,
  BOX_PAD_X: 10,
  BOX_PAD_Y: 8,
  UNIT_GAP:  44,
  ROW_H:     210,
  PAD_X:     70,
  PAD_Y:     70,
};

/** Currently-hovered node ID (used to avoid re-rendering the hover card). */
export let activeHoverNodeId: string | null = null;
export function setActiveHoverNodeId(id: string | null) { activeHoverNodeId = id; }

/** Whether the device supports touch input (set on boot). */
export let isTouchDevice = false;
export function setIsTouchDevice(val: boolean) { isTouchDevice = val; }

/** Currently spotlighted branch ID (null = no spotlight). */
export let activeSpotlight: string | null = null;
export function setActiveSpotlight(val: string | null) { activeSpotlight = val; }
