import React from "react";
import Heading from "../components/AuthenticationForm/Heading";
import SubHeading from "../components/AuthenticationForm/SubHeading";
import InputBox from "../components/AuthenticationForm/InputBox";
import Button from "../components/AuthenticationForm/Button";

function SendMoney() {
  return (
    <div className="bg-white flex justify-center items-center w-full h-screen">
      <form className="border-2">
        <Heading label={"Send Money"} />
        <SubHeading label={"Enter details to send money"} />
        <InputBox
          heading={"Sender's Account Number"}
          type={"text"}
          placeholder={"Enter your account number"}
          onChange={() => {}}
        />
        <InputBox
          heading={"Reciver's Account Number"}
          type={"text"}
          placeholder={"Enter your Reciver number"}
          onChange={() => {}}
        />
        <InputBox
          heading={"Amount"}
          type={"Number"}
          placeholder={"Enter the amount"}
          onChange={() => {}}
        />
        <Button label={"Proceed Securely"} type={"submit"} onClick={() => {}} />
      </form>
    </div>
  );
}

export default SendMoney;
