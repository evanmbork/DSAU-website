export type ArticleCard = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
};

export type ArticleFull = {
  _id: string;
  title: string;
  publishedAt?: string;
  body?: any[];
};

export type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  date?: string;
  summary?: string;
};

export type ProjectFull = {
  _id: string;
  title: string;
  date?: string;
  body?: any[];
};
