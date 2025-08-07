import { Request, Response } from "express";
import Post from "../../models/post";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/appError";
import { sendResponse } from "../../utils/globalResponse";
import { GetPostsResponseAny, InferResponse } from "../../global_types";
import mongoose from "mongoose";

// Query params for getPostsByTags
type TagsQuery = {
  tags?: string;
  limit?: string;
  page?: string;
  excludeId?: string;
};

// GET /api/posts/by-tags?tags=js,node&limit=10&page=1&excludeId=abc123
export const getPostsByTags = catchAsync(
  async (
    req: Request<{}, {}, {}, TagsQuery>,
    res: Response<InferResponse<GetPostsResponseAny["data"]>>
  ) => {
    const { tags: tagsParam, limit = "10", page = "1", excludeId } = req.query;

    if (!tagsParam?.trim()) {
      throw new AppError("Tags are required", 400);
    }

    const tags = tagsParam.split(",").map((tag) => tag.trim());
    const limitNum = Math.max(parseInt(limit), 1);
    const pageNum = Math.max(parseInt(page), 1);
    const skip = (pageNum - 1) * limitNum;

    const query: Record<string, any> = {
      tags: { $in: tags },
    };

    if (excludeId?.trim()) {
      if (!mongoose.Types.ObjectId.isValid(excludeId)) {
        throw new AppError("Invalid excludeId provided", 400);
      }

      query._id = { $ne: new mongoose.Types.ObjectId(excludeId) };
    }

    const [totalPosts, posts] = await Promise.all([
      Post.countDocuments(query),
      Post.find(query)
        .select("title summary image author _id date likeCount tags")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
    ]);

    const totalPages = Math.ceil(totalPosts / limitNum);

    const response: InferResponse<GetPostsResponseAny["data"]> = {
      success: true,
      message: "Posts retrieved successfully",
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
