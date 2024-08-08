import React from "react";

function Heading({ label }) {
  return (
    <div className="text-white font-sans font-bold text-center text-3xl pt-4 pb-1 md:text-4xl ">
      {label}
    </div>
  );
}

export default Heading;
