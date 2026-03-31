// import mongoose, { mongo } from "mongoose";
// const orderSchema = new mongoose.Schema({
//     userId:{
//         type:String,
//         required:true
//     },
//     items:{
//         type:Array,
//         required:true
//     },
//     amount:{
//         type:Number,
//         required:true
//     },
//     address:{
//         type:Object,
//         required:true
//     },
//     status:{
//         type:String,
//         default:"Food Processing"
//     },
//     date:{
//         type:Date,
//         default:Date.now()
//     },
//     payment:{
//         type:Boolean,
//         default:false
//     }
// })
// const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)
// export default orderModel;
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        // 1️⃣ Logged-in User
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },

        // 2️⃣ Ordered Items (snapshot)
        items: [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "food", // ya Product
                    required: true
                },
                name: String,
                price: Number,
                quantity: Number
            }
        ],
        totalAmount: {
            type: Number,
            required: true
        },

        // 4️⃣ Delivery Details
        deliveryDetails: {
            firstName: {
                type: String,
                required: true,
                trim: true
            },

            lastName: {
                type: String,
                required: true,
                trim: true
            },

            email: {
                type: String,
                required: true,
                match: [/^\S+@\S+\.\S+$/, "Invalid email"]
            },


            phone: {
                type: String,
                required: true,
                match: [/^(\+92|0)?3\d{9}$/, "Invalid phone number"]
            },


            alternatePhone: {
                type: String,
                trim: true,
                required: false,
                match: [/^(\+92|0)?3\d{9}$/, "Invalid phone number"]
            },

            city: {
                type: String,
                required: true,
                trim: true
            },

            street: {
                type: String,
                required: true,
                trim: true
            },

            description: {
                type: String,
                maxlength: 300,
                trim: true
            }
        },

        // 5️⃣ Order Status
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
            default: "Pending"
        },
    },
    {
        timestamps: true // auto: createdAt, updatedAt
    }
);

export default mongoose.model("Order", orderSchema);
