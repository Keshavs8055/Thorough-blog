import Post from "../../models/post";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

export const getPostsByTags = catchAsync(
  async (req: Request, res: Response) => {
    const tagsParam = req.query.tags as string;
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;
    const skip = (page - 1) * limit;
    const excludeId = req.query.excludeId as string;

    if (!tagsParam) {
      return res
        .status(400)
        .json({ success: false, message: "Tags are required" });
    }

    const tags = tagsParam.split(",").map((tag) => tag.trim());

    const query: any = {
      tags: { $in: tags },
    };

    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const totalPosts = await Post.countDocuments(query);

    const posts = await Post.find(query)
      .select("title summary image author _id date likeCount tags")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      success: true,
      posts,
      currentPage: page,
      totalPages,
      totalPosts,
    });
  }
);
