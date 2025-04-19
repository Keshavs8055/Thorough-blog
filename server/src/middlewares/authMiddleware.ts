// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth/jwtUtils";
import User from "../models/UserModel";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({
      // Send the response directly
      success: false,
      message: "Unauthorized. Token not found.",
    });
    return; // Crucially, return here to end the middleware execution
  }

  try {
    const decoded = verifyToken(token) as { id: string };
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401).json({
        // Send the response directly
        success: false,
        message: "Unauthorized. Invalid user.",
      });
      return; // Crucially, return here
    }

    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      // Send the response directly
      success: false,
      message: "Unauthorized. Invalid or expired token.",
    });
    return; // Crucially, return here
  }
};

declare global {
  namespace Express {
    interface Request {
      user?: import("../types").IUser;
    }
  }
}
