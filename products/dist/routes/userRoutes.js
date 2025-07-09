import { Router } from "express";
import { getProduct } from "../controllers/user/getProduct";
import { listProducts } from "../controllers/user/listProducts";
const userRouter = Router();
userRouter.get("/api/products/list", listProducts);
userRouter.get("/api/products/:id", getProduct);
export default userRouter;
