import React from "react";
import Title from "../Component/Title";
import NewsLetter from "../Component/NewsLetter";
import { assets } from "../assets/assets";

function About() {
  return (
    <div className="min-h-[50vh]">
      <div className="mt-10">
        <div>
          <Title text1={"ABOUT"} text2={"US"} />
        </div>

        <div className="flex flex-col sm:flex-row mt-8 gap-x-10">
          <div className=" sm:min-w-[300px] sm:min-h-[250px]">
            <img
              src={assets.about_img}
              alt="About Image"
              className="h-[100%] w-[100%]"
            />
          </div>
          <div className="flex flex-col lg:gap-6 mt-6 sm:mt-0">
            <p className="lg ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
              ipsam magnam quam, commodi at magni quidem facere esse. Deleniti,
              ex? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Omnis, illo.
            </p>
            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
              ipsam magnam quam, commodi at magni quidem facere esse. Deleniti,
              ex? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Omnis, illo.
            </p>
            <b className="mt-5">Our Mission</b>
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
              ipsam magnam quam, commodi at magni quidem facere esse. Deleniti,
              ex? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Omnis, illo.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="mt-4 flex justify-start">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>
        <div className="flex flex-wrap justify-center items-center my-8">
          <div className="text-center w-[30%] border  px-3 pt-4 pb-8 mx-2">
            <h3 className="font-semibold my-2">Quality Assurance</h3>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              voluptas distinctio unde earum amet optio modi exercitationem
              assumenda tenetur quibusdam.
            </p>
          </div>
          <div className="text-center w-[30%] border  px-3 pt-4 pb-8 mx-2">
            <h3 className="font-semibold my-2">Quality Assurance</h3>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              voluptas distinctio unde earum amet optio modi exercitationem
              assumenda tenetur quibusdam.
            </p>
          </div>
          <div className="text-center w-[30%] border px-3 pt-4 pb-8 mx-2">
            <h3 className="font-semibold my-2">Quality Assurance</h3>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              voluptas distinctio unde earum amet optio modi exercitationem
              assumenda tenetur quibusdam.
            </p>
          </div>
        </div>
      </div>

      <div>
        <NewsLetter />
      </div>
    </div>
  );
}

export default About;
