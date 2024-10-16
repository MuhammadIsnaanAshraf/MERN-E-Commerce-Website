import React, { useContext, useState, useEffect } from "react";

import { ShopContext } from "../Context/ShopContext";
import ProductId from "./ProductId";
import Title from "./Title";
function BestSellers() {
  const { products } = useContext(ShopContext);
  //   console.log(products);
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    const bestProductSellers = products.filter((item) => item.bestseller);
    console.log(bestProductSellers);
    setBestSellers(bestProductSellers.slice(0, 5));
    console.log(bestSellers);
  }, []);
  useEffect(() => {}, [products]);

  return (
    <div>
      <div className="my-2 text-center">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="text-gray-800 my-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
          officiis veniam inventore magni, nesciunt quae.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {bestSellers.map((item, index) => {
          return (
            <ProductId
              key={index}
              id={item._id}
              price={item.price}
              name={item.name}
              image={item.image}
            />
          );
        })}
      </div>
      ;
    </div>
  );
}

export default BestSellers;
