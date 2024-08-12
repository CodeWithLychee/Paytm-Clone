import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    const ref = setInterval(() => {
      axios
        .get("/v1/user/checkLogin", {
          withCredentials: true,
        })
        .then((response) => {
          toast.success(response.data.message);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          if (err.message == "Request failed with status code 500") {
            toast.error("Server is currently down");
          } else {
            toast.error(err.response.data.message);
            clearInterval(ref);
            navigate("/signin");
          }
        });
    }, 10000);
  }, []);
  return <div>Landing</div>;
}

export default Landing;
