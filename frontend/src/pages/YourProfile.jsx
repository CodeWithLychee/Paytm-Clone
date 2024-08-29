import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

function YourProfile({ open, toggleOpen, isOpen, toggleDropdown }) {
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/v1/user/details")
      .then((response) => {
        setDetails(response.data.details);
      })
      .catch((err) => {
        toast.error("Something went wrong || Please login again");
        navigate("/auth/signin");
      });
  }, []);

  return (
    <div
      className={`w-full min-h-screen ${open ? "opacity-45" : ""} ${
        isOpen ? "opacity-45" : ""
      } lg:opacity-100`}
      onClick={() => {
        if (open && window.innerWidth < 1024) {
          toggleOpen();
        }
        if (isOpen && window.innerWidth < 1024) {
          toggleDropdown();
        }
      }}
    >
      {details ? (
        <div className="w-[70%] min-h-screen ml-[23%] absolute mt-[23%] md:w-[50%] md:mt-[17%] md:ml-[25%] lg:mt-[10%] lg:w-[40%] lg:ml-[30%]">
          <BoxDetails title={"Username"} data={details.username} />
          <BoxDetails title={"Full Name"} data={details.fullName} />
          <BoxDetails title={"Email"} data={details.email} />
          <BoxDetails title={"Phone Number"} data={details.phoneNumber} />
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
}

const BoxDetails = React.memo(({ title, data }) => {
  return (
    <div className="flex justify-between p-4">
      <div className="font-semibold">{title} :</div>
      <div className="font-medium text-blue-500">{data}</div>
    </div>
  );
});

export default YourProfile;
