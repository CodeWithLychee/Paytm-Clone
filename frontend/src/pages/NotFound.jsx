import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black">404 ERROR</h1>
        <img src="/anime.gif" alt="Not Found" className="my-6 w-96 mx-auto" />
        <p className="text-lg font-semibold mb-2">Something Went Wrong...!</p>
        <p className="text-gray-500 mb-6">The page Not Available!</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
