import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

function Sidebar() {
  return (
    <div className="md:w-[20vw] w-[10vw] min-h-screen border-r pt-6">
      <div className="flex flex-col gap-y-4">
        <NavLink
          to="/add"
          className="border flex items-center justify-center md:justify-start gap-2 sm:px-2 py-1"
        >
          <img src={assets.add_icon} alt="image" className="w-5 h-5" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className="border flex items-center justify-center md:justify-start gap-2 sm:px-2 py-1"
        >
          <img src={assets.add_icon} alt="image" className="w-5 h-5" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="border flex items-center justify-center md:justify-start gap-2 sm:px-2 py-1"
        >
          <img src={assets.add_icon} alt="image" className="w-5 h-5" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
