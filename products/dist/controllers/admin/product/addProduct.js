// products/src/controllers/admin/product/addProduct.ts
import { BadRequestError } from "@millionsclub/shared-libs";
import { Product } from "../../../models/productModel";
const addProduct = async (req, res, next) => {
    try {
        const { title, brand, categoryId, subCategoryId, basePrice, description, isActive, } = req.body;
        const existingProduct = await Product.findOne({ title: title });
        if (existingProduct) {
            throw new BadRequestError("Product already exist", "title");
        }
        const newProductData = {
            title,
            brand,
            categoryId,
            subCategoryId,
            basePrice,
            description,
            isActive,
        };
        const newProduct = await Product.create(newProductData);
        res.status(201).send({ success: true, data: newProduct });
    }
    catch (error) {
        console.log("Error while adding product", error);
        next(error);
    }
};
export { addProduct };
