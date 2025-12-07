//auth/src/controllers/admin/get-users.ts

import { PaginationInput, sendResponse } from "@millionsclub/shared-libs/server";
import { NextFunction, Response } from "express";
import { User } from "../../models/userModel";
import { ValidatedRequest } from "../../interface/ValidatedReq";

const getUsers = async (req: ValidatedRequest<void, PaginationInput>, res: Response, next: NextFunction) => {
  try {
    let { limit, page, search, status, role } = req.validated.query;

  
    const skip = (page - 1) * limit;

    const query: any = {};

    if (status !== undefined) {
      query.status = status;
    }

    if (role) {
      query.role = role;
    }

    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }];
    }

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
