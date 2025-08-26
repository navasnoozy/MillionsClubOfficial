// products/src/controllers/admin/product/addProduct.ts
import { AddProductSchema, BadRequestError, sendResponse } from '@millionsclub/shared-libs/server';
import { NextFunction, Request, Response } from 'express';
import { Product } from '../../../models/productModel';
import { publishProductCreated } from '../../../events/publishers/pub.productCreated';
import { removeImageTags } from '../../../services/removeImageTags';

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, brand, categoryId, subCategoryId, basePrice, images, description, isActive }: AddProductSchema =
      req.body;

    const existingProduct = await Product.findOne({ title: title });

    if (existingProduct) {
      throw new BadRequestError('Product already exist', 'title');
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

    const public_ids: string[] = images?.map((img) => img.public_id) ?? [];

    if (public_ids.length > 0) {
      const result = await removeImageTags(public_ids);
    }

    const newProduct = await Product.create(newProductData);

    await publishProductCreated({
      productId: newProduct.id,
      title: newProduct.title,
    });

    sendResponse(res, 201, { success: true, message: 'Product created success', data: newProduct });
  } catch (error) {
    console.log('Error while adding product', error);
    next(error);
  }
};

export { addProduct };
