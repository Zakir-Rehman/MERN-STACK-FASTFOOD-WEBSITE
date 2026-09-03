 
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//     {
        
//         // 1️⃣ Logged-in User
//         userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "user",
//             required: true
            
//         },

//         // 2️⃣ Ordered Items (snapshot)
//         items: [
//             {
//                 food: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: "food", // ya Product
//                     required: true
//                 },
//                 name: String,
//                 price: Number,
//                 quantity: Number
//             }
//         ],
//         totalAmount: {
//             type: Number,
//             required: true
//         },
       
//         // 4️⃣ Delivery Details
//         deliveryDetails: {
//             firstName: {
//                 type: String,
//                 required: true,
//                 trim: true
//             },

//             lastName: {
//                 type: String,
//                 required: true,
//                 trim: true
//             },

//             email: {
//                 type: String,
//                 required: true,
//                 match: [/^\S+@\S+\.\S+$/, "Invalid email"]
//             },


//             phone: {
//                 type: String,
//                 required: true,
//                 match: [/^(\+92|0)?3\d{9}$/, "Invalid phone number"]
//             },


//             alternatePhone: {
//                 type: String,
//                 trim: true,
//                 required: false,
//                 match: [/^(\+92|0)?3\d{9}$/, "Invalid phone number"]
//             },

//             city: {
//                 type: String,
//                 required: true,
//                 trim: true
//             },

//             street: {
//                 type: String,
//                 required: true,
//                 trim: true
//             },

//             description: {
//                 type: String,
//                 maxlength: 300,
//                 trim: true
//             }
//         },

//         // 5️⃣ Order Status
//         status: {
//             type: String,
//             enum: ["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
//             default: "Pending"
//         },
//     },
//     {
//         timestamps: true // auto: createdAt, updatedAt
//     }
// );

// export default mongoose.model("Order", orderSchema);
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // ==========================
    // ORDER SOURCE
    // ==========================
    orderType: {
      type: String,
      enum: ["ONLINE", "POS"],
      required: true,
    },

    // ==========================
    // ONLINE CUSTOMER
    // ==========================
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
      required: function () {
        return this.orderType === "ONLINE";
      },
    },

    // ==========================
    // POS CUSTOMER
    // ==========================
    customerCode: {
      type: String,
      unique: true,
      sparse: true,
      default: null,
      required: function () {
        return this.orderType === "POS";
      },
    },

    // ==========================
    // ORDER ITEMS
    // ==========================
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "food",
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // ==========================
    // PAYMENT
    // ==========================
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "Online", "COD"],
      default: "Cash",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    // ==========================
    // POS ORDER TYPE
    // ==========================
    customerType: {
      type: String,
      enum: ["Walk-in", "Take Away", "Dine In", "Delivery"],
      required: function () {
        return this.orderType === "POS";
      },
      default: null,
    },

    // ==========================
    // ONLINE DELIVERY DETAILS
    // ==========================
    deliveryDetails: {
      firstName: {
        type: String,
        trim: true,
        required: function () {
          return this.parent().orderType === "ONLINE";
        },
      },

      lastName: {
        type: String,
        trim: true,
        required: function () {
          return this.parent().orderType === "ONLINE";
        },
      },

      email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email"],
        required: function () {
          return this.parent().orderType === "ONLINE";
        },
      },

      phone: {
        type: String,
        trim: true,
        match: [/^(\+92|0)?3\d{9}$/, "Invalid phone number"],
        required: function () {
          return this.parent().orderType === "ONLINE";
        },
      },

      alternatePhone: {
        type: String,
        trim: true,
        match: [/^(\+92|0)?3\d{9}$/, "Invalid phone number"],
      },

      city: {
        type: String,
        trim: true,
        required: function () {
          return this.parent().orderType === "ONLINE";
        },
      },

      street: {
        type: String,
        trim: true,
        required: function () {
          return this.parent().orderType === "ONLINE";
        },
      },

      description: {
        type: String,
        trim: true,
        maxlength: 300,
      },
    },

    // ==========================
    // ORDER STATUS
    // ==========================
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);