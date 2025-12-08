//src/controllers/admin/delete-user.ts

import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { NextFunction, Request, Response } from "express";
import { User } from "../../models/userModel";
import { cookieOptions } from "../../config/cookieOptions";

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      { new: true }
    );

    if (!deletedUser) {
      throw new BadRequestError("User not found");
    }

    res.clearCookie("refresh_token", cookieOptions);

    sendResponse(res, 200, { success: true, message: "The user has been deleted." });
    return;
  } catch (error) {
    next(error);
  }
};

export { deleteUser };
