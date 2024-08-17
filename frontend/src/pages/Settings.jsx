import React, { useState } from "react";
import SideBar from "./SideBar";

function Settings() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative min-h-screen w-full ">
      <div className="fixed z-10 left-0 h-full">
        <SideBar open={open} setOpen={setOpen} />
      </div>
      <div
        className={`min-h-screen w-full flex justify-center items-center ${
          open ? "opacity-45" : ""
        }`}
        onClick={() => {
          if (open && window.innerWidth < 1024) {
            setOpen(!open);
          }
        }}
      >
        <p className="text-xl font-semibold md:text-2xl">Under Construction</p>
      </div>
    </div>
  );
}

export default Settings;
