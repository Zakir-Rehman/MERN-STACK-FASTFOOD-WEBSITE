// import React, { useState } from "react";
// import "./CounterOrder.css";

// // const categories = ["Ice Cream", "Chicken", "Pure Veg", "Pasta"];

// const itemsData = [
//   // Chicken
//   { id: 1, name: "Zinger Burger", price: 250, category: "Chicken", img: "https://picsum.photos/200?random=1" },
//   { id: 2, name: "Grill Chicken", price: 500, category: "Chicken", img: "https://picsum.photos/200?random=2" },

//   // Pure Veg
//   { id: 3, name: "Veg Pizza", price: 400, category: "Pure Veg", img: "https://picsum.photos/200?random=3" },
//   { id: 4, name: "Paneer Tikka", price: 350, category: "Pure Veg", img: "https://picsum.photos/200?random=4" },

//   // Ice Cream / Dessert
//   { id: 5, name: "Chocolate Ice Cream", price: 150, category: "Dessert", img: "https://picsum.photos/200?random=5" },
//   { id: 6, name: "Vanilla Ice Cream", price: 150, category: "Dessert", img: "https://picsum.photos/200?random=6" },
//   { id: 7, name: "Strawberry Cake", price: 600, category: "Cake", img: "https://picsum.photos/200?random=7" },

//   // Salad
//   { id: 8, name: "Caesar Salad", price: 300, category: "Salad", img: "https://picsum.photos/200?random=8" },
//   { id: 9, name: "Greek Salad", price: 280, category: "Salad", img: "https://picsum.photos/200?random=9" },

//   // Rolls
//   { id: 10, name: "Chicken Roll", price: 250, category: "Rolls", img: "https://picsum.photos/200?random=10" },
//   { id: 11, name: "Veg Roll", price: 200, category: "Rolls", img: "https://picsum.photos/200?random=11" },

//   // Sandwich
//   { id: 12, name: "Club Sandwich", price: 300, category: "Sandwich", img: "https://picsum.photos/200?random=12" },
//   { id: 13, name: "Grilled Cheese", price: 250, category: "Sandwich", img: "https://picsum.photos/200?random=13" },

//   // Pasta
//   { id: 14, name: "White Sauce Pasta", price: 400, category: "Pasta", img: "https://picsum.photos/200?random=14" },
//   { id: 15, name: "Red Sauce Pasta", price: 380, category: "Pasta", img: "https://picsum.photos/200?random=15" },

//   // Noodles
//   { id: 16, name: "Chicken Noodles", price: 350, category: "Noodles", img: "https://picsum.photos/200?random=16" },
//   { id: 17, name: "Veg Noodles", price: 300, category: "Noodles", img: "https://picsum.photos/200?random=17" },

//   // Sandwich (Extra)
//   { id: 18, name: "Egg Sandwich", price: 220, category: "Sandwich", img: "https://picsum.photos/200?random=18" },
// ];

// // Dynamic categories from itemsData
// const categories = [...new Set(itemsData.map(item => item.category))];
// const CounterOrder = () => {
//   const [activeCategory, setActiveCategory] = useState("Chicken");
//   const [cart, setCart] = useState([]);
//   const [search, setSearch] = useState("");

//   // ADD ITEM
//   const addToCart = (item) => {
//     const exist = cart.find((c) => c.id === item.id);
//     if (exist) {
//       setCart(cart.map(c =>
//         c.id === item.id ? { ...c, qty: c.qty + 1 } : c
//       ));
//     } else {
//       setCart([...cart, { ...item, qty: 1 }]);
//     }
//   };

//   // UPDATE QTY
//   const updateQty = (id, type) => {
//     setCart(cart.map(item => {
//       if (item.id === id) {
//         const qty = type === "inc" ? item.qty + 1 : item.qty - 1;
//         return { ...item, qty: qty < 1 ? 1 : qty };
//       }
//       return item;
//     }));
//   };

