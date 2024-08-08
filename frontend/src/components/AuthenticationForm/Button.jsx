import React from "react";

function Button({ label, type }) {
  return (
    <div className="w-full  pt-4 pb-3 px-6 md:px-0 ">
      <input
        type={type}
        value={label}
        className="cursor-pointer bg-green-600 w-full rounded-lg text-white text-md font-semibold py-2 md:text-lg hover:bg-green-700 duration-300"
      />
    </div>
  );
}

export default Button;
