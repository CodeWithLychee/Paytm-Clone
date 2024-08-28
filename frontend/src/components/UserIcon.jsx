import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";

const UserIcon = React.memo(({ isOpen, toggleDropdown }) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/v1/user/checkLogin", {
        withCredentials: true,
      })
      .then((response) => {})
      .catch((err) => {
        if (err.message == "Request failed with status code 500") {
          toast.error("Server is currently down || Please try again later");
        } else {
          toast.error("Something went wrong, Please login again");
        }
        navigate("/auth/signin");
      });
  }, [navigate]);

  return (
    <div className="absolute z-10 right-[30px] top-11">
      <div
        className=" min-w-min flex justify-end items-center"
        onClick={toggleDropdown}
      >
        <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      </div>
      {isOpen ? <DropDown /> : <div></div>}
    </div>
  );
});

export default UserIcon;
