import React from "react";
import { assets } from "../assets/assets";

function OurPolicy() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 mb-8 mt-12 ">
      <div className="border w-60 py-2 px-2 my-2 mx-4 bg-gray-100 rounded-md text-center flex flex-col items-center justify-center">
        <div className="my-3">
          <img src={assets.exchange_icon} className="w-12" />
        </div>
        <h3 className="font-semibold py-2">Easy Exchange Policy</h3>
        <p>We provide hasle free exchange policy</p>
      </div>
      <div className="border  w-60 p-2 my-2 mx-4 bg-gray-100 rounded-md text-center flex flex-col items-center justify-center">
        <div className="my-3">
          <img src={assets.quality_icon} className="w-12" />
        </div>
        <h3 className="font-semibold py-2">7 Days Return Policy</h3>
        <p>We provide esay 7 days return policy.</p>
      </div>
      <div className="border w-60 p-2 my-2 mx-4 bg-gray-100 rounded-md text-center flex flex-col items-center justify-center">
        <div className="my-3">
          <img src={assets.support_img} className="w-12" />
        </div>
        <h3 className="font-semibold py-2">Best Customer Support</h3>
        <p>We provide 24/7 customer support</p>
      </div>
    </div>
  );
}

export default OurPolicy;
