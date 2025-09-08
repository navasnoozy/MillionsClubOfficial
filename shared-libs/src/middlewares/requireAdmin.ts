import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotAuthorizedError } from "../server";

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!req.currentUser || req.currentUser.role !== "admin") {
    throw new NotAuthorizedError();
  }

  next();
};
