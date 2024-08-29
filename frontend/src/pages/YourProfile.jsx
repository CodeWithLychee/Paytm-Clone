import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function YourProfile() {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/api/v1/user/details")
      .then((response) => {
        setDetails(response.data.details);
      })
      .catch((err) => {
        toast.error("Something went wrong || Please login again");
        navigate("/auth/signin");
      });
  }, []);
  console.log(details);

  return <div>hiii</div>;
}

export default YourProfile;
