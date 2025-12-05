//products/src/routes/userRoutes.ts

import { Router } from "express";
import { getProduct } from "../controllers/getProduct";
import { listCategory } from "../controllers/listCategory";
import { listProducts } from "../controllers/listProducts";
import { listSubCategory } from "../controllers/listSubCategory";

const router = Router();

router.get("/api/products", listProducts);

router.get("/api/products/category", listCategory);

router.get("/api/products/subcategory", listSubCategory);

router.get("/api/products/:id", getProduct);

export { router };
