// Small-screen chrome (≤ --bp-lg): relocate the TOC sidebar into a bottom-sheet
// overlay opened from a "Contents" button, and move the grid/list toggle into
// the mobile bar. SideNav + ViewToggle are moved (not cloned) so their wiring
// from feed-spy keeps working.
function initFeedOverlay() {
  const feed = document.querySelector<HTMLElement>('.feed');
  if (!feed) return;
  const overlay = feed.querySelector<HTMLElement>('[data-toc-overlay]');
  const overlayBody = feed.querySelector<HTMLElement>('[data-toc-body]');
  const overlayPanel = feed.querySelector<HTMLElement>('[data-toc-panel]');
  const mobileBar = feed.querySelector<HTMLElement>('[data-mobile-bar]');
  const openBtn = feed.querySelector<HTMLElement>('[data-toc-open]');
  if (!overlay || !overlayBody || !mobileBar || !openBtn) return;

  const sidenav = feed.querySelector<HTMLElement>('.sidenav');
  const sidebarSticky = feed.querySelector<HTMLElement>('.feed__sidebar-sticky');
  const toggle = feed.querySelector<HTMLElement>('.viewtoggle');
  const desktopToolbar = feed.querySelector<HTMLElement>('.feed__toolbar');

  const bp =
    getComputedStyle(document.documentElement).getPropertyValue('--bp-lg').trim() ||
    '1024px';
  const mq = window.matchMedia(`(max-width: ${bp})`);

  let closeTimer: ReturnType<typeof setTimeout>;
  function openOverlay() {
    clearTimeout(closeTimer);
    overlay!.hidden = false;
    requestAnimationFrame(() => overlay!.classList.add('is-open'));
    document.documentElement.classList.add('is-toc-locked');
    openBtn!.setAttribute('aria-expanded', 'true');
    // Move focus in so keyboard Tab lands inside the dialog, not the page.
    overlayPanel?.focus();
  }
  function closeOverlay() {
    if (overlay!.hidden) return;
    overlay!.classList.remove('is-open');
    document.documentElement.classList.remove('is-toc-locked');
    openBtn!.setAttribute('aria-expanded', 'false');
    if (overlay!.contains(document.activeElement)) openBtn!.focus();
    closeTimer = setTimeout(() => {
      overlay!.hidden = true;
    }, 360);
  }

  openBtn.addEventListener('click', openOverlay);
  overlay
    .querySelectorAll('[data-toc-close]')
    .forEach((el) => el.addEventListener('click', closeOverlay));

  // Capture phase, so the page scroll is unlocked before feed-spy's bubble
  // handler runs scrollIntoView.
  overlayBody.addEventListener(
    'click',
    (event) => {
      if ((event.target as HTMLElement | null)?.closest('[data-slug], [data-chapter-link]'))
        closeOverlay();
    },
    true
  );

  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeOverlay();
  };
  document.addEventListener('keydown', onKey);

  let compact: boolean | null = null;
  function apply() {
    if (mq.matches === compact) return;
    compact = mq.matches;
    if (compact) {
      if (sidenav) overlayBody!.appendChild(sidenav);
      if (toggle) mobileBar!.appendChild(toggle);
    } else {
      if (sidenav && sidebarSticky) sidebarSticky.appendChild(sidenav);
      if (toggle && desktopToolbar) desktopToolbar.appendChild(toggle);
      closeOverlay();
    }
  }
  apply();
  mq.addEventListener('change', apply);

  document.addEventListener(
    'astro:before-swap',
    () => {
      mq.removeEventListener('change', apply);
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('is-toc-locked');
    },
    { once: true }
  );
}

document.addEventListener('astro:page-load', initFeedOverlay);
