import { Router } from "express";
import { getProduct } from "../controllers/user/getProduct";
import { listProducts } from "../controllers/user/listProducts";
const userRouter = Router();

userRouter.get("/api/products/listproducts", listProducts);
userRouter.get("/api/products/listproducts", getProduct);

export default userRouter;
