import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import Loading from "../components/Loading";
import Heading from "../components/AuthenticationForm/Heading";
import SubHeading from "../components/AuthenticationForm/SubHeading";
import InputBox from "../components/AuthenticationForm/InputBox";
import Button from "../components/AuthenticationForm/Button";
import { toast } from "react-toastify";
import { speakTextWithCallback } from "../Voice.js";

function SendMoney({ open, toggleOpen, isOpen, toggleDropdown }) {
  const [animationData, setAnimationData] = useState(null);
  const [moneySent, setMoneySent] = useState(false);
  const [speechCompleted, setSpeechCompleted] = useState(false);
  const date = new Date();
  const todayDate = date.toDateString();
  const getOnlyDate = todayDate.split(" ");

  const navigate = useNavigate();
  const location = useLocation();

  const [senderAccountNUmber, setSenderAccountNumber] = useState("");
  const [reciverAccountNUmber, setReciverAccountNUmber] = useState(
    location.state?.receiverAccountNumber || ""
  );
  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState();

  useEffect(() => {
    axios
      .get("/api/v1/user/checkLogin", {
        withCredentials: true,
      })
      .then((response) => {})
      .catch((err) => {
        if (err.message === "Request failed with status code 500") {
          toast.error("Server is currently down || Please try again later");
        } else {
          toast.error("Something went wrong, Please login again");
        }
        navigate("/auth/signin");
      });
  }, [navigate]);

  useEffect(() => {
    axios
      .get(
        "https://lottie.host/67454034-d296-4411-bfde-cec8b364839c/JCjju8dlFy.json"
      )
      .then((response) => {
        setAnimationData(response.data);
      })
      .catch((error) => {
        console.error("Error loading Lottie animation:", error);
      });
  }, []);

  const changeSenderAccountNumberInput = useCallback((e) => {
    setSenderAccountNumber(e.target.value);
  }, []);
  const changeReciverAccountNumberInput = useCallback((e) => {
    setReciverAccountNUmber(e.target.value);
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
          "/api/v1/account/transferMoney",
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
        .then(async (response) => {
          setMoneySent(true);
          toast.success(response.data.message);
          let balanceLeft = response.data.balanceLeft.balance;

          const speechText = `An amount of ₹ ${amount} has been DEBITED to your account on ${getOnlyDate[1]} ${getOnlyDate[2]} ${getOnlyDate[3]}. Total available balance is ₹ ${balanceLeft}`;

          speakTextWithCallback(speechText, 0.8, () => {
            setSpeechCompleted(true);
          });
        })
        .catch((err) => {
          if (err.response.status === 500) {
            toast.error("Server is currently down || Please try again later");
            navigate("/auth/signin");
          } else {
            toast.error(err.response.data.message);
          }
        });
    },
    [
      senderAccountNUmber,
      reciverAccountNUmber,
      pin,
      amount,
      getOnlyDate,
      navigate,
    ]
  );

  useEffect(() => {
    if (speechCompleted) {
      navigate("/user/dashboard");
    }
  }, [speechCompleted, navigate]);

  return (
    <div>
      <div className="min-h-screen w-full flex">
        <div
          className={`${
            open || isOpen ? "opacity-50" : ""
          } min-h-screen w-full lg:opacity-100`}
          onClick={() => {
            if (open && window.innerWidth < 1024) {
              toggleOpen();
            }
            if (isOpen && window.innerWidth < 1024) {
              toggleDropdown();
            }
          }}
        >
          {moneySent ? (
            <div className="flex justify-center items-center w-[50%] ml-[30%] min-h-screen md:w-[40%] lg:w-[30%]  lg:mx-auto">
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
              />
            </div>
          ) : (
            <div className="flex min-h-screen items-center justify-center w-[70%] ml-[23%] md:w-full md:mx-0">
              <form
                onSubmit={onFormSubmit}
                className="border-black border-2 rounded-xl p-0 md:px-6 pb-2 hover:shadow-2xl hover:shadow-blue-500 transition-shadow duration-1000"
              >
                <Heading label={"Send Money"} />
                <SubHeading
                  labelt={"Enter details to send money"}
                  labelb={""}
                />
                <InputBox
                  heading={"Sender's Account Number"}
                  type={"text"}
                  placeholder={"Enter your account number"}
                  value={senderAccountNUmber}
                  onChange={changeSenderAccountNumberInput}
                />
                <InputBox
                  heading={"Reciver's Account Number"}
                  type={"text"}
                  placeholder={"Enter Reciver's account number"}
                  value={reciverAccountNUmber}
                  onChange={changeReciverAccountNumberInput}
                />
                <InputBox
                  heading={"Pin"}
                  type={"text"}
                  placeholder={"Enter your account pin"}
                  value={pin}
                  onChange={changePinInput}
                />
                <InputBox
                  heading={"Amount"}
                  type={"Number"}
                  placeholder={"Enter the amount"}
                  value={amount}
                  onChange={changeAmountInput}
                />
                <Button
                  label={"Proceed Securely"}
                  type={"submit"}
                  onClick={onFormSubmit}
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SendMoney;
