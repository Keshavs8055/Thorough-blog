import { userRoles } from "../../types";
import { catchAsync } from "../../utils/catchAsync";
import { buildCompleteUserResponse } from "../../utils/userUtils";

export const requestAuthor = catchAsync(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. User not found.",
    });
  }

  if (user.role !== "user") {
    return res.status(400).json({
      success: false,
      message: "You have already requested or are already an author.",
    });
  }

  const { authorProfile } = req.body;

  user.role = userRoles.PENDING;
  user.authorProfile = authorProfile;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Author upgrade request submitted successfully.",
    user: buildCompleteUserResponse(user),
  });
});
