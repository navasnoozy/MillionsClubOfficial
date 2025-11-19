//shared-libs/src/helpers/apiResponse-handler.ts
import { Response } from "express";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  errors?: { message: string; field?: string }[];
}

export const sendResponse = <T>(res: Response, statusCode: number, payload: ApiResponse<T>) => {
  res.status(statusCode).json(payload);
};
