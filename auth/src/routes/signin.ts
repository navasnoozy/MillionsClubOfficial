// auth/src/routes/signin.ts
import express from "express";
import { signinSchema, validateRequest, BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { comparePassword } from "../utils/hashPassword";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/users/signin", validateRequest(signinSchema), async (req, res) => {
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

  res.cookie("refresh_token", jwt_refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/users/refresh-token",
  });

  sendResponse(res, 200, { success: true, data: { accessToken: jwt_access_token } });

  return;
});

export { router as signinRouter };
