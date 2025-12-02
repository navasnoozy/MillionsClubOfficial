// auth/src/controllers/refresh-token.controller.ts
import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError, sendResponse } from "@millionsclub/shared-libs/server";
import jwt from "jsonwebtoken";
import { jwt_payload } from "../interface/jwt_payload";

import { Session } from "../models/sessionModel";
import { cookieOptions } from "../config/cookieOptions";
import { User } from "../models/userModel";

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refresh_token;

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
    next(error);
  }
};
