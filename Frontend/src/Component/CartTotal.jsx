import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";

function CartTotal() {
  const { currency, delivery_fee, cartTotal } = useContext(ShopContext);
  return (
    <div className="my-10 ">
      <div className=" sm:min-w-64 md:min-w-80 lg:min-w-96 ">
        <div>
          <Title text1={"CART"} text2={"TOTAL"} />
        </div>
        <div className="flex flex-col mt-8 ">
          <div className="flex justify-between border-b py-2 ">
            <p>SubTotal</p>
            <p>
              {currency}
              {cartTotal()}.00
            </p>
          </div>
          <div className="flex justify-between border-b  py-2">
            <p>Delivery Fee</p>
            <p>
              {currency}
              {delivery_fee}.00
            </p>
          </div>
          <div className="flex justify-between border-b font-bold  py-2">
            <p>Total</p>
            <p>
              {currency}
              {cartTotal() + delivery_fee}.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
