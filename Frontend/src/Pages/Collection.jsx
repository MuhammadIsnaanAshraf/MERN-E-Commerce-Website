import React, { useContext, useState, useEffect } from "react";
import Title from "../Component/Title";
import { assets } from "../assets/assets";
import ProductId from "../Component/ProductId";
import { ShopContext } from "../Context/ShopContext";

function Collection() {
  const { products } = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filterdData, setFilterData] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortProduct, setSortProduct] = useState("relavent");
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const toggleCategory = (e) => {
    console.log(e.target.value);
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    console.log(e.target.value);
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };
  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      console.log(search);
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterData(productsCopy);
  };

  const applySortProduct = (e) => {
    const fdCopy = filterdData.slice();
    switch (sortProduct) {
      case "low-to-high":
        setFilterData(fdCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-to-low":
        setFilterData(fdCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, products]);

  useEffect(() => {
    applySortProduct();
  }, [sortProduct]);

  return (
    <div className="min-h-[35vh] overflow-x-hidden">
      <hr />
      <div className="my-10 flex flex-col sm:flex-row">
        <div className="left sm:w-52 w-full">
          <div className="flex items-center justify-center sm:justify-start gap-2 ">
            <h3 className="font-medium text-2xl pb-2 ">FILTERS</h3>
            <img
              src={assets.dropdown_icon}
              className="sm:hidden w-3 h-3 text-gray-700 rotate-90"
              onClick={() => setShowFilters(!showFilters)}
            />
          </div>
          <div className="flex flex-row sm:flex-col justify-between gap-2 sm:justify-center w-[92%] mx-auto sm:mx-0 sm:w-full mt-4">
            <div
              className={`border rounded-md w-44 min-h-40 pl-3 py-1 ${
                showFilters ? "" : "hidden sm:block"
              }`}
            >
              {/* <div className={`${setShowFilters(true)}`}> */}
              <h3 className="font-medium text-lg py-2">CATEGORIES</h3>
              <p className="my-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  value={"Men"}
                  onChange={toggleCategory}
                />
                Men
              </p>
              <p className="my-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  value={"Women"}
                  onChange={toggleCategory}
                />
                Women
              </p>
              <p className="my-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  value={"Kids"}
                  onChange={toggleCategory}
                />
                Kids
              </p>
              {/* </div> */}
            </div>
            <div
              className={`border rounded-md sm:mt-4  w-44 min-h-40 pl-3 py-1 ${
                showFilters ? "" : "hidden sm:block"
              }`}
            >
              <h3 className="font-medium text-lg py-2">TYPE</h3>
              <p className="my-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  value={"Topwear"}
                  onChange={toggleSubCategory}
                />
                Topwear
              </p>
              <p className="my-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  value={"Bottomwear"}
                  onChange={toggleSubCategory}
                />
                Bottomware
              </p>
              <p className="my-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  value={"Winterwear"}
                  onChange={toggleSubCategory}
                />
                Winterwear
              </p>
            </div>
          </div>
        </div>
        <div className=" ml-2 md:ml-14 right w-full mt-3 sm:mt-0">
          <div className="flex sm:flex-row justify-between flex-col ">
            <div>
              <Title text1={"All"} text2={"COLLECTIONS"} />
            </div>
            <select
              className="border border-gray-400 rounded-sm text-sm px-2 w-1/2 sm:w-auto mx-auto sm:mx-0 mt-3 sm:mt-0"
              onChange={(e) => setSortProduct(e.target.value)}
            >
              <option value="relavent">Sort by : Relavent</option>
              <option className="bloc" value="low-to-high">
                Sort by : Low-to-high
              </option>
              <option value="high-to-low">Sort by :High-to-low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-8 mx-auto">
            {filterdData.map((item, index) => (
              <div className="">
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
      </div>
    </div>
  );
}

export default Collection;
