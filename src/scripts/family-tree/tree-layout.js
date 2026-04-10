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
} from './tree-state.js';

const { CARD_W, CARD_H, GHOST_W, GHOST_H, HEART_W, BOX_PAD_X, BOX_PAD_Y, UNIT_GAP, ROW_H, PAD_X, PAD_Y } = LAYOUT;

/* ── Helpers ────────────────────────────────────────── */

function isExpanded(id) {
  return expandedNodeIds.has(id);
}

function unitWidth(u) {
  const ghostCount = u.ids.filter(id => !isExpanded(id)).length;
  if (u.ids.length === 2) {
    if (ghostCount === 2) return BOX_PAD_X * 2 + GHOST_W * 2 + HEART_W;
    if (ghostCount === 1) return BOX_PAD_X * 2 + CARD_W + GHOST_W + HEART_W;
    return BOX_PAD_X * 2 + CARD_W * 2 + HEART_W;
  }
  return isExpanded(u.ids[0]) ? CARD_W : GHOST_W;
}

function unitHeight(u) {
  const hasExpanded = u.ids.some(isExpanded);
  return BOX_PAD_Y * 2 + (hasExpanded ? CARD_H : GHOST_H);
}

function rowTotalWidth(row) {
  if (!row || !row.length) return 0;
  return row.reduce((s, u) => s + unitWidth(u), 0) + (row.length - 1) * UNIT_GAP;
}

/* ── Step 1: Assign generation to every node ────────── */
function buildGenMap(rawNodes, nodeMap) {
  const genMap = {};

  function assignGen(id, g) {
    if (id in genMap) return;
    genMap[id] = g;
    const n = nodeMap[id];
    if (!n) return;
    (n.rels.spouses  || []).forEach(s => assignGen(s, g));
    (n.rels.parents  || []).forEach(p => assignGen(p, g - 1));
    (n.rels.children || []).forEach(c => assignGen(c, g + 1));
  }

  assignGen('aaaEJwni', 0);

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
function buildUnits(rawNodes, nodeMap, genMap) {
  const unitByNode = {};
  const units = [];
  const paired = new Set();

  rawNodes.forEach(n => {
    if (paired.has(n.id)) return;
    const spouses = (n.rels.spouses || []).filter(s => nodeMap[s]);
    if (spouses.length) {
      const sp = spouses[0];
      paired.add(n.id); paired.add(sp);
      const unit = { ids: [n.id, sp], gen: genMap[n.id], side: n.data.side };
      units.push(unit);
      unitByNode[n.id] = unit;
      unitByNode[sp]   = unit;
    }
  });

  rawNodes.forEach(n => {
    if (paired.has(n.id)) return;
    const unit = { ids: [n.id], gen: genMap[n.id], side: n.data.side };
    units.push(unit);
    unitByNode[n.id] = unit;
  });

  return { units, unitByNode };
}

/* ── Step 3: Group units by generation ──────────────── */
function groupByGen(units) {
  const byGen = {};
  units.forEach(u => {
    if (!byGen[u.gen]) byGen[u.gen] = [];
    byGen[u.gen].push(u);
  });
  return byGen;
}

/* ── Step 4: Sort rows (paternal left, maternal right) ─ */
function sortRows(byGen, branchOrder, visibleSides) {
  const gens = Object.keys(byGen).map(Number).sort((a, b) => a - b);

  gens.forEach(g => {
    const row = byGen[g];
    const patUnits = [];
    const ctrUnits = [];
    const matUnits = [];

    row.forEach(u => {
      const isCenter = u.ids.some(id => CENTER_NODES.has(id));
      if (isCenter) {
        ctrUnits.push(u);
      } else if (u.side && u.side.startsWith('Maternal')) {
        matUnits.push(u);
      } else {
        patUnits.push(u);
      }
    });

    byGen[g] = [...patUnits, ...ctrUnits, ...matUnits];
  });

  return gens.map(g => {
    const row = byGen[g];
    let pUnits = row.filter(
      u => (!u.side || !u.side.startsWith('Maternal')) && !u.ids.some(id => CENTER_NODES.has(id))
    );
    const cUnits = row.filter(u => u.ids.some(id => CENTER_NODES.has(id)));
    let mUnits = row.filter(
      u => u.side && u.side.startsWith('Maternal') && !u.ids.some(id => CENTER_NODES.has(id))
    );

    if (!visibleSides.paternal) pUnits = [];
    if (!visibleSides.maternal) mUnits = [];

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
function assignPositions(rowLayouts) {
  let maxPW = 0, maxMW = 0, maxCW = 0;
  rowLayouts.forEach(rl => {
    const pw = rowTotalWidth(rl.pUnits);
    const cw = rowTotalWidth(rl.cUnits);
    const mw = rowTotalWidth(rl.mUnits);
    if (pw > maxPW) maxPW = pw;
    if (cw > maxCW) maxCW = cw;
    if (mw > maxMW) maxMW = mw;
  });

  const CENTER_X = PAD_X + Math.max(maxPW + UNIT_GAP, maxCW / 2);
  const canvasW  = CENTER_X + Math.max(maxMW + UNIT_GAP, maxCW / 2) + PAD_X;
  const canvasH  = rowLayouts.length * ROW_H + PAD_Y * 2;
  const unitPos  = new Map();

  rowLayouts.forEach((rl, rowIdx) => {
    const y = PAD_Y + rowIdx * ROW_H;

    // Center
    const cW = rowTotalWidth(rl.cUnits);
    let cx = CENTER_X - cW / 2;
    rl.cUnits.forEach(u => {
      const w = unitWidth(u);
      unitPos.set(u, { x: cx, y, w, h: unitHeight(u) });
      cx += w + UNIT_GAP;
    });

    // Paternal — grows leftward from centre
    const pW     = rowTotalWidth(rl.pUnits);
    const pBound = rl.cUnits.length > 0 ? CENTER_X - cW / 2 - UNIT_GAP : CENTER_X - UNIT_GAP;
    let px = pBound - pW;
    rl.pUnits.forEach(u => {
      const w = unitWidth(u);
      unitPos.set(u, { x: px, y, w, h: unitHeight(u) });
      px += w + UNIT_GAP;
    });

    // Maternal — grows rightward from centre
    const mBound = rl.cUnits.length > 0 ? CENTER_X + cW / 2 + UNIT_GAP : CENTER_X + UNIT_GAP;
    let mx = mBound;
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
 * @param {object}  TREE_DATA
 * @param {{ paternal: boolean, maternal: boolean }} visibleSides
 * @returns {{ units, unitByNode, unitPos, canvasW, canvasH, nodeMap }}
 */
export function buildLayout(TREE_DATA, visibleSides) {
  const branchOrder = {};
  (TREE_DATA.branches || []).forEach((br, idx) => { branchOrder[br.id] = idx; });

  const rawNodes = TREE_DATA.treeData;
  const nodeMap  = {};
  rawNodes.forEach(n => { nodeMap[n.id] = n; });

  const genMap              = buildGenMap(rawNodes, nodeMap);
  const { units, unitByNode } = buildUnits(rawNodes, nodeMap, genMap);
  const byGen               = groupByGen(units);
  const rowLayouts          = sortRows(byGen, branchOrder, visibleSides);
  const { unitPos, canvasW, canvasH } = assignPositions(rowLayouts);

  return { units, unitByNode, unitPos, canvasW, canvasH, nodeMap };
}

/**
 * Return the bottom-centre point of a couple unit (connector source).
 */
export function unitConnectorBottom(u, unitPos) {
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
export function nodeConnectorTop(id, unitByNode, unitPos) {
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
