import React from "react";

function ButtonWarning({ label, buttonText }) {
  return (
    <div className="text-white flex justify-center items-center py-2 md:py-0 text-sm md:text-base">
      <div>{label}</div>
      <div>
        {"? "}
        {buttonText}
      </div>
    </div>
  );
}

export default ButtonWarning;
