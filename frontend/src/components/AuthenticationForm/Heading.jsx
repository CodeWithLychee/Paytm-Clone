import React from "react";

const Heading = React.memo(({ label }) => {
  return (
    <div className="text-blue-500 font-sans font-bold text-center text-3xl pt-4 pb-1 md:text-4xl ">
      {label}
    </div>
  );
});

export default Heading;
