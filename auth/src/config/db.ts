import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.JWT_KEY){
    throw new Error('JWT_KEY not defined');
  }
  try {
    const conn = await mongoose.connect(
      "mongodb://auth-mongo-service:27017/auth_millionsclub"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
