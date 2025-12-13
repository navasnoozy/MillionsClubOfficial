import { Response, NextFunction } from "express";
import { sendResponse, NotFoundError, idInput } from "@millionsclub/shared-libs/server";
import { Product } from "../../../models/productModel";
import { ValidatedRequest } from "../../../interfaces/ValidatedRequest";

/**
 * Get a single product by ID
 */
const getProduct = async (
  req: ValidatedRequest<void, void, idInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.validated.params;

    const product = await Product.findById(id)
      .populate("variantIds")
      .lean();

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    sendResponse(res, 200, {
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error occurred while retrieving product:", error);
    next(error);
  }
};

export { getProduct };
