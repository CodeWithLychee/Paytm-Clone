import React from "react";

function InputBox({ heading, type, placeholder, onChange }) {
  return (
    <div className="pt-1 mx-6 md:mx-0">
      <div className="text-white font-medium text-sm py-2 pl-1 md:text-base">
        {heading}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="outline-none bg-transparent text-sm text-white w-full py-2 px-2 border rounded-lg border-gray-500 md:text-base focus:border-green-500 duration-300"
        onChange={onChange}
      />
    </div>
  );
}

export default InputBox;
