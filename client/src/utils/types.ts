export interface Author {
  _id?: string;
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
  _id?: string;
  title: string;
  summary: string;
  date: string;
  author: Author;
  body: string[];
  image?: PostImage;
  pullQuotes?: string[];
  subheadings?: string[];
  relatedArticles?: RelatedArticle[];
  likeCount: number;
  tags: string[];
  likes?: string[];
}

export type SignupFormState = {
  name: string;
  username: string;
  email: string;
  password: string;
  image?: File | null;
};

export type LoginFormState = {
  email: string;
  password: string;
};

export interface AuthUser extends CompleteUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface CompleteUser {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  role: "user" | "pending-author" | "author";
  isAuthor: boolean;
  authorProfile: IAuthor; // not optional anymore
}

export interface IAuthor {
  bio: string;
  expertise: string[];
  socialMedia: {
    website?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  avatar?: string;
}

export type AuthorRequestForm = {
  bio: string;
  avatar?: string | File | null;
  website?: string;
  twitter?: string;
  linkedin?: string;
  expertise: string[];
  error: {
    avatar: boolean;
    bio: boolean;
    expertise: boolean;
    website: boolean;
    twitter: boolean;
    linkedin: boolean;
  };
};

export const presetExpertise = [
  "Technology",
  "Science",
  "Health",
  "Finance",
  "Politics",
  "Education",
  "Travel",
  "Fashion",
  "Sports",
  "History",
];
