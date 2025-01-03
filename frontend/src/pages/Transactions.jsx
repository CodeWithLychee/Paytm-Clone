import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const Transactions = React.memo(
  ({ open, isOpen, toggleOpen, toggleDropdown }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [payments, setPayments] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
      axios
        .get("/api/v1/user/checkLogin", {
          withCredentials: true,
        })
        .then((response) => {
          setIsLoggedIn(true);
        })
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
        .get("/api/v1/account/paymentSend", {
          withCredentials: true,
        })
        .then((response) => {
          setPayments(response.data.transaction);
          setFilter("paid");
          setLoading(false); // Stop loading after data is fetched
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 500") {
            toast.error("Server is currently down || Please try again later");
          } else {
            toast.error("Something went wrong, Please login again");
          }
          navigate("/auth/signin");
          setLoading(false); // Stop loading if there's an error
        });
    }, []);

    const paymentSend = () => {
      if (filter !== "paid") {
        setLoading(true); // Start loading before fetching data
        axios
          .get("/api/v1/account/paymentSend", {
            withCredentials: true,
          })
          .then((response) => {
            setPayments(response.data.transaction);
            setFilter("paid");
            setLoading(false); // Stop loading after data is fetched
          })
          .catch((err) => {
            if (err.message === "Request failed with status code 500") {
              toast.error("Server is currently down || Please try again later");
            } else {
              toast.error("Something went wrong, Please login again");
            }
            navigate("/auth/signin");
            setLoading(false); // Stop loading if there's an error
          });
      }
    };

    const paymentRecived = () => {
      if (filter !== "received") {
        setLoading(true); // Start loading before fetching data
        axios
          .get("/api/v1/account/paymentRecived", {
            withCredentials: true,
          })
          .then((response) => {
            setPayments(response.data.transaction);
            setFilter("received");
            setLoading(false); // Stop loading after data is fetched
          })
          .catch((err) => {
            if (err.message === "Request failed with status code 500") {
              toast.error("Server is currently down || Please try again later");
            } else {
              toast.error("Something went wrong, Please login again");
            }
            navigate("/auth/signin");
            setLoading(false); // Stop loading if there's an error
          });
      }
    };

    return (
      <div
        className={`min-h-screen w-full ${
          open || isOpen ? "opacity-50" : ""
        } lg:opacity-100`}
        onClick={() => {
          if (open && window.innerWidth < 1024) {
            toggleOpen();
          }
          if (isOpen && window.innerWidth < 1024) {
            toggleDropdown();
          }
        }}
      >
        <div className="min-h-screen w-full ">
          <h1 className="text-center text-2xl font-semibold pt-11 mb-6 ml-12 md:ml-20 lg:w-full lg:mx-0">
            Payment History
          </h1>
          <div className="pt-4 w-[70%] ml-[21%] lg:w-full lg:ml-0">
            <p className="text-black text-center font-medium text-lg ">
              Please select the payment type :{" "}
            </p>
            <div className="flex justify-center gap-5 pt-4 items-center">
              <button
                className="border-2 border-black w-[27%] rounded-lg p-1 hover:bg-blue-400 lg:w-[10%]"
                onClick={() => {
                  if (open && window.innerWidth < 1024) {
                    toggleOpen;
                  }
                  if (isOpen && window.innerWidth < 1024) {
                    toggleDropdown;
                  }
                  paymentSend();
                }}
              >
                Paid
              </button>
              <button
                className="border-2 border-black w-[27%] rounded-lg p-1 hover:bg-blue-400 lg:w-[10%]"
                onClick={() => {
                  if (open && window.innerWidth < 1024) {
                    toggleOpen;
                  }
                  if (isOpen && window.innerWidth < 1024) {
                    toggleDropdown;
                  } else {
                    paymentRecived();
                  }
                }}
              >
                Received
              </button>
            </div>
          </div>
          {loading ? (
            <Loading />
          ) : payments.length ? (
            <div className="text-center mt-5">
              <PaymentCard payments={payments} filter={filter} />
            </div>
          ) : (
            <p className="text-center text-gray-700 mt-5 ml-14 md:ml-28 lg:ml-0">
              No previous transaction history found
            </p>
          )}
        </div>
      </div>
    );
  }
);

const PaymentCard = React.memo(({ payments, filter }) => {
  return (
    <>
      {payments.reverse().map((payment, index) => {
        const createdAt = new Date(payment.createdAt);
        const formattedCreatedAt = createdAt.toLocaleDateString();
        const formattedCreatedTime = createdAt.toLocaleTimeString();

        return (
          <div
            key={index}
            className={`border-[2.3px] rounded-lg pt-2
            p-4 mb-4 w-[70%] ml-[22%] shadow-lg ${
              payment.success ? "border-green-500" : "border-red-500"
            }  md:w-[50%] md:ml-[30%]  lg:w-[40%] lg:mx-auto `}
          >
            <div className="flex justify-between md:justify-evenly">
              <div className="flex flex-col items-center">
                <p className="text-lg p-1 border border-black rounded-lg bg-blue-400">
                  Sender
                </p>
                <div className="flex pt-3 gap-1">
                  <div className="flex justify-center items-center">
                    <img
                      src={payment.senderImage}
                      className=" w-9 h-6 rounded-full md:w-7 md:h-7 lg:w-8 lg:h-8"
                    />
                  </div>
                  <p className="font-semibold text-gray-800 flex justify-center items-center">
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
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-purple-600"
                >
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </div>
              <div className="flex flex-col items-center ">
                <p
                  className={`text-lg p-1 border border-black rounded-lg ${
                    payment.success ? "bg-green-400" : "bg-red-500"
                  }`}
                >
                  Receiver
                </p>
                <div className="flex pt-3 gap-1">
                  <div className="flex justify-center items-center">
                    <img
                      src={payment.receiverImage}
                      className="w-9 h-6 rounded-full md:w-7 md:h-7 lg:w-8 lg:h-8"
                    />
                  </div>
                  <p className="font-semibold text-gray-800 flex justify-center items-center">
                    {payment.receiverName}
                  </p>
                </div>
                <p className="text-black pt-2">
                  {payment.receiverAccountNumber}
                </p>
              </div>
            </div>
            <div className="flex justify-evenly mt-4">
              <div className="flex flex-col justify-center items-center">
                <p
                  className={`text-xl font-bold ${
                    payment.success ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {filter == "paid" && payment.success ? "-" : ""}
                  {filter == "received" && payment.success ? "+" : ""}
                  {}₹ {payment.amount}
                </p>
                {!payment.success ? (
                  <div className="flex justify-center items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="size-4 text-red-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p className="text-red-500 font-semibold ">Failed</p>
                  </div>
                ) : (
                  <div className="w-0 h-0"></div>
                )}
              </div>
              <div className="font-medium">
                <p className="text-gray-700">
                  {!payment.success ? "Failed on" : ""}
                  {filter == "paid" && payment.success ? "Paid on" : ""}
                  {filter == "received" && payment.success
                    ? "Received on"
                    : ""}{" "}
                  {formattedCreatedAt}
                </p>
                <p className="text-gray-700">{formattedCreatedTime}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
});

export default Transactions;
