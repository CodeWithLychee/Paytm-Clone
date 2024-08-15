import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import SideBar from "./SideBar";
import AccountCard from "../components/Dashboard/AccountCard";

function DashBoard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [userAccount, setUserAccount] = useState([]);

  useEffect(() => {
    axios
      .get("/v1/user/name", {
        withCredentials: true,
      })
      .then((response) => {
        setName(response.data.fullName.fullName);
      })
      .catch((err) => {
        toast.error("Internal Server error");
        navigate("/signin");
      });
  }, [name]);

  useEffect(() => {
    axios
      .get("/v1/account/Accountdetails", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.userAccountdetails);
        setUserAccount(response.data.userAccountdetails);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [userAccount]);

  const calculateBalance = useMemo(() => {
    let totalBalance = 0;
    userAccount.map(({ balance }) => {
      totalBalance += balance;
    });
    return totalBalance;
  }, [userAccount]);

  return (
    <div className="relative h-screen w-full flex">
      <SideBar open={open} setOpen={setOpen} />
      {name ? (
        <div
          className={`${
            open ? "opacity-45" : ""
          } duration-300 absolute left-24 mt-11 md:w-[80%] md:mx-auto lg:w-[90%] lg:mx-auto lg:opacity-100`}
        >
          <div className="font-bold text-2xl mb-20 md:text-center md:text-4xl lg:text-5xl">
            {name
              ? `Hello ${
                  name[0].toUpperCase() + name.substring(1, name.length)
                } `
              : ""}
          </div>
          <div className="text-2xl font-semibold mb-5 md:pl-[15%] lg:text-3xl lg:text-center lg:pl-0">
            Account Details :
          </div>
          <div className="">
            <AccountCard userAccount={userAccount} />
          </div>
          <div className="flex gap-4 md:pl-[15%] lg:text-3xl lg:justify-center lg:pl-0">
            <p className="text-lg font-semibold lg:text-xl">Total Balance :</p>
            <p className="flex items-center text-lg font-semibold lg:text-xl">
              {`₹ ${" "}`}
              {calculateBalance}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DashBoard;
