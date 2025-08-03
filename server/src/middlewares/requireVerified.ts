import { NextFunction, Request, Response } from "express";
import sendVerificationEmail from "../utils/auth/sendVerifyMail";

export const requireVerified = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    throw new Error("User not authenticated.");
  }

  if (!req.user?.isVerified) {
    sendVerificationEmail(req.user.email, req.user.name);
    throw new Error("Verification Email sent. Please verify your account.");
  }
  next();
};
