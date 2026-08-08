// The nav is swapped on every ClientRouter navigation; keep a module handle and
// re-point it on astro:page-load. window/document listeners are wired once.
let nav: HTMLElement | null = null;

// The bar's bottom edge should move 1:1 with scroll. Nav height isn't linear in
// --nav-progress (past a point only the padding shrinks), so we sample
// height(progress) once and invert it: for a scroll, find the progress whose
// height = hero − scroll.
const SAMPLES = 24;
let heightByProgress: number[] = [];

const measure = () => {
  if (!nav || nav.hasAttribute('data-compact')) return;
  const prev = nav.style.getPropertyValue('--nav-progress');
  heightByProgress = [];
  for (let i = 0; i <= SAMPLES; i++) {
    nav.style.setProperty('--nav-progress', String(i / SAMPLES));
    heightByProgress.push(nav.offsetHeight);
  }
  if (prev) nav.style.setProperty('--nav-progress', prev);
  else nav.style.removeProperty('--nav-progress');
};

const progressForScroll = (scroll: number) => {
  const hero = heightByProgress[0];
  const compact = heightByProgress[SAMPLES];
  const target = hero - Math.max(scroll, 0);
  if (target >= hero) return 0;
  if (target <= compact) return 1;
  for (let i = 0; i < SAMPLES; i++) {
    const hi = heightByProgress[i];
    const lo = heightByProgress[i + 1];
    if (target <= hi && target >= lo) {
      const span = hi - lo || 1;
      return (i + (hi - target) / span) / SAMPLES;
    }
  }
  return 1;
};

const applyProgress = () => {
  // Detail pages are pinned compact in CSS (--nav-progress:1); skip them.
  if (!nav || nav.hasAttribute('data-compact') || !heightByProgress.length)
    return;
  nav.style.setProperty(
    '--nav-progress',
    progressForScroll(window.scrollY).toFixed(4),
  );
};

const closeLang = () => {
  if (!nav) return;
  nav.classList.remove('is-lang-open');
  nav.querySelector('[data-lang-toggle]')?.setAttribute('aria-expanded', 'false');
};

window.addEventListener('scroll', applyProgress, { passive: true });
window.addEventListener('resize', () => {
  measure();
  applyProgress();
});

document.addEventListener('click', (event) => {
  const langWrap = nav?.querySelector('[data-lang]');
  if (langWrap && !langWrap.contains(event.target as Node | null)) closeLang();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLang();
});

document.addEventListener('astro:page-load', () => {
  nav = document.querySelector('[data-nav]');
  measure();
  applyProgress();

  const toggle = nav?.querySelector('[data-lang-toggle]');
  toggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = nav!.classList.toggle('is-lang-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
});
