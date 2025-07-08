import { errorHandler, NotFoundError } from "@millionsclub/shared-libs";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import express from "express";
import { getProductRouter } from "./routes/product/getProduct";

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

app.use(getProductRouter)

app.all("*path", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
