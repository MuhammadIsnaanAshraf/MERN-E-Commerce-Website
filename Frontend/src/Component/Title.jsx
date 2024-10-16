import React from "react";

function Title({ text1, text2 }) {
  return (
    <div className="flex gap-2 items-center justify-center text-2xl">
      <p className="text-gray-600">{text1}</p>
      <p> {text2}</p>
      <p className="w-10 bg-black h-0.5"></p>
    </div>
  );
}

export default Title;
