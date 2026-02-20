import groq from "groq"; // changed from what ChatGPT suggested to avoid a type error with the Sanity client

export const qLatestArticles = groq`
*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt
}[0...50]
`;

export const qArticleBySlug = groq`
*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  publishedAt,
  body
}
`;

export const qProjects = groq`
*[_type == "project"] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  date,
  summary
}[0...50]
`;

export const qProjectBySlug = groq`
*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  date,
  body
}
`;

export const qArticleSlugs = groq`
*[_type == "article" && defined(slug.current)].slug.current
`;

export const qProjectSlugs = groq`
*[_type == "project" && defined(slug.current)].slug.current
`;
