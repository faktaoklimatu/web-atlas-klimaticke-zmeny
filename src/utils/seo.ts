/**
 * Build a fully-qualified URL from a base-relative public path (as produced
 * by `imgUrl()` or a page href) — needed for canonical/OG/Twitter/JSON-LD
 * tags, which all require absolute URLs, unlike in-page links.
 */
export function absoluteUrl(site: URL | undefined, path: string): string {
  return new URL(path, site).toString();
}

/**
 * Truncate a description to a safe meta-description length, breaking on a
 * word boundary instead of mid-word.
 */
export function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
}
