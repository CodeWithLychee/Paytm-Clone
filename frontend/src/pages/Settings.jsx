import React, { useState } from "react";

const Settings = React.memo(({ open, toggleOpen, isOpen, toggleDropdown }) => {
  return (
    <div className="relative min-h-screen w-full ">
      <div
        className={`min-h-screen w-full flex justify-center items-center ${
          open ? "opacity-45" : ""
        }`}
        onClick={() => {
          if (open && window.innerWidth < 1024) {
            toggleOpen();
          }
          if (isOpen && window.innerWidth < 1024) {
            toggleDropdown();
          }
        }}
      >
        <p className="text-xl font-semibold md:text-2xl">Under Construction</p>
      </div>
    </div>
  );
});

export default Settings;
