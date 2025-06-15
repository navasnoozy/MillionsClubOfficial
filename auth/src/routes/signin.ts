// auth/src/routes/signin.ts
import express from "express";
import { RequestValidationError } from "../errors/reqValidationError";
import { signinSchema } from "../schemas/authSchema";
import { comparePassword } from "../utils/hashPassword";
import { User } from "../models/userModel";
import { DBConnectionError } from "../errors/db-connectionError";

const router = express.Router();

router.get("/api/users/signin", async (req, res) => {
  const body = req.body;
  const validate = signinSchema.safeParse(body);

  if (!validate.success) {
    throw new RequestValidationError(validate.error);
  }

  const { email, password } = body;
  const user = await User.findOne({ email });

  if (!user || !user.email) {
    res
      .status(404)
      .send({ success: false, error: "Invalid email id or password" });
    return;
  }

  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    res
      .status(404)
      .send({ success: false, error: "Invalid email id or password" });
    return;
  }

  res.send(user);
});

export { router as signin };
