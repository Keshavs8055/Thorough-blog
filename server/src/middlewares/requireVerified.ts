import { NextFunction, Request, Response } from "express";

export const requireVerified = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user?.isVerified) {
    res.status(403).json({
      success: false,
      message: "Email not verified.",
    });
    return;
  }

  next();
};
