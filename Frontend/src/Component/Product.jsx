import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/Shopcontext";

function Product() {
  const { productID } = useParams;
  const { products } = useContext(ShopContext);
  const [product, setProduct] = useState("");
  console.log(productID);

  const showProduct = () => {
    products.map((item) => {
      if (item._id === productID) {
        setProduct(item);
      }
      console.log(product);
    });
  };

  useEffect(() => {
    showProduct;
  }, [product, productID]);

  return <div></div>;
}

export default Product;
