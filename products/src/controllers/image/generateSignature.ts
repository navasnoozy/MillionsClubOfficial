import { NextFunction, Request, Response } from 'express';
import cloudinary from '../../config/cloudnary';
import { CloudinarySignatureResponse, NotFoundError, sendResponse } from '@millionsclub/shared-libs/server';

const generateCloudinarySignature = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { folder } = req.query;
    const timestamp = Math.round(new Date().getTime() / 1000);

    const config = cloudinary.config();

    if (!config.api_secret) {
      throw new NotFoundError();
    }

    const paramsToSign = {
      folder,
      source: 'uw',
      tags:['temp'],
      timestamp,
    };

    const signature = cloudinary.utils.api_sign_request(paramsToSign, config.api_secret); 


    const data: CloudinarySignatureResponse = {
      timestamp,
      signature,
      cloud_name: process.env.CLOUDNARY_NAME!,
      api_key: process.env.CLOUDNARY_API_KEY!,
    };

    sendResponse(res, 201, { success: true, data: data });
  } catch (error) {
    console.log('Error occured while uploading image');
    next();
  }
};

export { generateCloudinarySignature };
