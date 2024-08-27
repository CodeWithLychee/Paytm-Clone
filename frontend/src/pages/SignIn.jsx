import React, { useCallback, useState } from "react";
import axios from "axios";

import Heading from "../components/AuthenticationForm/Heading";
import SubHeading from "../components/AuthenticationForm/SubHeading";
import InputBox from "../components/AuthenticationForm/InputBox";
import Button from "../components/AuthenticationForm/Button";
import ButtonWarning from "../components/AuthenticationForm/ButtonWarning";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmailInput = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const changePasswordInput = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          "/v1/user/signin",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          toast.success(response.data.message);
          navigate("/user/dashboard");
        })
        .catch((err) => {
          if (err.message == "Request failed with status code 500") {
            toast.error("Server is currently down || Please try again later");
          } else {
            toast.error(err.response.data.message);
          }
        });
    },
    [[email, password, navigate]]
  );
  return (
    <div className="relative  md: h-screen flex justify-center items-center ">
      <form
        onSubmit={onFormSubmit}
        className="border-black absolute top-56 border-2 rounded-xl md:px-6 pb-2 hover:shadow-2xl hover:shadow-blue-500 transition-shadow duration-1000 "
      >
        <Heading label={"Sign in"} />
        <SubHeading
          labelt={`Welcome Back !!`}
          labelb={"Enter your credentials"}
        />
        <InputBox
          heading={"Email"}
          type={"email"}
          placeholder={"abhinav@example.com"}
          onChange={changeEmailInput}
        />
        <InputBox
          heading={"Password"}
          type={"password"}
          placeholder={""}
          onChange={changePasswordInput}
        />
        <Button label={"Sign in"} type={"submit"} onClick={onFormSubmit} />
        <ButtonWarning
          label={"Don't have an account"}
          buttonText={"Sign up"}
          to={"/auth/signup"}
        />
      </form>
    </div>
  );
}

export default SignIn;
