import express from "express";
import { NotFoundError, errorHandler } from "@millionsclub/shared-libs/server";
import { toNodeHandler } from "better-auth/node";
import cookieSession from "cookie-session";
import dotenv from "dotenv";

dotenv.config();

export const createApp = async () => {
  const { auth } = await import("./config/auth"); // lazy import AFTER DB ready

  const app = express();

  app.use(
    cookieSession({
      httpOnly: true,
      signed: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
  );

  app.all("/api/auth/*splat", toNodeHandler(auth));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.set("trust proxy", true);

  app.all("*path", async () => {
    throw new NotFoundError();
  });

  app.use(errorHandler);

  return app;
};
