import React from "react";
import Title from "../Component/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../Component/NewsLetter";

function Contact() {
  return (
    <div className="min-h-[50vh]">
      <div className="mt-10">
        <div>
          <Title text1={"CONTACT"} text2={"US"} />
        </div>
        <div className="my-8 flex flex-col sm:flex-row gap-8 justify-center items-center">
          <img
            src={assets.contact_img}
            alt="Image"
            className="w-full sm:max-w-[370px] sm:max-h-auto max-h-96"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-xl mb-4">Our Store</h3>
            <div className="my-4">
              <p className="text-gray-500">54790 Willms Station</p>
              <p className="text-gray-500">Suit 350, Washington, USA</p>
            </div>
            <div className="my-4">
              <p className="text-gray-500">Tel: (432)-76546543</p>
              <p className="text-gray-500">Email:Admin@gmail.com</p>
            </div>
            <h4 className="font-semibold text-xl mb-4">Careers At Forever</h4>
            <p className="text-gray-500">
              Learn more about our teams and job opening.
            </p>
            <div className="flex justify-start w-full">
              <button className="bg-black text-white px-4 py-2 mt-4">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <NewsLetter />
      </div>
    </div>
  );
}

export default Contact;
