// Drives the FancyBar's scroll-progress fill: its width tracks how far down
// the page the reader has scrolled, as a percentage. Re-binds on every
// view-transition navigation via astro:page-load.

function initScrollProgress() {
  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
  if (!bar) return;

  function onScroll() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar!.style.width = `${Math.min(100, Math.max(0, percent))}%`;
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

  onScroll();
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick, { passive: true });

  document.addEventListener(
    'astro:before-swap',
    () => {
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', requestTick);
    },
    { once: true }
  );
}

document.addEventListener('astro:page-load', initScrollProgress);
