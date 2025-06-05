// auth/src/middlewares/errorHandler.ts

import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).send({ error: error.serializeError() });
    return;
  }

  res.status(400).send("something went wrong...");
};
