/**
 * Chapter metadata for the Atlas — the 5 fixed sections, their display name,
 * tagline and order. Names/taglines are CMS-editable (Settings → Chapters, via
 * chapters.json) so language forks can translate section titles without
 * touching code. The `id` is the stable join key that infographics reference.
 */
import chaptersData from './chapters.json';

export interface ChapterMeta {
  id: string;
  name: string; // bold chapter name, e.g. "Introduction"
  tagline: string; // descriptive tagline, e.g. "The Big Picture"
  order: number;
}

export const chapterMeta: ChapterMeta[] = chaptersData.chapters;

export const chapterName = (id: string): string =>
  chapterMeta.find((c) => c.id === id)?.name ?? id;