//   // REMOVE
//   const removeItem = (id) => {
//     setCart(cart.filter(item => item.id !== id));
//   };

//   // TOTALS
//   const subtotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
//   const tax = Math.round(subtotal * 0.05);
//   const total = subtotal + tax;

//   const filteredItems = itemsData.filter(
//     (i) =>
//       i.category === activeCategory &&
//       i.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="counter">

//       {/* LEFT PANEL */}
//       <div className="left">

//         {/* Categories */}
//         <div className="categories">
//           {categories.map((cat, i) => (
//             <div
//               key={i}
//               className={`cat ${activeCategory === cat ? "active" : ""}`}
//               onClick={() => setActiveCategory(cat)}
//             >
//               {cat}
//             </div>
//           ))}
//         </div>

//         {/* Items */}
//         <div className="items-section">
//           <input
//             type="search"
//             placeholder="Search item..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="search"
//           />

//           <div className="items">
//             {filteredItems.map(item => (
//               <div key={item.id} className="item-card">
//                 <img src={item.img} alt="" />
//                 <h4>{item.name}</h4>
//                 <p>Rs {item.price}</p>
//                 <button onClick={() => addToCart(item)}>+ Add</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* RIGHT PANEL */}
//       <div className="right">

//         {/* FORM */}
//         <div className="form">
//           <input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
//           <select defaultValue="walkin">
//             <option value="walkin">Walk-in</option>
//             <option value="online">Online</option>
//           </select>
//           <input type="text" placeholder="Cashier Name" />
//           <select defaultValue="cash">
//             <option>Cash</option>
//             <option>Online</option>
//           </select>
//           <select defaultValue="paid">
//             <option>Paid</option>
//             <option>Credit</option>
//           </select>
//         </div>

//         {/* CART */}
//         <div className="cart">

//           <div className="cart-head">
//             <span>Name</span>
//             <span>Qty</span>
//             <span>Price</span>
//             <span>Total</span>
//             <span>Action</span>
//           </div>

//           <div className="cart-body">
//             {cart.map(item => (
//               <div key={item.id} className="cart-item">
//                 <span>{item.name}</span>
//                 <span>{item.qty}</span>
//                 <span>{item.price}</span>
//                 <span>{item.price * item.qty}</span>

//                 <div className="actions">
//                   <button onClick={() => updateQty(item.id, "inc")}>+</button>
//                   <button onClick={() => updateQty(item.id, "dec")}>-</button>
//                   <button onClick={() => removeItem(item.id)}>x</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* TOTAL */}
//           <div className="summary">
//             <p>Subtotal: Rs {subtotal}</p>
//             <p>Tax: Rs {tax}</p>
//             <h3>Total: Rs {total}</h3>
//             <button className="print">Place Order</button>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default CounterOrder;



import React, { useState } from "react";
import "./CounterOrder.css";
import { Icons } from "../../assets/admin_assets/Icons/Icons";

