// auth/src/routes/signup.ts
import express from "express";
import { signupSchema } from "../schemas/authSchema";
import { hashPassword } from "../utils/hashPassword";
import { User } from "../models/userModel";
import { RequestValidationError } from "../errors/reqValidationError";
import { BadRequestError } from "../errors/Bad-requestError";
import jwt  from "jsonwebtoken";

const router = express.Router();

router.post("/api/users/signup", async (req, res) => {
  
  const body = req.body;
  const validate = signupSchema.safeParse(body);

  if (!validate.success) {
    throw new RequestValidationError(validate.error);
  }

  const { name, email, password } = body;
   
  const existingUser = await User.findOne({email});

  if (existingUser){
    throw new BadRequestError('Email already in use')
  }

  const hashedPassword = await hashPassword(password);

  const newUser = User.build({
      name,
      email,
      password: hashedPassword
  })

  const user = await newUser.save();

   const userJWT = jwt.sign({
      id:user._id,
      email:user.email
   },process.env.JWT_KEY!);

   req.session = {
    jwt : userJWT
   };

   res.status(201).send({message:'success',user:user})
});

export { router as signup };
