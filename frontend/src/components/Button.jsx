import React from "react";

function Button({ label, type }) {
  return (
    <div className="w-full  pt-4 pb-3 px-6 md:px-0 ">
      {type == "submit" ? (
        <input
          type={type}
          value={label}
          className="bg-green-600 w-full rounded-lg text-white text-md font-semibold py-2 md:text-lg"
        />
      ) : (
        <button
          type={type}
          className="bg-green-600 w-full rounded-lg text-white text-md font-semibold py-2 md:text-lg"
        >
          {label}
        </button>
      )}
    </div>
  );
}

export default Button;
