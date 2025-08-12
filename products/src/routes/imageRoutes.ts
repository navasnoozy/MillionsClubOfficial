import { Router } from "express";
import { generateCloudinarySignature } from "../controllers/image/uploadImage";

const imageRouter = Router();

imageRouter.get("/api/image/signature", generateCloudinarySignature);

export default imageRouter;
