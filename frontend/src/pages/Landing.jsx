import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import Loading from "../components/Loading";

function Landing() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   let ref = setInterval(() => {
  //     axios
  //       .get("/api/v1/user/checkLogin", {
  //         withCredentials: true,
  //       })
  //       .then((response) => {
  //         toast.success(response.data.message);
  //         clearInterval(ref);
  //         navigate("/user/dashboard");
  //       })
  //       .catch((err) => {
  //         if (err.response.status == "500") {
  //           toast.error("Server is currently down || Wait for few seconds");
  //         } else {
  //           clearInterval(ref);
  //           navigate("/auth/signin");
  //         }
  //       });
  //   }, 10000);
  // }, []);

  // useEffect(() => {
  //   let ref;
  //   let isRequestPending = false;
  //   let retryDelay = 10000; // Initial retry delay in milliseconds

  //   const checkLogin = () => {
  //     if (isRequestPending) return;

  //     isRequestPending = true;
  //     axios
  //       .get("/api/v1/user/checkLogin", {
  //         withCredentials: true,
  //       })
  //       .then((response) => {
  //         toast.success(response.data.message);
  //         clearInterval(ref);
  //         navigate("/user/dashboard");
  //       })
  //       .catch((err) => {
  //         if (err.response && err.response.status === 500) {
  //           toast.error("Server is currently down || Wait for a few seconds");
  //           isRequestPending = false;
  //           retryDelay = Math.min(retryDelay * 2, 60000); // Exponential backoff, max 60 seconds
  //           clearInterval(ref);
  //           ref = setInterval(checkLogin, retryDelay); // Update interval with new delay
  //         } else {
  //           clearInterval(ref);
  //           navigate("/auth/signin");
  //         }
  //       });
  //   };

  //   ref = setInterval(checkLogin, retryDelay);

  //   return () => clearInterval(ref); // Cleanup interval on component unmount
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("/api/v1/user/checkLogin", {
          withCredentials: true,
        })
        .then((response) => {
          toast.success(response.data.message);
          navigate("/user/dashboard");
        })
        .catch((err) => {
          if (err.response.status == "500") {
            toast.error("Server is currently down || Wait for few seconds");
          } else {
            toast.error("Please login to continue");
            navigate("/auth/signin");
          }
        });
    }, 10000);
  }, []);

  return <Loading />;
}

export default Landing;
