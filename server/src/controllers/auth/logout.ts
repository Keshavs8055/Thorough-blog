import { catchAsync } from "../../utils/catchAsync";

export const userLogout = catchAsync(async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to log out",
      error: error.message,
    });
  }
});
