import { Product } from "../../models/productModel";
const listProducts = async (req, res, next) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.min(parseInt(req.query.limit) || 10, 100);
        const skip = (page - 1) * limit;
        const sortField = req.query.sort || "createdAt";
        const sortOrder = req.query.order === "asc" ? 1 : -1;
        const products = await Product.find()
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);
        res.status(200).send({ success: true, data: products });
        return;
    }
    catch (error) {
        console.log("Error occured while retriving products");
        next(error);
    }
};
export { listProducts };
