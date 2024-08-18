import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";
import Loading from "../components/Loading";

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    let ref = setInterval(() => {
      axios
        .get("/v1/user/checkLogin", {
          withCredentials: true,
        })
        .then((response) => {
          toast.success(response.data.message);
          clearInterval(ref);
          navigate("/dashboard");
        })
        .catch((err) => {
          if (err.response.status == "500") {
            toast.error("Server is currently down || Wait for few seconds");
          } else {
            clearInterval(ref);
            navigate("/signin");
          }
        });
    }, 10000);
  }, []);
  return <Loading />;
}

export default Landing;
