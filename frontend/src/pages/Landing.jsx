import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Card from "../components/Landing/Card";

function Landing() {
  const allCards = [
    {
      label: "Pay Friends",
      imageLink: "./Landing_page/2.webp",
      imageCSS: "",
      description:
        "Seamlessly send and receive money with your friends and loved ones. Whether you're splitting a dinner bill, chipping in for a group gift, or just paying someone back, our platform makes it quick and easy. Keep your social life running smoothly with instant transfers.",
    },
    {
      label: "Celebrate Special Moments",
      imageLink: "./Landing_page/5.png",
      imageCSS: "rounded-2xl",
      description:
        "Make every occasion memorable by sending gifts and money with ease. Whether it's a festive celebration or a personal milestone, our platform ensures that your love and appreciation reach your loved ones instantly.",
    },
    {
      label: "Grow Bussiness",
      imageLink: "./Landing_page/4.webp",
      imageCSS: "",
      description:
        "Take your business to the next level with easy, secure payment solutions. Whether you're running a small shop or offering services, our platform helps you accept payments effortlessly. Manage your transactions, engage more customers, and grow your business with confidence.",
    },
    {
      label: "Moments Worth Repeating",
      imageLink: "./Landing_page/2.png",
      imageCSS: "w-[72%] h-[400px] mx-auto",
      description:
        "Cherish the good times with friends. Easily share expenses and make plans to do it all over again. Our app keeps you connected, making sure every moment is as effortless as the last.",
    },
  ];
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
    <>
      <div className="bg-blue-100 h-[50vh] flex flex-col justify-center items-center">
        <h1 className="text-center text-6xl font-semibold font-serif pb-6">
          Fast , safe,
          <br /> social
          <br />
          payments
        </h1>
        <p className="text-black text-lg font-semibold text-center pt-3">
          Pay, get paid, grow a business, and
          <br /> more. Join with the friends on Venmo.
        </p>
      </div>
      <img src="./Landing_page/1.webp" className=" " />
      <div className="w-[85%] mx-auto ">
        {allCards.map((card) => {
          return (
            <Card
              label={card.label}
              imageLink={card.imageLink}
              imageCSS={card.imageCSS}
              description={card.description}
            />
          );
        })}
      </div>
    </>
  );
}

export default Landing;
