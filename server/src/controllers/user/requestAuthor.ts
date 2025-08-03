import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AppError } from "../../utils/appError";
import { sendResponse } from "../../utils/globalResponse";
import UserSchema from "../../models/UserModel";
import { userRoles } from "../../global_types";
import {
  EditUserProfileBody,
  CompleteAuthorResponse,
  InferResponse,
} from "../../global_types";

export const requestAuthor = catchAsync(
  async (
    req: Request<{}, {}, EditUserProfileBody>,
    res: Response<InferResponse<CompleteAuthorResponse["data"]>>
  ) => {
    const user = req.user;
    const { authorProfile = {} } = req.body;

    if (!user) {
      throw new AppError("Unauthorized request.", 401);
    }

    if (user.role !== userRoles.USER) {
      throw new AppError(
        "You have already requested or are already an author.",
        400
      );
    }

    const { bio, expertise, socialMedia } = authorProfile;
    if (!bio?.trim()) {
      throw new AppError("Bio is required.", 400);
    }

    if (!Array.isArray(expertise) || expertise.length === 0) {
      throw new AppError("At least one area of expertise is required.", 400);
    }

    if (expertise.length > 3) {
      throw new AppError("You can select a maximum of 3 expertise areas.", 400);
    }
    if (!socialMedia || typeof socialMedia !== "object") {
      throw new AppError("Atleast one social media link is required.", 400);
    }

    const hasSocialLink =
      !!socialMedia.website?.trim() ||
      !!socialMedia.twitter?.trim() ||
      !!socialMedia.linkedin?.trim();

    if (!hasSocialLink) {
      throw new AppError("At least one social media link is required.", 400);
    }

    const avatarFile = req.file as Express.Multer.File;
    const avatarUrl = avatarFile?.path || user.avatar;

    const updatedUser = await UserSchema.findByIdAndUpdate(
      user._id,
      {
        role: userRoles.PENDING_AUTHOR,
        avatar: avatarUrl,
        authorProfile: {
          bio,
          expertise: Array.isArray(expertise) ? expertise : [expertise],
          socialMedia: {
            website: socialMedia.website || "",
            twitter: socialMedia.twitter || "",
            linkedin: socialMedia.linkedin || "",
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new AppError("User not found or update failed.", 500);
    }

    const response: InferResponse<CompleteAuthorResponse["data"]> = {
      success: true,
      message: "Author upgrade request submitted successfully.",
      data: {
        user: {
          username: updatedUser.username,
          name: updatedUser.name,
          avatar: updatedUser.avatar,
          authorProfile: updatedUser.authorProfile,
        },
        posts: [],
      },
    };

    return sendResponse({
      res,
      statusCode: 200,
      ...response,
    });
  }
);
