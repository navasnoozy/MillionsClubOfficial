// auth/src/app.ts
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import express from "express";
import { NotFoundError, errorHandler } from "@millionsclub/shared-libs";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();

app.use(express.json());
dotenv.config();

app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

// Invalid route error
app.all("*path", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
