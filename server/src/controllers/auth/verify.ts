import { catchAsync } from "../../utils/catchAsync";
import User from "../../models/UserModel";
import { Request, Response } from "express";
import { hashToken } from "../../utils/auth/tokenUtils";
import { generateToken } from "../../utils/auth/jwtUtils";
import { buildUserResponse } from "../../utils/userUtils";
import { createAuthCookie } from "../../utils/auth/cookieUtils";

export const VerifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { token, email } = req.query;

  if (
    !token ||
    !email ||
    typeof token !== "string" ||
    typeof email !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing token or email in verification link.",
    });
  }

  const hashedToken = hashToken(token);

  const user = await User.findOne({
    email: email.toLowerCase(),
    verificationToken: hashedToken,
    verificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired verification token.",
    });
  }

  if (user.isVerified) {
    return res.status(400).json({
      success: false,
      message: "Email already verified.",
    });
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  user.resendCount = undefined;
  user.resendWindowStart = undefined;

  await user.save();

  const newToken = generateToken(user._id.toString());
  res.setHeader("Set-Cookie", createAuthCookie(newToken));
  return res.status(200).json({
    success: true,
    message: "Email verified successfully!",
    user: buildUserResponse(user),
    token: newToken,
  });
});
