// At ≤ --bp-lg the sidebar column is hidden; move its blocks into the content
// flow — Download + Underlying data under the infographic, More articles after
// the article — and restore the original order back on desktop.
function initDetailResponsive() {
  const root = document.querySelector<HTMLElement>('.detail');
  if (!root) return;
  const metaRoot = root.querySelector<HTMLElement>('[data-meta-root]');
  const inlineMount = root.querySelector<HTMLElement>('[data-inline-meta]');
  const endMount = root.querySelector<HTMLElement>('[data-end-meta]');
  if (!metaRoot || !inlineMount || !endMount) return;

  const download = metaRoot.querySelector<HTMLElement>('[data-meta="download"]');
  const data = metaRoot.querySelector<HTMLElement>('[data-meta="data"]');
  const related = metaRoot.querySelector<HTMLElement>('[data-meta="related"]');

  const bp =
    getComputedStyle(document.documentElement).getPropertyValue('--bp-lg').trim() ||
    '1024px';
  const mq = window.matchMedia(`(max-width: ${bp})`);

  let compact: boolean | null = null;
  function apply() {
    if (mq.matches === compact) return;
    compact = mq.matches;
    if (compact) {
      if (download) inlineMount!.appendChild(download);
      if (data) inlineMount!.appendChild(data);
      if (related) endMount!.appendChild(related);
    } else {
      if (download) metaRoot!.appendChild(download);
      if (data) metaRoot!.appendChild(data);
      if (related) metaRoot!.appendChild(related);
    }
  }
  apply();
  mq.addEventListener('change', apply);

  document.addEventListener(
    'astro:before-swap',
    () => mq.removeEventListener('change', apply),
    { once: true }
  );
}

document.addEventListener('astro:page-load', initDetailResponsive);
