import mongoose from "mongoose";
export const connectDB = async ()=>{
 await mongoose.connect('mongodb+srv://foodjunction:foodjunction099@cluster1.lt9knfq.mongodb.net/food-junction').then(()=>console.log("DB Connected"))
}
