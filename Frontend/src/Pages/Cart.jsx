import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Component/Title";
import { assets } from "../assets/assets";
import CartTotal from "../Component/CartTotal";

function Cart() {
  const { products, currency, cartItems, updateCartItems, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="pt-10 min-h-[46vh]">
      <div>
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {cartData.length > 0 ? (
        <div>
          <div className="mt-10 mb-6 border-t">
            {cartData.map((item, index) => {
              const productCopy = products.find(
                (product) => product._id === item._id
              );
              console.log(productCopy);
              return (
                <div key={index} className="sm:w-full w-3/4 mx-auto my-2">
                  <div className="py-2 grid sm:grid-flow-row grid-flow-col sm:grid-rows-1 grid-rows-2 grid-cols-1 sm:grid-cols-[6fr_3fr] md:grid-cols-[8fr_6fr]  items-center justify-center border-b">
                    <div className="flex gap-4 justify-between sm:justify-normal">
                      <img src={productCopy.image[0]} className="w-20" />
                      <div className="">
                        <h4>{productCopy.name}</h4>
                        <div className=" py-3 flex justify-between">
                          <p>
                            {currency}
                            {productCopy.price}
                          </p>
                          <p className="bg-gray-100 px-3 py-1">{item.size}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex  justify-between sm:grid md:grid-cols-[3fr_3fr]  sm:grid-cols-[2fr_2fr] gap-x-2 w-full mx-auto">
                      <div className="py-2">
                        <input
                          onChange={(e) =>
                            e.target.value === "" || e.target.value === 0
                              ? null
                              : updateCartItems(
                                  item._id,
                                  item.size,
                                  Number(e.target.value)
                                )
                          }
                          type="number"
                          className="border text-center w-20"
                          min={1}
                          defaultValue={item.quantity}
                        />
                      </div>
                      <div className="py-2 ">
                        <img
                          onClick={() =>
                            updateCartItems(item._id, item.size, 0)
                          }
                          src={assets.bin_icon}
                          className="w-6 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-2 mb-2 w-full flex sm:justify-end justify-center">
            <CartTotal />
          </div>

          <div className="mt-2 mb-4 text-center sm:text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white py-2 px-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-700 text-center my-20">
          "No item has added yet."
        </div>
      )}
    </div>
  );
}

export default Cart;
