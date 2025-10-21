// src/routes/routes.ts
import { requireAuth } from "@millionsclub/shared-libs/server";
import { Router } from "express";
import { sendMail } from "../controllers/sendMail";

const router = Router();

router.post("/sendmail", requireAuth, sendMail);

export default router;