import React, { useContext } from "react";
import ProductId from "./ProductId";
import Title from "./Title";
import { ShopContext } from "../Context/ShopContext.jsx";

function RelatedProduct({ category, subCategory }) {
  const { products } = useContext(ShopContext);
  let productsCopy = products.slice();

  if (products.length > 0) {
    productsCopy = productsCopy.filter((item) => item.category === category);
    productsCopy = productsCopy.filter(
      (item) => item.subCategory === subCategory
    );
    productsCopy = productsCopy.slice(0, 5);
  }
  return (
    <div>
      <Title text1={"RELATED"} text2={" PRODUCTS"} />
      <div className="mt-10 mb-20 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mx-auto gap-3">
        {productsCopy.map((item, index) => (
          <div className="mx-auto">
            <ProductId
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedProduct;
