// auth/src/routes/signup.ts
import express from "express";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  validateRequest,
  signupSchema,
} from "@millionsclub/shared-libs";
import { User } from "../models/userModel";
import { hashPassword } from "../utils/hashPassword";
import { producer } from "../config/kafka.client";
// import { publishUserCreated } from "../events/publishers/pub.userCreated";

const router = express.Router();

router.post(
  "/api/users/signup",
  validateRequest(signupSchema),
  async (req, res) => {
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

    // await publishUserCreated({
    //   userId: user.id,
    //   name: user.name,
    //   email: user.email,
    //   role: "user",
    // });

    // In signup route:
    try {
      await producer.send({
        topic: "user.created",
        messages: [
          {
            key: user.id, // Add key for better partitioning
            value: JSON.stringify({
              userId: user.id,
              name: user.name,
              email: user.email,
            }),
          },
        ],
      });
    } catch (kafkaError) {
      console.error("Kafka publish failed:", kafkaError);
      // Continue with response - don't fail user registration
    }

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

    res.status(201).send({ success: "true" });
    return;
  }
);
