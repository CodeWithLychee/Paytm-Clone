import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Heading from "../components/AuthenticationForm/Heading";
import SubHeading from "../components/AuthenticationForm/SubHeading";
import InputBox from "../components/AuthenticationForm/InputBox";
import Button from "../components/AuthenticationForm/Button";
import { toast } from "react-toastify";
import SideBar from "./SideBar";

function SendMoney() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [senderAccountNUmber, setSenderAccountNumber] = useState("");
  const [reciverAccountNUmber, setReciverAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState();

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

  const changeSenderAccountNumberInput = useCallback((e) => {
    setSenderAccountNumber(e.target.value);
  }, []);
  const changeReciverAccountNumberInput = useCallback((e) => {
    setReciverAccountNumber(e.target.value);
  }, []);
  const changePinInput = useCallback((e) => {
    setPin(e.target.value);
  }, []);
  const changeAmountInput = useCallback((e) => {
    setAmount(e.target.value);
  }, []);

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          "/v1/account/transferMoney",
          {
            fromAccountNumber: senderAccountNUmber,
            toAccountNumber: reciverAccountNUmber,
            pin,
            amount,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          toast.success(response.data.message);
          navigate("/dasboard");
        })
        .catch((err) => {
          if (err.response.status == "500") {
            toast.error("Server is currently down");
            navigate("/");
          } else {
            toast.error(err.response.data.message);
          }
        });
    },
    [senderAccountNUmber, reciverAccountNUmber, pin, amount]
  );

  return (
    <div>
      <div className="relative min-h-screen w-full flex">
        <div className="fixed z-10 left-0 h-full">
          <SideBar open={open} setOpen={setOpen} />
        </div>
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
          <div className="flex min-h-screen items-center justify-center w-[70%] ml-[23%] md:w-full md:mx-0">
            <form
              onSubmit={onFormSubmit}
              className="border-black border-2 rounded-xl p-0 md:px-6 pb-2 hover:shadow-2xl hover:shadow-blue-500 transition-shadow duration-1000"
            >
              <Heading label={"Send Money"} />
              <SubHeading labelt={"Enter details to send money"} labelb={""} />
              <InputBox
                heading={"Sender's Account Number"}
                type={"text"}
                placeholder={"Enter your account number"}
                onChange={changeSenderAccountNumberInput}
              />
              <InputBox
                heading={"Reciver's Account Number"}
                type={"text"}
                placeholder={"Enter Reciver's account number"}
                onChange={changeReciverAccountNumberInput}
              />
              <InputBox
                heading={"Pin"}
                type={"text"}
                placeholder={"Enter your account pin"}
                onChange={changePinInput}
              />
              <InputBox
                heading={"Amount"}
                type={"Number"}
                placeholder={"Enter the amount"}
                onChange={changeAmountInput}
              />
              <Button
                label={"Proceed Securely"}
                type={"submit"}
                onClick={onFormSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendMoney;
