import { NextFunction, Request, Response } from "express";
import cloudinary from "../../config/cloudnary";
import { CloudinarySignatureResponse, NotFoundError } from "@millionsclub/shared-libs";

const generateCloudinarySignature = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { folder } = req.query;
    const timestamp = Math.round(new Date().getTime() / 1000);

    const config = cloudinary.config();

    if (!config.api_secret) {
      throw new NotFoundError();
    }

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      config.api_secret
    );

    const data : CloudinarySignatureResponse = {
        timestamp,
      signature,
      cloud_name: process.env.CLOUDNARY_NAME!,
      api_key: process.env.CLOUDNARY_API_KEY!,
    }

    res.status(200).send(data);
  } catch (error) {
    console.log("Error occured while uploading image");
    next();
  }
};

export { generateCloudinarySignature };
