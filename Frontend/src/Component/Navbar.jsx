import React, { useState, useContext } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext.jsx";
function Navbar() {
  const [visibility, setVisbility] = useState(false);
  const {
    showSearch,
    setShowSearch,
    cartCount,
    token,
    setToken,
    navigate,
    setCartItems,
  } = useContext(ShopContext);

  const logout = async () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  return (
    <div className=" py-4 relative">
      <div className=" flex justify-between items-center">
        <div className="">
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="w-28 cursor-pointer" />
          </Link>
        </div>
        <div className="hidden sm:block">
          <ul className="flex justify-between items-center gap-3">
            <NavLink
              to="/"
              className="flex flex-col justify-center items-center font-semibold"
            >
              <p>Home</p>
              <hr className=" w-full h-0.5 bg-gray-800 hidden" />
            </NavLink>
            <NavLink
              to="/collection"
              className="flex flex-col justify-center items-center  font-semibold"
            >
              <p>Collection</p>
              <hr className=" w-full h-0.5 bg-gray-800 hidden" />
            </NavLink>
            <NavLink
              to="/about"
              className="flex flex-col justify-center items-center font-semibold"
            >
              <p>About</p>
              <hr className=" w-full h-0.5 bg-gray-800 hidden" />
            </NavLink>
            <NavLink
              to="/contact"
              className="flex flex-col justify-center items-center  font-semibold"
            >
              <p>Contact</p>
              <hr className="w-full h-0.5 bg-gray-800 hidden" />
            </NavLink>
          </ul>
        </div>
        <div className="flex gap-2">
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 mx-2 cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          />
          <div className="group relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={assets.profile_icon}
              alt="Profile"
              className="w-5 mx-2 cursor-pointer"
            />

            <div className="group-hover:block hidden absolute  dropdown-menue right-4 pt-4  transition-all duration-200">
              <div className="flex flex-col items-center justify-center w-28 h-24 box-border  bg-slate-100 rounded-md text-gray-500 ">
                <p className="hover:text-black hover:font-semibold cursor-pointer">
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="hover:text-black hover:font-semibold cursor-pointer"
                >
                  Orders
                </p>
                {!token && (
                  <p
                    onClick={logout}
                    className="hover:text-black hover:font-semibold cursor-pointer"
                  >
                    Logout
                  </p>
                )}
              </div>
            </div>
          </div>
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} alt="Cart" className="w-5" />
            <p className="bg-black text-white absolute left-2 bottom-0 w-4 text-center leading-4 aspect-square text-[10px] rounded-full">
              {cartCount()}
            </p>
          </Link>
          <div>
            <img
              src={assets.menu_icon}
              className="sm:hidden w-5 cursor-pointer"
              onClick={() => {
                setVisbility(true);
              }}
            />
          </div>
        </div>
      </div>
      {/* {visibility ? ( */}
      <div
        className={`absolute top-0 left-0 bottom-0   bg-white min-h-[100vh] text-black w-full z-10 overflow-x-hidden px-0 transition-all py-4 ${
          visibility ? "block " : "hidden"
        }`}
      >
        <div className="px-0 border-2">
          <div className="flex items-center justify-start gap-3">
            <img
              src={assets.dropdown_icon}
              className="h-5 rotate-180 cursor-pointer "
              onClick={() => {
                setVisbility(false);
              }}
            />
            <p
              onClick={() => {
                setVisbility(false);
              }}
              className="cursor-pointer font-semibold"
            >
              Back
            </p>
          </div>
          <ul className="flex flex-col gap-1 mt-4">
            <NavLink
              to="/"
              className="font-semibold cursor-pointer px-4 py-2 rounded-sm"
            >
              Home
            </NavLink>
            <hr />
            <NavLink
              to="/collection"
              className="font-semibold cursor-pointer py-2 px-4 rounded-sm"
              onClick={() => {
                setVisbility(false);
              }}
            >
              Collection
            </NavLink>
            <hr />
            <NavLink
              to="/About"
              className="font-semibold cursor-pointer py-2 px-4 rounded-sm"
              onClick={() => {
                setVisbility(false);
              }}
            >
              About
            </NavLink>
            <hr />
            <NavLink
              to="/contact"
              className="font-semibold cursor-pointer py-2  px-4 rounded-sm"
              onClick={() => {
                setVisbility(false);
              }}
            >
              Contact
            </NavLink>
            <hr />
          </ul>
        </div>
      </div>
      {/* ) : null} */}
    </div>
  );
}

export default Navbar;
