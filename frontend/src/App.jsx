import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainContent from "./MainContent";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <MainContent />
    </BrowserRouter>
  );
}

export default App;
