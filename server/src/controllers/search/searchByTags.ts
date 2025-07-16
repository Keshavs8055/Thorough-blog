import { Request, Response } from "express";
import Post from "../../models/post";
import { catchAsync } from "../../utils/catchAsync";

export const searchPostsByTags = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query.q as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Tag query is required",
      });
    }

    const tags = query
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, "").toLowerCase())
      .filter((tag) => tag.length > 0);

    if (tags.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid tags provided",
      });
    }

    const posts = await Post.find({ tags: { $all: tags } })
      .select("title summary image author _id date likeCount tags")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({ tags: { $all: tags } });
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      message: "Tag search completed successfully",
      posts,
      currentPage: page,
      totalPages,
      totalResults: total,
    });
  }
);
