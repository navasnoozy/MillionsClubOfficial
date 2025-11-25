//src/app.ts

import { currentUser, errorHandler, NotFoundError } from "@millionsclub/shared-libs/server";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
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
      "http://localhost:3000", // your React app
      "http://millionsclub.com", // optional local domain
    ],
    credentials: true, // allows cookies and authorization headers
  })
);



app.use(currentUser);

app.all("*path", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
