// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth/jwtUtils";
import User from "../models/UserModel";
import { IUser } from "../global_types";
import { AppError } from "../utils/appError";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.token;

  if (!token) throw new AppError("Unauthorized. No token provided.", 401);

  try {
    const decoded = verifyToken(token) as { id: string };
    const user = await User.findById(decoded.id).select("-password");

    if (!user) throw new AppError("Unauthorized. Invalid user.", 401);

    req.user = user;
    next();
  } catch (error) {
    throw new AppError("Unauthorized. Invalid or expired token.", 401);
  }
};

// Extend Express Request with `user`
declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
