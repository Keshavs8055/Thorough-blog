import { catchAsync } from "../../utils/catchAsync";
import User from "../../models/UserModel";
import { Request, Response } from "express";
import { hashToken } from "../../utils/auth/tokenUtils";
import { generateToken } from "../../utils/auth/jwtUtils";
import { buildUserResponse } from "../../utils/userUtils";
import { createAuthCookie } from "../../utils/auth/cookieUtils";
import { AppError } from "../../utils/appError";
import { sendResponse } from "../../utils/globalResponse";
import { InferResponse, UserAuthenticatedResponse } from "../../global_types";

export const VerifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { token, email } = req.query;

  if (
    !token ||
    !email ||
    typeof token !== "string" ||
    typeof email !== "string"
  ) {
    throw new AppError("Missing token or email in verification link.", 400);
  }

  const hashedToken = hashToken(token);

  const user = await User.findOne({
    email: email.toLowerCase(),
    verificationToken: hashedToken,
    verificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError("Invalid or expired verification token.", 400);
  }

  if (user.isVerified) {
    throw new AppError("Email already verified.", 400);
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  user.resendCount = undefined;
  user.resendWindowStart = undefined;

  await user.save();

  const newToken = generateToken(user._id.toString());
  res.setHeader("Set-Cookie", createAuthCookie(newToken));

  const response: InferResponse<UserAuthenticatedResponse["data"]> = {
    success: true,
    message: "Email verified successfully!",
    data: {
      user: buildUserResponse(user),
      token: newToken,
    },
  };

  return sendResponse({
    res,
    statusCode: 200,
    ...response,
  });
});
