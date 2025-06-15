// auth/src/routes/signin.ts
import express from "express";
import { signinSchema } from "../schemas/authSchema";
import { comparePassword } from "../utils/hashPassword";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/requestValidation";

const router = express.Router();

router.get("/api/users/signin",validateRequest(signinSchema), async (req, res) => {
  const body = req.body;

  const { email, password } = body;
  const user = await User.findOne({ email });

  if (!user || !user.email) {
    res.status(404).send("");
    return;
  }

  const isPasswordMatch = await comparePassword(password, user.password);
  if (!isPasswordMatch) {
    res
      .status(404)
      .send({ success: false, error: "Invalid email id or password" });
    return;
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

  res.send(user);
});

export { router as signin };
