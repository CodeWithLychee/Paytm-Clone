import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = React.memo(({ open, toggleOpen, sideBarElements }) => {
  return (
    <div
      className={` bg-blue-100 h-screen p-3 pt-8 md:p-5 md:pt-8 ${
        open ? "w-60 z-10" : "w-[66px] md:w-[80px]"
      } duration-300 relative`}
    >
      <div
        className={`max-w-max absolute -right-3 top-11 bg-white rounded-full cursor-pointer ${
          !open && "rotate-180"
        }`}
        onClick={toggleOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
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
