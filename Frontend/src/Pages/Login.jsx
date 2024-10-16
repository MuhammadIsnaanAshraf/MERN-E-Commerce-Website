import React, { useContext, useState, useEffect } from "react";
import Title from "../Component/Title";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          toast.success("Registered Successfully");
          localStorage.setItem("token", response.data.token);
          setName("");
          setEmail("");
          setPassword("");
        } else {
          toast.error(response.data.message);
        }
        // console.log(response.data);
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);

          setEmail("");
          setPassword("");
        } else {
          toast.error(response.data.message);
        }
        console.log(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-[50vh]">
      <form className="mt-20  w-full sm:w-96 m-auto" onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <p className="font-bold prata-regular text-black text-3xl">
            {currentState}
          </p>
          <p className="bg-slate-600 h-0.5 w-12 mx-3"></p>
        </div>
        <div className="mt-8">
          {currentState === "Sign Up" ? (
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full px-3 py-2 border my-2"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          ) : null}
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full px-3 py-2 border my-2"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full px-3 py-2 border mt-2 focus:border-0 focus:outline-0"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="mt-2 flex justify-between items-center">
          <p className="">Forget Password ?</p>
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer"
            >
              Login Here
            </p>
          )}
        </div>
        <div className="text-center mt-6 mb-4">
          <button className="bg-black text-white px-6 py-2  ">
            {currentState}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
