import { errorHandler, NotFoundError } from "@millionsclub/shared-libs";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import express from "express";
import { adminRouter } from "./routes/adminRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(adminRouter);

app.all("*path", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
