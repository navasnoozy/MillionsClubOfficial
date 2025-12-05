import express from "express";
import { currentUser, signinSchema, signupSchema, validateRequest } from "@millionsclub/shared-libs/server";
import { currentUserController } from "../controllers/current-user";
import { refreshTokenController } from "../controllers/refresh-token";
import { signinController } from "../controllers/signin";
import { signoutController } from "../controllers/signout";
import { signupController } from "../controllers/signup";

const router = express.Router();

router.post("/signup", validateRequest(signupSchema), signupController);
router.post("/signin", validateRequest(signinSchema), signinController);

router.get("/signout", signoutController);

router.get("/currentuser", currentUser, currentUserController);

router.post("/refresh-token", refreshTokenController);

export { router as authRoutes };
