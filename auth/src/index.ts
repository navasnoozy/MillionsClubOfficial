import cookieSession from "cookie-session";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/errorHandler";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { currentUserRouter } from "./routes/current-user";

const app = express();

const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log("server running on", port);
  connectDB();
});
