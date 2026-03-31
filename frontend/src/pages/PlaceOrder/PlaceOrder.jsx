// import React, { useContext, useState, useEffect } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../Context/StoreContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token,cartItems, food_list  } = useContext(StoreContext);
//   const navigate = useNavigate();
//   // ai
//   useEffect(() => {
//     if (!token) {
//       toast.error("Please login to place order");
//       navigate("/");
//     }
//   }, [token, navigate]);
// // 
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     number: "",
//     alternateNumber: "",
//     city: "",
//     street: "",
//     description: ""
//   });

//   // 🔹 INPUT CHANGE
//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // 🔹 FORM SUBMIT
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     // 🔴 PHONE VALIDATION (PAKISTAN)
//     const phoneRegex = /^(\+92|0)?3\d{9}$/;

//     if (!phoneRegex.test(formData.number)) {
//       toast.error("❌ Invalid phone number");
//       return;
//     }

//     if (
//       formData.alternateNumber &&
//       !phoneRegex.test(formData.alternateNumber)
//     ) {
//       toast.error("❌ Invalid alternate phone number");
//       return;
//     }

//     // 🔴 LOGIN CHECK
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }

//     try {
//       const orderData = {
//         deliveryDetails: {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.number,
//           alternatePhone: formData.alternateNumber,
//           city: formData.city,
//           street: formData.street,
//           description: formData.description
//         }
//       };

//       const response = await axios.post(
//         "http://localhost:4000/api/proceed/order",
//         orderData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       if (response.data.success) {
//         toast.success("✅ Order placed successfully");

//         // 🔹 RESET FORM
//         setFormData({
//           firstName: "",
//           lastName: "",
//           email: "",
//           number: "",
//           alternateNumber: "",
//           city: "",
//           street: "",
//           description: ""
//         });

//         navigate("/orders");
//       } else {
//         toast.error(response.data.message || "Order failed");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("❌ Something went wrong");
//     }
//   };

//   return (
//     <form className="place-order" onSubmit={onSubmitHandler}>
//       {/* LEFT */}
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>

//         <div className="multi-fields">
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First name"
//             value={formData.firstName}
//             onChange={onChangeHandler}
//             required
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last name"
//             value={formData.lastName}
//             onChange={onChangeHandler}
//             required
//           />
//         </div>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email address"
//           value={formData.email}
//           onChange={onChangeHandler}
//           required
//         />

//         <input
//           type="text"
//           name="number"
//           placeholder="Phone number"
//           value={formData.number}
//           onChange={onChangeHandler}
//           required
//         />

//         <input
//           type="text"
//           name="alternateNumber"
//           placeholder="Alternate phone number"
//           value={formData.alternateNumber}
//           onChange={onChangeHandler}
//         />

//         <div className="multi-fields">
//           <input
//             type="text"
//             name="city"
//             placeholder="City"
//             value={formData.city}
//             onChange={onChangeHandler}
//             required
//           />
//           <input
//             type="text"
//             name="street"
//             placeholder="Street"
//             value={formData.street}
//             onChange={onChangeHandler}
//             required
//           />
//         </div>

//         <textarea
//           name="description"
//           placeholder="Write any special instructions related to food or delivery here…"
//           value={formData.description}
//           onChange={onChangeHandler}
//         />
//       </div>

//       {/* RIGHT */}
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>

//           <div className="cart-total-details">
//             <p>Subtotal</p>
//             <p>$ {getTotalCartAmount()}</p>
//           </div>

//           <hr />

//           <div className="cart-total-details">
//             <p>Delivery Fee</p>
//             <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
//           </div>

//           <hr />

//           <div className="cart-total-details">
//             <b>Total</b>
//             <b>
//               $ {getTotalCartAmount() === 0
//                 ? 0
//                 : getTotalCartAmount() + 2}
//             </b>
//           </div>

//           <button type="submit">PLACE ORDER</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;
import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, cartItems, food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  // Login check on mount
  useEffect(() => {
    if (!token) {
      toast.error("Please login to place order");
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, navigate]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    alternateNumber: "",
    city: "",
    street: "",
    description: ""
  });

  // 🔹 INPUT CHANGE
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 FORM SUBMIT
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 🔴 PHONE VALIDATION (PAKISTAN)
    const phoneRegex = /^(\+92|0)?3\d{9}$/;
    if (!phoneRegex.test(formData.number)) {
      toast.error("❌ Invalid phone number");
      return;
    }
    if (formData.alternateNumber && !phoneRegex.test(formData.alternateNumber)) {
      toast.error("❌ Invalid alternate phone number");
      return;
    }

    // 🔴 LOGIN CHECK
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    // 🔴 CHECK CART ITEMS
    const validItems = Object.keys(cartItems)
      .filter(id => cartItems[id] > 0)
      .map(id => {
        const food = food_list.find(f => f._id.toString() === id); // fix ObjectId vs string
        if (!food) return null;
        return {
          food: food._id,
          name: food.name,
          price: food.price,
          quantity: cartItems[id]
        };
      })
      .filter(item => item !== null);

    if (validItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      const orderData = {
        deliveryDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.number,
          alternatePhone: formData.alternateNumber,
          city: formData.city,
          street: formData.street,
          description: formData.description
        },
        items: validItems,
        totalAmount: getTotalCartAmount() + (getTotalCartAmount() > 0 ? 2 : 0) // delivery fee
      };

      const response = await axios.post(
        "http://localhost:4000/api/proceed/order",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        toast.success("Order placed successfully");

        // 🔹 RESET FORM
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          number: "",
          alternateNumber: "",
          city: "",
          street: "",
          description: ""
        });

        navigate("/");
      } else {
        toast.error(response.data.message || "Order failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong");
    }
  };

  return (
    <form className="place-order" onSubmit={onSubmitHandler}>
      {/* LEFT */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" placeholder="First name" value={formData.firstName} onChange={onChangeHandler} required />
          <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={onChangeHandler} required />
        </div>
        <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={onChangeHandler} required />
        <input type="text" name="number" placeholder="Phone number" value={formData.number} onChange={onChangeHandler} required />
        <input type="text" name="alternateNumber" placeholder="Alternate phone number" value={formData.alternateNumber} onChange={onChangeHandler} />
        <div className="multi-fields">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={onChangeHandler} required />
          <input type="text" name="street" placeholder="Street" value={formData.street} onChange={onChangeHandler} required />
        </div>
        <textarea name="description" placeholder="Write any special instructions related to food or delivery here…" value={formData.description} onChange={onChangeHandler} />
      </div>

      {/* RIGHT */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>$ {getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>$ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
          <button type="submit">PLACE ORDER</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
