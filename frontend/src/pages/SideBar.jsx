import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const SideBar = React.memo(({ open, toggleOpen, sideBarElements }) => {
  return (
    <div
      className={` bg-blue-100 h-screen p-3 pt-8 md:p-5 md:pt-8 ${
        open ? "w-60 z-10" : "w-[66px] md:w-[80px]"
      } duration-300 relative`}
    >
      <div
        className={`max-w-max absolute -right-3 top-12 bg-white rounded-full border-2  border-blue-100 cursor-pointer p-1 ${
          open && "rotate-180"
        } duration-200`}
        onClick={toggleOpen}
      >
        <FaArrowRight />
      </div>

      <div className="">
        <Button open={open} sideBarElements={sideBarElements} />
      </div>
    </div>
  );
});

const Button = React.memo(({ open, sideBarElements }) => {
  {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = useCallback(
      (to) => {
        if (to === location.pathname) {
          // do nothing
        } else {
          navigate(to);
        }
      },
      [navigate, location.pathname]
    );
    return (
      <>
        {sideBarElements.map((element, index) => {
          return (
            <div
              key={index}
              className={`p-3 pl-2 gap-4 flex font-bold  ${
                element.text != "Main menu"
                  ? `cursor-pointer hover:bg-blue-200 duration-300 rounded-lg`
                  : "text-2xl font-extrabold "
              } `}
              onClick={() => {
                handleClick(element.to);
              }}
            >
              <div className={` ${element.text == "Main menu" ? "pt-1 " : ""}`}>
                {element.svg}
              </div>
              <div className={`shrink-0 duration-300 ${!open && "scale-0"}`}>
                {element.text}
              </div>
            </div>
          );
        })}
      </>
    );
  }
});

export default SideBar;
