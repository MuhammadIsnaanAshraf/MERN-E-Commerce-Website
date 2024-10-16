import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/Shopcontext.jsx";
import { assets } from "../assets/assets";
import RelatedProduct from "../Component/RelatedProduct";

function Product() {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(false);
  const [image, setImage] = useState(false);
  const [size, setSize] = useState("");
  // console.log(productId);

  const showProduct = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProduct(item);
        setImage(item.image[0]);
      }
    });
  };
  console.log(product);

  useEffect(() => {
    showProduct();
  }, [product, productId]);

  return product ? (
    <div className="border-t pt-2 min-h-[100vh]">
      <div className="flex flex-col sm:flex-row my-6 w-[88vw]">
        <div className="lg:w-[10vw] sm:w-[17vw] w-full sm:my-0 my-2 flex gap-3 box-border sm:flex-col flex-row">
          {product.image.map((item, index) => (
            <div className="w-[25%] sm:w-24">
              <img
                src={item}
                key={index}
                onClick={() => setImage(item)}
                className="w-full"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-5 w-[90vw] sm:mx-4">
          <div className="md:w-[70%] w-full min-h-[50vh]">
            <img src={image} alt="" className="sm:h-[100%] w-full" />
          </div>
          <div className="w-full">
            <h3 className="font-semibold text-xl ">{product.name}</h3>
            <div className="flex gap-1 my-3">
              <img src={assets.star_icon} className="w-5" />
              <img src={assets.star_icon} className="w-5" />
              <img src={assets.star_icon} className="w-5" />
              <img src={assets.star_icon} className="w-5" />
              <img src={assets.star_dull_icon} className="w-5" />
              <div className="mx-2">(122)</div>
            </div>
            <div className="font-semibold text-xl my-2">
              {currency}
              {product.price}
            </div>
            <div className=" w-full lg:w-[80%] my-2">
              <p className="text-gray-800">{product.description}</p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold  text-xl my-4">Size</h3>
              <div className="flex gap-2 my-3">
                {product.sizes.map((item, index) => {
                  return (
                    <button
                      onClick={() => {
                        setSize(item);
                        console.log(item);
                        console.log(size);
                      }}
                      className={`bg-gray-100 px-3 py-1 rounded-md ${
                        size === item ? "border border-black" : null
                      }`}
                      key={index}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => addToCart(product._id, size)}
              className="bg-black px-2 text-white py-1 my-4"
            >
              Add to cart
            </button>
            <hr className="my-2 lg:w-3/4 w-full" />
            <div className="mt-6">
              <p className="text-gray-800">100% original product.</p>
              <p className="text-gray-800">
                Cash on delivery is available for this product.
              </p>
              <p className="text-gray-800">
                Easy exchange and return policy within 7 days.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <p className="border px-2 py-2 font-semibold">Description</p>
          <p className="border px-2 py-2">Reviews(122)</p>
        </div>
        <div className="border mb-20 py-2">
          <p className="mb-3 px-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A placeat
            corrupti quia exercitationem, officiis cumque dolores consequuntur
            sit sed aliquam, labore dolorem dolor provident doloremque, ipsa nam
            asperiores? Veritatis, molestias.
          </p>
          <p className="mt-3 px-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem id
            nulla veritatis. Ducimus eaque quis laboriosam corporis, est labore,
            doloremque doloribus necessitatibus dolorem dicta mollitia?
          </p>
        </div>
      </div>
      <div>
        <RelatedProduct
          category={product.category}
          subCategory={product.subCategory}
        />
      </div>
    </div>
  ) : null;
  //  (
  //   // <div>Null</div>
  // );
}

export default Product;
