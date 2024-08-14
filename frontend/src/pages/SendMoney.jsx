import React, { useState } from "react";
import axios from "axios";

import Heading from "../components/AuthenticationForm/Heading";
import SubHeading from "../components/AuthenticationForm/SubHeading";
import InputBox from "../components/AuthenticationForm/InputBox";
import Button from "../components/AuthenticationForm/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SendMoney() {
  const navigate = useNavigate();
  const [senderAccountNUmber, setSenderAccountNumber] = useState("");
  const [reciverAccountNUmber, setReciverAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState();

  const onSubmit = (e) => {
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
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status == "500") {
          toast.error("Server is currently down");
        } else {
          toast.error(err.response.data.message);
        }
      });
  };

  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="border-black border-2 rounded-xl p-0 md:px-6 pb-2 hover:shadow-2xl hover:shadow-blue-500 transition-shadow duration-1000"
      >
        <Heading label={"Send Money"} />
        <SubHeading labelt={"Enter details to send money"} labelb={""} />
        <InputBox
          heading={"Sender's Account Number"}
          type={"text"}
          placeholder={"Enter your account number"}
          onChange={(e) => {
            setSenderAccountNumber(e.target.value);
          }}
        />
        <InputBox
          heading={"Reciver's Account Number"}
          type={"text"}
          placeholder={"Enter Reciver's account number"}
          onChange={(e) => {
            setReciverAccountNumber(e.target.value);
          }}
        />
        <InputBox
          heading={"Pin"}
          type={"text"}
          placeholder={"Enter your account pin"}
          onChange={(e) => {
            setPin(e.target.value);
          }}
        />
        <InputBox
          heading={"Amount"}
          type={"Number"}
          placeholder={"Enter the amount"}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <Button label={"Proceed Securely"} type={"submit"} onClick={onSubmit} />
      </form>
    </div>
  );
}

export default SendMoney;
