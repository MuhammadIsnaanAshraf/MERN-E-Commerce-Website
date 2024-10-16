import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext.jsx";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

function Search() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  // console.log(search);
  const location = useLocation();
  const [Visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  useEffect(() => {}, [search]);
  return showSearch && Visible ? (
    <div className="bg-gray-50 py-6 rounded-md ">
      <div className="flex justify-center items-center gap-2 border rounded-full w-2/4 mx-auto px-3">
        <input
          type="text"
          placeholder="Search here"
          className="w-full rounded-full bg-transparent outline-none py-2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <img src={assets.search_icon} alt="" className="w-6 h-6" />
      </div>
      {/* <img src={assets.cross_icon} /> */}
    </div>
  ) : null;
}

export default Search;
