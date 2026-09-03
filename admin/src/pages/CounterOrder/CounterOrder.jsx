// import React, { useState, useEffect, useMemo } from "react";
// import "./CounterOrder.css";
// import { Icons } from "../../assets/admin_assets/Icons/Icons";
// import axios from "axios";
// // const itemsData = [
// //   { id: 1, name: "Zinger Burger", price: 250, category: "Chicken", img: "https://picsum.photos/200?random=1" },
// //   { id: 2, name: "Grill Chicken", price: 500, category: "Chicken", img: "https://picsum.photos/200?random=2" },
// //   { id: 3, name: "Veg Pizza", price: 400, category: "Pure Veg", img: "https://picsum.photos/200?random=3" },
// //   { id: 4, name: "Paneer Tikka", price: 350, category: "Pure Veg", img: "https://picsum.photos/200?random=4" },
// //   { id: 5, name: "Chocolate Ice Cream", price: 150, category: "Dessert", img: "https://picsum.photos/200?random=5" },
// //   { id: 6, name: "Vanilla Ice Cream", price: 150, category: "Dessert", img: "https://picsum.photos/200?random=6" },
// //   { id: 7, name: "Strawberry Cake", price: 600, category: "Cake", img: "https://picsum.photos/200?random=7" },
// //   { id: 8, name: "Caesar Salad", price: 300, category: "Salad", img: "https://picsum.photos/200?random=8" },
// //   { id: 9, name: "Greek Salad", price: 280, category: "Salad", img: "https://picsum.photos/200?random=9" },
// //   { id: 10, name: "Chicken Roll", price: 250, category: "Rolls", img: "https://picsum.photos/200?random=10" },
// //   { id: 11, name: "Veg Roll", price: 200, category: "Rolls", img: "https://picsum.photos/200?random=11" },
// //   { id: 12, name: "Club Sandwich", price: 300, category: "Sandwich", img: "https://picsum.photos/200?random=12" },
// //   { id: 13, name: "Grilled Cheese", price: 250, category: "Sandwich", img: "https://picsum.photos/200?random=13" },
// //   { id: 14, name: "White Sauce Pasta", price: 400, category: "Pasta", img: "https://picsum.photos/200?random=14" },
// //   { id: 15, name: "Red Sauce Pasta", price: 380, category: "Pasta", img: "https://picsum.photos/200?random=15" },
// //   { id: 16, name: "Chicken Noodles", price: 350, category: "Noodles", img: "https://picsum.photos/200?random=16" },
// //   { id: 17, name: "Veg Noodles", price: 300, category: "Noodles", img: "https://picsum.photos/200?random=17" },
// //   { id: 18, name: "Egg Sandwich", price: 220, category: "Sandwich", img: "https://picsum.photos/200?random=18" },
// // ];

// // dynamic categories
// // const categories = [...new Set(itemsData.map(item => item.category))];
// // const categories = [...new Set(itemsData.map(item => item.category))];

// const CounterOrder = ({ url }) => {

//   const [cart, setCart] = useState([]);
//   const [search, setSearch] = useState("");
//   const [invoiceDetail, setInvoiceDetail] = useState({
//     date: new Date().toISOString().split("T")[0],
//     customerType: '',
//     cashierName: '',
//     orderType: '',
//     paidMethod: '',
//     cart: null
//   })
//   const [rightOverlay, setRightOverlay] = useState(false);
//   const [itemsData, setItemsData] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(""); // empty string rakho
//   // const categories = useMemo(() => {
//   //   return [...new Set(itemsData.map(item => item.category))];
//   // }, [itemsData]);
//   const categories = useMemo(() => {
//     return ["All", ...new Set(itemsData.map(item => item.category))];
//   }, [itemsData]);
//   const onChangeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setInvoiceDetail(invoiceDetail => ({ ...invoiceDetail, [name]: value }))

