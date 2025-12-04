import { BadRequestError } from "@millionsclub/shared-libs/server";
import { NextFunction, Request, Response } from "express";
import { User } from "../../models/userModel";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const {limit} = req.query;

    const users = User.find().limit()


  } catch (error) {
    console.log("Error while fetching users", error);
    next("Error while fetching users");
  }
};
