import { Request, Response } from "express";
import Post from "../../models/post";
import { catchAsync } from "../../utils/catchAsync";

export const searchPosts = catchAsync(async (req: Request, res: Response) => {
  const query = req.query.q as string;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  console.log(query);

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

  // Define primary and fallback queries
  const textQuery = { $text: { $search: query } };
  const fallbackQuery = {
    $or: [
      { title: { $regex: query, $options: "i" } },
      { summary: { $regex: query, $options: "i" } },
      { tags: { $regex: query, $options: "i" } },
    ],
  };

  // Try text search first
  let posts = await Post.find(textQuery)
    .select("title summary image author _id date likeCount tags")
    .sort({ score: { $meta: "textScore" } })
    .skip(skip)
    .limit(limit);

  let total = await Post.countDocuments(textQuery);

  // If no results, fall back to regex search
  if (posts.length === 0) {
    posts = await Post.find(fallbackQuery)
      .select("title summary image author _id date likeCount tags")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    total = await Post.countDocuments(fallbackQuery);
  }

  const totalPages = Math.ceil(total / limit);

  return res.status(200).json({
    success: true,
    message: "Search completed successfully",
    posts,
    currentPage: page,
    totalPages,
    totalResults: total,
  });
});
