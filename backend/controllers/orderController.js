import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";

// ✅ Place order from user's cart
// const clientCart = async (req, res) => { 
//   try {
//     const userId = req.user.id; // <-- yaha proper userId aa raha hona chahiye
//     const { deliveryDetails } = req.body;

//     if (!deliveryDetails) {
//       return res.status(400).json({
//         success: false,
//         message: "Delivery details missing"
//       });
//     }

//     const user = await userModel.findById(userId);
//     if (!user) return res.status(404).json({success:false,message:"User not found"});
//     if (!user.cartData || Object.keys(user.cartData).length === 0)
//       return res.status(400).json({success:false,message:"Cart is empty"});

//     let items = [];
//     let totalAmount = 0;

//     for (const foodId in user.cartData) {
//       const quantity = user.cartData[foodId];
//       const food = await foodModel.findById(foodId);
//       if (!food) continue; // agar food nahi milta to skip

//       items.push({
//         food: food._id,  // <-- id daalni chahiye
//         name: food.name,
//         price: food.price,
//         quantity
//       });
//       totalAmount += food.price * quantity;
//     }

//     const order = new orderModel({
//       userId,
//       items,
//       totalAmount,
//       deliveryDetails
//     });

//     await order.save();

//     // cart clear
//     user.cartData = {};
//     await user.save();

//     res.json({ success: true, message: "Order placed successfully" });

//   } catch (error) {
//     console.error("ORDER ERROR 🔥", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };
// const placeOrder = async (req, res) => {
//     try {
//         // 🔒 LOGIN CHECK (authMiddleware se aata hai)
//         if (!req.userId) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Login required"
//             });
//         }

//         const userId = req.userId;
//         const { deliveryDetails } = req.body;

//         // 1️⃣ USER FETCH
//         const user = await userModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         // 2️⃣ CART EMPTY CHECK
//         if (!user.cartData || Object.keys(user.cartData).length === 0) {
//             return res.json({
//                 success: false,
//                 message: "Cart is empty"
//             });
//         }

//         // 3️⃣ ITEMS BUILD + TOTAL CALC
//         const items = [];
//         let totalAmount = 0;

//         for (const foodId in user.cartData) {
//             const quantity = user.cartData[foodId];

//             if (quantity > 0) {
//                 const food = await foodModel.findById(foodId);

//                 if (food) {
//                     items.push({
//                         food: food._id,
//                         name: food.name,
//                         price: food.price,
//                         quantity: quantity
//                     });

//                     totalAmount += food.price * quantity;
//                 }
//             }
//         }

//         if (items.length === 0) {
//             return res.json({
//                 success: false,
//                 message: "No valid items in cart"
//             });
//         }

//         // 4️⃣ DELIVERY FEE ADD
//         totalAmount += 2;

//         // 5️⃣ ORDER SAVE
//         const newOrder = new orderModel({
//             userId,
//             items,
//             totalAmount,
//             deliveryDetails
//         });

//         await newOrder.save();

//         // 6️⃣ CART CLEAR
//         user.cartData = {};
//         await user.save();

//         // 7️⃣ RESPONSE
//         res.json({
//             success: true,
//             message: "Order placed successfully",
//             order: newOrder
//         });

//     } catch (error) {
//         console.error("Place Order Error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Something went wrong"
//         });
//     }
// };

// orderController.js
const placeOrder = async (req, res) => {
    const userId = req.userId;
    const { deliveryDetails, items, totalAmount } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Cart is empty"
        });
    }

    try {
        // save order in DB
        const order = await orderModel.create({
            userId,
            items,
            totalAmount,
            deliveryDetails,
            status: "Pending"
        });

        res.json({ success: true, message: "Order placed", order });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
//Users Ordes 
// const userOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({
//       userId: req.user.id   
//     });

//     res.json({ success: true, data: orders });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({
            userId: req.userId   // 🔥 yahin se userId
        });

        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        });
    }
};
//listing order for admin panel
const listOrder = async(req,res)=>{
try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 }); ;
    res.json({success:true,data:orders})
} catch (error) {
console.log(error)
res.json({success:false,message:"Error"})    
}
}
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};



export { placeOrder, userOrders ,listOrder,updateStatus};
