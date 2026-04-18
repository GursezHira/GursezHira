/* ─── TREE LAYOUT ENGINE ─────────────────────────────────
   Converts flat TREE_DATA into pixel-positioned couple units
   ready for the renderer. Pure functions — no DOM access.
─────────────────────────────────────────────────────── */

import {
  LAYOUT,
  CENTER_NODES,
  DIRECT_PATS,
  DIRECT_MATS,
  expandedNodeIds,
} from './tree-state';
import type { FamilyMember, FamilyTreeData } from '../../types/family-tree';

const { CARD_W, CARD_H, GHOST_W, GHOST_H, HEART_W, BOX_PAD_X, BOX_PAD_Y, UNIT_GAP, ROW_H, PAD_X, PAD_Y } = LAYOUT;

/* ── Types ──────────────────────────────────────────── */

export interface Unit {
  ids: string[];
  gen: number;
  side: string;
}

export interface UnitPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface RowLayout {
  g: number;
  pUnits: Unit[];
  cUnits: Unit[];
  mUnits: Unit[];
}

export interface TreeLayout {
  units: Unit[];
  unitByNode: Record<string, Unit>;
  unitPos: Map<Unit, UnitPosition>;
  canvasW: number;
  canvasH: number;
  nodeMap: Record<string, FamilyMember>;
  CENTER_X: number;
}

/* ── Helpers ────────────────────────────────────────── */

function isExpanded(id: string): boolean {
  return expandedNodeIds.has(id);
}

function unitWidth(u: Unit): number {
  const ghostCount = u.ids.filter(id => !isExpanded(id)).length;
  if (u.ids.length === 2) {
    if (ghostCount === 2) return BOX_PAD_X * 2 + GHOST_W * 2 + HEART_W;
    if (ghostCount === 1) return BOX_PAD_X * 2 + CARD_W + GHOST_W + HEART_W;
    return BOX_PAD_X * 2 + CARD_W * 2 + HEART_W;
  }
  return isExpanded(u.ids[0]) ? CARD_W : GHOST_W;
}

function unitHeight(u: Unit): number {
  const hasExpanded = u.ids.some(isExpanded);
  return BOX_PAD_Y * 2 + (hasExpanded ? CARD_H : GHOST_H);
}

function rowTotalWidth(row: Unit[]): number {
  if (!row || !row.length) return 0;
  return row.reduce((s, u) => s + unitWidth(u), 0) + (row.length - 1) * UNIT_GAP;
}

/* ── Step 1: Assign generation to every node ────────── */
function buildGenMap(rawNodes: FamilyMember[], nodeMap: Record<string, FamilyMember>): Record<string, number> {
  const genMap: Record<string, number> = {};

  function assignGen(id: string, g: number) {
    if (id in genMap) return;
    genMap[id] = g;
    const n = nodeMap[id];
    if (!n) return;
    (n.rels.spouses  || []).forEach(s => assignGen(s, g));
    (n.rels.parents  || []).forEach(p => assignGen(p, g - 1));
    (n.rels.children || []).forEach(c => assignGen(c, g + 1));
  }

  // Root Gursez at Gen 0
  assignGen('aaaEJwni', 0);

  // Catch-all for disconnected nodes (if any)
  rawNodes.forEach(n => {
    if (!(n.id in genMap)) {
      const pg = (n.rels.parents || []).map(p => genMap[p]).filter(x => x != null);
      const sg = (n.rels.spouses || []).map(s => genMap[s]).filter(x => x != null);
      genMap[n.id] = pg.length ? pg[0] + 1 : sg.length ? sg[0] : -4;
    }
  });

  return genMap;
}

/* ── Step 2: Build couple-units ─────────────────────── */
function buildUnits(rawNodes: FamilyMember[], nodeMap: Record<string, FamilyMember>, genMap: Record<string, number>) {
  const unitByNode: Record<string, Unit> = {};
  const units: Unit[] = [];
  const paired = new Set<string>();

  rawNodes.forEach(n => {
    if (paired.has(n.id)) return;
    const spouses = (n.rels.spouses || []).filter(s => nodeMap[s]);
    if (spouses.length) {
      const sp = spouses[0];
      paired.add(n.id); paired.add(sp);
      const unit: Unit = { ids: [n.id, sp], gen: genMap[n.id], side: n.data.side };
      units.push(unit);
      unitByNode[n.id] = unit;
      unitByNode[sp]   = unit;
    }
  });

  rawNodes.forEach(n => {
    if (paired.has(n.id)) return;
    const unit: Unit = { ids: [n.id], gen: genMap[n.id], side: n.data.side };
    units.push(unit);
    unitByNode[n.id] = unit;
  });

  return { units, unitByNode };
}

