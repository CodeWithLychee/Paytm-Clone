import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import Loading from "../components/Loading";

function Landing() {
  const navigate = useNavigate();

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
