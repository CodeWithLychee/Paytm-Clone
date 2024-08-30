import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDown";

const UserIcon = React.memo(({ isOpen, toggleDropdown }) => {
  const navigate = useNavigate();
  const [imageLink, setimageLink] = useState("");

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

  useEffect(() => {
    axios
      .get("/api/v1/user/details")
      .then((response) => {
        setimageLink(response.data.details.image);
      })
      .catch((err) => {
        toast.error("Something went wrong || Please login again");
        navigate("/auth/signin");
      });
  }, []);

  return (
    <div className="absolute z-10 right-[30px] top-11">
      <div
        className=" min-w-min flex justify-end items-center"
        onClick={toggleDropdown}
      >
        <div className="cursor-pointer">
          <img
            src={imageLink}
            className="rounded-full w-10 h-10 md:w-16 md:h-16"
          />
        </div>
      </div>
      {isOpen ? <DropDown /> : <div></div>}
    </div>
  );
});

export default UserIcon;
