import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductId from "./ProductId";
function LatestCollection() {
  const { products } = useContext(ShopContext);

  const [LatestCollection, SetLatestCollection] = useState([]);

  useEffect(() => {
    SetLatestCollection(products.slice(0, 10));
  }, [products]);

  // console.log(products);
  return (
    <div className="h-vsh">
      <div className="text-center ">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="text-gray-800 my-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
          officiis veniam inventore magni, nesciunt quae.
        </p>
      </div>
      <div className=" grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 mx-auto mb-8">
        {LatestCollection.map((item, index) => (
          <div className="mx-auto">
            <ProductId
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;
