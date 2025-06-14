import { Request, Response } from "express";
import { userRoles } from "../../types";
import { catchAsync } from "../../utils/catchAsync";
import { buildCompleteUserResponse } from "../../utils/userUtils";

export const requestAuthor = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const rawBody = JSON.parse(JSON.stringify(req.body));
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid request." });
  }

  if (user.role !== userRoles.USER) {
    return res.status(400).json({
      success: false,
      message: "You have already requested or are already an author.",
    });
  }

  const { bio, expertise } = rawBody.authorProfile;

  // If new avatar file was uploaded, get its cloudinary URL
  const avatarFile = req.file as Express.Multer.File;
  const avatarUrl = avatarFile ? (avatarFile as any).path : user.avatar;

  user.role = userRoles.PENDING;
  user.avatar = avatarUrl || user.avatar;
  user.authorProfile = {
    ...user.authorProfile,
    bio,
    expertise: Array.isArray(expertise) ? expertise : [expertise],
    socialMedia: {
      website: rawBody.authorProfile.socialMedia.website || "",
      twitter: rawBody.authorProfile.socialMedia.twitter || "",
      linkedin: rawBody.authorProfile.socialMedia.linkedin || "",
    },
  };

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Author upgrade request submitted successfully.",
    user: buildCompleteUserResponse(user),
  });
});
