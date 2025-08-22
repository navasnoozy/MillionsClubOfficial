import { errorHandler, NotFoundError } from "@millionsclub/shared-libs/server";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import express from "express";
import adminRouter from "./routes/adminRoutes";
import userRouter from "./routes/userRoutes";
import imageRouter from "./routes/imageRoutes";

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


app.use(adminRouter);
app.use(userRouter);
app.use(imageRouter);

app.all("*path", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
