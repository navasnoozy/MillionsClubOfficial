import { Router } from "express";

import { deleteCloudinaryImage } from "../controllers/image/deleteImage";
import { getCloudinaryConfig } from "../controllers/image/getCloudinaryConfig";
import { generateCloudinarySignature } from "../controllers/image/generateCloudinarySignature";


const imageRouter = Router();

imageRouter.get("/api/image/config", getCloudinaryConfig);
imageRouter.post("/api/image/signature", generateCloudinarySignature);
imageRouter.delete("/api/image", deleteCloudinaryImage);

export default imageRouter;
