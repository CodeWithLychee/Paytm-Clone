import React from "react";

const SubHeading = React.memo(({ labelt, labelb }) => {
  return (
    <div className="px-8 pt-2 text-gray-600 text-center text-base font-medium ">
      {labelt}
      <br />
      {labelb}
    </div>
  );
});

export default SubHeading;
