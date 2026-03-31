import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const [currState, setCurrState] = useState("Sign Up");
  const url = "http://localhost:4000";

  // ✅ Add item to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
    }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Add to cart error:", err);
      }
    }
  };

  // ✅ Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1 > 0 ? prev[itemId] - 1 : 0
    }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Remove from cart error:", err);
      }
    }
  };

  // ✅ Get total amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const item = food_list.find(f => f._id.toString() === itemId);
        if (item) totalAmount += item.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  // ✅ Fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (err) {
      console.error("Fetch food list error:", err);
    }
  };

  // ✅ Load cart from backend
  const loadCartData = async (savedToken) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${savedToken}` } }
      );
      // convert keys to string to avoid ObjectId mismatch
      const cartData = {};
      if (response.data.cartData) {
        Object.keys(response.data.cartData).forEach(key => {
          cartData[key.toString()] = response.data.cartData[key];
        });
      }
      setCartItems(cartData);
    } catch (err) {
      console.error("Load cart error:", err);
    }
  };

  // ✅ On mount
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    }
    loadData();
  }, []);

  // ✅ Total items in cart
  const totalItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    totalItems,
    currState,
    setCurrState
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