/* ── Step 3: Group units by generation ──────────────── */
function groupByGen(units: Unit[]): Record<number, Unit[]> {
  const byGen: Record<number, Unit[]> = {};
  units.forEach(u => {
    if (!byGen[u.gen]) byGen[u.gen] = [];
    byGen[u.gen].push(u);
  });
  return byGen;
}

/* ── Step 4: Sort rows (paternal left, maternal right) ─ */
function sortRows(byGen: Record<number, Unit[]>, branchOrder: Record<string, number>, visibleSides: { paternal: boolean; maternal: boolean }): RowLayout[] {
  const gens = Object.keys(byGen).map(Number).sort((a, b) => a - b);

  return gens.map(g => {
    const row = byGen[g];
    let pUnits: Unit[] = [];
    let cUnits: Unit[] = [];
    let mUnits: Unit[] = [];

    row.forEach(u => {
      const isCenter = u.ids.some(id => CENTER_NODES.has(id) || DIRECT_PATS.has(id) || DIRECT_MATS.has(id));
      if (isCenter) {
        cUnits.push(u);
      } else if (u.side && u.side.startsWith('Maternal')) {
        mUnits.push(u);
      } else {
        pUnits.push(u);
      }
    });

    if (!visibleSides.paternal) pUnits = [];
    if (!visibleSides.maternal) mUnits = [];

    // Sort centre units (Paternal direct ancestors left, Maternal direct right)
    cUnits.sort((a, b) => {
      const aMat = a.ids.some(id => DIRECT_MATS.has(id)) ? 1 : 0;
      const bMat = b.ids.some(id => DIRECT_MATS.has(id)) ? 1 : 0;
      return aMat - bMat;
    });

    // Direct paternal ancestors go closest to centre (right side of paternal group)
    pUnits.sort((a, b) => {
      const aDirect = a.ids.some(id => DIRECT_PATS.has(id)) ? 1 : 0;
      const bDirect = b.ids.some(id => DIRECT_PATS.has(id)) ? 1 : 0;
      if (aDirect !== bDirect) return aDirect - bDirect;
      return (branchOrder[b.side] || 0) - (branchOrder[a.side] || 0);
    });

    // Direct maternal ancestors go closest to centre (left side of maternal group)
    mUnits.sort((a, b) => {
      const aDirect = a.ids.some(id => DIRECT_MATS.has(id)) ? 1 : 0;
      const bDirect = b.ids.some(id => DIRECT_MATS.has(id)) ? 1 : 0;
      if (aDirect !== bDirect) return bDirect - aDirect;
      return (branchOrder[a.side] || 0) - (branchOrder[b.side] || 0);
    });

    return { g, pUnits, cUnits, mUnits };
  });
}

