import { Response, NextFunction } from "express";
import { sendResponse, ProductQueryInput } from "@millionsclub/shared-libs/server";
import { Product } from "../../../models/productModel";
import { ValidatedRequest } from "../../../interfaces/ValidatedRequest";
import mongoose from "mongoose";



const getProducts = async (req: ValidatedRequest<void, ProductQueryInput>, res: Response, next: NextFunction) => {
  try {

    const { page, limit, search, subCategoryId, brand, color, minPrice, maxPrice, isActive, sort } = req.validated.query;

    const skip = (page - 1) * limit;


    const filter: Record<string, unknown> = {};


    if (search && search.trim()) {
      const searchTerms = search.trim().split(/\s+/);

      const searchConditions = searchTerms.map((term) => ({
        $or: [{ title: { $regex: term, $options: "i" } }, { brand: { $regex: term, $options: "i" } }, { color: { $regex: term, $options: "i" } }],
      }));

      filter.$and = searchConditions;
    }

    // Filter by subcategory
    if (subCategoryId) {
      filter.subCategoryId = new mongoose.Types.ObjectId(subCategoryId);
    }

    // Filter by brand (exact or partial match)
    if (brand) {
      filter.brand = { $regex: brand, $options: "i" };
    }

    // Filter by color
    if (color) {
      filter.color = { $regex: color, $options: "i" };
    }

    // Filter by price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.basePrice = {};
      if (minPrice !== undefined) {
        (filter.basePrice as Record<string, number>).$gte = minPrice;
      }
      if (maxPrice !== undefined) {
        (filter.basePrice as Record<string, number>).$lte = maxPrice;
      }
    }

    // Filter by product active status
    if (isActive !== undefined) {
      filter.isActive = isActive;
    }

    // Build sort options
    let sortOptions: Record<string, 1 | -1> = {};
    switch (sort) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "price_asc":
        sortOptions = { basePrice: 1 };
        break;
      case "price_desc":
        sortOptions = { basePrice: -1 };
        break;
      case "name_asc":
        sortOptions = { title: 1 };
        break;
      case "name_desc":
        sortOptions = { title: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    const [products, total] = await Promise.all([Product.find(filter).sort(sortOptions).skip(skip).limit(limit).populate("variantIds").lean(), Product.countDocuments(filter)]);

    const totalPages = Math.ceil(total / limit);

    sendResponse(res, 200, {
      success: true,
      data: {
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error occurred while retrieving products:", error);
    next(error);
  }
};

export { getProducts };
