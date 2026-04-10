/* ─── TREE NODE RENDERER ─────────────────────────────────
   Creates and positions the HTML card divs inside
   <div id="treeNodes">.
─────────────────────────────────────────────────────── */

import {
  LAYOUT,
  CORE_NODES,
  expandedNodeIds,
  activeHoverNodeId,
  isTouchDevice,
} from './tree-state.js';
import { showHoverCard, hideHoverCard, updateHoverPosition } from './hover-card.js';

const { CARD_W, GHOST_W } = LAYOUT;

/**
 * Build the inner HTML for a fully-expanded (non-ghost) card.
 */
function buildCardHTML(n, isMember, isParentCouple) {
  const avatarClass = isMember ? 'ft-avatar--hero' : isParentCouple ? 'ft-avatar--xl' : '';
  return `
    <div class="ft-avatar ${avatarClass}">${n.data.emoji}</div>
    <div class="ft-name ${isMember ? 'ft-name--hero' : ''}">${n.data.name}</div>
    <div class="ft-relation ${isMember ? 'ft-relation--hero' : ''}">${n.data.relation}</div>
    ${n.data.born ? `<div class="ft-born">Born · ${n.data.born}</div>` : ''}
    ${isMember ? '<div class="ft-star-ring" aria-hidden="true"></div>' : ''}
  `;
}

/**
 * Wire up click / hover handlers on an expanded card node.
 */
function attachExpandedHandlers(card, n, id) {
  if (!isTouchDevice) {
    card.onmouseenter = (e) => showHoverCard(n, e);
    card.onmousemove  = (e) => updateHoverPosition(e);
    card.onmouseleave = () => hideHoverCard();
  }

  card.onclick = (e) => {
    e.stopPropagation();
    if (isTouchDevice) {
      if (activeHoverNodeId !== id) {
        showHoverCard(n, e);
        return; // First tap shows the hover card
      } else {
        hideHoverCard();
        // Second tap falls through to collapse logic
      }
    }

    if (!CORE_NODES.has(id)) {
      expandedNodeIds.delete(id);
      // renderTree() is called by the parent module (tree-renderer.js)
      card.dispatchEvent(new CustomEvent('ft:collapse', { bubbles: true }));
    }
  };
}

/**
 * Wire up the click handler on a ghost (collapsed) node.
 * Expanding adds the node, its spouse, parents, and children.
 */
function attachGhostHandlers(card, n, id) {
  card.onclick = () => {
    expandedNodeIds.add(id);
    (n.rels.spouses  || []).forEach(sid => expandedNodeIds.add(sid));
    (n.rels.parents  || []).forEach(pid => expandedNodeIds.add(pid));
    (n.rels.children || []).forEach(cid => expandedNodeIds.add(cid));
    card.dispatchEvent(new CustomEvent('ft:expand', { bubbles: true }));
  };
}

/**
 * Render all couple-unit boxes into <div id="treeNodes">.
 *
 * @param {{ units, unitPos, nodeMap }} layout
 */
export function renderNodes(layout) {
  const { units, unitPos, nodeMap } = layout;
  const container = document.getElementById('treeNodes');
  if (!container) return;
  container.innerHTML = '';

  units.forEach(u => {
    const pos = unitPos.get(u);
    if (!pos) return;

    const hasExpanded    = u.ids.some(id => expandedNodeIds.has(id));
    const isStar         = u.ids.includes('aaaEJwni');
    const isCouple       = u.ids.length === 2;
    const isParentCouple = u.ids.includes('aaaEJwnj') || u.ids.includes('aaaEJwnk');

    /* ── Couple wrapper box ─────────────────────────── */
    const box = document.createElement('div');
    box.className = [
      'ft-couple-box',
      !hasExpanded
        ? 'ft-couple-box--ghost'
        : isCouple
          ? 'ft-couple-box--pair'
          : 'ft-couple-box--solo',
      isStar         ? 'ft-couple-box--star'    : '',
      u.side && u.side !== 'Gursez' ? `ft-couple-box--${u.side}` : '',
      isParentCouple ? 'ft-couple-box--parents' : '',
    ].filter(Boolean).join(' ');

    box.style.left = pos.x + 'px';
    box.style.top  = pos.y + 'px';

    /* ── Individual member cards ────────────────────── */
    u.ids.forEach((id, idx) => {
      const n     = nodeMap[id];
      const isExp = expandedNodeIds.has(id);
      const isMember = id === 'aaaEJwni';

      const card = document.createElement('div');
      card.className = [
        'ft-node',
        !isExp                                                   ? 'ft-node--ghost'          : '',
        isExp && isMember                                        ? 'ft-node--gursez ft-node--star' : '',
        isExp && n.data.side && n.data.side !== 'Gursez'        ? `ft-node--${n.data.side}` : '',
        isExp && isParentCouple                                  ? 'ft-node--parent'         : '',
      ].filter(Boolean).join(' ');

      card.style.width = (isExp ? CARD_W : GHOST_W) + 'px';
      card.style.flex  = `0 0 ${isExp ? CARD_W : GHOST_W}px`;
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', n.data.name);

      if (isExp) {
        card.innerHTML = buildCardHTML(n, isMember, isParentCouple);
        attachExpandedHandlers(card, n, id);
      } else {
        const initials = n.data.name.split(' ').map(s => s[0]).join('').toUpperCase().substring(0, 2);
        card.innerHTML = `<span>${initials}</span>`;
        attachGhostHandlers(card, n, id);
      }

      box.appendChild(card);

      /* ── Heart connector between couple members ──── */
      if (isCouple && idx === 0) {
        const heart = document.createElement('div');
        heart.className = 'ft-connector-heart' + (isParentCouple ? ' ft-connector-heart--parents' : '');
        heart.setAttribute('aria-hidden', 'true');
        heart.textContent = isParentCouple ? '💑' : '🤝';
        box.appendChild(heart);
      }
    });

    container.appendChild(box);
  });
}
