
import {
  AddProductSchema,
  BadRequestError,
  sendResponse,
} from '@millionsclub/shared-libs/server';
import { NextFunction, Request, Response } from 'express';
import { Product } from '../../../models/productModel';
import { removeImageTags } from '../../../services/removeImageTags';

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      brand,
      categoryId,
      subCategoryId,
      basePrice,
      images,
      description,
      isActive,
    }: AddProductSchema = req.body;

    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      throw new BadRequestError('Product already exists', 'title');
    }

    const newProductData: AddProductSchema = {
      title,
      brand,
      categoryId,
      subCategoryId,
      basePrice,
      images,
      description,
      isActive,
    };

    const publicIds = images?.map((img) => img.public_id) ?? [];
    if (publicIds.length > 0) {
      await removeImageTags(publicIds);
    }

    const newProduct = await Product.create(newProductData);

    sendResponse(res, 201, {
      success: true,
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    console.error('Error while adding product:', error);
    next(error);
  }
};

export { addProduct };
