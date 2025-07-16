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
    body: [{ type: Schema.Types.Mixed, required: true }],
    featured: { type: Boolean, default: false },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likeCount: { type: Number, default: 0 },
    image: {
      src: { type: String },
      alt: { type: String },
    },
    pullQuotes: [String],
    subheadings: [String],
    tags: {
      type: [String],
      validate: [
        (arr: string[]) => arr.length <= 5,
        "{PATH} exceeds the limit of 5 tags",
      ],
      default: [],
    },

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

PostSchema.index(
  {
    title: "text",
    summary: "text",
    tags: "text",
  },
  { weights: { title: 5, summary: 3, tags: 1 } }
);

export default mongoose.models.Post ||
  mongoose.model<IPost>("Post", PostSchema);