//   }
//   const invoiceHandler = (e) => {
//     e.preventDefault()
//     const formData = new FormData();
//     formData.append("date", invoiceDetail.date)
//     formData.append("customerType", invoiceDetail.customerType)
//     formData.append("cashierName", Number(invoiceDetail.cashierName))
//     formData.append("orderType", invoiceDetail.orderType)
//     formData.append("paidMethod", invoiceDetail.paidMethod)
//   }
//   const addToCart = (item) => {
//     const exist = cart.find(c => c.id === item.id);
//     if (exist) {
//       setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
//       setInvoiceDetail(invoiceDetail => ({ ...invoiceDetail, cart: cart }))
//     } else {
//       setCart([...cart, { ...item, qty: 1 }]);
//     }
//   };

//   const updateQty = (id, type) => {
//     setCart(cart.map(item => {
//       if (item.id === id) {
//         const qty = type === "inc" ? item.qty + 1 : item.qty - 1;
//         return { ...item, qty: qty < 1 ? 1 : qty };
//       }
//       return item;
//     }));
//   };

//   const removeItem = (id) => {
//     setCart(cart.filter(item => item.id !== id));
//     // setInvoiceDetail(invoiceDetail.filter(item.cart.map))
//   };
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async (value) => {
//     setSearch(value);

//     if (value.trim() === "") {
//       // Search clear ho to normal fetchItems chalao
//       const res = await axios.get(`${url}/api/food/list`);
//       const formatted = res.data.data.map((item) => ({
//         id: item._id,
//         name: item.name,
//         price: item.price,
//         category: item.category,
//         img: `${url}/images/${item.image}`,
//       }));
//       setItemsData(formatted);
//       setActiveCategory("All");
//       return;
//     }

//     try {
//       setLoading(true);
//       // Agar tumhari API search support karti hai:
//       const res = await axios.get(`${url}/api/food/list?search=${value}`);
//       const formatted = res.data.data.map((item) => ({
//         id: item._id,
//         name: item.name,
//         price: item.price,
//         category: item.category,
//         img: `${url}/images/${item.image}`,
//       }));
//       setItemsData(formatted);

//       // Auto category select — pehle item ki category select karo
//       // useEffect fetch mein:
//       if (formatted.length > 0) {
//         setActiveCategory("All"); // pehle "All" select ho
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const subtotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
//   const tax = Math.round(subtotal * 0.05);
//   const total = subtotal + tax;

//   // const filteredItems = itemsData.filter(
//   //   i => i.category === activeCategory &&
//   //     i.name.toLowerCase().includes(search.toLowerCase())
//   // );
//   const filteredItems = itemsData.filter(i => {
//     const categoryMatch = activeCategory === "All" || i.category === activeCategory;
//     const searchMatch = i.name.toLowerCase().includes(search.toLowerCase()) ||
//       i.category.toLowerCase().includes(search.toLowerCase());
//     return categoryMatch && searchMatch;
//   });

//   useEffect(() => {
//     console.log("invoice", invoiceDetail)
//     console.log("categories", categories)
//     setActiveCategory("All")
//     // addCartInInvoice()
//   }, [invoiceDetail, categories])
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const res = await axios.get(`${url}/api/food/list`);
//         console.log("API Response List :", res.data); // API response ko console mein log karo
//         // API response ka data map karo apne format mein
//         const formatted = res.data.data.map((item) => ({
//           id: item._id,
//           name: item.name,
//           price: item.price,
//           category: item.category,
//           img: `${url}/images/${item.image}`, // image path server ke hisab se
//         }));
//         // useEffect ke andar, setItemsData ke baad:
//         if (formatted.length > 0) {
//           setActiveCategory(formatted[0].category);
//         }
//         setItemsData(formatted);

//       } catch (err) {
//         console.error("Error fetching items:", err);
//       }
//     };

//     fetchItems();
//   }, []);
//   return (
//     <div className="counter">

//       {/* LEFT PANEL */}
//       <div className="left">
//         {/* {!categories?.length || categories === null
//           ? ["All", "Deserts", "Salad", "Rolls", "Pasta", "Sandwich", "Noodles", "Pure Veg"].map((cat, i) => (
//             <div key={i} className="cat">{cat}</div>
//           )):"help"} */}
//         <div className="categories">
//           {
//           // !categories?.length || categories === null
//           //   ? ["All", "Deserts", "Salad", "Rolls", "Pasta", "Sandwich", "Noodles", "Pure Veg"].map((cat, i) => (
//           //     <div key={i} className="cat">{cat}</div>
//           //   ))
//           //   :
//              categories.map((cat, i) => (
//               <div
//                 key={i}
//                 className={`cat ${activeCategory === cat ? "active" : ""}`}
//                 onClick={() => setActiveCategory(cat)}
//               >
//                 {cat}
//               </div>
//             ))
//           }
//         </div>
//       </div>
//       <div className="right-main">

//         <div className="items-section">
//           {/* <input
//             type="search"
//             placeholder="Search item..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             className="search"
//           /> */}
//           <div className="top-actions">
//             <input
//               type="search"
//               placeholder="Search item..."
//               value={search}
//               onChange={e => handleSearch(e.target.value)}
//               className="search"
//             />
//             <div className="btn-invoice-div">
//               <button className="open-overlay-btn" onClick={() => setRightOverlay(true)}>Invoice</button>
//               {cart.length > 0 && <p className="selectedDot"> {cart.length} </p>}
//             </div>
//           </div>
//           <div className="items">
//             {loading ? (
//               <p className="no-item">Loading...</p>
//             ) : filteredItems.length === 0 ? (
//               <p className="no-item">Item not found</p>
//             ) : (
//               filteredItems.map(item => (
//                 <div key={item.id} className="item-card">
//                   <div className="image-wrapper">
//                     <img src={item.img} alt={item.name} />
//                     <button className="add-btn" onClick={() => addToCart(item)}>
//                       <Icons.PlusIcon color="#fff" size={12} />
//                     </button>

//                   </div>
//                   <div className="card-text-div">
//                     <h5>{item.name}</h5>
//                     <p>Rs {item.price}</p>
//                   </div>


//                 </div>
//               ))

//             )
//             }
//           </div>
//           <div className="selectedItems">
//             <h2>Cart</h2>
//             <p>5</p>
//           </div>
//         </div>
//         {/* </div> */}

//         {/* RIGHT PANEL */}
//         {rightOverlay && <div className="right-overlay" >

//           <div className="right">

//             {/* FORM */}
//             <form onSubmit={(e) => invoiceHandler(e)} className="form">
//               {/* <input type="date" name="date" onChange={onChangeHandler} value={invoiceDetail.date} defaultValue={new Date().toISOString().split("T")[0]} /> */}
//               <input type="date" name="date" onChange={onChangeHandler} value={invoiceDetail.date} />
//               <select name="customerType" onChange={onChangeHandler} defaultValue="walkin">
//                 <option value="walkin">Walk-in</option>
//                 <option value="online">Online</option>
//               </select>
//               <input name="cashierName" onChange={onChangeHandler} value={invoiceDetail.cashierName} type="text" placeholder="Cashier Name" />
//               <select name="orderType" onChange={onChangeHandler} defaultValue="cash">
//                 <option>Cash</option>
//                 <option>Online</option>
//               </select>
//               <select name="paidMethod" onChange={onChangeHandler} defaultValue="paid">
//                 <option>Paid</option>
//                 <option>Credit</option>
//               </select>
//               <button type="submit" className="more-btn">More</button>
//             </form>

//             {/* CART */}
//             <div className="cart">

//               <div className="cart-head">
//                 <span>Name</span>
//                 <span>Qty</span>
//                 <span>Price</span>
//                 <span>Total</span>
//                 <span>Action</span>
//               </div>

//               <div className="cart-body">
//                 {cart.map(item => (
//                   <div key={item.id} className="cart-item">
//                     <span>{item.name}</span>
//                     <span>{item.qty}</span>
//                     <span>{item.price}</span>
//                     <span>{item.price * item.qty}</span>
//                     <div className="actions">
//                       {/* <div className="actions-1">
//                     <button onClick={() => updateQty(item.id, "inc")}>+</button>
//                     <button onClick={() => updateQty(item.id, "dec")}>-</button>
//                   </div> */}
//                       <div className="qty-container">
//                         <button
//                           className="qty-btn minus"
//                           onClick={() => updateQty(item.id, "dec")}
//                         >
//                           -
//                         </button>
//                         <button
//                           className="qty-btn plus"
//                           onClick={() => updateQty(item.id, "inc")}
//                         >
//                           +
//                         </button>
//                       </div>
//                       <button className="cross-div" onClick={() => removeItem(item.id)}><Icons.CrossIcon color="#000" size={20} /></button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="summary">
//                 <p>Subtotal: Rs {subtotal}</p>
//                 <p>Tax: Rs {tax}</p>
//                 <h3>Total: Rs {total}</h3>
//                 <div className="summary-btns">
//                   <button className="print">Place Order</button>
//                   <button onClick={() => setRightOverlay(false)} className="print">Close</button>

//                 </div>
//               </div>

//             </div>
//           </div>

//         </div>}

//       </div>
//     </div>
//   );
// };

// export default CounterOrder;



import React, { useState, useEffect, useMemo } from "react";
import "./CounterOrder.css";
import axios from "axios";
import { createPortal } from "react-dom";
import {
  FiSearch, FiPlus, FiMinus, FiX, FiShoppingCart, FiTrash2
} from "react-icons/fi";

import { toast } from "react-toastify";
const CounterOrder = ({ url }) => {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [invoiceDetail, setInvoiceDetail] = useState({
    date: new Date().toISOString().split("T")[0],
    customerType: "walkin",
    cashierName: "",
    orderType: "Cash",
    paidMethod: "Paid",
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [itemsData, setItemsData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = useMemo(() => {
    return ["All", ...new Set(itemsData.map((item) => item.category))];
  }, [itemsData]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInvoiceDetail((prev) => ({ ...prev, [name]: value }));
  };


  const invoiceHandler = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (!invoiceDetail.cashierName.trim()) {
      toast.error("Cashier name is required");
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
        food: item.id,
        name: item.name,
        price: item.price,
        quantity: item.qty,
      })),

      totalAmount: total,

      cashierName: invoiceDetail.cashierName,

      customerType: invoiceDetail.customerType,

      paymentMethod: invoiceDetail.orderType,

      paymentStatus: invoiceDetail.paidMethod,

      orderDate: invoiceDetail.date,
    };

    try {
      const response = await axios.post(
        `${url}/api/pos/order`,
        orderData
      );

      if (response.data.success) {
        toast.success("Order placed successfully");

        // cart clear
        setCart([]);

        // popup close
        setCartOpen(false);

        // form reset
        setInvoiceDetail({
          date: new Date().toISOString().split("T")[0],
          customerType: "walkin",
          cashierName: "",
          orderType: "Cash",
          paidMethod: "Paid",
        });

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((c) => c.id === item.id);
      if (exist) {
        return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, type) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const qty = type === "inc" ? item.qty + 1 : item.qty - 1;
          return { ...item, qty: qty < 1 ? 1 : qty };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const fetchItems = async (searchTerm = "") => {
    try {
      setLoading(true);
      const endpoint = searchTerm
        ? `${url}/api/food/list?search=${searchTerm}`
        : `${url}/api/food/list`;
      const res = await axios.get(endpoint);
      const formatted = res.data.data.map((item) => ({
        id: item._id,
        name: item.name,
        price: item.price,
        category: item.category,
        img: `${url}/images/${item.image}`,
      }));
      setItemsData(formatted);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    fetchItems(value);
  };

  const subtotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const filteredItems = itemsData.filter((i) => {
    const categoryMatch = activeCategory === "All" || i.category === activeCategory;
    const searchMatch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  });

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (categories.length && !activeCategory) {
      setActiveCategory("All");
    }
  }, [categories]);

  const totalCartQty = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="counter-page">
      {/* ===== CATEGORY SIDEBAR ===== */}
      <div className="counter-sidebar">
        <p className="counter-sidebar-label">Categories</p>
        <div className="counter-cat-list">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`counter-cat-item ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ===== MAIN AREA ===== */}
      <div className="counter-main">
        <div className="counter-topbar">
          <div className="counter-search-wrap">
            <FiSearch className="counter-search-icon" />
            <input
              type="search"
              placeholder="Search item..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <button className="counter-cart-btn" onClick={() => setCartOpen(true)}>
            <FiShoppingCart />
            Cart
            {totalCartQty > 0 && <span className="counter-cart-badge">{totalCartQty}</span>}
          </button>
        </div>

        <div className="counter-items-grid">
          {loading ? (
            <p className="counter-empty">Loading items...</p>
          ) : filteredItems.length === 0 ? (
            <p className="counter-empty">No items found</p>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="counter-item-card">
                <div className="counter-item-img-wrap">
                  <img src={item.img} alt={item.name} />
                  <button className="counter-item-add" onClick={() => addToCart(item)}>
                    <FiPlus size={14} />
                  </button>
                </div>
                <div className="counter-item-text">
                  <h5>{item.name}</h5>
                  <p>Rs {item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ===== CART / INVOICE PANEL (Portal) ===== */}
      {cartOpen &&
        createPortal(
          <div className="counter-cart-overlay" onClick={() => setCartOpen(false)}>
            <div className="counter-cart-panel" onClick={(e) => e.stopPropagation()}>
              <div className="counter-cart-header">
                <h3>Order Details</h3>
                <button className="counter-cart-close" onClick={() => setCartOpen(false)}>
                  <FiX />
                </button>
              </div>

              <form onSubmit={invoiceHandler}  id="place-order-form" className="counter-invoice-form">
                <div className="civ-field">
                  <label>Date</label>
                  <input type="date" name="date" value={invoiceDetail.date} onChange={onChangeHandler} />
                </div>
                <div className="civ-field">
                  <label>Customer Type</label>
                  <select name="customerType" value={invoiceDetail.customerType} onChange={onChangeHandler}>
                    <option value="walkin">Walk-in</option>
                    <option value="online">Online</option>
                  </select>
                </div>
                <div className="civ-field">
                  <label>Cashier Name</label>
                  <input
                    name="cashierName"
                    value={invoiceDetail.cashierName}
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="e.g. Imran"
                  />
                </div>
                <div className="civ-field">
                  <label>Payment</label>
                  <select name="orderType" value={invoiceDetail.orderType} onChange={onChangeHandler}>
                    <option>Cash</option>
                    <option>Online</option>
                  </select>
                </div>
                <div className="civ-field">
                  <label>Status</label>
                  <select name="paidMethod" value={invoiceDetail.paidMethod} onChange={onChangeHandler}>
                    <option>Paid</option>
                    <option>Credit</option>
                  </select>
                </div>
              </form>

              <div className="counter-cart-table">
                <div className="cct-head">
                  <span>Item</span>
                  <span>Qty</span>
                  <span>Price</span>
                  <span>Total</span>
                  <span></span>
                </div>

                <div className="cct-body">
                  {cart.length === 0 ? (
                    <p className="cct-empty">Cart is empty — add items from the menu.</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="cct-row">
                        <span className="cct-name">{item.name}</span>
                        <div className="cct-qty">
                          <button onClick={() => updateQty(item.id, "dec")}>
                            <FiMinus size={12} />
                          </button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, "inc")}>
                            <FiPlus size={12} />
                          </button>
                        </div>
                        <span>Rs {item.price}</span>
                        <span className="cct-total">Rs {item.price * item.qty}</span>
                        <button className="cct-remove" onClick={() => removeItem(item.id)}>
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="counter-summary">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>Rs {subtotal}</span>
                </div>
                <div className="summary-line">
                  <span>Tax (5%)</span>
                  <span>Rs {tax}</span>
                </div>
                <div className="summary-line summary-total">
                  <span>Total</span>
                  <span>Rs {total}</span>
                </div>

                <div className="counter-summary-btns">
                  <button className="counter-btn-outline" onClick={() => setCartOpen(false)}>
                    Close
                  </button>
                  {/* <button className="counter-btn-filled" disabled={cart.length === 0}>
                    Place Order
                  </button> */}
                  <button
                    type="submit"
                    form="place-order-form"
                    className="counter-btn-filled"
                    disabled={cart.length === 0}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CounterOrder;