import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Transactions() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [payments, setPayments] = useState([]);
  console.log(payments);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("/v1/user/checkLogin", {
        withCredentials: true,
      })
      .then((response) => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        navigate("/signin");
      });
  }, [navigate]);

  const allPayments = () => {
    axios
      .get("/v1/account/allPayments", {
        withCredentials: true,
      })
      .then((response) => {
        setPayments(response.data.transaction);
        setFilter("all");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        navigate("/signin");
      });
  };
  const paymentSend = () => {
    axios
      .get("/v1/account/paymentSend", {
        withCredentials: true,
      })
      .then((response) => {
        setPayments(response.data.transaction);
        setFilter("paid");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        navigate("/signin");
      });
  };
  const paymentRecived = () => {
    axios
      .get("/v1/account/paymentRecived", {
        withCredentials: true,
      })
      .then((response) => {
        setPayments(response.data.transaction);
        setFilter("received");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        navigate("/signin");
      });
  };

  return (
    <div className="min-h-screen w-full">
      <div className="min-h-screen w-full ">
        <h1 className="text-center text-2xl font-semibold pt-11 mb-6">
          Payment History
        </h1>
        <div className="pt-4 w-[70%] ml-[21%]">
          <p className="text-black text-center font-medium text-lg ">
            Please select the payment type :{" "}
          </p>
          <div className="flex justify-around pt-4 items-center">
            <button
              className="border-2 border-black w-[27%] rounded-lg p-1  hover:bg-blue-400"
              onClick={allPayments}
            >
              All
            </button>
            <button
              className="border-2 border-black w-[27%] rounded-lg p-1 hover:bg-blue-400"
              onClick={paymentSend}
            >
              Paid
            </button>
            <button
              className="border-2 border-black w-[27%] rounded-lg p-1 hover:bg-blue-400"
              onClick={paymentRecived}
            >
              Received
            </button>
          </div>
        </div>
        {payments.length ? (
          <div className="text-center mt-5">
            <PaymentCard payments={payments} filter={filter} />
          </div>
        ) : (
          "No records found matching the applied filters"
        )}
      </div>
    </div>
  );
}

function PaymentCard({ payments, filter }) {
  const cardStyles =
    "border border-gray-300 rounded-lg p-4 mb-4 w-[80%] mx-auto shadow-lg";
  const logoStyles = "h-8 w-8 rounded-full border border-gray-300";
  const sectionStyles = "flex flex-col items-center";
  const infoStyles = "text-gray-700";
  const boldTextStyles = "font-semibold text-gray-800";

  return (
    <>
      {payments.map((payment, index) => {
        const createdAt = new Date(payment.createdAt);
        const formattedCreatedAt = createdAt.toLocaleDateString();
        const formattedCreatedTime = createdAt.toLocaleTimeString();

        return (
          <div
            key={index}
            className="border border-black rounded-lg pt-2
            p-4 mb-4 w-[70%] ml-[23%] shadow-lg"
          >
            <div className="flex justify-between">
              <div className="flex flex-col items-center">
                <p className="text-lg p-1 border border-black rounded-lg">
                  Sender
                </p>
                <div className="flex pt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <p className="font-semibold text-gray-800">
                    {payment.senderName}
                  </p>
                </div>

                <p className="text-gray-800 pt-2">
                  {payment.senderAccountNumber}
                </p>
              </div>
              <div className="flex justify-center pt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 text-green-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </div>
              <div className="flex items-center"></div>
              <div className="flex flex-col items-center">
                <p className="text-lg p-1 border border-black rounded-lg">
                  Receiver
                </p>
                <div className="flex pt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <p className="font-semibold text-gray-800">
                    {payment.receiverName}
                  </p>
                </div>
                <p className="text-gray-800 pt-2">
                  {payment.receiverAccountNumber}
                </p>
              </div>
            </div>
            <div className="flex justify-evenly mt-4">
              <p className="text-xl font-bold text-green-600 flex justify-center items-center">
                - ₹ {payment.amount}
              </p>
              <div className="font-medium">
                <p className={infoStyles}>Paid on {formattedCreatedAt}</p>
                <p className={infoStyles}>{formattedCreatedTime}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Transactions;
