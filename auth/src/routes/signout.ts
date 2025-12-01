import express from "express";
import { signoutController } from "../controllers/signout.controller";

const router = express.Router();

router.get("/api/users/signout", signoutController);

export { router as signoutRouter };

