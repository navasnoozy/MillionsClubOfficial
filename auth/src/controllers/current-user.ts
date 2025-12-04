// auth/src/controllers/current-user.controller.ts
import { Request, Response } from "express";

export const currentUserController = (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};
