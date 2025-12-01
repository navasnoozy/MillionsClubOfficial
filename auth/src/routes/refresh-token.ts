import { NotAuthorizedError, sendResponse } from "@millionsclub/shared-libs/server";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwt_payload } from "../interface/jwt_payload";
import { User } from "../models/userModel";
import { Session } from "../models/sessionModel";

const router = express.Router();

router.post("/api/users/refresh-token", async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? ("none" as const) : ("lax" as const),
    path: "/api/users/refresh-token",
  };

  if (!refreshToken) {
    throw new NotAuthorizedError();
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_KEY!) as jwt_payload;

    const session = await Session.findOne({
      userId: payload.id,
      refreshToken,
    });

    if (!session) {
      res.clearCookie("refresh_token", cookieOptions);
      throw new NotAuthorizedError();
    }

    const user = await User.findById(payload.id);

    if (!user) {
      await Session.deleteOne({ _id: session._id });
      res.clearCookie("refresh_token", cookieOptions);
      throw new NotAuthorizedError();
    }

    const new_jwt_access_token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_KEY!, { expiresIn: "15m" });

    const new_refresh_token = jwt.sign({ id: user.id }, process.env.JWT_KEY!, { expiresIn: "7d" });

    session.refreshToken = new_refresh_token;
    session.lastUsedAt = new Date();
    await session.save();

    res.cookie("refresh_token", new_refresh_token, {
      ...cookieOptions,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    sendResponse(res, 200, {
      success: true,
      data: { accessToken: new_jwt_access_token },
    });
  } catch (error) {
    console.log(error);
    res.clearCookie("refresh_token", cookieOptions);
    throw new NotAuthorizedError();
  }
});

export { router as refreshTokenRouter };
