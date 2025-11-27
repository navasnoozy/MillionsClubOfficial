import { NotFoundError, errorHandler } from "@millionsclub/shared-libs/server";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import cookieParser from "cookie-parser";
import { refreshTokenRouter } from "./routes/refresh-token";

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

  app.all("/api/auth/*splat", toNodeHandler(auth)); //the "*splat" latest express js v5 syntax

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.set("trust proxy", true);

  app.use(signupRouter);
  app.use(signinRouter);
  app.use(signoutRouter);
  app.use(currentUserRouter);
  app.use(refreshTokenRouter);

  app.all("*path", async () => {
    throw new NotFoundError();
  });

  app.use(errorHandler);

  return app;
};
