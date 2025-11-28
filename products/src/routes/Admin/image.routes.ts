import { Router } from "express";

import { deleteCloudinaryImage } from "../../controllers/image/delete.image";
import { getCloudinaryConfig } from "../../controllers/image/get.cloudinaryConfig";
import { generateCloudinarySignature } from "../../controllers/image/generate.cloudinarySignature";
import { require_admin } from "@millionsclub/shared-libs/server";

const imageRoutes = Router();

imageRoutes.get("/api/image/config", require_admin, getCloudinaryConfig);
imageRoutes.post("/api/image/signature", require_admin, generateCloudinarySignature);
imageRoutes.delete("/api/image", require_admin, deleteCloudinaryImage);

export default imageRoutes;
