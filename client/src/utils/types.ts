export interface Author {
  _id?: string; // MongoDB ObjectId as string
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
}

export interface PostImage {
  src: string;
  alt: string;
  caption?: string;
  source?: string;
}

export interface RelatedArticle {
  title: string;
  href: string;
}

export interface Post {
  _id?: string; // MongoDB ObjectId as string
  title: string;
  summary: string;
  date: string; // ISO date string
  author: Author;
  body: string[]; // Paragraphs
  image?: PostImage;
  pullQuotes?: string[];
  subheadings?: string[];
  relatedArticles?: RelatedArticle[];
}

export type SignupFormState = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type LoginFormState = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  role: "user" | "admin" | "author";
};
