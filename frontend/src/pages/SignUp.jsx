import React from "react";
import Heading from "../components/AuthenticationForm/Heading";
import SubHeading from "../components/AuthenticationForm/SubHeading";
import InputBox from "../components/AuthenticationForm/InputBox";
import Button from "../components/AuthenticationForm/Button";
import ButtonWarning from "../components/AuthenticationForm/ButtonWarning";

function SignUp() {
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <form className="border-gray-500 border-2 rounded-xl p-0 md:px-6 pb-2 hover:shadow-2xl hover:shadow-green-500/50 hover:duration-1000">
        <Heading label={"Sign Up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox heading={"User Name"} type={"text"} placeholder={"abhinav"} />
        <InputBox
          heading={"Full Name"}
          type={"text"}
          placeholder={"Abhinav Sharma"}
        />
        <InputBox
          heading={"Email"}
          type={"email"}
          placeholder={"abhinavsharma@example.com"}
        />
        <InputBox heading={"Password"} type={"password"} placeholder={""} />
        <InputBox heading={"Phone Number"} type={"tel"} placeholder={""} />
        <InputBox heading={"Image"} type={"file"} placeholder={""} />
        <Button type={"submit"} label={"Sign up"} />

        <ButtonWarning
          label={"Already have an account"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </form>
    </div>
  );
}

export default SignUp;
