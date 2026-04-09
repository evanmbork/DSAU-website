// GROQ queries

export const qArticles = /* groq */ `
*[_type == "newsArticle" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage{
    alt,
    asset->{ url }
  }
}
`;

export const qArticleBySlug = /* groq */ `
*[_type == "newsArticle" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  content,
  coverImage{
    alt,
    asset->{ url }
  }
}
`;

export const qArticleSlugs = /* groq */ `
*[_type == "newsArticle" && defined(slug.current)]{
  "slug": slug.current
}
`;

// ✅ alias so older imports don’t break
export const qNewsArticleSlugs = qArticleSlugs;

export const qProjects = /* groq */ `
*[_type == "project" && defined(slug.current)] | order(orderRank asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  status,
  coverImage{
    alt,
    asset->{ url }
  }
}
`;

export const qProjectBySlug = /* groq */ `
*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  status,
  content,
  coverImage{
    alt,
    asset->{ url }
  }
}
`;

export const qProjectSlugs = /* groq */ `
*[_type == "project" && defined(slug.current)]{
  "slug": slug.current
}
`;

export const qPeople = /* groq */ `
*[_type == "person" && !coalesce(isAlumni, false)] | order(name asc) {
  _id,
  name,
  role,
  email,
  instagram,
  bio,
  coverImage{
    alt,
    asset->{ url }
  }
}
`;

export const qAlumni = /* groq */ `
*[_type == "person" && coalesce(isAlumni, false)] | order(graduationYear desc, name asc) {
  _id,
  name,
  role,
  graduationYear,
  coverImage{
    alt,
    asset->{ url }
  }
}
`;

export const qUkrainianClasses = /* groq */ `
*[_type == "ukrainianClass"] | order(term asc, title asc) {
  _id,
  title,
  courseNumber,
  term,
  instructor,
  level,
  description,
  schedule,
  registrationLink
}
`;