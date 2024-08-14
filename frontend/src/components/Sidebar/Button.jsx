import React from "react";

function Button({ svg, text, clicked }) {
  return (
    <div className="p-4 flex gap-4 text-black font-semibold cursor-pointer">
      <div>{svg}</div>
      <div className="">{text}</div>
    </div>
  );
}

export default Button;
