/* ─── TREE CONTROLS ──────────────────────────────────────
   Pan, zoom (mouse/touch/wheel), branch-side filters,
   expand-all toggle, and fullscreen handling.
─────────────────────────────────────────────────────── */

import { treeState, expandedNodeIds, CORE_NODES } from './tree-state';

/* ── Transform apply ────────────────────────────────── */

export function applyTreeTransform() {
  const canvas = document.getElementById('treeCanvas');
  if (canvas) {
    canvas.style.transform = `translate(${treeState.x}px,${treeState.y}px) scale(${treeState.scale})`;
  }
}

/* ── Zoom ────────────────────────────────────────────── */

export function treeZoom(delta: number) {
  treeState.scale = Math.max(0.3, Math.min(2.0, treeState.scale + delta));
  applyTreeTransform();
}

/* ── Reset (centre on Gursez's card) ────────────────── */

export function treeReset() {
  const gUnit = document.querySelector('.ft-node--gursez') as HTMLElement;
  const vp    = document.getElementById('treeViewport') as HTMLElement;
  treeState.scale = document.fullscreenElement ? 1.05 : 0.82;

  if (gUnit && vp) {
    const vpRect = vp.getBoundingClientRect();
    const box    = gUnit.closest('.ft-couple-box') as HTMLElement;
    if (box) {
      const bx = parseFloat(box.style.left) + box.offsetWidth / 2;
      const by = parseFloat(box.style.top)  + box.offsetHeight / 2;
      treeState.x = vpRect.width  / 2 - bx * treeState.scale;
      treeState.y = vpRect.height / 2 - by * treeState.scale;
    } else {
      treeState.x = 0; treeState.y = 0;
    }
  } else {
    treeState.x = 0; treeState.y = 0;
  }
  applyTreeTransform();
}

/* ── Branch-side filter ─────────────────────────────── */

/**
 * Toggle visibility of one side of the tree.
 * Re-renders and resets the viewport afterwards.
 * Requires a renderTree callback to avoid circular imports.
 *
 * @param {'paternal'|'maternal'} side
 * @param {Function} renderTreeFn
 */
export function toggleTreeSide(side: 'paternal' | 'maternal', renderTreeFn: () => void) {
  if (side === 'paternal') {
    treeState.visibleSides.paternal = !treeState.visibleSides.paternal;
    const btn = document.getElementById('filter-paternal');
    if (btn) {
      btn.classList.toggle('active', treeState.visibleSides.paternal);
      btn.setAttribute('aria-pressed', String(treeState.visibleSides.paternal));
    }
  } else if (side === 'maternal') {
    treeState.visibleSides.maternal = !treeState.visibleSides.maternal;
    const btn = document.getElementById('filter-maternal');
    if (btn) {
      btn.classList.toggle('active', treeState.visibleSides.maternal);
      btn.setAttribute('aria-pressed', String(treeState.visibleSides.maternal));
    }
  }
  renderTreeFn();
  treeReset();
}

/* ── Expand / collapse all members ─────────────────── */

/**
 * Toggle between "core members only" and "every member expanded".
 * @param {string[]} allIds       — all node IDs from TREE_DATA
 * @param {Function} renderTreeFn — renderTree callback
 */
export function toggleAllMembers(allIds: string[], renderTreeFn: () => void) {
  const isAllExpanded = allIds.every(id => expandedNodeIds.has(id));
  const btn = document.getElementById('toggleAllBtn');

  if (isAllExpanded) {
    expandedNodeIds.clear();
    CORE_NODES.forEach(id => expandedNodeIds.add(id));
    if (btn) btn.textContent = '👁';
  } else {
    allIds.forEach(id => expandedNodeIds.add(id));
    if (btn) btn.textContent = '👁️‍🗨️';
  }
  renderTreeFn();
}

/* ── Fullscreen ─────────────────────────────────────── */

export function toggleFullScreen() {
  const treeOuter = document.querySelector('.tree-outer');
  if (!treeOuter) return;
  
  if (!document.fullscreenElement) {
    treeOuter.requestFullscreen().catch(err => console.error(err));
  } else {
    document.exitFullscreen();
  }
}

/**
 * Listen for native fullscreen changes and update the UI/state.
 * Call once during page boot.
 */
export function initFullscreenListener() {
  document.addEventListener('fullscreenchange', () => {
    const treeOuter  = document.querySelector('.tree-outer') as HTMLElement;
    const hoverCard  = document.getElementById('ftHoverCard');
    const mainContent = document.querySelector('.container');

    if (!treeOuter) return;

    if (document.fullscreenElement) {
      treeOuter.classList.add('is-fullscreen');
      if (hoverCard) treeOuter.appendChild(hoverCard);
    } else {
      treeOuter.classList.remove('is-fullscreen');
      if (hoverCard && mainContent) mainContent.appendChild(hoverCard);
    }
    treeReset();
  });
}

/* ── Pan & drag ─────────────────────────────────────── */

/**
 * Attach mouse and touch drag listeners to the tree viewport.
 * Also wires up wheel-to-zoom.
 * Call once during page boot.
 */
export function initTreeDrag() {
  const vp = document.getElementById('treeViewport');
  if (!vp) return;

  // Mouse drag
  vp.addEventListener('mousedown', (e: MouseEvent) => {
    treeState.dragging = true;
    treeState.startX   = e.clientX - treeState.x;
    treeState.startY   = e.clientY - treeState.y;
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e: MouseEvent) => {
    if (!treeState.dragging) return;
    treeState.x = e.clientX - treeState.startX;
    treeState.y = e.clientY - treeState.startY;
    applyTreeTransform();
  });
  window.addEventListener('mouseup', () => { treeState.dragging = false; });

  // Touch drag
  vp.addEventListener('touchstart', (e: TouchEvent) => {
    if (e.touches.length === 1) {
      treeState.dragging = true;
      treeState.startX   = e.touches[0].clientX - treeState.x;
      treeState.startY   = e.touches[0].clientY - treeState.y;
    }
  }, { passive: true });

  vp.addEventListener('touchmove', (e: TouchEvent) => {
    if (!treeState.dragging || e.touches.length !== 1) return;
    treeState.x = e.touches[0].clientX - treeState.startX;
    treeState.y = e.touches[0].clientY - treeState.startY;
    applyTreeTransform();
  }, { passive: true });

  vp.addEventListener('touchend', () => { treeState.dragging = false; });

  // Wheel zoom
  vp.addEventListener('wheel', (e: WheelEvent) => {
    e.preventDefault();
    treeZoom(e.deltaY < 0 ? 0.08 : -0.08);
  }, { passive: false });
}
