// Larger phones (≤ --bp-sm): the inline nav links collapse into a menu button
// that opens a bottom-sheet overlay (About + Download + languages). Mirrors the
// feed's TOC overlay behaviour (open/close, background inert, Esc, scroll lock),
// but is self-contained in Nav so it works on every page.
function initNavMenu() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;
  const overlay = nav.querySelector<HTMLElement>('[data-navmenu-overlay]');
  const panel = nav.querySelector<HTMLElement>('[data-navmenu-panel]');
  const openBtn = nav.querySelector<HTMLElement>('[data-navmenu-open]');
  if (!overlay || !openBtn) return;

  const bp =
    getComputedStyle(document.documentElement).getPropertyValue('--bp-sm').trim() ||
    '640px';
  const mq = window.matchMedia(`(max-width: ${bp})`);

  const inertedEls: HTMLElement[] = [];
  function setBackgroundInert(on: boolean) {
    if (!on) {
      inertedEls.forEach((el) => el.removeAttribute('inert'));
      inertedEls.length = 0;
      return;
    }
    let node: HTMLElement = overlay!;
    while (node.parentElement && node !== document.body) {
      for (const sibling of Array.from(node.parentElement.children)) {
        if (sibling !== node && sibling instanceof HTMLElement) {
          sibling.setAttribute('inert', '');
          inertedEls.push(sibling);
        }
      }
      node = node.parentElement;
    }
  }

  let closeTimer: ReturnType<typeof setTimeout>;
  function openOverlay() {
    clearTimeout(closeTimer);
    overlay!.hidden = false;
    requestAnimationFrame(() => overlay!.classList.add('is-open'));
    document.documentElement.classList.add('is-nav-menu-locked');
    openBtn!.setAttribute('aria-expanded', 'true');
    setBackgroundInert(true);
    panel?.focus();
  }
  function closeOverlay() {
    if (overlay!.hidden) return;
    overlay!.classList.remove('is-open');
    document.documentElement.classList.remove('is-nav-menu-locked');
    openBtn!.setAttribute('aria-expanded', 'false');
    setBackgroundInert(false);
    if (overlay!.contains(document.activeElement)) openBtn!.focus();
    closeTimer = setTimeout(() => {
      overlay!.hidden = true;
    }, 360);
  }

  openBtn.addEventListener('click', openOverlay);
  overlay
    .querySelectorAll('[data-navmenu-close]')
    .forEach((el) => el.addEventListener('click', closeOverlay));
  // A link tap navigates away — close first so state/lock don't linger.
  overlay.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeOverlay));

  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeOverlay();
  };
  document.addEventListener('keydown', onKey);

  // Leaving the large-phone range closes the overlay (the inline links return).
  const onChange = () => {
    if (!mq.matches) closeOverlay();
  };
  mq.addEventListener('change', onChange);

  document.addEventListener(
    'astro:before-swap',
    () => {
      mq.removeEventListener('change', onChange);
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('is-nav-menu-locked');
    },
    { once: true }
  );
}

document.addEventListener('astro:page-load', initNavMenu);