/* ── Step 5: Assign pixel positions ─────────────────── */
function assignPositions(rowLayouts: RowLayout[]) {
  let maxPW = 0, maxMW = 0, maxCW = 0;
  rowLayouts.forEach(rl => {
    const pw = rowTotalWidth(rl.pUnits);
    const cw = rowTotalWidth(rl.cUnits);
    const mw = rowTotalWidth(rl.mUnits);
    if (pw > maxPW) maxPW = pw;
    if (cw > maxCW) maxCW = cw;
    if (mw > maxMW) maxMW = mw;
  });

  const pTotalW = maxPW > 0 ? maxPW + UNIT_GAP : 0;
  const mTotalW = maxMW > 0 ? maxMW + UNIT_GAP : 0;

  const pZoneMid = PAD_X + maxPW / 2;
  const cZoneMid = PAD_X + pTotalW + maxCW / 2;
  const mZoneMid = cZoneMid + maxCW / 2 + UNIT_GAP + maxMW / 2;

  const CENTER_X = cZoneMid;
  const canvasW  = PAD_X + pTotalW + maxCW + UNIT_GAP + mTotalW + PAD_X;
  const canvasH  = rowLayouts.length * ROW_H + PAD_Y * 2;
  const unitPos  = new Map<Unit, UnitPosition>();

  rowLayouts.forEach((rl, rowIdx) => {
    const y = PAD_Y + rowIdx * ROW_H;

    // Center layout
    const cW = rowTotalWidth(rl.cUnits);
    let cx = cZoneMid - cW / 2;
    rl.cUnits.forEach(u => {
      const w = unitWidth(u);
      unitPos.set(u, { x: cx, y, w, h: unitHeight(u) });
      cx += w + UNIT_GAP;
    });

    // Paternal side branch layout (centered in left zone)
    const pW = rowTotalWidth(rl.pUnits);
    let px = pZoneMid - pW / 2;
    rl.pUnits.forEach(u => {
      const w = unitWidth(u);
      unitPos.set(u, { x: px, y, w, h: unitHeight(u) });
      px += w + UNIT_GAP;
    });

    // Maternal side branch layout (centered in right zone)
    const mW = rowTotalWidth(rl.mUnits);
    let mx = mZoneMid - mW / 2;
    rl.mUnits.forEach(u => {
      const w = unitWidth(u);
      unitPos.set(u, { x: mx, y, w, h: unitHeight(u) });
      mx += w + UNIT_GAP;
    });
  });

  return { unitPos, canvasW, canvasH, CENTER_X };
}

/* ── Public API ─────────────────────────────────────── */

/**
 * Build the full layout from TREE_DATA.
 * Returns everything the renderer needs.
 *
 * @param {FamilyTreeData}  TREE_DATA
 * @param {{ paternal: boolean, maternal: boolean }} visibleSides
 * @returns {TreeLayout}
 */
export function buildLayout(TREE_DATA: FamilyTreeData, visibleSides: { paternal: boolean; maternal: boolean }): TreeLayout {
  const branchOrder: Record<string, number> = {};
  (TREE_DATA.branches || []).forEach((br, idx) => { branchOrder[br.id] = idx; });

  const rawNodes = TREE_DATA.treeData;
  const nodeMap: Record<string, FamilyMember> = {};
  rawNodes.forEach(n => { nodeMap[n.id] = n; });

  const genMap              = buildGenMap(rawNodes, nodeMap);
  const { units, unitByNode } = buildUnits(rawNodes, nodeMap, genMap);
  const byGen               = groupByGen(units);
  const rowLayouts          = sortRows(byGen, branchOrder, visibleSides);
  const { unitPos, canvasW, canvasH, CENTER_X } = assignPositions(rowLayouts);

  return { units, unitByNode, unitPos, canvasW, canvasH, nodeMap, CENTER_X };
}

/**
 * Return the bottom-centre point of a couple unit (connector source).
 */
export function unitConnectorBottom(u: Unit, unitPos: Map<Unit, UnitPosition>) {
  const p = unitPos.get(u);
  if (!p) return null;

  if (u.ids.length === 2) {
    const w1 = isExpanded(u.ids[0]) ? CARD_W : GHOST_W;
    const heartCenterX = p.x + BOX_PAD_X + w1 + HEART_W / 2;
    return { x: heartCenterX, y: p.y + p.h };
  }
  const w = isExpanded(u.ids[0]) ? CARD_W : GHOST_W;
  return { x: p.x + w / 2, y: p.y + p.h };
}

/**
 * Return the top-centre point of a single node card (connector target).
 */
export function nodeConnectorTop(id: string, unitByNode: Record<string, Unit>, unitPos: Map<Unit, UnitPosition>) {
  const u = unitByNode[id];
  if (!u) return null;
  const p = unitPos.get(u);
  if (!p) return null;

  const w = isExpanded(id) ? CARD_W : GHOST_W;
  if (u.ids.length === 2) {
    const idx = u.ids.indexOf(id);
    const w0  = isExpanded(u.ids[0]) ? CARD_W : GHOST_W;
    const cardX = p.x + BOX_PAD_X + (idx === 0 ? 0 : w0 + HEART_W);
    return { x: cardX + w / 2, y: p.y + BOX_PAD_Y };
  }
  return { x: p.x + w / 2, y: p.y + BOX_PAD_Y };
}
