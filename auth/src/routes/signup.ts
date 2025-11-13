// auth/src/routes/signup.ts
import express from "express";
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest, signupSchema, sendResponse } from "@millionsclub/shared-libs/server";
import { User } from "../models/userModel";
import { hashPassword } from "../utils/hashPassword";
import { publishUserCreated } from "../events/publishers/pub.userCreated";

const signupRouter = express.Router();
signupRouter.post(
  "/api/users/signup",
  (req, res, next) => {
    const data = req.body
    console.log("////// in signup router with data///////", JSON.stringify(data));

    next();
  },
  validateRequest(signupSchema),
  async (req, res) => {
    console.log("//// reached in signup//////");

    const body = req.body;
    const { name, email, password } = body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already in use", "email");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = User.build({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    await publishUserCreated({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: "user",
    });

    const jwt_token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: jwt_token,
    };

    sendResponse(res, 201, { success: true });
    return;
  }
);

export { signupRouter };
