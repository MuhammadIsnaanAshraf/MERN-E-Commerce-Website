import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const currency = "$";

  const fetchOrders = async () => {
    try {
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/order/list",
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          setOrders(response.data.order);
        } else {
          toast.error(response.data.message);
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateStatus = async (event, orderId) => {
    try {
      console.log(orderId);
      const response = await axios.post(
        backendUrl + "/api/order/update",
        {
          status: event.target.value,
          orderId,
        },
        { headers: { token } }
      );
      console.log(response.data);

      if (response.data.success) {
        await fetchOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);
  useEffect(() => {
    if (orders.length > 0) {
      console.log(orders);
    }
  }, [orders]);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 mt-2">Orders page</h3>
      <div>
        {orders.reverse().map((order, index) => (
          <div
            className="grid sm:grid-flow-col grid-cols-1 sm:grid-cols-[1fr_2fr_1fr_0.5fr_0.5fr] md:grid-cols-[1fr_2fr_1.5fr_0.5fr_0.5fr] gap-2 border border-gray-300 py-2 my-2 items-center lg:px-6 md:px-4 px-2 justify-center"
            key={index}
          >
            <div className="flex justify-center">
              <img
                src={assets.parcel_icon}
                alt="Image"
                className="w-16 border-none"
              />
            </div>
            <div>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return (
                    <p key={index}>
                      {item.name} X {item.quantity} <span>{item.size}</span>
                    </p>
                  );
                } else {
                  <p key={index}>
                    {item.name} X {item.quantity} <span>{item.size},</span>
                  </p>;
                }
              })}

              <p className="my-2 font-medium">
                {order.adress.firstName + " " + order.adress.lastName}{" "}
              </p>
              <p className="text-sm md:text-base">{order.adress.street}</p>
              <p className="text-sm md:text-base">
                {order.adress.city +
                  " " +
                  order.adress.state +
                  " " +
                  order.adress.zipcode}
              </p>
              <p className="text-sm md:text-base">{order.adress.phone}</p>
            </div>
            <div>
              <p className="mb-4 font-medium">Item : {order.items.length}</p>
              <p>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>date : {new Date(order.date).toLocaleDateString()} </p>
            </div>
            <p>
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(event) => updateStatus(event, order._id)}
              value={order.status}
              className="border py-1 font-medium"
            >
              <option value="Order placed">Order placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
