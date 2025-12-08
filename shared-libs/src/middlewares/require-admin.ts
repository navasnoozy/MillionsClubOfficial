import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/not-authorizedError";
import { ForbiddenError } from "../errors/forbidden-error"; // Import the new error

export const require_admin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  if (req.currentUser.role !== "admin") {
    throw new ForbiddenError("Access Denied: You do not have permission to perform this action.");
  }

  next();
};
