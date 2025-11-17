import mongoose from "mongoose";
import { IDatabase } from "../interface/IDatabase";


export class MongoDatabase implements IDatabase {
  private connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  async connect(): Promise<void> {
    try {
      const conn = await mongoose.connect(this.connectionString);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error("MongoDB connection Error", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }

  isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }
}