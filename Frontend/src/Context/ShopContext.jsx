import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { products } from "../assets/assets.js";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();
const currency = "$";
const delivery_fee = 10;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
function ShopContextProvider(props) {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("please select size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  console.log(cartItems);

  const updateCartItems = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartData = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
        // toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cartTotal = () => {
    let totalAmount = 0;
    for (let items in cartItems) {
      const itemInfo = products.find((item) => item._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  const cartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  const listProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Theres something error");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    listProducts();
  }, []);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getCartData(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    cartCount,
    updateCartItems,
    cartTotal,
    navigate,
    backendUrl,
    token,
    setToken,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
}

export default ShopContextProvider;
