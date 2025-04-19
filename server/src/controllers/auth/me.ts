import { catchAsync } from "../../utils/catchAsync";
import {
  buildCompleteUserResponse,
  buildUserResponse,
} from "../../utils/userUtils";
import { IUser } from "../../types";

export const getCurrentUser = catchAsync(async (req, res) => {
  const user = req.user;
  console.log(req.user);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. User not found.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User authenticated successfully.",
    user: buildUserResponse(user),
    token: req.cookies?.token, // Optional: only if frontend needs it again
  });
});

export const getDetailedUserProfile = catchAsync(async (req, res) => {
  const { profileId } = req.params;
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. User not found.",
    });
  }

  if (user._id && user._id.toString() !== profileId) {
    return res.status(403).json({
      success: false,
      message: "Forbidden. You can only access your own profile.",
    });
  }

  const userResponse = buildCompleteUserResponse(user);
  if (
    (user.role === "author" || user.role === "pending-author") &&
    user.authorProfile
  ) {
    (userResponse as IUser).authorProfile = user.authorProfile;
  }

  return res.status(200).json({
    success: true,
    message: "User profile data retrieved successfully.",
    user: userResponse,
  });
});
