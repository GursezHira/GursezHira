/**
 * milestones.ts
 *
 * Client-side orchestrator for the Milestones page.
 */

import { formatMilestoneDate, getMilestoneAge } from '../utils/date';
import { initRevealObserver } from '../utils/reveal';
import type { Milestone, MilestoneCategory, SortOrder } from '../types/milestone';
import { slugify } from '../utils/slugify';

declare global {
  interface Window {
    ALL_MILESTONES: Milestone[];
    milestoneModal_open: (html: string) => void;
    openModal: (mId: string) => void;
  }
}

export function initMilestonesPage() {
  const ALL_MILESTONES = window.ALL_MILESTONES || [];
  let milestoneCategory: MilestoneCategory | 'all' = 'all';
  let milestoneSort: SortOrder = 'newest';
  let milestoneSearch = '';
  let loadedCount = 0;
  const BATCH = 5;
  let isLoading = false;
  let filteredMilestones: Milestone[] = [];
  let curObserver: IntersectionObserver | null = null;
  const revealObserver = initRevealObserver();

  const timelineItems = document.getElementById('timelineItems') as HTMLElement;
  const milestoneSearchInput = document.getElementById('milestoneSearch') as HTMLInputElement;
  const sortSelect = document.getElementById('sortSelect') as HTMLSelectElement;
  const noMore = document.getElementById('noMore') as HTMLElement;
  const loadMoreTrigger = document.getElementById('loadMoreTrigger') as HTMLElement;

  function getCategoryClass(cat: string) {
    const map: Record<string, string> = { 
      Firsts: 'cat-firsts', 
      Monthly: 'cat-monthly', 
      Growth: 'cat-growth', 
      Funny: 'cat-funny', 
      Health: 'cat-health', 
      Celebration: 'cat-celebration' 
    };
    return map[cat] || 'cat-firsts';
  }

  function getFilteredMilestones() {
    let list = ALL_MILESTONES.filter(m => {
      const matchCat = milestoneCategory === 'all' || m.category === milestoneCategory;
      const q = milestoneSearch.toLowerCase();
      const matchSearch = !q || m.title.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    if (milestoneSort === 'oldest') {
      list = list.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
    } else {
      list = list.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
    }
    return list;
  }

  function filterMilestones() {
    milestoneSort = sortSelect.value as SortOrder;
    milestoneSearch = milestoneSearchInput.value;
    loadedCount = 0;
    timelineItems.innerHTML = '';
    noMore.style.display = 'none';
    filteredMilestones = getFilteredMilestones();
    loadNextBatch();
  }

  function renderSkeletons(count: number) {
    for (let i = 0; i < count; i++) {
      const item = document.createElement('div');
      item.className = 'timeline-item visible sk-item';
      item.innerHTML = `
        <div class="tl-empty"></div>
        <div class="tl-center"><div class="tl-node" style="border-color:#e8d8d0">⋯</div></div>
        <div class="skeleton-card">
          <div class="skeleton-line sk-1"></div>
          <div class="skeleton-line sk-2"></div>
          <div class="skeleton-line sk-3"></div>
          <div class="skeleton-line sk-4"></div>
          <div class="skeleton-line sk-5"></div>
        </div>
      `;
      timelineItems.appendChild(item);
    }
  }

  function removeSkeletons() {
    document.querySelectorAll('.sk-item').forEach(s => s.remove());
  }

  function renderEmojiHtml(emoji: string, animatedEmojiUrl?: string | null) {
    if (animatedEmojiUrl) {
      return `<img src="${animatedEmojiUrl}" alt="${emoji}" class="animated-emoji" style="width:100%;height:100%;object-fit:contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';" /><span class="static-emoji" style="display:none;">${emoji}</span>`;
    }
    return `<span class="static-emoji">${emoji}</span>`;
  }

  function buildMilestoneHTML(m: Milestone) {
    return `
      <div class="modal-img" style="background:${m.color}">${renderEmojiHtml(m.emoji, m.animatedEmojiUrl)}</div>
      <a href="/milestones/${slugify(m.title)}" class="modal-link" aria-label="View single page" style="
          position: absolute;
          top: 20px;
          right: 63px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          box-shadow: var(--shadow-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          cursor: pointer;
          color: var(--text-mid);
          transition: all 0.2s;
          text-decoration: none;
          z-index: 10;
      ">🔗</a>
      <div class="modal-body">
        <span class="mpc-category ${getCategoryClass(m.category)} modal-category">${m.category}</span>
        <h2 class="modal-title">${m.title}</h2>
        <div class="modal-age-date">
          <span>👶 ${getMilestoneAge(m.date)}</span>
          <span>📅 ${formatMilestoneDate(m.date)}</span>
        </div>
        <div class="modal-desc">${m.desc}</div>
        <div class="modal-full-story">${m.story}</div>
      </div>
    `;
  }

  window.openModal = function(mId: string) {
    const m = ALL_MILESTONES.find(x => x.id === mId || x.id === mId.toString());
    if (!m) return;
    if (typeof window.milestoneModal_open === 'function') {
      window.milestoneModal_open(buildMilestoneHTML(m));
    }
    if (m.category === "Celebration") {
      import('https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/+esm').then((confettiModule) => {
        const confetti = confettiModule.default || confettiModule;
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      });
    }
  };

  function loadNextBatch() {
    if (isLoading) return;
    isLoading = true;
    const batch = Math.min(BATCH, filteredMilestones.length - loadedCount);
    if (batch <= 0) {
      noMore.style.display = filteredMilestones.length ? 'block' : 'none';
      isLoading = false; 
      return;
    }
    renderSkeletons(Math.min(batch, 3));

    setTimeout(() => {
      removeSkeletons();
      const slice = filteredMilestones.slice(loadedCount, loadedCount + batch);
      slice.forEach((m, i) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.style.transitionDelay = (i * 0.08) + 's';
        item.innerHTML = `
          <div class="tl-empty"></div>
          <div class="tl-center"><div class="tl-node" style="display:flex;align-items:center;justify-content:center;">${renderEmojiHtml(m.emoji, m.animatedEmojiUrl)}</div></div>
          <div class="tl-card" onclick="openModal('${m.id}')">
            <div class="tl-card-header">
              <div class="tl-card-title">${m.title}</div>
              <span class="mpc-category ${getCategoryClass(m.category)}">${m.category}</span>
            </div>
            <div class="tl-card-img" style="background:${m.color};display:flex;align-items:center;justify-content:center;">${renderEmojiHtml(m.emoji, m.animatedEmojiUrl)}</div>
            <div class="tl-card-desc">${m.desc}</div>
            <div class="tl-card-footer">
              <span class="tl-age">${getMilestoneAge(m.date)}</span>
              <span class="tl-date">${formatMilestoneDate(m.date)}</span>
            </div>
          </div>
        `;
        timelineItems.appendChild(item);
        setTimeout(() => revealObserver.observe(item), 50);
        setTimeout(() => item.classList.add('visible'), 100 + i * 80);
      });
      loadedCount += batch;
      isLoading = false;
      if (loadedCount >= filteredMilestones.length) {
        noMore.style.display = 'block';
      }
    }, 500);
  }

  function setupInfiniteScroll() {
    if (curObserver) curObserver.disconnect();
    curObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !isLoading) {
          loadNextBatch();
        }
      });
    }, { rootMargin: '200px' });
    curObserver.observe(loadMoreTrigger);
  }

  // Bind Events
  milestoneSearchInput?.addEventListener('input', filterMilestones);
  sortSelect?.addEventListener('change', filterMilestones);
  document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target as HTMLButtonElement;
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      target.classList.add('active');
      milestoneCategory = target.dataset.cat as MilestoneCategory | 'all';
      loadedCount = 0;
      timelineItems.innerHTML = '';
      noMore.style.display = 'none';
      filteredMilestones = getFilteredMilestones();
      loadNextBatch();
    });
  });

  // Initial load
  filterMilestones();
  setupInfiniteScroll();
}

// Re-init on page load
document.addEventListener('astro:page-load', () => {
  if (document.getElementById('page-milestones')) {
    initMilestonesPage();
  }
});
