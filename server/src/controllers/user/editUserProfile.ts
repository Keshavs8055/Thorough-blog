import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { buildCompleteUserResponse } from "../../utils/userUtils";
import {
  CompleteUserResponse,
  EditUserProfileBody,
  InferResponse,
  SocialMediaLinks,
} from "../../global_types";
import { IAuthor } from "../../global_types";
import UserSchema from "../../models/UserModel";
import { sendResponse } from "../../utils/globalResponse";
import { AppError } from "../../utils/appError";

export const editUserProfile = catchAsync(
  async (
    req: Request<{}, {}, EditUserProfileBody>,
    res: Response<InferResponse<CompleteUserResponse["data"]>>
  ) => {
    const user = req.user;

    if (!user) {
      throw new AppError("User not authenticated", 401);
    }

    const { username, name, authorProfile = {} } = req.body;
    // Make sure username is unique if provided
    if (username) {
      const existingUser = await UserSchema.findOne({
        username: username.toLowerCase(),
      });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        throw new AppError("Username already taken", 400);
      }
    }

    const avatarFile = req.file as Express.Multer.File | undefined;
    const avatarUrl = avatarFile?.path || user.avatar;

    const updatedExpertise = Array.isArray(authorProfile.expertise)
      ? authorProfile.expertise.filter(Boolean)
      : [];

    const updatedSocialMedia: SocialMediaLinks = {
      website: authorProfile.socialMedia?.website || "",
      twitter: authorProfile.socialMedia?.twitter || "",
      linkedin: authorProfile.socialMedia?.linkedin || "",
    };

    const updatedAuthorProfile: IAuthor = {
      bio: authorProfile.bio || "",
      expertise: updatedExpertise,
      socialMedia: updatedSocialMedia,
    };

    const updatedUser = await UserSchema.findByIdAndUpdate(
      user._id,
      {
        name: name || user.name,
        avatar: avatarUrl,
        authorProfile: updatedAuthorProfile,
        username: username || user.username,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new AppError("User not found or update failed", 404);
    }
    const response: InferResponse<CompleteUserResponse["data"]> = {
      message: "Profile updated successfully.",
      success: true,
      data: { user: buildCompleteUserResponse(updatedUser) },
    };
    return sendResponse({
      res,
      statusCode: 200,
      ...response,
    });
  }
);
