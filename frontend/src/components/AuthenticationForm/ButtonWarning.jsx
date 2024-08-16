import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonWarning = React.memo(({ label, buttonText, to }) => {
  const navigate = useNavigate();
  return (
    <div className="px-6 text-black text-base font-medium flex justify-center items-center">
      <div>
        {label} {"?"}
      </div>
      <div
        className="pl-2 cursor-pointer hover:opacity-70 hover:text-blue-600 duration-300"
        onClick={() => {
          navigate(to);
        }}
      >
        {buttonText}
      </div>
    </div>
  );
});

export default ButtonWarning;
