import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Component/Title";
import axios from "axios";
import { toast } from "react-toastify";

function Order() {
  const { products, currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const getOrderData = async () => {
    try {
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/order/",
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          let allOrderItems = [];
          response.data.orders.map((order) => {
            order.items.map((item) => {
              item["status"] = order.status;
              item["payment"] = order.payment;
              item["paymentMethod"] = order.paymentMethod;
              item["date"] = order.date;
              allOrderItems.push(item);
            });
          });
          setOrderData(allOrderItems.reverse());
          console.log(orderData);
        }
      } else {
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getOrderData();
  }, [token]);

  return (
    <div className="min-h-[50vh]">
      <div className="flex justify-start mt-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="border-t mt-4">
        <div className="my-2">
          {orderData.map((item, index) => (
            <div
              key={index}
              className=" grid sm:grid-flow-row grid-flow-col sm:grid-rows-1 grid-rows-2 grid-cols-1 sm:grid-cols-[6fr_6fr] gap-2 my-3 border-b py-2"
            >
              <div className="flex gap-x-3 justify-center sm:justify-start">
                <img src={item.image[0]} alt="image" className="w-16" />
                <div className="flex flex-col">
                  <div>
                    <p>{item.name}</p>
                  </div>
                  <div className="flex justify-between items-center gap2">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity : {item.quantity}</p>
                    <p>Size :{item.size} </p>
                  </div>
                  <div>
                    <p className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </p>
                    <p>{item.paymentMethod}</p>
                  </div>
                </div>
              </div>
              <div className=" grid sm:grid-flow-row grid-cols-[3fr_3fr] gap-2">
                <div className="flex items-center sm:justify-center justify-end mr-10 sm:mr-0">
                  <div className="flex justify-center items-center">
                    <p className="border rounded-full mr-2 w-3 h-3 bg-green-600"></p>
                    <p>{item.status}</p>
                  </div>
                </div>
                <div className="flex items-center sm:justify-center justify-start ml-10 sm:ml-0">
                  <button onClick={getOrderData} className="border px-2 py-2">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
