import React from "react";

function NewsLetter() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-md mt-14 mb-10 py-4 bg-gray-100">
      <div className="text-center my-4">
        <h3 className="font-semibold text-xl my-2">
          Subscribe Now And Get 50% Off.
        </h3>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <form
        className="my-4 w-full px-4  sm:w-3/4 text-center flex justify-center"
        onSubmit={() => {
          handleSubmit;
        }}
      >
        <input
          type="text"
          className="p-2 w-full sm:w-2/3 md:w-2/4 outline-none rounded-sm "
          placeholder="Enter your email"
        />
        <button className="mx-2 bg-black text-white px-2 py-2 rounded-sm">
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default NewsLetter;
