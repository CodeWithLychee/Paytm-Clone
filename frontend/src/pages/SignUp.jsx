import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import Heading from "../components/AuthenticationForm/Heading";
import SubHeading from "../components/AuthenticationForm/SubHeading";
import InputBox from "../components/AuthenticationForm/InputBox";
import Button from "../components/AuthenticationForm/Button";
import ButtonWarning from "../components/AuthenticationForm/ButtonWarning";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);

  const changeUsernameInput = useCallback(
    (e) => setUsername(e.target.value),
    []
  );
  const changeFullNameInput = useCallback(
    (e) => setFullName(e.target.value),
    []
  );
  const changeEmailInput = useCallback((e) => setEmail(e.target.value), []);
  const changePasswordInput = useCallback(
    (e) => setPassword(e.target.value),
    []
  );
  const changePhoneNumberInput = useCallback(
    (e) => setPhoneNumber(e.target.value),
    []
  );

  const changeImageInput = useCallback((e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.type;
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!validImageTypes.includes(fileType)) {
        toast.error("Only image files (jpeg, png, gif) are allowed.");
        e.target.value = null;
        return;
      }
      setImage(file);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("/api/v1/user/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success(response.data.message);
      navigate("/user/dashboard");
    } catch (err) {
      if (err.response?.status === 500) {
        toast.error("Server is currently down. Please try again later.");
      } else {
        toast.error(err.response?.data?.message || "An error occurred.");
      }
    }
  };

  return (
    <div className="relative md:bg-white h-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="absolute top-20 border-black border-2 rounded-xl p-0 md:px-6 pb-2 hover:shadow-2xl hover:shadow-blue-500 transition-shadow duration-1000"
      >
        <Heading label={"Sign Up"} />
        <SubHeading
          labelt={"Enter your details to create an account"}
          labelb={""}
        />
        <InputBox
          heading={"User Name"}
          type={"text"}
          placeholder={"abhinav"}
          onChange={changeUsernameInput}
        />
        <InputBox
          heading={"Full Name"}
          type={"text"}
          placeholder={"Abhinav Sharma"}
          onChange={changeFullNameInput}
        />
        <InputBox
          heading={"Email"}
          type={"email"}
          placeholder={"abhinavsharma@example.com"}
          onChange={changeEmailInput}
        />
        <InputBox
          heading={"Password"}
          type={"password"}
          placeholder={""}
          onChange={changePasswordInput}
        />
        <InputBox
          heading={"Phone Number"}
          type={"tel"}
          placeholder={""}
          onChange={changePhoneNumberInput}
        />
        <InputBox
          heading={"Image"}
          type={"file"}
          placeholder={""}
          onChange={changeImageInput}
        />
        <Button type={"submit"} label={"Sign up"} />
        <ButtonWarning
          label={"Already have an account"}
          buttonText={"Sign in"}
          to={"/auth/signin"}
        />
      </form>
    </div>
  );
}

export default SignUp;
