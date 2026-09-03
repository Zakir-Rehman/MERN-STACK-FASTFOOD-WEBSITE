import "dotenv/config"
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
// import foodRouter from "./routes/foodRoute.js";
const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://fastfood-backend-v1.vercel.app"],
    credentials: true
}));
app.options(/.*/, cors()); // yeh bhi rakho preflight ke liye
//middleware
app.use(express.json())

//DB CONNECTION
connectDB();

app.use("/api/user", userRouter)
// app.use("/api/food", foodRouter)
// app.use("/images", express.static("uploads"))
app.get("/", (req, res) => {
    res.json({
        userLogin:'done',
        userRegister:'done',
        // foodAdd:'done',
        // foodList:'done',
        // foodRemove:'done',
        // foodEdit:'done'
    });
});

export default app;