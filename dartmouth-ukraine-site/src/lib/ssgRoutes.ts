import { sanity } from "./sanity";
import { qArticleSlugs, qProjectSlugs } from "./queries";

export async function getIncludedRoutes(): Promise<string[]> {
  // Always include static routes
  const base = ["/", "/news", "/projects", "/help", "/people", "/contact", "/admin"];

  // During dev / before Sanity is set up, env vars may be missing.
  // We fail gracefully and just return static routes.
  try {
    const [articleSlugs, projectSlugs] = await Promise.all([
      sanity.fetch<string[]>(qArticleSlugs),
      sanity.fetch<string[]>(qProjectSlugs),
    ]);

    for (const slug of articleSlugs ?? []) base.push(`/news/${slug}`);
    for (const slug of projectSlugs ?? []) base.push(`/projects/${slug}`);

    return Array.from(new Set(base));
  } catch {
    return base;
  }
}
