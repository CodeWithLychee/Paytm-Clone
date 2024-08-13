import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   let ref = setInterval(() => {
  //     axios
  //       .get("/v1/user/checkLogin", {
  //         withCredentials: true,
  //       })
  //       .then((response) => {
  //         toast.success(response.data.message);
  //         navigate("/dashboard");
  //         clearInterval(ref);
  //       })
  //       .catch((err) => {
  //         if (err.message === "Request failed with status code 500") {
  //           toast.error("Server is currently down");
  //         } else if (err.response) {
  //           toast.error(err.response.data.message);
  //           navigate("/signin");
  //           clearInterval(ref);
  //         } else {
  //           toast.error("An unexpected error occurred");
  //         }
  //       });
  //   }, 10000);

  //   return () => clearInterval(ref);
  // }, [navigate]);

  return (
    <div className="relative w-full h-screen">
      <div className="bg-blue-100 h-screen ">
        <h1 className="text-center text-6xl font-semibold font-serif pt-44">
          Fast , safe,
          <br /> social
          <br />
          payments
        </h1>
        <p className="text-black text-lg font-semibold text-center pt-12">
          Pay, get paid, grow a business, and
          <br /> more. Join with the friends on Venmo.
        </p>
      </div>
      <img className="absolute bottom-0" src="./1.webp" />
    </div>
  );
}

export default Landing;
