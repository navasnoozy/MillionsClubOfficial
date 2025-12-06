//auth/src/controllers/admin/get-users.ts

import { PaginationInput, sendResponse } from "@millionsclub/shared-libs/server";
import { NextFunction, Request, Response } from "express";
import { User } from "../../models/userModel";
import { ValidatedRequest } from "../../interface/ValidatedReq";

const getUsers = async (req: ValidatedRequest<void, PaginationInput>, res: Response, next: NextFunction) => {
  try {
    let { limit, page, search, isActive, role } = req.validated.query;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const query = search
      ? {
          isActive: isActive === "true" ? "true" : undefined,
          role: role,
          $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }],
        }
      : {};

    const users = await User.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });

    const count = await User.countDocuments(query);

    sendResponse(res, 200, { success: true, data: users, count });
    return;
  } catch (error) {
    console.log("Error while fetching users", error);
    next(error);
  }
};

export { getUsers };
