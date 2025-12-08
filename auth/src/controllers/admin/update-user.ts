import { BadRequestError, sendResponse, updateUserInput } from "@millionsclub/shared-libs/server";
import { NextFunction, Response } from "express";
import { User, UserAttrs } from "../../models/userModel";
import { ValidatedRequest } from "../../interface/ValidatedReq";

const updateUser = async (req: ValidatedRequest<updateUserInput>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.validated.params;

    const { name, email, role, status, emailVerified } = req.validated.body;

    const updatePayload: Partial<UserAttrs> = {};

    if (name) updatePayload.name = name;
    if (email) updatePayload.email = email;
    if (role) updatePayload.role = role;
    if (status) updatePayload.status = status;
    if (emailVerified) updatePayload.status = status;

    // 2. Perform the Update
    const user = await User.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new BadRequestError("User not found");
    }

    sendResponse(res, 200, { success: true, data: user, message: "User updated successfully" });
    return;
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new BadRequestError("This email is already in use by another active user."));
    }

    next(error);
  }
};

export { updateUser };
