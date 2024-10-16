import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

function Add({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      console.log(token);
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setBestSeller(false);
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <form onSubmit={onHandleSubmit}>
        <div className=" flex flex-col">
          <p className="font-semibold mb-3">Upload Images</p>
          <div className="flex gap-3 items-center">
            <label htmlFor="image1">
              <img
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt="Image"
                className="w-20"
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type="file"
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2">
              <img
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt="Image"
                className="w-20"
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type="file"
                id="image2"
                hidden
              />
            </label>
            <label htmlFor="image3">
              <img
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt="Image"
                className="w-20"
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type="file"
                id="image3"
                hidden
              />
            </label>
            <label htmlFor="image4">
              <img
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt="Image"
                className="w-20"
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type="file"
                id="image4"
                hidden
              />
            </label>
          </div>
          <div className="my-4">
            <div>
              <p className="my-2 font-semibold">Product Name</p>
              <input
                type="text"
                placeholder="Enter here"
                required
                className="py-1 px-2 border rounded-sm w-full sm:w-[450px]"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="mt-3">
              <p className="my-2 font-semibold">Product Description</p>
              <textarea
                className="py-1 px-2 border rounded-sm w-full sm:w-[450px]"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <div></div>
          </div>
          <div className="flex gap-2 flex-col sm:flex-row">
            <div>
              <p className="mb-2 font-semibold">Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full px-2 py-1 border"
                required
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div>
              <p className="mb-2 font-semibold">Sub Category</p>
              <select
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
                className="w-full px-2 py-1 border"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
            <div>
              <p className="mb-2 font-semibold">Price</p>
              <input
                type="number"
                className="w-full px-2 py-1 border"
                required
                placeholder="10"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
          </div>
          <div>
            <p className="my-2 mt-4 font-semibold">Product Size</p>
            <div className="flex flex-row gap-4 mt-2">
              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("S")
                      ? prev.filter((item) => item !== "S")
                      : [...prev, "S"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("S") ? "bg-pink-300" : " bg-gray-300"
                  }  px-3 cursor-pointer py-1 `}
                >
                  S
                </p>
              </div>
              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("M")
                      ? prev.filter((item) => item !== "M")
                      : [...prev, "M"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("M") ? "bg-pink-300" : " bg-gray-300"
                  }  px-3 cursor-pointer py-1 `}
                >
                  M
                </p>
              </div>
              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("L")
                      ? prev.filter((item) => item !== "L")
                      : [...prev, "L"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("L") ? "bg-pink-300" : " bg-gray-300"
                  }  px-3 cursor-pointer py-1 `}
                >
                  L
                </p>
              </div>
              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("XL")
                      ? prev.filter((item) => item !== "XL")
                      : [...prev, "XL"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("XL") ? "bg-pink-300" : " bg-gray-300"
                  }  px-3 cursor-pointer py-1 `}
                >
                  XL
                </p>
              </div>
              <div
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes("XXL")
                      ? prev.filter((item) => item !== "XXL")
                      : [...prev, "XXL"]
                  )
                }
              >
                <p
                  className={`${
                    sizes.includes("XXL") ? "bg-pink-300" : " bg-gray-300"
                  }  px-3 cursor-pointer py-1 `}
                >
                  XXL
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <input
              type="checkbox"
              id="bestseller"
              className="cursor-pointer"
              onChange={() => setBestSeller(!bestSeller)}
              checked={bestSeller}
            />
            <label htmlFor="bestseller" className="cursor-pointer">
              Add to bestsellers
            </label>
          </div>
          <div>
            <button
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "bg-gray-400 text-black" : "bg-black text-white"
              } px-4 py-2 cursor-pointer w-full sm:w-24 mt-4`}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Add;
