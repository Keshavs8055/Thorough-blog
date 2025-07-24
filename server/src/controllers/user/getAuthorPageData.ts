import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import User from "../../models/UserModel";
import Post from "../../models/post";

export const getAuthorPageData = catchAsync(
  async (req: Request, res: Response) => {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Author username is required.",
      });
    }

    // Find user by username
    const user = await User.findOne({ username }).select(
      "username name avatar authorProfile role isAuthor"
    );

    if (!user || !user.isAuthor || !user.authorProfile) {
      return res.status(404).json({
        success: false,
        message: "Author profile not found.",
      });
    }

    // Fetch published posts by this author
    const posts = await Post.find({ "author.username": user.username })
      .select("_id image title author date summary likeCount tags") // Return limited post info
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Author page data retrieved successfully.",
      author: {
        username: user.username,
        name: user.name,
        avatar: user.avatar,
        authorProfile: user.authorProfile,
      },
      posts,
    });
  }
);
