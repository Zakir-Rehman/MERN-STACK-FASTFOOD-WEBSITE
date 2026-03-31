// import express from 'express'
// import authMiddleWare from "../middleware/auth.js"
// import { placeOrder } from '../controllers/orderController'
// const orderRouter = express.Router()

// orderRouter.post("/place",authMiddleWare,placeOrder)

// export default orderRouter;
import express from 'express'
import { listOrder, placeOrder, updateStatus } from '../controllers/orderController.js'
import authMiddleWare from '../middleware/auth.js';
// import mongoose from "mongoose";
const orderRouter = express.Router()

orderRouter.post("/proceed/order", authMiddleWare , placeOrder);
orderRouter.get("/list", listOrder);
orderRouter.post("/status",updateStatus)
export default orderRouter
// mongoose.connect("mongodb+srv://foodjunction:foodjunction099@cluster1.lt9knfq.mongodb.net/food-junction")
//     .then(async () => {
//         console.log("✅ Connected to DB");
//         const savedOrder = await sampleOrder.save();
//         console.log("✅ Sample order saved:", savedOrder);
//         mongoose.disconnect();
//     })
//     .catch(err => console.error("❌ DB Connection Error:", err));