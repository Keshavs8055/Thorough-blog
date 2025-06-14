import { NextFunction, Request, Response } from "express";

export const requireVerified = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("4.In requireVerified middleware");

  if (!req.user?.isVerified) {
    console.log('"Email not verified.");');

    res.status(403).json({
      success: false,
      message: "Email not verified.",
    });
    return;
  }

  next();
};
