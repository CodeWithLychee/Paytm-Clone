import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Transactions() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    if (isLoggedIn) {
      axios
        .get("/v1/account/allPayments", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          toast.error("Something went wrong, Please login again");
          navigate("/signin");
        });
    } else {
      navigate("/signin");
    }
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
            <button className="border-2 border-black w-[27%] rounded-lg p-1 hover:bg-blue-400">
              Paid
            </button>
            <button className="border-2 border-black w-[27%] rounded-lg p-1 hover:bg-blue-400">
              Received
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
