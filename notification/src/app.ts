//src/app.ts

import { currentUser, errorHandler, NotFoundError } from "@millionsclub/shared-libs/server";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import otpRouter from "./routes/otp-routes";
import verificationRouter from "./routes/verification-routes";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("trust proxy", true);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://millionsclub.com", 
    ],
    credentials: true,
  })
);



app.use(currentUser);

app.use(otpRouter);
app.use(verificationRouter);

app.all("*path", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
