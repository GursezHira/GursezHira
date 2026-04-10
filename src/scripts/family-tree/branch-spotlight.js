/* ─── BRANCH SPOTLIGHT ───────────────────────────────────
   Dims all branches except the selected one when a legend
   item is clicked. Clicking again clears the spotlight.
─────────────────────────────────────────────────────── */

import {
  activeSpotlight,
  setActiveSpotlight,
} from './tree-state.js';

/**
 * Toggle a spotlight on a single branch.
 * Attach this to each legend item's onclick.
 *
 * @param {string}      branchId — branch ID (e.g. 'Paternal', 'Maternal')
 * @param {HTMLElement} element  — the clicked legend item element
 */
export function toggleBranchSpotlight(branchId, element) {
  if (activeSpotlight === branchId) {
    // Clear spotlight — restore everything
    setActiveSpotlight(null);
    document.querySelectorAll('.ft-node, .ft-couple-box').forEach(el => {
      el.style.opacity = '1';
      el.style.filter  = 'none';
    });
    document.querySelectorAll('.ft-legend-item').forEach(el => {
      el.style.opacity = '1';
    });
  } else {
    // Apply spotlight — fade unrelated nodes
    setActiveSpotlight(branchId);

    document.querySelectorAll('.ft-node, .ft-couple-box').forEach(el => {
      const isMatch =
        el.classList.contains(`ft-node--${branchId}`)       ||
        el.classList.contains(`ft-couple-box--${branchId}`) ||
        el.classList.contains('ft-node--gursez')             ||
        el.classList.contains('ft-couple-box--star');

      if (isMatch) {
        el.style.opacity = '1';
        el.style.filter  = 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))';
      } else {
        el.style.opacity = '0.2';
        el.style.filter  = 'grayscale(80%)';
      }
    });

    document.querySelectorAll('.ft-legend-item').forEach(el => {
      el.style.opacity = '0.35';
    });

    // Keep the clicked legend item fully visible
    if (element) element.style.opacity = '1';
  }
}
