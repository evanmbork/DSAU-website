import { client } from "./sanity";
import { qNewsArticleSlugs, qProjectSlugs } from "./queries";

export async function getIncludedRoutes(): Promise<string[]> {
  const [newsSlugs, projectSlugs] = await Promise.all([
    client.fetch<string[]>(qNewsArticleSlugs),
    client.fetch<string[]>(qProjectSlugs),
  ]);

  const newsRoutes = (newsSlugs || []).map((s) => `/news/${s}`);
  const projectRoutes = (projectSlugs || []).map((s) => `/projects/${s}`);

  return [...newsRoutes, ...projectRoutes];
}
