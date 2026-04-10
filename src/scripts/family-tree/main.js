/* ─── FAMILY TREE — MAIN ORCHESTRATOR ───────────────────
   Imports every module and wires everything together on
   the `astro:page-load` event.
─────────────────────────────────────────────────────── */

// NOTE: TREE_DATA is injected by the Astro page via `define:vars`.
// It is available as a global variable inside `is:inline` scripts.
/* global TREE_DATA */

import { setIsTouchDevice, treeState, expandedNodeIds } from './tree-state.js';
import { buildLayout }                                   from './tree-layout.js';
import { renderConnectors }                              from './tree-connectors.js';
import { renderNodes }                                   from './tree-nodes.js';
import {
  applyTreeTransform,
  treeZoom,
  treeReset,
  toggleTreeSide,
  toggleAllMembers,
  toggleFullScreen,
  initFullscreenListener,
  initTreeDrag,
}                                                        from './tree-controls.js';
import { showHoverCard, hideHoverCard, updateHoverPosition } from './hover-card.js';
import { renderFamilyGrid, initSearch }                  from './family-grid.js';
import { toggleBranchSpotlight }                         from './branch-spotlight.js';

/* ── Core render function ────────────────────────────── */

/**
 * (Re-)render the tree: layout → connectors → nodes → canvas size.
 * Passed as a callback into any module that needs to trigger a re-render.
 *
 * @param {boolean} isInitial — if true, centres the viewport on Gursez
 */
function renderTree(isInitial = false) {
  const layout = buildLayout(TREE_DATA, treeState.visibleSides);
  const { unitPos, unitByNode, canvasW, canvasH } = layout;

  renderConnectors(layout, TREE_DATA);
  renderNodes(layout);

  // Size the canvas to fit all positioned elements
  const canvas = document.getElementById('treeCanvas');
  if (canvas) {
    canvas.style.width  = canvasW + 'px';
    canvas.style.height = canvasH + 'px';
  }

  // On first render, centre the viewport on Gursez's unit
  if (isInitial) {
    const gUnit = layout.unitByNode['aaaEJwni'];
    if (gUnit) {
      const gPos = unitPos.get(gUnit);
      const vp   = document.getElementById('treeViewport');
      treeState.scale = 0.82;
      treeState.x = vp.clientWidth  / 2 - (gPos.x + gPos.w / 2) * treeState.scale;
      treeState.y = vp.clientHeight / 2 - (gPos.y + gPos.h / 2) * treeState.scale;
      applyTreeTransform();
    }
  }

  // Re-listen for expand/collapse events emitted by node cards
  document.getElementById('treeNodes')?.addEventListener('ft:collapse', () => renderTree(), { once: true });
  document.getElementById('treeNodes')?.addEventListener('ft:expand',   () => renderTree(), { once: true });
}

/* ── Reveal-on-scroll observer ───────────────────────── */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

/* ── Boot ────────────────────────────────────────────── */

document.addEventListener('astro:page-load', () => {
  /* Touch detection */
  setIsTouchDevice(
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0)
  );

  /* Global click — close hover card when tapping outside */
  document.addEventListener('click', (e) => {
    const card = document.getElementById('ftHoverCard');
    if (card && card.style.display === 'block' && !card.contains(e.target)) {
      hideHoverCard();
    }
  });

  /* Fade-in observer */
  document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

  /* Family grid + search */
  initSearch(TREE_DATA);
  renderFamilyGrid(TREE_DATA.treeData, TREE_DATA);

  /* Tree */
  initTreeDrag();
  initFullscreenListener();
  renderTree(true);

  /* Mobile card tap handlers */
  const mobileMap = {
    'mobile-node-dad':    'aaaEJwnj',
    'mobile-node-mum':    'aaaEJwnk',
    'mobile-node-gursez': 'aaaEJwni',
  };
  Object.entries(mobileMap).forEach(([mId, tId]) => {
    const el   = document.getElementById(mId);
    const node = TREE_DATA.treeData.find(n => n.id === tId);
    if (el && node) {
      el.onclick = (e) => {
        e.stopPropagation();
        import('./tree-state.js').then(({ activeHoverNodeId }) => {
          if (activeHoverNodeId === node.id) {
            hideHoverCard();
          } else {
            showHoverCard(node, e, TREE_DATA.treeData);
          }
        });
      };
    }
  });

  /* Expose to window for inline HTML onclick attributes */
  window.treeZoom           = treeZoom;
  window.treeReset          = treeReset;
  window.toggleTreeSide     = (side) => toggleTreeSide(side, renderTree);
  window.toggleFullScreen   = toggleFullScreen;
  window.toggleAllMembers   = () => toggleAllMembers(TREE_DATA.treeData.map(n => n.id), renderTree);
  window.showHoverCard      = (node, e) => showHoverCard(node, e, TREE_DATA.treeData);
  window.updateHoverPosition = updateHoverPosition;
  window.hideHoverCard      = hideHoverCard;
  window.toggleBranchSpotlight = toggleBranchSpotlight;
});
