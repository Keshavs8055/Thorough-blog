// controllers/userController.ts
import { catchAsync } from "../../utils/catchAsync";
import { buildUserResponse } from "../../utils/userUtils";
import { sendResponse } from "../../utils/globalResponse";
import { buildCompleteUserResponse } from "../../utils/userUtils";
import { CompleteUserResponse, InferResponse } from "../../global_types";

export const getCurrentUser = catchAsync(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. User not found.",
    });
  }

  const response: InferResponse<CompleteUserResponse["data"]> = {
    success: true,
    message: "User authenticated successfully.",
    data: {
      user: buildUserResponse(user), // Ensure _id is a string
    },
  };

  return sendResponse({
    res,
    statusCode: 200,
    ...response,
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

  const response: InferResponse<CompleteUserResponse["data"]> = {
    success: true,
    message: "User profile data retrieved successfully.",
    data: {
      user: buildCompleteUserResponse(user),
    },
  };

  return sendResponse({
    res,
    statusCode: 200,
    ...response,
  });
});
