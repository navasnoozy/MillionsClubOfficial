// auth/src/middlewares/errorHandler.ts

import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";
import { sendResponse } from "../helpers/apiResponse-handler";

export const errorHandler = (error: Error, _req:Request, res:Response, next:NextFunction) => {
  if (error instanceof CustomError) {
    return sendResponse(res, error.statusCode, {
      success: false,
      message: error.message,
      errors: error.serializeError(),
    });
  }

  return sendResponse(res, 400, {
    success: false,
    message: "Something went wrong",
    errors: [{ message: error.message }]
  });
};
