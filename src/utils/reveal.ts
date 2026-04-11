/**
 * reveal.ts
 *
 * Intersection Observer utility for "fade-up" animations.
 */

export function initRevealObserver(selector: string = '.fade-up', threshold: number = 0.1) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold });

  document.querySelectorAll(selector).forEach(e => revealObserver.observe(e));
  
  return revealObserver;
}
