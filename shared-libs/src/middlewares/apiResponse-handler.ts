import { Response } from "express";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  payload: ApiResponse<T>
) => {
  res.status(statusCode).json(payload);
};
