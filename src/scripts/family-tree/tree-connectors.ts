/* ─── TREE SVG CONNECTORS ────────────────────────────────
   Draws dashed bezier curves between parent and child units
   in the <svg id="treeSvg"> element.
─────────────────────────────────────────────────────── */

import { unitConnectorBottom, nodeConnectorTop } from './tree-layout';
import type { TreeLayout, Unit } from './tree-layout';
import type { FamilyTreeData, FamilyMember } from '../../types/family-tree';

/**
 * Build a stroke-colour lookup from TREE_DATA branch themes
 * plus the fixed Gursez gold.
 */
function buildStrokeMap(TREE_DATA: FamilyTreeData): Record<string, string> {
  const map: Record<string, string> = { Gursez: 'rgba(201,169,110,0.75)' };
  (TREE_DATA.branches || []).forEach(b => { map[b.id] = b.theme.stroke; });
  return map;
}

/**
 * Choose the right stroke colour for a couple unit.
 * Falls back to a deterministic hue for "growing branch" nodes
 * (nieces, nephews, maamas, maasis, etc.) that don't have
 * a registered branch ID.
 */
function getUnitStroke(u: Unit, nodeMap: Record<string, FamilyMember>, sideStrokeMap: Record<string, string>): string {
  if (u.side === 'Gursez') return sideStrokeMap.Gursez;
  if (u.side && sideStrokeMap[u.side]) return sideStrokeMap[u.side];

  const isGrowingBranch = u.ids.some(id => {
    const n = nodeMap[id];
    return n && (
      n.data.relation.includes('Veer') ||
      n.data.relation.includes('Didi') ||
      n.data.relation.includes('Maama') ||
      n.data.relation.includes('Maasi')
    );
  });

  if (isGrowingBranch) {
    const hash = u.ids[0].split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    const hue = Math.abs(hash % 360);
    return `hsla(${hue}, 60%, 65%, 0.8)`;
  }

  return sideStrokeMap['Paternal'] || 'rgba(100,100,100,0.5)';
}

/**
 * Draw a single dashed cubic bezier between two points.
 */
function drawBezier(svg: SVGElement, x1: number, y1: number, x2: number, y2: number, stroke: string) {
  const cy = (y1 + y2) / 2;
  const d  = `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  el.setAttribute('d', d);
  el.setAttribute('fill', 'none');
  el.setAttribute('stroke', stroke);
  el.setAttribute('stroke-width', '1.8');
  el.setAttribute('stroke-dasharray', '5 3');
  el.setAttribute('stroke-linecap', 'round');
  el.setAttribute('opacity', '0.78');
  svg.appendChild(el);
}

/**
 * Re-draw all connectors into <svg id="treeSvg">.
 *
 * @param {TreeLayout} layout
 * @param {FamilyTreeData} TREE_DATA
 */
export function renderConnectors(layout: TreeLayout, TREE_DATA: FamilyTreeData) {
  const { units, unitByNode, unitPos, canvasW, canvasH, nodeMap } = layout;
  const svg = document.getElementById('treeSvg') as unknown as SVGElement;
  if (!svg) return;

  svg.setAttribute('width',  canvasW.toString());
  svg.setAttribute('height', canvasH.toString());
  svg.innerHTML = '';

  const sideStrokeMap = buildStrokeMap(TREE_DATA);

  units.forEach(u => {
    const childIds: string[] = [];
    u.ids.forEach(id => {
      const node = nodeMap[id];
      if (node && node.rels) {
        (node.rels.children || []).forEach(cid => {
          if (!childIds.includes(cid)) childIds.push(cid);
        });
      }
    });
    if (!childIds.length) return;

    const pb     = unitConnectorBottom(u, unitPos);
    if (!pb) return;

    const stroke = getUnitStroke(u, nodeMap, sideStrokeMap);

    childIds.forEach(cid => {
      const ct = nodeConnectorTop(cid, unitByNode, unitPos);
      if (!ct) return;
      drawBezier(svg, pb.x, pb.y, ct.x, ct.y, stroke);
    });
  });
}
