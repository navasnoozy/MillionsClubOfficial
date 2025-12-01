import { AddProductSchema, BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { NextFunction, Request, Response } from "express";
import { Product } from "../../../models/productModel";
import { removeImageTags } from "../../../services/removeImageTags";
import { publish_product_created } from "../../../events/publishers/product-created";

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, brand, color, categoryId, subCategoryId, basePrice, images, description, isActive }: AddProductSchema = req.body;

    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      throw new BadRequestError("Product already exists", "title");
    }

    const publicIds = images?.map((img) => img.public_id) ?? [];
    if (publicIds.length > 0) {
      await removeImageTags(publicIds);
    }

    const newProductData: AddProductSchema = {
      title,
      brand,
      color,
      categoryId,
      subCategoryId,
      basePrice,
      images,
      description,
      isActive,
    };

    const newProduct = await Product.create(newProductData);

    if (newProduct) {
      publish_product_created({
        productId: newProduct._id.toString(),
        title: newProduct.title,
        basePrice: newProduct.basePrice || undefined,
        images: newProduct.images.map((item) => ({
          secure_url: item.secure_url || undefined,
          public_id: item.public_id || undefined,
        })),
        isActive: newProduct.isActive,
      });
    }

    sendResponse(res, 201, {
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error while adding product:", error);
    next(error);
  }
};

export { addProduct };
