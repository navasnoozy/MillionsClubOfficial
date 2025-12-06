import { PaginationInput, sendResponse } from "@millionsclub/shared-libs/server";
import { NextFunction, Request, Response } from "express";
import { User } from "../../models/userModel";

type GetUsersRequest =  Request<{}, {}, {}, PaginationInput>;

const getUsers = async (req: GetUsersRequest, res: Response, next: NextFunction) => {

  
  try {
    const { limit, page, search } = req.query;
      console.log('...../////// items', typeof limit, typeof page, search);

    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }],
        }
      : {};

    const users = await User.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });

    const count = await User.countDocuments(query);

    sendResponse(res, 200, { success: true, data: users });
    return
  } catch (error) {
    console.log("Error while fetching users", error);
    next(error);
  }
};

export { getUsers };
