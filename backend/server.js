import express from "express";
import cors from "cors";
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

app.get("/", (req, res) => {
    res.send("Vercel API Working");
});

export default app;