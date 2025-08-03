import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import User from "../../models/UserModel";
import Post from "../../models/post";
import { sendResponse } from "../../utils/globalResponse";
import { CompleteAuthorResponse, InferResponse } from "../../global_types";
import { AppError } from "../../utils/appError";

export const getAuthorPageData = catchAsync(
  async (req: Request, res: Response<InferResponse<any>>) => {
    const { username } = req.params;

    if (!username?.trim()) {
      throw new AppError("Username is required.", 400);
    }

    const user = await User.findOne({ username }).select(
      "username name avatar authorProfile role isAuthor"
    );

    if (!user || !user.isAuthor || !user.authorProfile) {
      throw new AppError("Author not found or not an author.", 404);
    }

    const posts = await Post.find({ "author.username": user.username })
      .select("_id image title author date summary likeCount tags")
      .sort({ createdAt: -1 });
    const response: InferResponse<CompleteAuthorResponse["data"]> = {
      success: true,
      message: "Author page data retrieved successfully.",
      data: {
        user: {
          username: user.username,
          name: user.name,
          avatar: user.avatar,
          authorProfile: user.authorProfile,
        },
        posts,
      },
    };
    return sendResponse({
      res,
      statusCode: 200,
      ...response,
    });
  }
);
