// src/lib/ssgRoutes.ts
import { client } from "./sanity";
import { qNewsArticleSlugs, qProjectSlugs } from "./queries";

type SlugRow = { slug?: string };

export async function getIncludedRoutes(): Promise<string[]> {
  const [newsRows, projectRows] = await Promise.all([
    client.fetch<SlugRow[]>(qNewsArticleSlugs),
    client.fetch<SlugRow[]>(qProjectSlugs),
  ]);

  const news = (newsRows || [])
    .map((r) => r.slug)
    .filter(Boolean)
    .map((slug) => `/news/${slug}`);

  const projects = (projectRows || [])
    .map((r) => r.slug)
    .filter(Boolean)
    .map((slug) => `/projects/${slug}`);

  return [...news, ...projects];
}
