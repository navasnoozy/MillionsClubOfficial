// auth/src/controllers/signout.controller.ts
import { Request, Response } from "express";
import { sendResponse } from "@millionsclub/shared-libs/server";

export const signoutController = (req: Request, res: Response) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
    path: "/api/users/refresh-token",
  };

  res.clearCookie("refresh_token", cookieOptions);
  sendResponse(res, 200, { success: true });
  return;
};
