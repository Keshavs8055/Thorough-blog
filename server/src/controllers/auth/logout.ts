import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/globalResponse";

export const userLogout = catchAsync(async (req, res) => {
  res.clearCookie("token");

  return sendResponse({
    res,
    statusCode: 200,
    success: true,
    message: "Logged out successfully",
  });
});
