import express from "express";
import { refreshTokenController } from "../controllers/refresh-token.controller";

const router = express.Router();

router.post("/api/users/refresh-token", refreshTokenController);

export { router as refreshTokenRouter };

