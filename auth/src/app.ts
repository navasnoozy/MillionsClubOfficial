// auth/src/app.ts
import { NotFoundError, errorHandler } from "@millionsclub/shared-libs/server";
import { toNodeHandler } from "better-auth/node";
import dotenv from "dotenv";
import express from "express";
import { auth } from "./config/auth";
import cookieSession from "cookie-session";

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
dotenv.config();

app.set("trust proxy", true);

// Invalid route error
app.all("*path", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
