import { Router } from "express";
import { generateCloudinarySignature } from "../controllers/image/generateSignature";
import { deleteCloudinaryImage } from "../controllers/image/deleteImage";


const imageRouter = Router();

imageRouter.get("/api/image/signature", generateCloudinarySignature);
imageRouter.delete("/api/image", deleteCloudinaryImage);

export default imageRouter;
