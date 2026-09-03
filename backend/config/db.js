// import mongoose from "mongoose";
// import config from "./config.js";

// export const connectDB = async () => {
//   try { 
//     await mongoose.connect(config.mongodbUrl);
//     console.log("✅ DB Connected");
//   } catch (error) {
//     console.log("❌ DB Connection Failed:", error.message);
//     throw error;
//   }
// };
import mongoose from "mongoose";
import config from "./config.js";

export const connectDB = async () => {
    try {
        console.log("MODE:", process.env.MODE);
        console.log("MongoDB URL exists:", config.mongodbUrl);

        await mongoose.connect(config.mongodbUrl);

        console.log("✅ DB Connected");
    } catch (error) {
        console.error("❌ DB Connection Failed:", error.message);
    }
};