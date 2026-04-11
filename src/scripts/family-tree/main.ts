/* ─── FAMILY TREE — MAIN ORCHESTRATOR ───────────────────
   Imports every module and wires everything together on
   the `astro:page-load` event.
─────────────────────────────────────────────────────── */

import { setIsTouchDevice, treeState, activeHoverNodeId } from './tree-state';
import { buildLayout }                                   from './tree-layout';
import { renderConnectors }                              from './tree-connectors';
import { renderNodes }                                   from './tree-nodes';
import {
  applyTreeTransform,
  treeZoom,
  treeReset,
  toggleTreeSide,
  toggleAllMembers,
  toggleFullScreen,
  initFullscreenListener,
  initTreeDrag,
}                                                        from './tree-controls';
import { showHoverCard, hideHoverCard, updateHoverPosition } from './hover-card';
import { renderFamilyGrid, initSearch }                  from './family-grid';
import { toggleBranchSpotlight }                         from './branch-spotlight';
import { initRevealObserver }                            from '../../utils/reveal';
import type { FamilyTreeData, FamilyMember }             from '../../types/family-tree';

declare global {
  interface Window {
    TREE_DATA: FamilyTreeData;
    treeZoom: (val: number) => void;
    treeReset: () => void;
    toggleTreeSide: (side: 'paternal' | 'maternal') => void;
    toggleFullScreen: () => void;
    toggleAllMembers: () => void;
    showHoverCard: (node: FamilyMember, e: MouseEvent) => void;
    updateHoverPosition: (e: MouseEvent) => void;
    hideHoverCard: () => void;
    toggleBranchSpotlight: (id: string, el: HTMLElement) => void;
  }
}

/* ── Core render function ────────────────────────────── */

/**
 * (Re-)render the tree: layout → connectors → nodes → canvas size.
 * Passed as a callback into any module that needs to trigger a re-render.
 *
 * @param {boolean} isInitial — if true, centres the viewport on Gursez
 */
function renderTree(isInitial = false) {
  const { TREE_DATA } = window;
  if (!TREE_DATA) return;

  const layout = buildLayout(TREE_DATA, treeState.visibleSides);
  const { unitPos, canvasW, canvasH } = layout;

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
      if (vp && gPos) {
        treeState.scale = 0.82;
        treeState.x = vp.clientWidth  / 2 - (gPos.x + gPos.w / 2) * treeState.scale;
        treeState.y = vp.clientHeight / 2 - (gPos.y + gPos.h / 2) * treeState.scale;
        applyTreeTransform();
      }
    }
  }

  // Re-listen for expand/collapse events emitted by node cards
  const treeNodes = document.getElementById('treeNodes');
  treeNodes?.addEventListener('ft:collapse', () => renderTree(), { once: true });
  treeNodes?.addEventListener('ft:expand',   () => renderTree(), { once: true });
}

/* ── Boot ────────────────────────────────────────────── */

document.addEventListener('astro:page-load', () => {
  if (!document.getElementById('page-family-tree')) return;

  const { TREE_DATA } = window;

  /* Touch detection */
  setIsTouchDevice(
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0)
  );

  /* Global click — close hover card when tapping outside */
  document.addEventListener('click', (e) => {
    const card = document.getElementById('ftHoverCard');
    if (card && card.style.display === 'block' && !card.contains(e.target as Node)) {
      hideHoverCard();
    }
  });

  /* Fade-in observer */
  initRevealObserver();

  /* Family grid + search */
  if (TREE_DATA) {
    initSearch(TREE_DATA);
    renderFamilyGrid(TREE_DATA.treeData, TREE_DATA);

    /* Tree */
    initTreeDrag();
    initFullscreenListener();
    renderTree(true);

    /* Mobile card tap handlers */
    const mobileMap: Record<string, string> = {
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
          if (activeHoverNodeId === node.id) {
            hideHoverCard();
          } else {
            showHoverCard(node, e as unknown as MouseEvent, TREE_DATA.treeData);
          }
        };
      }
    });

    /* Expose to window for inline HTML onclick attributes (Cleanup candidate) */
    window.treeZoom           = treeZoom;
    window.treeReset          = treeReset;
    window.toggleTreeSide     = (side) => toggleTreeSide(side, renderTree);
    window.toggleFullScreen   = toggleFullScreen;
    window.toggleAllMembers   = () => toggleAllMembers(TREE_DATA.treeData.map(n => n.id), renderTree);
    window.showHoverCard      = (node, e) => showHoverCard(node, e, TREE_DATA.treeData);
    window.updateHoverPosition = updateHoverPosition;
    window.hideHoverCard      = hideHoverCard;
    window.toggleBranchSpotlight = toggleBranchSpotlight;
  }
});
