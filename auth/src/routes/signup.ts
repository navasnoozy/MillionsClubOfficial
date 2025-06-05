import express from "express";
import { signupSchema } from "../schemas/authSchema";
import { treeifyError, ZodError } from "zod/v4";
import { hashPassword } from "../utils/hashPassword";
import { User } from "../models/userModel";
import { RequestValidationError } from "../errors/req.validation-error";

const router = express.Router();

router.post("/api/users/signup", async (req, res) => {
  const body = req.body;
  const validate = signupSchema.safeParse(body);

  if (!validate.success) {
    const error = treeifyError(validate.error);
    throw new RequestValidationError(validate.error);
  }

  const { name, email, password } = body;
  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  const status = await newUser.save();

  res.status(201).send(status);
});

export { router as signup };
