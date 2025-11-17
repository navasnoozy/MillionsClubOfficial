import { Router } from "express";

import { deleteCloudinaryImage } from "../controllers/image/deleteImage";
import { getCloudinaryConfig } from "../controllers/image/getCloudinaryConfig";
import { generateCloudinarySignature } from "../controllers/image/generateCloudinarySignature";
import { require_admin } from "@millionsclub/shared-libs/server";


const imageRouter = Router();

imageRouter.get("/api/image/config",require_admin, getCloudinaryConfig);
imageRouter.post("/api/image/signature",require_admin, generateCloudinarySignature);
imageRouter.delete("/api/image",require_admin, deleteCloudinaryImage);

export default imageRouter;
