// Scroll-spy for the feed TOC + grid/list toggle. Re-binds on every
// view-transition navigation via astro:page-load.
function initFeed() {
  const feed = document.querySelector<HTMLElement>('.feed');
  if (!feed) return;
  const sidenav = feed.querySelector<HTMLElement>('.sidenav');
  if (!sidenav) return;
  const OFFSET = 150;

  const visiblePanel = () =>
    feed.querySelector<HTMLElement>('.feed__view:not([hidden])');

  function setActive(slug: string | null, chapterId: string | null) {
    sidenav!.querySelectorAll('.chapter').forEach((ch) => {
      ch.classList.toggle('is-active', ch.getAttribute('data-chapter') === chapterId);
    });
    sidenav!.querySelectorAll('.toc-link').forEach((l) => {
      const current = l.getAttribute('data-slug') === slug;
      l.classList.toggle('is-current', current);
      if (current) l.setAttribute('aria-current', 'true');
      else l.removeAttribute('aria-current');
    });
  }

  // Freeze the spy while a TOC click smooth-scrolls, so it doesn't walk the
  // intermediate sections on the way there.
  let spyLocked = false;
  let unlockTimer: ReturnType<typeof setTimeout>;
  function scheduleUnlock() {
    clearTimeout(unlockTimer);
    unlockTimer = setTimeout(() => {
      spyLocked = false;
      onScroll();
    }, 150);
  }

  function onScroll() {
    if (spyLocked) return;
    const panel = visiblePanel();
    if (!panel) return;

    const sections = panel.querySelectorAll('.section[data-chapter]');
    let activeSection = sections[0] || null;
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top - OFFSET <= 0) activeSection = s;
    });
    if (!activeSection) return;

    const cards = activeSection.querySelectorAll('[data-slug]');
    let currentCard = cards[0] || null;
    cards.forEach((c) => {
      if (c.getBoundingClientRect().top - OFFSET <= 0) currentCard = c;
    });

    setActive(
      currentCard ? currentCard.getAttribute('data-slug') : null,
      activeSection.getAttribute('data-chapter')
    );
  }

  let ticking = false;
  const requestTick = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
  };
  const onWindowScroll = () => {
    if (spyLocked) scheduleUnlock();
    requestTick();
  };
  onScroll();
  window.addEventListener('scroll', onWindowScroll, { passive: true });
  window.addEventListener('resize', requestTick, { passive: true });

  // Landing from a detail page's back button (#slug): jump straight to that
  // article in the active panel, no smooth-scroll animation.
  const hashSlug = decodeURIComponent(location.hash.slice(1));
  if (hashSlug) {
    const panel = visiblePanel();
    const target = panel?.querySelector('[data-slug="' + hashSlug + '"]');
    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      setActive(hashSlug, target.closest('.section[data-chapter]')?.getAttribute('data-chapter') ?? null);
    }
  }

  const brand = document.querySelector('.nav__brand');
  if (brand) {
    brand.addEventListener('click', (event) => {
      event.preventDefault();
      // Same as a TOC click: freeze the spy so the sidebar lands on the first
      // chapter without walking every section on the way up.
      const panel = visiblePanel();
      const firstSection = panel?.querySelector('.section[data-chapter]');
      const firstCard = firstSection?.querySelector('[data-slug]');
      setActive(
        firstCard?.getAttribute('data-slug') ?? null,
        firstSection?.getAttribute('data-chapter') ?? null
      );
      spyLocked = true;
      scheduleUnlock();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  sidenav.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement | null)?.closest(
      '[data-slug], [data-chapter-link]'
    );
    if (!link) return;
    event.preventDefault();
    const panel = visiblePanel();
    if (!panel) return;
    const clickedSlug = link.getAttribute('data-slug');
    const chapterId =
      link.getAttribute('data-chapter-link') || link.getAttribute('data-chapter');

    const target = clickedSlug
      ? panel.querySelector('[data-slug="' + clickedSlug + '"]')
      : panel.querySelector('.section[data-chapter="' + chapterId + '"]');
    if (!target) return;

    const firstCard = panel.querySelector(
      '.section[data-chapter="' + chapterId + '"] [data-slug]'
    );
    const dotSlug =
      clickedSlug || (firstCard ? firstCard.getAttribute('data-slug') : null);

    setActive(dotSlug, chapterId);
    spyLocked = true;
    scheduleUnlock();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const buttons = feed.querySelectorAll<HTMLButtonElement>('[data-view-btn]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view-btn');
      if (!view) return;
      feed.setAttribute('data-view', view);
      feed.querySelectorAll<HTMLElement>('.feed__view').forEach((panel) => {
        panel.hidden = panel.getAttribute('data-view-panel') !== view;
      });
      // The active view is styled off aria-pressed (blue-gray-200 background)
      // rather than disabled, so it stays reachable via keyboard/AT.
      buttons.forEach((b) => {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      onScroll();
    });
  });

  // window survives body swaps, so drop its listeners before the next nav.
  document.addEventListener(
    'astro:before-swap',
    () => {
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('resize', requestTick);
    },
    { once: true }
  );
}

document.addEventListener('astro:page-load', initFeed);
