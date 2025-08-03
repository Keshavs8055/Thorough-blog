import { NextFunction, Request, Response } from "express";

import { IUser } from "../global_types";
import { AppError } from "../utils/appError";

export const requireRole = (roles: IUser["role"][]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError("Forbidden. You do not have the required role.", 403);
    }

    next(); // this also returns void
  };
};
