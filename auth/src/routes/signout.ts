import { sendResponse } from "@millionsclub/shared-libs/server";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/users/signout", (req: Request, res: Response) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
    path: "/api/users/refresh-token",
  };

  res.clearCookie("refresh_token", cookieOptions);
  sendResponse(res, 200, { success: true });
  return;
});

export { router as signoutRouter };
