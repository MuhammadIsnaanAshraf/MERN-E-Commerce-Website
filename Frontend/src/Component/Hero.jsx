import React from "react";
import { assets } from "../assets/assets";

function Hero() {
  return (
    <div className="border my-12 flex flex-col sm:flex-row">
      <div className="left flex flex-col gap-2 w-full sm:w-2/4 sm:h-96 h-80 border-x items-center self-center justify-center">
        <div className="flex gap-2 items-center">
          <p className="w-10 h-0.5 bg-black"></p>
          <h3>OUR BESTSELLERS</h3>
        </div>
        <div>
          <h1 className="font-semibold text-4xl prata-regular">
            Latest Arrivals
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <h3>SHOP NOW</h3>
          <p className="w-10 h-0.5 bg-black"></p>
        </div>
      </div>
      <div className="right w-full sm:w-2/4 sm:h-96 h-72 border-x">
        <div>
          <img
            src={assets.hero_img}
            alt="Hero-image"
            className="w-full sm:h-96 h-72"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
