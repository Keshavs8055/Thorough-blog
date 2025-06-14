import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { buildCompleteUserResponse } from "../../utils/userUtils";

export const editUserProfile = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const rawBody = JSON.parse(JSON.stringify(req.body));

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request.",
      });
    }

    // Handle uploaded avatar
    const avatarFile = req.file as Express.Multer.File;
    const avatarUrl = avatarFile ? (avatarFile as any).path : user.avatar;

    // Extract and validate incoming authorProfile fields
    const { authorProfile = {} } = rawBody;
    const { bio = "", expertise = [], socialMedia = {} } = authorProfile;

    const updatedExpertise = Array.isArray(expertise) ? expertise : [expertise];

    const updatedSocialMedia = {
      website: socialMedia.website || "",
      twitter: socialMedia.twitter || "",
      linkedin: socialMedia.linkedin || "",
    };

    // Apply updates
    user.avatar = avatarUrl;
    user.authorProfile = {
      ...user.authorProfile,
      bio,
      expertise: updatedExpertise,
      socialMedia: updatedSocialMedia,
    };
    if (user.name !== rawBody.name) {
      user.name = rawBody.name;
    }
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: buildCompleteUserResponse(user),
    });
  }
);
