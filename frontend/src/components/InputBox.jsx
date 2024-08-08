import React from "react";

function InputBox({ heading, type, placeholder }) {
  return (
    <div className="pt-1 mx-6 md:mx-0">
      <div className="text-white font-medium text-sm py-2 pl-1 md:text-base">
        {heading}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="bg-transparent text-sm text-white w-full py-2 px-2 border rounded-lg border-gray-500 md:text-base"
      />
    </div>
  );
}

export default InputBox;
