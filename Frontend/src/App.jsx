import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Collection from "./Pages/Collection";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import PlaceOrder from "./Pages/PlaceOrder";
import Login from "./Pages/Login";
import Order from "./Pages/Order";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Search from "./Component/Search";
import Verify from "./Pages/Verify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ShopContext } from "./Context/ShopContext";

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <Search />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
