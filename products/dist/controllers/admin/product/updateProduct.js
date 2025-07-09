import { BadRequestError, } from "@millionsclub/shared-libs";
import { Product } from "../../../models/productModel";
import { filterUndefined } from "../../../utils/filterUndefined";
const updateProduct = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const { title, brand, categoryId, subCategoryId, basePrice, description, isActive, variantIds, } = req.body;
        const existingProduct = await Product.findById(_id);
        if (!existingProduct)
            throw new BadRequestError("Product not found");
        const updateOperations = {
            ...filterUndefined({
                title,
                brand,
                categoryId,
                subCategoryId,
                basePrice,
                description,
                isActive,
            }),
            ...(variantIds?.length && {
                $addToSet: { variantIds: { $each: variantIds } },
            }),
        };
        await Product.findByIdAndUpdate(_id, updateOperations);
        res.status(200).send({ success: true });
        return;
    }
    catch (error) {
        console.error("Error occurred while updating product", error);
        next(error);
    }
};
export { updateProduct };
