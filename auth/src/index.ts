import express from "express";
import { signup } from "./routes/signup";
import { signin } from "./routes/signin";
import { signout } from "./routes/signout";
import { currentUser } from "./routes/current-user";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/not-found-error";
import connectDB from "./config/db";
import cookieSession from "cookie-session";

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

app.use(signup);
app.use(signin);
app.use(signout);
app.use(currentUser);

// Invalid route error
app.all("*path", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(port, () => {
  console.log("server running on", port);
  connectDB();
});
