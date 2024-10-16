import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Sidebar from "./Components/Sidebar";
import Add from "./Pages/Add";
import List from "./Pages/List";
import Orders from "./Pages/Orders";
import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className=" px-4 sm:px-[2vw] md:px-[3vw] lg:px-[4vw] bg-gray-50 min-h-screen">
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <ToastContainer />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="lg:w-[80vw] sm:w-[88vw] w-full sm:pl-6 pl-2 py-6">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
