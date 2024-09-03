import React from "react";

const InputBox = React.memo(
  ({ heading, type, placeholder, value, onChange }) => {
    return (
      <div className="pt-1 mx-6 md:mx-0">
        <div className="text-black font-semibold text-sm py-2 pl-1 md:text-base">
          {heading}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          required
          value={value}
          className="outline-none bg-transparent text-sm text-black font-medium w-full py-2 px-2 border rounded-lg border-black md:text-base focus:border-blue-600 focus:border-2 focus:shadow-md"
          onChange={onChange}
        />
      </div>
    );
  }
);

export default InputBox;
