import mongoose, { Schema } from "mongoose";
import { IPost } from "../types";

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    date: { type: String, required: true },
    author: {
      _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
    },
    body: [{ type: String }],
    featured: { type: Boolean, default: false },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likeCount: { type: Number, default: 0 },
    image: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
      source: { type: String },
    },
    pullQuotes: [String],
    subheadings: [String],
    relatedArticles: [
      {
        title: { type: String },
        href: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post ||
  mongoose.model<IPost>("Post", PostSchema);
