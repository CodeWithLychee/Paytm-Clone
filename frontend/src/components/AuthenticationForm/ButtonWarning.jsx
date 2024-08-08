import React from "react";
import { useNavigate } from "react-router-dom";

function ButtonWarning({ label, buttonText, to }) {
  const navigate = useNavigate();
  return (
    <div className="text-white flex justify-center items-center py-2 md:py-0 text-sm md:text-base">
      <div>{label}</div>
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate(to);
        }}
      >
        {"? "}
        {buttonText}
      </div>
    </div>
  );
}

export default ButtonWarning;
