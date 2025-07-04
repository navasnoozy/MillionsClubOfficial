// auth/src/routes/signup.ts
import express from "express";
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest, signupSchema } from "@millionsclub/shared-libs";
import { User } from "../models/userModel";
import { hashPassword } from "../utils/hashPassword";

const router = express.Router();

router.post(
  "/api/users/signup",
  validateRequest(signupSchema),
  async (req, res) => {
    const body = req.body;
    const { name, email, password } = body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already in use","email");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = User.build({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

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

    res.status(201).send({ message: "success", user: user });
    return;
  }
);

export { router as signupRouter };
