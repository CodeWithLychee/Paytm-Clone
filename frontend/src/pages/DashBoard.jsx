import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DashBoard() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/v1/user/checkLogin", {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        navigate("/signin");
      });
  }, []);
  return <div>DashBoard</div>;
}

export default DashBoard;
