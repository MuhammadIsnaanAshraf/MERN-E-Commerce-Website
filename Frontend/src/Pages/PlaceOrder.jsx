import React, { useState } from "react";
import axios from "axios";
import CartTotal from "../Component/CartTotal";
import Title from "../Component/Title";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

function PlaceOrder() {
  const {
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    cartTotal,
    delivery_fee,
    token,
    products,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandle = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products).find(
              (product) => product._id === items
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
            }
            orderItems.push(itemInfo);
          }
        }
      }

      console.log(orderItems);
      const orderData = {
        adress: formData,
        items: orderItems,
        amount: cartTotal() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,

            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "Stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }

          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={onHandleSubmit}
      className="flex sm:flex-row flex-col mt-10 min-[50vh] gap-2"
    >
      <div className="left w-full">
        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              onChange={onChangeHandle}
              name="firstName"
              value={formData.firstName}
              type="text"
              placeholder="First Name"
              className="rounded-sm border px-2 py-2 w-full"
              required
            />
            <input
              onChange={onChangeHandle}
              name="lastName"
              value={formData.lastName}
              type="text"
              placeholder="Last Name"
              className="rounded-sm border px-2 py-2 w-full"
              required
            />
          </div>
          <input
            onChange={onChangeHandle}
            name="email"
            value={formData.email}
            type="email"
            placeholder="Enter Email Adress"
            className="rounded-sm border px-2 py-2 w-full"
            required
          />
          <input
            onChange={onChangeHandle}
            name="street"
            value={formData.street}
            type="text"
            placeholder="Enter your street"
            className="rounded-sm border px-2 py-2 w-full"
            required
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              onChange={onChangeHandle}
              name="city"
              value={formData.city}
              type="text"
              placeholder="City"
              className="rounded-sm border px-2 py-2 w-full"
              required
            />
            <input
              onChange={onChangeHandle}
              name="state"
              value={formData.state}
              type="text"
              placeholder="State"
              className="rounded-sm border px-2 py-2 w-full"
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              onChange={onChangeHandle}
              name="zipcode"
              value={formData.zipcode}
              type="number"
              placeholder="Zipcode"
              className="rounded-sm border px-2 py-2 w-full"
              required
            />
            <input
              onChange={onChangeHandle}
              name="country"
              value={formData.country}
              type="text"
              placeholder="Country"
              className="rounded-sm border px-2 py-2 w-full"
              required
            />
          </div>
          <input
            onChange={onChangeHandle}
            name="phone"
            value={formData.phone}
            type="number"
            placeholder="Enter Phone Number"
            className="rounded-sm border px-2 py-2 w-full"
            required
          />
        </div>
      </div>
      <div className="right w-full">
        <div className=" flex justify-end">
          <div className="mb-2 ">
            <CartTotal />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
        </div>
        <div className="flex mt-4 justify-end flex-col lg:flex-row gap-2">
          {/* <div
            onClick={() => setMethod("Razorpay")}
            className="border px-2 mx-1 flex justify-between items-center"
          >
            <p
              className={`border rounded-full mr-2 w-3 h-3 ${
                method === "Razorpay" ? "bg-green-600" : ""
              }`}
            ></p>
            <img src={assets.razorpay_logo} className="w-16" alt="image" />
          </div> */}
          <div
            onClick={() => setMethod("Stripe")}
            className="border px-2  flex justify-between items-center"
          >
            <p
              className={`border rounded-full mr-2 w-3 h-3 ${
                method === "Stripe" ? "bg-green-600" : ""
              }`}
            ></p>
            <img src={assets.stripe_logo} className="w-14" alt="image" />
          </div>
          <div className="border flex justify-between items-center px-1">
            <p
              className={`border rounded-full mr-2 w-3 h-3 ${
                method === "cod" ? "bg-green-600" : ""
              }`}
            ></p>
            <p onClick={() => setMethod("cod")} className=" text-gray-600 py-1">
              CASH ON DELIVERY
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button type="submit" className="bg-black text-white px-4 py-2">
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
