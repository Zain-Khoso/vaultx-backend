import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async (): Promise<void> => {
  const connection = await mongoose.connect(process.env.MONGO_URI!);
  console.log(`✅ MongoDB connected: ${connection.connection.host}\n`);
};
