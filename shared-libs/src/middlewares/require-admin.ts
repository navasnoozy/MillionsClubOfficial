import { NextFunction, Request, Response } from "express";
import {  NotAuthorizedError } from "../server";

export const require_admin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!req.currentUser || req.currentUser.role !== "admin") {
    throw new NotAuthorizedError();
  }

  next();
};
