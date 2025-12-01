// backend // auth/src/routes/current-user.ts
import express from "express";
import { currentUser } from "@millionsclub/shared-libs/server";
import { currentUserController } from "../controllers/current-user.controller";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, currentUserController);

export { router as currentUserRouter };

