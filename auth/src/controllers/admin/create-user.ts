import { NextFunction, Response } from "express";
import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { ValidatedRequest } from "../../interface/ValidatedReq";
import { User } from "../../models/userModel";

export const createUser = async (
  req: ValidatedRequest<CreateUserInput>, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { name, email, password, role, status, emailVerified } = req.validated.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email already in use", "email");
    }

    // Model hook handles hashing automatically
    const newUser = User.build({
      name,
      email,
      password, // Plain password
      role: role || "customer",
      status: status || "active",
      // Admin created users are verified by default unless specified otherwise
      emailVerified: emailVerified ?? true, 
      providers: ["credentials"],
    });

    const user = await newUser.save();

    sendResponse(res, 201, {
      success: true,
      data: user,
      message: "User created successfully",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new BadRequestError("Email already in use"));
    }
    next(error);
  }
};