// auth/src/routes/signin.ts
import express from "express";
import {
  signinSchema,
  validateRequest,
  BadRequestError,
} from "@millionsclub/shared-libs";
import { comparePassword } from "../utils/hashPassword";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  validateRequest(signinSchema),
  async (req, res) => {
    const body = req.body;

    const { email, password } = body;
    const user = await User.findOne({ email });

    if (!user || !user.email) {
      throw new BadRequestError("Invalid Email id or password");
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestError("Invalid Email id or password");
    }

    if (isPasswordMatch) {
      const jwt_token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );

      req.session = {
        jwt: jwt_token,
      };
    }

    res.status(200).send({success: true});
    return;
  }
);

export { router as signinRouter };
