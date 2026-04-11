/* ─── HOVER CARD ─────────────────────────────────────────
   Builds and positions the floating details card that
   appears when a user hovers or taps a family member.
─────────────────────────────────────────────────────── */

import {
  setActiveHoverNodeId,
} from './tree-state';
import type { FamilyMember } from '../../types/family-tree';

/* ── HTML builder ────────────────────────────────────── */

function buildHoverCardHTML(node: FamilyMember, allNodes: FamilyMember[]) {
  const d = node.data;

  const spouseNames = (node.rels.spouses || [])
    .map(sid => allNodes.find(n => n.id === sid)?.data.name)
    .filter(Boolean)
    .join(', ');

  const fatherNode  = (node.rels.parents || []).map(id => allNodes.find(n => n.id === id)).find(n => n?.data.gender === 'M');
  const motherNode  = (node.rels.parents || []).map(id => allNodes.find(n => n.id === id)).find(n => n?.data.gender === 'F');
  const fatherName  = fatherNode ? fatherNode.data.name : null;
  const motherName  = motherNode ? motherNode.data.name : null;
  const parentsStr  = (fatherName && motherName)
    ? `${fatherName} & ${motherName}`
    : fatherName || motherName || null;

  const childrenNames = (node.rels.children || [])
    .map(cid => allNodes.find(n => n.id === cid)?.data.name)
    .filter(Boolean)
    .join(', ');

  const familyName = d.familyName || (d.side === 'Paternal' ? 'Hira' : 'Ghuman');

  return `
    <div class="fhc-header">
      <div class="fhc-emoji" style="background:${d.color || 'var(--cream)'}">${d.emoji}</div>
      <div class="fhc-name-box">
        <span class="fhc-name">${d.name}</span>
        <span class="fhc-relation">${d.relation}</span>
        <span class="fhc-surname">${familyName}</span>
      </div>
    </div>
    <div class="fhc-body">
      ${spouseNames   ? `<div class="fhc-info-row"><span class="fhc-label">Married to</span><span class="fhc-value">${spouseNames}</span></div>`  : ''}
      ${parentsStr    ? `<div class="fhc-info-row"><span class="fhc-label">Parents</span><span class="fhc-value">${parentsStr}</span></div>`       : ''}
      ${childrenNames ? `<div class="fhc-info-row"><span class="fhc-label">Children</span><span class="fhc-value">${childrenNames}</span></div>`  : ''}
      ${d.note        ? `<div class="fhc-note">${d.note}</div>`                                                                                   : ''}
    </div>
  `;
}

/* ── Position helper ────────────────────────────────── */

/**
 * Move the card to follow the cursor / touch point,
 * flipping it if it would overflow the viewport.
 */
export function updateHoverPosition(e: MouseEvent | { clientX: number, clientY: number }) {
  const card = document.getElementById('ftHoverCard');
  if (!card || card.style.display === 'none') return;

  const xOffset    = 20;
  const yOffset    = 20;
  const isFullscreen = !!document.fullscreenElement;
  let x, y;

  if (isFullscreen) {
    const container = document.querySelector('.tree-outer') as HTMLElement;
    const rect = container.getBoundingClientRect();
    x = e.clientX - rect.left + xOffset;
    y = e.clientY - rect.top  + yOffset;

    const cardRect = card.getBoundingClientRect();
    if (x + cardRect.width  > rect.width)  x = e.clientX - rect.left - cardRect.width  - xOffset;
    if (y + cardRect.height > rect.height) y = e.clientY - rect.top  - cardRect.height - yOffset;
  } else {
    x = e.clientX + xOffset;
    y = e.clientY + yOffset;

    const cardRect = card.getBoundingClientRect();
    if (x + cardRect.width  > window.innerWidth)  x = window.innerWidth  - cardRect.width  - 20;
    if (x < 10) x = 10;
    if (y + cardRect.height > window.innerHeight) {
      y = e.clientY - cardRect.height - yOffset;
      if (y < 10) y = 10;
    }
  }

  card.style.left = x + 'px';
  card.style.top  = y + 'px';
}

/* ── Public API ─────────────────────────────────────── */

/**
 * Render and display the hover card for a given tree node.
 *
 * @param {FamilyMember} node      — single entry from TREE_DATA.treeData
 * @param {MouseEvent}  event     — the triggering mouse/touch event
 * @param {FamilyMember[]}  allNodes  — TREE_DATA.treeData (for resolving relatives)
 */
export function showHoverCard(node: FamilyMember, event: MouseEvent, allNodes: FamilyMember[] = []) {
  const card = document.getElementById('ftHoverCard');
  if (!card) return;

  const { TREE_DATA } = window as any;
  const nodes = allNodes.length ? allNodes : (TREE_DATA?.treeData || []);

  setActiveHoverNodeId(node.id);
  card.innerHTML = buildHoverCardHTML(node, nodes);
  card.style.display = 'block';
  updateHoverPosition(event);
}

/**
 * Hide and clear the hover card.
 */
export function hideHoverCard() {
  const card = document.getElementById('ftHoverCard');
  if (card) {
    card.style.display = 'none';
    setActiveHoverNodeId(null);
  }
}
