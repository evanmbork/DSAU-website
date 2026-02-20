import groq from "groq";

/**
 * NEWS
 */
export const qLatestNewsArticles = groq`
*[_type == "newsArticle" && defined(slug.current)]
| order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt
}
`;

export const qNewsArticleBySlug = groq`
*[_type == "newsArticle" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  body
}
`;

export const qNewsArticleSlugs = groq`
*[_type == "newsArticle" && defined(slug.current)].slug.current
`;

/**
 * PROJECTS
 */
export const qProjects = groq`
*[_type == "project" && defined(slug.current)]
| order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  summary,
  timeline,
  impact,
  links,
  coverImage{
    alt,
    asset->{ url }
  }
}
`;

export const qProjectBySlug = groq`
*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  summary,
  timeline,
  impact,
  links,
  coverImage{
    alt,
    asset->{ url }
  },
  body
}
`;

export const qProjectSlugs = groq`
*[_type == "project" && defined(slug.current)].slug.current
`;

/**
 * PEOPLE
 */
export const qPeople = groq`
*[_type == "person"]
| order(order asc, name asc){
  _id,
  name,
  role,
  bio,
  order,
  links,
  photo{
    alt,
    asset->{ url }
  }
}
`;
