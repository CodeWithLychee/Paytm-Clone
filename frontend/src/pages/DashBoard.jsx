import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import SideBar from "./SideBar";
import AccountCard from "../components/Dashboard/AccountCard";

import Loading from "../components/Loading";

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
        toast.error("Something went wrong, Please login again");
        navigate("/signin");
      });
  }, []);

  useEffect(() => {
    axios
      .get("/v1/account/Accountdetails", {
        withCredentials: true,
      })
      .then((response) => {
        setUserAccount(response.data.userAccountdetails);
      })
      .catch((err) => {
        toast.error("Something went wrong, Please login again");
        navigate("/signin");
      });
  }, []);

  const calculateBalance = useMemo(() => {
    let totalBalance = 0;
    userAccount.map(({ balance }) => {
      totalBalance += balance;
    });
    return totalBalance;
  }, [userAccount]);

  return (
    <div className="relative min-h-screen w-full flex">
      <div className="absolute z-10 left-0">
        <SideBar open={open} setOpen={setOpen} />
      </div>
      {name && userAccount ? (
        <div
          className={`${
            open ? "opacity-45" : ""
          } min-h-screen w-full lg:opacity-100`}
          onClick={() => {
            if (open) {
              setOpen(!open);
            }
          }}
        >
          <div
            className={`w-[70%] ml-[23%]  md:w-[80%] md:mx-auto  lg:w-[90%] lg:mx-auto `}
            onClick={(e) => {
              if (open) {
                setOpen(false);
              }
            }}
          >
            <div className="mt-20 font-bold text-2xl mb-20 md:text-center md:text-4xl lg:text-5xl">
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
              <p className="text-lg font-semibold lg:text-xl">
                Total Balance :
              </p>
              <p className="flex items-center text-lg font-semibold lg:text-xl">
                {`₹ ${" "}`}
                {calculateBalance}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default DashBoard;
