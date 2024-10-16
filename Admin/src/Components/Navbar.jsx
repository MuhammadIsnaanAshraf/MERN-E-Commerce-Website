import React from "react";
import { assets } from "../assets/assets.js";
import Sidebar from "./Sidebar.jsx";
function Navbar({ setToken }) {
  return (
    <div>
      <div className="flex justify-between items-center h-16">
        <div>
          <img src={assets.logo} alt="Logo" className="w-32" />
        </div>
        <div>
          <button
            onClick={() => setToken("")}
            className="bg-gray-700 text-white px-4 py-2 rounded-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
