import React from "react";

function Button({ label, type, onClick }) {
  return (
    <div className="w-full  pt-4 pb-3 px-6 md:px-0 ">
      <input
        type={type}
        value={label}
        className="cursor-pointer bg-blue-500 w-full rounded-lg text-white text-md font-semibold py-2 md:text-lg hover:bg-sky-600 duration-300"
        onClick={onClick}
      />
    </div>
  );
}

export default Button;