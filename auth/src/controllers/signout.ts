// auth/src/controllers/signout.controller.ts
import { Request, Response } from "express";
import { sendResponse } from "@millionsclub/shared-libs/server";
import { cookieOptions } from "../config/cookieOptions";

export const signoutController = (req: Request, res: Response) => {
  res.clearCookie("refresh_token", cookieOptions);
  sendResponse(res, 200, { success: true });
  return;
};
