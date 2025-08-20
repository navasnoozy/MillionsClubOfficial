//products/src/routes/userRoutes.ts

import { Router } from "express";
import { getProduct } from "../controllers/user/getProduct";
import { listCategory } from "../controllers/user/listCategory";
import { listProducts } from "../controllers/user/listProducts";
import { listSubCategory } from "../controllers/user/listSubCategory";
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