const itemsData = [
  { id: 1, name: "Zinger Burger", price: 250, category: "Chicken", img: "https://picsum.photos/200?random=1" },
  { id: 2, name: "Grill Chicken", price: 500, category: "Chicken", img: "https://picsum.photos/200?random=2" },
  { id: 3, name: "Veg Pizza", price: 400, category: "Pure Veg", img: "https://picsum.photos/200?random=3" },
  { id: 4, name: "Paneer Tikka", price: 350, category: "Pure Veg", img: "https://picsum.photos/200?random=4" },
  { id: 5, name: "Chocolate Ice Cream", price: 150, category: "Dessert", img: "https://picsum.photos/200?random=5" },
  { id: 6, name: "Vanilla Ice Cream", price: 150, category: "Dessert", img: "https://picsum.photos/200?random=6" },
  { id: 7, name: "Strawberry Cake", price: 600, category: "Cake", img: "https://picsum.photos/200?random=7" },
  { id: 8, name: "Caesar Salad", price: 300, category: "Salad", img: "https://picsum.photos/200?random=8" },
  { id: 9, name: "Greek Salad", price: 280, category: "Salad", img: "https://picsum.photos/200?random=9" },
  { id: 10, name: "Chicken Roll", price: 250, category: "Rolls", img: "https://picsum.photos/200?random=10" },
  { id: 11, name: "Veg Roll", price: 200, category: "Rolls", img: "https://picsum.photos/200?random=11" },
  { id: 12, name: "Club Sandwich", price: 300, category: "Sandwich", img: "https://picsum.photos/200?random=12" },
  { id: 13, name: "Grilled Cheese", price: 250, category: "Sandwich", img: "https://picsum.photos/200?random=13" },
  { id: 14, name: "White Sauce Pasta", price: 400, category: "Pasta", img: "https://picsum.photos/200?random=14" },
  { id: 15, name: "Red Sauce Pasta", price: 380, category: "Pasta", img: "https://picsum.photos/200?random=15" },
  { id: 16, name: "Chicken Noodles", price: 350, category: "Noodles", img: "https://picsum.photos/200?random=16" },
  { id: 17, name: "Veg Noodles", price: 300, category: "Noodles", img: "https://picsum.photos/200?random=17" },
  { id: 18, name: "Egg Sandwich", price: 220, category: "Sandwich", img: "https://picsum.photos/200?random=18" },
];

// dynamic categories
const categories = [...new Set(itemsData.map(item => item.category))];

const CounterOrder = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const addToCart = (item) => {
    const exist = cart.find(c => c.id === item.id);
    if (exist) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const updateQty = (id, type) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const qty = type === "inc" ? item.qty + 1 : item.qty - 1;
        return { ...item, qty: qty < 1 ? 1 : qty };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const filteredItems = itemsData.filter(
    i => i.category === activeCategory &&
         i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="counter">

      {/* LEFT PANEL */}
      <div className="left">
        <div className="categories">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`cat ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >{cat}</div>
          ))}
        </div>

        <div className="items-section">
          <input
            type="search"
            placeholder="Search item..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search"
          />
          <div className="items">
            {filteredItems.map(item => (
              <div key={item.id} className="item-card">
                <div className="image-wrapper">
                <img src={item.img} alt={item.name} />
                <button className="add-btn" onClick={() => addToCart(item)}>
                  <Icons.PlusIcon color="#fff" size={12}/>
                </button>

                </div>
                <div className="card-text-div">
                <h5>{item.name}</h5>
                <p>Rs {item.price}</p>
                </div>


              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right">

        {/* FORM */}
        <div className="form">
          <input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
          <select defaultValue="walkin">
            <option value="walkin">Walk-in</option>
            <option value="online">Online</option>
          </select>
          <input type="text" placeholder="Cashier Name" />
          <select defaultValue="cash">
            <option>Cash</option>
            <option>Online</option>
          </select>
          <select defaultValue="paid">
            <option>Paid</option>
            <option>Credit</option>
          </select>
        </div>

        {/* CART */}
        <div className="cart">

          <div className="cart-head">
            <span>Name</span>
            <span>Qty</span>
            <span>Price</span>
            <span>Total</span>
            <span>Action</span>
          </div>

          <div className="cart-body">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <span>{item.name}</span>
                <span>{item.qty}</span>
                <span>{item.price}</span>
                <span>{item.price * item.qty}</span>
                <div className="actions">
                  <button onClick={() => updateQty(item.id, "inc")}>+</button>
                  <button onClick={() => updateQty(item.id, "dec")}>-</button>
                  <button onClick={() => removeItem(item.id)}>x</button>
                </div>
              </div>
            ))}
          </div>

          <div className="summary">
            <p>Subtotal: Rs {subtotal}</p>
            <p>Tax: Rs {tax}</p>
            <h3>Total: Rs {total}</h3>
            <button className="print">Place Order</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CounterOrder;