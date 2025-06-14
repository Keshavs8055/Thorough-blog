import { NextFunction, Request, Response } from "express";
import { userRoles } from "../types";

export const requireRole = (roles: userRoles[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    console.log("5. In role", req.user?.role, roles);

    if (!req.user || !roles.includes(req.user.role)) {
      console.log("6.RIGHHT ROLE");

      res.status(403).json({
        success: false,
        message: "Forbidden. You do not have the required role.",
      });
      return; // ensures void is returned
    }

    next(); // this also returns void
  };
};
