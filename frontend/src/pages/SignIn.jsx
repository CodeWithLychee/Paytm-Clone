import React from "react";
import Heading from "../components/AuthenticationForm/Heading";
import SubHeading from "../components/AuthenticationForm/SubHeading";
import InputBox from "../components/AuthenticationForm/InputBox";
import Button from "../components/AuthenticationForm/Button";
import ButtonWarning from "../components/AuthenticationForm/ButtonWarning";

function SignIn() {
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <form className="border-gray-500 border-2 rounded-xl p-0 md:px-6 pb-2 ">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox
          heading={"Email"}
          type={"email"}
          placeholder={"abhinav@example.com"}
        />
        <InputBox heading={"Password"} type={"password"} placeholder={""} />
        <Button label={"Sign in"} type={"submit"} />
        <ButtonWarning
          label={"Don't have an account"}
          buttonText={"Sign up"}
          to={"/"}
        />
      </form>
    </div>
  );
}

export default SignIn;
