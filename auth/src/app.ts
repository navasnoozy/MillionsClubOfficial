import express from "express";
import { NotFoundError, errorHandler } from "@millionsclub/shared-libs/server";
import { toNodeHandler } from "better-auth/node";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/current-user";
import cors from "cors";

dotenv.config();

export const createApp = async () => {
  const { auth } = await import("./config/auth"); // lazy import AFTER DB ready

  const app = express();

  app.use(
    cors({
      origin: [
        "http://localhost:3000", // your React app
        "http://millionsclub.com", // optional local domain
      ],
      credentials: true, // allows cookies and authorization headers
    })
  );

  app.use(
    cookieSession({
      httpOnly: true,
      signed: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
  );
  app.use(signupRouter);
  app.use(signinRouter);
  app.use(signoutRouter);
  app.use(currentUserRouter);

  app.all("/api/auth/*splat", toNodeHandler(auth)); //the "*splat" latest express js v5 syntax

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set("trust proxy", true);

  app.all("*path", async () => {
    throw new NotFoundError();
  });

  app.use(errorHandler);

  return app;
};
