import Post from "../../models/post";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

export const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  // Get page and limit from query params (default: page 1, 10 posts per page)
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  // Project only the fields you need
  const posts = await Post.find()
    .select("title summary image author _id date likeCount tags") // 👈 limit fields
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); // Optional: latest first

  const totalPosts = await Post.countDocuments();
  const totalPages = Math.ceil(totalPosts / limit);

  res.status(200).json({
    success: true,
    currentPage: page,
    totalPages,
    totalPosts,
    posts,
  });
});

// Get single post by ID
export const getPostById = catchAsync(async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({
      success: true,
      message: "Successfuly Retrieved Post",
      data: post,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch post" });
  }
});

//Like post
export const LikePost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?._id.toString();

  const post = await Post.findById(id);
  if (!post)
    return res.status(404).json({ success: false, message: "Post not found" });

  const alreadyLiked = post.likes.includes(userId);

  if (alreadyLiked) {
    post.likes = post.likes.filter((id: string) => id !== userId);
  } else {
    post.likes.push(userId);
  }

  post.likeCount = post.likes.length;
  await post.save();

  res.status(200).json({
    success: true,
    message: alreadyLiked ? "Post unliked" : "Post liked",
    likes: post.likeCount,
  });
});
