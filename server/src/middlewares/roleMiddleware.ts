import { NextFunction, Request, Response } from "express";
import { userRoles } from "../types";

export const requireRole = (roles: userRoles[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "Forbidden. You do not have the required role.",
      });
      return; // ensures void is returned
    }

    next(); // this also returns void
  };
};
