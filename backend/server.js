import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config"
import userModel from "./models/userModel.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import orderModel from "./models/orderModel.js";

// import orderRouter from "./routes/orderRoute.js";


//app config
const app = express()
const port = 4000


//middleware
app.use(express.json())
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];
app.use(cors())
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));


//DB CONNECTION
connectDB();

//api end points
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api",orderRouter)
app.use("/api/order",userRouter)
app.use("/api/order",orderRouter)
app.get("/",(req,res)=>{
    res.send("Api Working....")
})
app.get("/operation",async(req,res)=>{
    const orders = await orderModel.find({})
    res.json({success:true,orders})
})
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})