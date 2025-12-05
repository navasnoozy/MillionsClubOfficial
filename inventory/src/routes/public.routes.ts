//products/src/routes/userRoutes.ts

import { Router } from "express";
import { getProduct } from "../controllers/getProduct";
import { listCategory } from "../controllers/listCategory";
import { listProducts } from "../controllers/listProducts";
import { listSubCategory } from "../controllers/listSubCategory";

const router = Router();

router.get("/products", listProducts);

router.get("/category", listCategory);

router.get("/subcategory", listSubCategory);

router.get("/products/:id", getProduct);

export { router as publicRoutes };
