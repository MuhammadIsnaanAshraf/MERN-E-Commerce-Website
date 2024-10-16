import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <div className="relative">
      <div className="mb-2">
        <div className=" flex flex-col md:grid grid-cols-[3fr_1fr_1fr] my-8">
          <div>
            <img src={assets.logo} className="" />
            <p className="sm:pr-10 md:pr-24">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Exercitationem, corrupti ducimus saepe ipsa, officiis cupiditate
              assumenda, unde aut repellat eaque nobis asperiores vitae soluta
              cumque!
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-xl my-3">Company</h3>
            <ul>
              <li className="my-1 cursor-pointer">Home</li>
              <li className="my-1 cursor-pointer">About Us</li>
              <li className="my-1 cursor-pointer">Delivery</li>
              <li className="my-1 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xl my-3">Conatct</h3>
            <ul>
              <li className="my-1">+92 3227479402</li>
              <li className="my-1">ashrafmuhammadisnaan@gmail.com</li>
            </ul>
          </div>
        </div>
        <hr />

        <div className="text-center py-2">
          Copyright 2024@ forever.com - All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
