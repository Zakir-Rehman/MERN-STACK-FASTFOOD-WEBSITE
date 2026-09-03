import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Vercel API Working");
});
 
export default app;