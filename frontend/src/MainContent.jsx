import React from "react";
import { useCallback, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import SideBar from "./pages/SideBar";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import DashBoard from "./pages/DashBoard";
import SendMoney from "./pages/SendMoney";
import AddAccount from "./pages/AddAccount";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserIcon from "./components/UserIcon";
import YourProfile from "./pages/YourProfile";
import ToastContainerCondition from "./components/ToastContainerCondition";

function MainContent() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const showSideBar = !["/", "/auth/signup", "/auth/signin"].includes(
    location.pathname
  );

  const toggleOpen = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prevOpen) => !prevOpen);
  }, []);

  const sideBarElements = React.useMemo(() => {
    return [
      {
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        ),
        text: "Main menu",
      },
      {
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        ),
        text: "Home",
        to: "/user/dashboard",
      },
      {
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
        ),
        text: "Add Account",
        to: "/user/account/addAccount",
      },
      {
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
        ),
        text: "Transfer",
        to: "/user/account/transferMoney",
      },
      {
        svg: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        ),
        text: "Transactions",
        to: "/user/account/transactions",
      },
    ];
  }, []);

  return (
    <div>
      {/* <ToastContainerCondition /> */}
      {showSideBar && (
        <div className="fixed z-10 left-0 h-full">
          <SideBar
            open={open}
            toggleOpen={toggleOpen}
            sideBarElements={sideBarElements}
          />
        </div>
      )}
      {showSideBar && (
        <UserIcon isOpen={isOpen} toggleDropdown={toggleDropdown} />
      )}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route
          path="/user/dashboard"
          element={
            <DashBoard
              open={open}
              toggleOpen={toggleOpen}
              isOpen={isOpen}
              toggleDropdown={toggleDropdown}
            />
          }
        />
        <Route
          path="/user/account/addAccount"
          element={
            <AddAccount
              open={open}
              toggleOpen={toggleOpen}
              isOpen={isOpen}
              toggleDropdown={toggleDropdown}
            />
          }
        />
        <Route
          path="/user/account/transferMoney"
          element={
            <SendMoney
              open={open}
              toggleOpen={toggleOpen}
              isOpen={isOpen}
              toggleDropdown={toggleDropdown}
            />
          }
        />
        <Route
          path="/user/account/transactions"
          element={
            <Transactions
              open={open}
              toggleOpen={toggleOpen}
              isOpen={isOpen}
              toggleDropdown={toggleDropdown}
            />
          }
        />
        <Route
          path="/user/profile"
          element={
            <YourProfile
              open={open}
              toggleOpen={toggleOpen}
              isOpen={isOpen}
              toggleDropdown={toggleDropdown}
            />
          }
        />
        <Route
          path="/user/settings"
          element={
            <Settings
              open={open}
              toggleOpen={toggleOpen}
              isOpen={isOpen}
              toggleDropdown={toggleDropdown}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default MainContent;
