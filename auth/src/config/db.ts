//src/config/db.ts
import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY not defined");
  }
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not defined");

    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;

