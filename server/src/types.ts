import mongoose, { Document, Schema, Types } from "mongoose";

export interface IPost extends Document {
  title: string;
  summary: string;
  date: string;
  author: {
    username: string;
    name: string;
  };
  featured: { type: Boolean; default: false };
  likes: [{ type: Schema.Types.ObjectId; ref: "User" }];
  likeCount: { type: Number; default: 0 };
  body: string[];
  image?: {
    src: string;
    alt: string;
  };
  pullQuotes?: string[];
  subheadings?: string[];
  relatedArticles?: {
    title: string;
    href: string;
  }[];
  tags: string[];
}

export enum userRoles {
  USER = "user",
  AUTHOR = "author",
  ADMIN = "admin",
  PENDING = "pending-author",
}

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  isVerified: boolean;
  verificationToken?: string;
  comparePassword: (password: string) => Promise<boolean>;
  verificationTokenExpires: Date;
  resendCount: number;
  resendWindowStart: Date;
  role: userRoles;
  isAuthor: boolean; // ADD TO FRONTEND
  authorProfile?: IAuthor;
  _id: Types.ObjectId;
}

export interface IAuthor {
  bio: string;
  socialMedia?: {
    website?: string;
    twitter?: string;
    linkedin?: string;
    // Add other relevant social media platforms
  };
  expertise: string[];
}
