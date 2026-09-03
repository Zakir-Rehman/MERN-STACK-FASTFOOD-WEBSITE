import mongoose from "mongoose";
import config from "./config.js";

export const connectDB = async () => {
  try {
    console.log('mongodbUrl',config.mongodbUrl);
    await mongoose.connect(config.mongodbUrl);
    console.log("✅ DB Connected");
  } catch (error) {
    console.log("❌ DB Connection Failed:", error.message);
  }
};