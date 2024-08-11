import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Heading from "../components/AuthenticationForm/Heading";
import SubHeading from "../components/AuthenticationForm/SubHeading";
import InputBox from "../components/AuthenticationForm/InputBox";
import Button from "../components/AuthenticationForm/Button";
import ButtonWarning from "../components/AuthenticationForm/ButtonWarning";

import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onClick = (e) => {
    e.preventDefault();
    axios
      .post(
        "/v1/user/signup",
        {
          username,
          fullName,
          email,
          password,
          phoneNumber,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.message == "Request failed with status code 500") {
          toast.error("Server is currently down");
        } else {
          toast.error(err.response.data.message);
        }
      });
  };
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <form className="border-gray-500 border-2 rounded-xl p-0 md:px-6 pb-2 hover:shadow-2xl hover:shadow-green-500/50 hover:duration-1000">
        <Heading label={"Sign Up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox
          heading={"User Name"}
          type={"text"}
          placeholder={"abhinav"}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <InputBox
          heading={"Full Name"}
          type={"text"}
          placeholder={"Abhinav Sharma"}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <InputBox
          heading={"Email"}
          type={"email"}
          placeholder={"abhinavsharma@example.com"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputBox
          heading={"Password"}
          type={"password"}
          placeholder={""}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <InputBox
          heading={"Phone Number"}
          type={"tel"}
          placeholder={""}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <InputBox heading={"Image"} type={"file"} placeholder={""} />

        <Button type={"submit"} label={"Sign up"} onClick={onClick} />

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
