import express from "express";
import { currentUser, signinSchema, signupSchema, validateRequest } from "@millionsclub/shared-libs/server";
import { currentUserController } from "../controllers/current-user.controller";
import { refreshTokenController } from "../controllers/refresh-token.controller";
import { signinController } from "../controllers/signin.controller";
import { signoutController } from "../controllers/signout.controller";
import { signupController } from "../controllers/signup.controller";

const router = express.Router();

router.get("/currentuser", currentUser, currentUserController);
router.post("/refresh-token", refreshTokenController);
router.post("/signin", validateRequest(signinSchema), signinController);
router.get("/signout", signoutController);
router.post("/signup", validateRequest(signupSchema), signupController);

export { router as authRoutes };
