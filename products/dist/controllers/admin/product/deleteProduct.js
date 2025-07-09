import { BadRequestError } from "@millionsclub/shared-libs";
import { Product } from "../../../models/productModel";
const deleteProduct = async (req, res, next) => {
    try {
        const _id = req.params.id;
        if (_id)
            throw new BadRequestError("Please provide product id");
        const product = Product.findByIdAndDelete(_id);
        if (!product)
            throw new BadRequestError('No product found');
        res.status(404).send({ success: true, data: product });
        return;
    }
    catch (error) {
        console.error("Error occured while fetching product");
        next(error);
    }
};
export { deleteProduct };
