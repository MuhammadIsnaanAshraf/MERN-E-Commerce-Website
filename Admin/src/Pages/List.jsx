import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

function List({ token }) {
  const [list, setList] = useState([]);
  const currency = "$";

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
        // console.log(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Deleted Successfully");
        console.log(response.data);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <div>
        <h3 className="font-semibold text-xl mb-3">All Products List</h3>
        <div className="flex flex-col gap-3">
          <div className="grid  grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 bg-slate-200">
            <p className="font-semibold">Image</p>
            <p className="font-semibold text-center sm:text-start">Name</p>
            <p className="font-semibold ">Category</p>
            <p className="font-semibold text-center">Price</p>
            <p className="font-semibold">Action</p>
          </div>
          {list.map((item, index) => (
            <div className="">
              <div
                key={index}
                className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border gap-2"
              >
                <img src={item.image[0]} alt="" className="w-16" />
                <p>{item.name}</p>
                <p className="text-center">{item.category}</p>
                <p className="text-center">
                  {currency}
                  {item.price}
                </p>
                <p
                  onClick={() => removeProduct(item._id)}
                  className="text-center font-semibold cursor-pointer"
                >
                  X
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default List;
