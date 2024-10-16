import React, { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <div className="sm:w-80 w-[90%] mt-24">
        <h3 className="font-bold text-2xl text-center my-3">Admin Login</h3>
        <div className="rounded-sm shadow-md p-4 mt-4 bg-white">
          <form action="" onSubmit={handleSubmit}>
            <div className="">
              <p className="text-gray-700 font-semibold">Email Address</p>
              <input
                type="text"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border px-3 py-1 w-full rounded-sm mt-2"
              />
            </div>
            <div>
              <p className="text-gray-700 font-semibold mt-2">Password</p>
              <input
                type="text"
                placeholder="Enter Your Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border px-3 py-1 w-full rounded-sm mt-2"
              />
            </div>
            <button className="w-full bg-black text-white mt-3 py-1 rounded-sm">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
