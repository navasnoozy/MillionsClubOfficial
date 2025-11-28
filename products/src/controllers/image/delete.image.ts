import { BadRequestError, sendResponse } from '@millionsclub/shared-libs/server';
import { NextFunction, Request, Response } from 'express';
import cloudinary from '../../config/cloudnary';

const deleteCloudinaryImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { public_id } = req.query;

    if (!public_id || typeof public_id !== 'string') {
      throw new BadRequestError('No valid image id found');
    }


    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result !== 'ok') throw new BadRequestError('Image not found or already deleted');

    sendResponse(res, 200, { success: true });
  } catch (error) {
    console.log('Error while deleting image from cloudinary', error);
    next(error);
  }
};

export { deleteCloudinaryImage };
