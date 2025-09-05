import { Router } from "express";

import { deleteCloudinaryImage } from "../controllers/image/deleteImage";
import { getCloudinaryConfig } from "../controllers/image/getCloudinaryConfig";
import { generateCloudinarySignature } from "../controllers/image/generateCloudinarySignature";
import { requireAdmin } from "@millionsclub/shared-libs/server";


const imageRouter = Router();

imageRouter.get("/api/image/config",requireAdmin, getCloudinaryConfig);
imageRouter.post("/api/image/signature",requireAdmin, generateCloudinarySignature);
imageRouter.delete("/api/image",requireAdmin, deleteCloudinaryImage);

export default imageRouter;
