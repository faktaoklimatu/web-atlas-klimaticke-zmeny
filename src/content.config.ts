import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Infographics — the Atlas content model, edited in Decap CMS.
 * One markdown file per infographic; the markdown body is the article text.
 * Chapter metadata (name / tagline / order) lives in src/data/chapters.json.
 */
const infographicsCollection = defineCollection({
  // Content Layer API (Astro 5+): the glob loader replaces the old
  // `type: 'content'`. Entry ids are the filenames (e.g. `accelerating-sea-
  // level-rise`), matching the slugs used by the CMS `related` relations.
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/infographics' }),
  schema: z.object({
    title: z.string(),
    lead: z.string(),
    chapter: z.enum([
      'introduction',
      'the-science',
      'the-impacts',
      'the-trajectory',
      'the-solutions',
    ]),
    order: z.number().default(0),
    image: z.string(), // public path, e.g. /images/atlas/atlas-_08.png
    downloads: z
      .object({
        pdf: z.string().optional(),
      })
      .optional(),
    data: z
      .object({
        tableUrl: z.string().optional(),
        sourceUrl: z.string().optional(),
        citation: z.string().optional(),
      })
      .optional(),
    related: z.array(z.string()).optional(),
  }),
});

/**
 * About — single markdown file (CMS: Settings → About Page). Title +
 * markdown body, rendered the same way as an infographic's body.
 */
const aboutCollection = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  infographics: infographicsCollection,
  about: aboutCollection,
};
