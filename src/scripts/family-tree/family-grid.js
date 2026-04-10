/* ─── FAMILY GRID ────────────────────────────────────────
   Renders the "Everyone Who Loves Gursez" card grid
   and wires up the search/filter input.
─────────────────────────────────────────────────────── */

import {
  activeHoverNodeId,
  isTouchDevice,
} from './tree-state.js';
import { showHoverCard, hideHoverCard, updateHoverPosition } from './hover-card.js';

/* ── Renderer ────────────────────────────────────────── */

/**
 * Render (or re-render) the family grid with the given node list.
 *
 * @param {Array}  nodes     — subset of TREE_DATA.treeData to display
 * @param {object} TREE_DATA — full dataset (for branch order sorting)
 */
export function renderFamilyGrid(nodes, TREE_DATA) {
  const grid      = document.getElementById('familyGrid');
  const noResults = document.getElementById('ftNoResults');
  if (!grid) return;

  grid.innerHTML = '';

  if (noResults) {
    noResults.style.display = nodes.length === 0 ? 'block' : 'none';
  }

  // Sort: Gursez first, then by branch order
  const order = { Gursez: 0 };
  (TREE_DATA.branches || []).forEach((br, idx) => { order[br.id] = idx + 1; });

  const sorted = [...nodes].sort((a, b) =>
    (order[a.data.side] ?? 99) - (order[b.data.side] ?? 99)
  );

  sorted.forEach((n, i) => {
    const d    = n.data;
    const card = document.createElement('div');
    card.className = `family-member-card side-${d.side} fade-up visible`;
    card.style.transitionDelay = (i * 0.03) + 's';
    card.innerHTML = `
      <div class="fmc-emoji">${d.emoji}</div>
      <div class="fmc-name">${d.name}</div>
      <div class="fmc-relation">${d.relation}</div>
      <span class="fmc-side side-${d.side}">${d.side}</span>
    `;

    if (isTouchDevice) {
      card.onclick = (e) => {
        e.stopPropagation();
        if (activeHoverNodeId === n.id) {
          hideHoverCard();
        } else {
          showHoverCard(n, e, TREE_DATA.treeData);
        }
      };
    } else {
      card.onmouseenter = (e) => showHoverCard(n, e, TREE_DATA.treeData);
      card.onmousemove  = (e) => updateHoverPosition(e);
      card.onmouseleave = () => hideHoverCard();
    }

    grid.appendChild(card);
  });
}

/* ── Search ─────────────────────────────────────────── */

/**
 * Wire up the search input and clear button.
 * Filters the family grid on each keystroke.
 *
 * @param {object} TREE_DATA
 */
export function initSearch(TREE_DATA) {
  const input    = document.getElementById('ftSearchInput');
  const clearBtn = document.getElementById('ftSearchClear');
  if (!input || !clearBtn) return;

  const handleSearch = () => {
    const query = input.value.toLowerCase().trim();

    if (query.length > 0) {
      clearBtn.style.display = 'flex';
      const filtered = TREE_DATA.treeData.filter(n => {
        const d = n.data;
        return (
          (d.name     && d.name.toLowerCase().includes(query))     ||
          (d.relation && d.relation.toLowerCase().includes(query)) ||
          (d.side     && d.side.toLowerCase().includes(query))
        );
      });
      renderFamilyGrid(filtered, TREE_DATA);
    } else {
      clearBtn.style.display = 'none';
      renderFamilyGrid(TREE_DATA.treeData, TREE_DATA);
    }
  };

  input.addEventListener('input', handleSearch);
  clearBtn.addEventListener('click', () => {
    input.value = '';
    handleSearch();
    input.focus();
  });
}
