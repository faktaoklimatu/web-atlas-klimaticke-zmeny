import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { chapterMeta } from '../data/chapters';

/**
 * Chapter usage manifest consumed by the CMS delete guard (public/admin/index.html):
 * one entry per chapter id that has at least one infographic, with its count. The
 * admin blocks removing a chapter that still appears here.
 */
export const GET: APIRoute = async () => {
  const entries = await getCollection('infographics');

  const counts = new Map<string, number>();
  for (const e of entries) {
    counts.set(e.data.chapter, (counts.get(e.data.chapter) ?? 0) + 1);
  }

  const usage = [...counts.entries()].map(([id, count]) => ({
    id,
    name: chapterMeta.find((c) => c.id === id)?.name ?? id,
    count,
  }));

  return new Response(JSON.stringify(usage), {
    headers: { 'Content-Type': 'application/json' },
  });
};
