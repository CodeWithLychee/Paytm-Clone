import React from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";

function SignIn() {
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <form
        onSubmit={xyz}
        className="border-gray-500 border-2 rounded-xl p-0 md:px-6 pb-2 "
      >
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox
          heading={"Email"}
          type={"email"}
          placeholder={"abhinav@example.com"}
        />
        <InputBox heading={"Password"} type={"password"} placeholder={""} />
        <Button label={"Sign in"} type={"submit"} />
        <ButtonWarning label={"Don't have an account"} buttonText={"Sign up"} />
      </form>
    </div>
  );
}

export default SignIn;
