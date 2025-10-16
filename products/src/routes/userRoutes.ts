//products/src/routes/userRoutes.ts

import { Router } from "express";
import { getProduct } from "../controllers/getProduct";
import { listCategory } from "../controllers/listCategory";
import { listProducts } from "../controllers/listProducts";
import { listSubCategory } from "../controllers/listSubCategory";

const userRouter = Router();

//PRODUCT
userRouter.get(
  "/api/products/list",
  listProducts
);
userRouter.get("/api/products/:id", getProduct);

//CATEGORIES
userRouter.get("/api/products/category/list", listCategory);

userRouter.get("/api/products/category/list", listSubCategory);

export default userRouter;
