//src/app.ts

import { currentUser, errorHandler, NotFoundError } from "@millionsclub/shared-libs/server";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import express from "express";
import otpRouter from "./routes/otpRouter";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use((re,res, next) => {
  console.log("app is running");
  next();
});

app.use(currentUser);

app.use(otpRouter);

app.all("*path", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
