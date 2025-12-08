// auth/src/controllers/signin.controller.ts
import { Request, Response } from "express";
import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { comparePassword } from "../utils/hashPassword";

import jwt from "jsonwebtoken";
import { Session } from "../models/sessionModel";
import { User } from "../models/userModel";

export const signinController = async (req: Request, res: Response) => {
  const body = req.body;

  const { email, password } = body;

  const user = await User.findOne({ email });

  if (!user || !user.email) {
    throw new BadRequestError("Invalid Email id or password");
  }

  if (!user.emailVerified) {
    throw new BadRequestError("Email id not verified");
  }

  const isPasswordMatch = await comparePassword(password, user.password!);
  if (!isPasswordMatch) {
    throw new BadRequestError("Invalid Email id or password");
  };

  if (user.status === 'blocked'){
     throw new ForbiddenError
  }

  const jwt_access_token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_KEY!,
    { expiresIn: "1m" }
  );

  const jwt_refresh_token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_KEY!,
    { expiresIn: "4m" }
  );

  await Session.create({ userId: user._id, refreshToken: jwt_refresh_token, lastUsedAt: new Date() });

  res.cookie("refresh_token", jwt_refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/users/refresh-token",
  });

  sendResponse(res, 200, { success: true, data: { accessToken: jwt_access_token } });

  return;
};
