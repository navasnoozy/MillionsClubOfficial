import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '@millionsclub/shared-libs/server';

const getCloudinaryConfig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      cloud_name: process.env.CLOUDNARY_NAME!,
      api_key: process.env.CLOUDNARY_API_KEY!,
    };

    sendResponse(res, 200, { success: true, data: data });
  } catch (error) {
    console.log('Error occurred while getting Cloudinary config');
    next(error);
  }
};

export { getCloudinaryConfig };
