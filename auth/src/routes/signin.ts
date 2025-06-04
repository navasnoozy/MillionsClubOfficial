import express from "express";
import { signinSchema } from "../schemas/authSchema";
import { treeifyError } from "zod/v4";
import { User } from "../models/userModel";
import { comparePassword } from "../utils/hashPassword";

const router = express.Router();

router.get("/api/users/signin", async (req, res) => {
  const body = req.body;
  const validate = signinSchema.safeParse(body);

  if (!validate.success) {
    const error = treeifyError(validate.error);
    res.status(400).send({ success: false, error: error });
    return;
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
    throw Error ('')
  res.send('check')
});

export { router as signin };
