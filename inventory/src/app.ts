//src/app.ts

import { currentUser, errorHandler, NotFoundError, require_admin } from "@millionsclub/shared-libs/server";
import dotenv from "dotenv";
import express from "express";
import imageRoutes from "./routes/Admin/image.routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import { categoryRoutes } from "./routes/Admin/category.routes";
import { productRoutes } from "./routes/Admin/product.routes";
import { publicRoutes } from "./routes/public.routes";
import { subCategoryRouter } from "./routes/Admin/subCategory.routes";
import { productVariantRoutes } from "./routes/Admin/variant.routes";
import seedDatabase from "./data/dummydata"


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

app.use("/api/inventory", publicRoutes);
app.use("/api/inventory/admin",  productRoutes);
app.use("/api/inventory/admin",require_admin, categoryRoutes);
app.use("/api/inventory/admin",require_admin,  imageRoutes);
app.use("/api/inventory/admin",require_admin,  subCategoryRouter);
app.use('/api/inventory/admin',require_admin, productVariantRoutes);

app.all("*path", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

// seedDatabase

export { app };
