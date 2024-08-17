import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import SideBar from "./SideBar";

import Heading from "../components/AuthenticationForm/Heading";
import SubHeading from "../components/AuthenticationForm/SubHeading";
import InputBox from "../components/AuthenticationForm/InputBox";
import Button from "../components/AuthenticationForm/Button";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddAccount() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");

  useEffect(() => {
    axios
      .get("/v1/user/checkLogin", {
        withCredentials: true,
      })
      .then((response) => {})
      .catch((err) => {
        navigate("/signin");
      });
  }, [navigate]);

  const changeAccountNumberInput = useCallback(
    (e) => {
      setAccountNumber(e.target.value);
    },
    [navigate]
  );

  const changePinInput = useCallback(
    (e) => {
      setPin(e.target.value);
    },
    [navigate]
  );

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          "/v1/account/addAccount",
          {
            accountNumber,
            pin,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response.data);
          toast.success(response.data.message);
          navigate("/dashboard");
        })
        .catch((err) => {
          if (err.message == "Request failed with status code 500") {
            toast.error("Server is currently down");
            navigate("/signin");
          } else {
            toast.error(err.response.data.message);
          }
        });
    },
    [accountNumber, pin, navigate]
  );

  return (
    <div className="relative min-h-screen w-full ">
      <div className="fixed z-10 left-0 h-full">
        <SideBar open={open} setOpen={setOpen} />
      </div>
      <div
        className={`${
          open ? "opacity-45" : ""
        } min-h-screen w-full lg:opacity-100`}
        onClick={() => {
          if (open && window.innerWidth < 1024) {
            setOpen(!open);
          }
        }}
      >
        <div className="flex min-h-screen items-center justify-center w-[70%] ml-[22%] md:w-full md:mx-0">
          <form
            onSubmit={onFormSubmit}
            className="border-black border-2 rounded-xl px-1 md:px-6 pb-2 hover:shadow-2xl hover:shadow-blue-500 transition-shadow duration-1000"
          >
            <Heading label={"Add your Bank Account"} />
            <SubHeading
              labelt={"Feel free to"}
              labelb={"Add your new bank account"}
            />
            <InputBox
              heading={"Account Number"}
              type={"text"}
              placeholder={""}
              onChange={changeAccountNumberInput}
            />
            <InputBox
              heading={"Pin"}
              type={"password"}
              placeholder={""}
              onChange={changePinInput}
            />
            <Button
              label={"Click to add"}
              type={"submit"}
              onClick={onFormSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddAccount;