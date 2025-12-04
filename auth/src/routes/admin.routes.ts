import express from "express";

const router = express.Router();

router.get("/users");
router.patch("/users");
router.delete("/users");

export { router as adminRoutes };
