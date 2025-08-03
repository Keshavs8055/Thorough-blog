import { Request, Response } from "express";
import Post from "../../models/post";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/appError";
import { sendResponse } from "../../utils/globalResponse";
import { GetPostsResponseAny, InferResponse } from "../../global_types";

type SearchQuery = {
  q?: string;
  page?: string;
  limit?: string;
};

export const searchPosts = catchAsync(
  async (
    req: Request<{}, {}, {}, SearchQuery>,
    res: Response<InferResponse<GetPostsResponseAny["data"]>>
  ) => {
    const { q: query, page = "1", limit = "10" } = req.query;

    if (!query?.trim()) {
      throw new AppError("Search query is required", 400);
    }

    const pageNum = Math.max(parseInt(page), 1);
    const limitNum = Math.max(parseInt(limit), 1);
    const skip = (pageNum - 1) * limitNum;

    const textSearch = { $text: { $search: query } };
    const fallbackSearch = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { summary: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    };

    let posts = await Post.find(textSearch)
      .select("title summary image author _id date likeCount tags")
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limitNum);

    let totalPosts = await Post.countDocuments(textSearch);

    // If no posts found using text index, fallback to regex
    if (posts.length === 0) {
      posts = await Post.find(fallbackSearch)
        .select("title summary image author _id date likeCount tags")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);

      totalPosts = await Post.countDocuments(fallbackSearch);
    }

    const totalPages = Math.ceil(totalPosts / limitNum);

    const response: InferResponse<GetPostsResponseAny["data"]> = {
      success: true,
      message:
        posts.length === 0
          ? "No posts matched your search"
          : "Search completed successfully",
      data: {
        posts,
        currentPage: pageNum,
        totalPages,
        totalPosts,
      },
    };

    return sendResponse({
      res,
      statusCode: 200,
      ...response,
    });
  }
);
