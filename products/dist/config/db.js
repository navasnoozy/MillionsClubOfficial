import mongoose from "mongoose";
const connectDB = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI ||
            "mongodb://products-mongo-service:27017/products_millionsclub");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error("MongoDB connection Error", error);
        process.exit(1);
    }
};
export default connectDB;
