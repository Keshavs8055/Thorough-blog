import { Request, Response } from "express";
import Post from "../../models/post";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/appError";
import { sendResponse } from "../../utils/globalResponse";
import {
  GetPostsResponseAny,
  GetPostByIdResponse,
  LikePostResponse,
  InferResponse,
} from "../../global_types";

// GET /api/posts?page=1&limit=10
export const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .select("title summary image author _id date likeCount tags")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalPosts = await Post.countDocuments();
  const totalPages = Math.ceil(totalPosts / limit);

  const response: InferResponse<GetPostsResponseAny["data"]> = {
    success: true,
    message: "Posts retrieved successfully",
    data: {
      currentPage: page,
      totalPages,
      totalPosts,
      posts,
    },
  };

  return sendResponse({ res, statusCode: 200, ...response });
});

// GET /api/posts/:id
export const getPostById = catchAsync(async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new AppError("Post not found", 404);

  const response: InferResponse<GetPostByIdResponse["data"]> = {
    success: true,
    message: "Successfully Retrieved Post",
    data: post,
  };

  return sendResponse({ res, statusCode: 200, ...response });
});

// POST /api/posts/:id/like
export const LikePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?._id.toString();

  const post = await Post.findById(id);
  if (!post) throw new AppError("Post not found", 404);

  const alreadyLiked = post.likes.includes(userId);
  post.likes = alreadyLiked
    ? post.likes.filter((uid: string) => uid !== userId)
    : [...post.likes, userId];

  post.likeCount = post.likes.length;
  await post.save();

  const response: InferResponse<LikePostResponse["data"]> = {
    success: true,
    message: alreadyLiked ? "Post unliked" : "Post liked",
    data: {
      likes: post.likeCount,
    },
  };

  return sendResponse({ res, statusCode: 200, ...response });
});
