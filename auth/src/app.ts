import { NotFoundError, currentUser, errorHandler, require_admin } from "@millionsclub/shared-libs/server";
import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { otpRoutes } from "./routes/otp.routes";
import { adminRoutes } from "./routes/admin.routes";
import { authRoutes } from "./routes/auth.routes";
import { verificationRoutes } from "./routes/verify-email.route";
// import seedUsers from "./data/dummyUsers";

dotenv.config();

export const createApp = async () => {
  const { auth } = await import("./config/auth"); // lazy import AFTER DB ready

  const app = express();

  app.use(currentUser);

  app.use(
    cors({
      origin: [
        "http://localhost:3000", // your React app
        "http://millionsclub.com", // optional local domain
      ],
      credentials: true, // allows cookies and authorization headers
    })
  );

  app.all("/api/auth/*splat", toNodeHandler(auth)); //the "*splat" latest express js v5 syntax

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.set("trust proxy", true);

  app.use("/api/users", authRoutes);
  app.use("/api/verify", verificationRoutes);
  app.use("/api/otp", otpRoutes);
  app.use("/api/admin", adminRoutes);

  app.all("*path", async () => {
    throw new NotFoundError();
  });

  app.use(errorHandler);

  //  seedUsers()

  return app;
};
