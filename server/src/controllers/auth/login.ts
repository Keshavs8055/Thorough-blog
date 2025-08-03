import { catchAsync } from "../../utils/catchAsync";
import User from "../../models/UserModel";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/auth/jwtUtils";
import { createAuthCookie } from "../../utils/auth/cookieUtils";
import { buildUserResponse } from "../../utils/userUtils";
import { AppError } from "../../utils/appError";
import { sendResponse } from "../../utils/globalResponse";
import { InferResponse, UserAuthenticatedResponse } from "../../global_types";

export const UserLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError("Email and password are required.", 400);
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw new AppError("Invalid credentials.", 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError("Incorrect password.", 401);

  if (!user.isVerified) {
    throw new AppError("Account not verified. Please check your email.", 403);
  }

  const token = generateToken(user._id.toString());

  res.setHeader("Set-Cookie", createAuthCookie(token));
  const response: InferResponse<UserAuthenticatedResponse["data"]> = {
    success: true,
    data: { user: buildUserResponse(user), token },
    message: "Login successful.",
  };

  return sendResponse({
    res,
    statusCode: 200,
    ...response,
  });
});
