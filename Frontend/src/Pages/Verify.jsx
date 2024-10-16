import React, { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Verify() {
  const { navigate, backendUrl, setCartItems, token } = useContext(ShopContext);
  console.log(token);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      console.log(token);
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/order/verifyStripe",
          { success, orderId },
          { headers: { token } }
        );
        console.log(response.data);
        if (response.data.success) {
          setCartItems({});
          navigate("/orders");
        } else {
          navigate("/cart");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className="min-h-[50vw]">
      <div></div>
    </div>
  );
}

export default Verify;

