import { Response } from "express";
import { Schema, Types } from "mongoose";

// User Base types
export interface IAuthor {
  bio: string;
  socialMedia: SocialMediaLinks;
  expertise: string[];
}

export const userRoles = {
  USER: "user",
  AUTHOR: "author",
  ADMIN: "admin",
  PENDING_AUTHOR: "pending-author",
} as const;

export type RoleTypes = (typeof userRoles)[keyof typeof userRoles];

export interface IUser {
  name: string;
  username: string;
  email: string;
  avatar?: string;
  role: RoleTypes;
  isAuthor: boolean;
  isVerified: boolean;
  authorProfile?: IAuthor;
  _id: string | Types.ObjectId;
}
export interface SocialMediaLinks {
  website: string;
  twitter: string;
  linkedin: string;
}
export interface EditUserProfileBody {
  name?: string;
  authorProfile?: Partial<IAuthor>;
  avatar?: Express.Multer.File;
}
// AUTH RESPONSE TYPES
export interface UserLogoutResponse {
  success: boolean;
  message: string;
}

export interface UserAuthenticatedResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;
    token: string;
  };
}

export interface CompleteUserResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;
  };
}

export interface CompleteAuthorResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      username: string;
      name: string;
      avatar?: string;
      authorProfile?: IAuthor;
    };
    posts: PostLite[];
  };
}

// POST TYPES
export interface CreatePostResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    title: string;
    body: string;
    image: {
      src: string;
      alt: string;
    };
    tags: string[];
    author: {
      username: string;
      name: string;
    };
    date?: string;
    summary?: string;
  };
}

export interface IPost {
  title: string;
  summary: string;
  date: string;
  author: {
    username: string;
    name: string;
  };
  featured: boolean;
  likes: Types.ObjectId[] | string[];
  likeCount: number;
  body: string[];
  image?: {
    src: string;
    alt: string;
  };
  pullQuotes?: string[];
  subheadings?: string[];
  tags: string[];
  _id: string | Types.ObjectId;
  createdAt?: Date;
}

export interface PostLite {
  _id: string;
  title: string;
  summary: string;
  image: {
    src: string;
    alt: string;
  };
  author: {
    username: string;
    name: string;
  };
  date?: string;
  likeCount: number;
  tags: string[];
}
// Common Response Type for all posts
export interface GetPostsResponseAny {
  success: boolean;
  data: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    posts: PostLite[];
  };
}

export interface GetPostByIdResponse {
  success: boolean;
  message: string;
  data: IPost;
}

export interface LikePostResponse {
  success: boolean;
  message: string;
  data: {
    likes: number;
  };
}
// TAGS Response
export interface GetTagsResponse {
  success: boolean;
  data: {
    tags: string[];
  };
}
// Global Response Options
export interface SendResponseOptions<T> {
  res: Response;
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
}

export type InferResponse<T> = Omit<
  SendResponseOptions<T>,
  "res" | "statusCode"
>;
