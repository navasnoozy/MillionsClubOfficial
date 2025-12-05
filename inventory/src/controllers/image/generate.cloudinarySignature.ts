import { NextFunction, Request, Response } from 'express';
import cloudinary from '../../config/cloudnary';
import { sendResponse, BadRequestError } from '@millionsclub/shared-libs/server';

const generateCloudinarySignature = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req.body;
    
    if (!params) {
      throw new BadRequestError('Parameters to sign are required');
    }


    const config = cloudinary.config();
    
    if (!config.api_secret) {
      throw new Error('Cloudinary API secret not configured');
    }

    const signature = cloudinary.utils.api_sign_request(params, config.api_secret);
    

    const data = {
      signature,
    };

    sendResponse(res, 200, { success: true, data: data });
  } catch (error) {
    console.log('Error occurred while generating signature:', error);
    next(error);
  }
};

export { generateCloudinarySignature };
