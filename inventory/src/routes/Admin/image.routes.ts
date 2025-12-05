import { Router } from "express";

import { deleteCloudinaryImage } from "../../controllers/image/delete.image";
import { getCloudinaryConfig } from "../../controllers/image/get.cloudinaryConfig";
import { generateCloudinarySignature } from "../../controllers/image/generate.cloudinarySignature";
import { require_admin } from "@millionsclub/shared-libs/server";

const imageRoutes = Router();

imageRoutes.get("/image/config",  getCloudinaryConfig);
imageRoutes.post("/image/signature",  generateCloudinarySignature);
imageRoutes.delete("/image",  deleteCloudinaryImage);

export default imageRoutes;
