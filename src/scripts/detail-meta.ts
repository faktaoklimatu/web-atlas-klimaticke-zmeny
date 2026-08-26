// At ≤ --bp-lg the sidebar column is hidden; move its blocks to the end of the
// article — Next/Previous into the end mount, then Underlying data + Download
// into the inline mount below it — and restore the original order on desktop.
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
      if (related) endMount!.appendChild(related);
      if (data) inlineMount!.appendChild(data);
      if (download) inlineMount!.appendChild(download);
    } else {
      if (related) metaRoot!.appendChild(related);
      if (data) metaRoot!.appendChild(data);
      if (download) metaRoot!.appendChild(download);
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
