import React, { useContext } from "react";
import { ShopContext } from "../Context/Shopcontext";
import { Link } from "react-router-dom";

function ProductId({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`}>
      <div className="hover:transition-all hover:scale-105 hover:ease-in-out duration-300 cursor-pointer">
        <div>
          <img src={image[0]} alt="image" />
        </div>
        <div>
          <p>{name}</p>
          <p>
            {currency}
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductId;
