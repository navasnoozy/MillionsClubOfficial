import { BadRequestError } from "@millionsclub/shared-libs";
import { Product } from "../../models/productModel";
import mongoose from "mongoose";
const getProduct = async (req, res, next) => {
    try {
        const _id = req.params.id;
        if (!_id)
            throw new BadRequestError("Please provide product id");
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            throw new BadRequestError("Invalid id");
        }
        const product = await Product.findById(_id);
        if (!product) {
            throw new BadRequestError('Product not found');
        }
        res.status(404).send({ success: true, data: product });
        return;
    }
    catch (error) {
        console.error("Error occured while fetching a product", error);
        next(error);
    }
};
export { getProduct };
