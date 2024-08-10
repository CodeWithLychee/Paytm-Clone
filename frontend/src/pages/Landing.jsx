import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("/v1/user/checkLogin", {
          withCredentials: true,
        })
        .then((response) => {
          toast.success(response.data.message);
          navigate("/dashboard");
        })
        .catch((err) => {
          toast.success(err.response.data.message);
          navigate("/signin");
        });
    }, 2000);
  }, []);

  return <div>Landing</div>;
}

export default Landing;
