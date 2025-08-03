import { Request, Response } from "express";
import Post from "../../models/post";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/appError";
import { sendResponse } from "../../utils/globalResponse";
import {
  GetPostsResponseAny,
  GetTagsResponse,
  InferResponse,
} from "../../global_types";

type SearchQuery = {
  q?: string;
  page?: string;
  limit?: string;
};

export const searchPostsByTags = catchAsync(
  async (
    req: Request<{}, {}, {}, SearchQuery>,
    res: Response<InferResponse<GetPostsResponseAny["data"]>>
  ) => {
    const { q: query, page = "1", limit = "10" } = req.query;

    if (!query?.trim()) {
      throw new AppError("Tag query is required", 400);
    }

    const tags = query
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);

    if (tags.length === 0) {
      throw new AppError("No valid tags provided", 400);
    }

    const pageNum = Math.max(parseInt(page), 1);
    const limitNum = Math.max(parseInt(limit), 1);
    const skip = (pageNum - 1) * limitNum;

    const filter = { tags: { $all: tags } };

    const [posts, totalPosts] = await Promise.all([
      Post.find(filter)
        .select("title summary image author _id date likeCount tags")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Post.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalPosts / limitNum);

    const response: InferResponse<GetPostsResponseAny["data"]> = {
      success: true,
      message:
        posts.length > 0
          ? "Posts retrieved successfully"
          : "No posts found for the given tags",
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

// GET /api/posts/tags
export const getTags = catchAsync(
  async (
    req: Request,
    res: Response<InferResponse<GetTagsResponse["data"]>>
  ) => {
    const tags = await Post.distinct("tags");

    const response: InferResponse<GetTagsResponse["data"]> = {
      success: true,
      message:
        tags.length > 0 ? "Tags retrieved successfully" : "No tags found",
      data: { tags },
    };

    return sendResponse({
      res,
      statusCode: 200,
      ...response,
    });
  }
);
