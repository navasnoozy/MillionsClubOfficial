// backend // auth/src/routes/current-user.ts
import express from "express";
import { currentUser } from "@millionsclub/shared-libs";

const router = express.Router();

router.get("/api/users/currentuser",currentUser, (req, res) => {
     
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
