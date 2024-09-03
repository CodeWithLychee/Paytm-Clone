import React, { useCallback, useState } from "react";
import InputBox from "../components/AuthenticationForm/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function SearchPersons({ open, toggleOpen, isOpen, toggleDropdown }) {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  const searchPerson = useCallback(async (name) => {
    if (!name) {
      setUserData([]);
      return;
    }

    setLoading(true); // Start loading
    axios
      .get(`/api/v1/user/bulk?filter=${name}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserData(res.data.message);
        setLoading(false); // End loading after success
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // End loading after error
      });
  }, []);

  return (
    <div
      className={`${
        open || isOpen ? "opacity-45" : ""
      } min-h-screen w-full lg:opacity-100 relative flex flex-col items-center gap-5 overflow-hidden`}
      onClick={() => {
        if (open && window.innerWidth < 1024) {
          toggleOpen();
        }
        if (isOpen && window.innerWidth < 1024) {
          toggleDropdown();
        }
      }}
    >
      <h1 className="w-full text-center mt-20 ml-2 text-2xl font-bold text-blue-500">
        Search Persons
      </h1>
      <div className="ml-6 w-[70%] flex justify-center items-center">
        <div className="flex-1">
          <InputBox
            heading={""}
            type={"text"}
            placeholder={"Enter the name of the person"}
            onChange={(e) => {
              searchPerson(e.target.value);
            }}
          />
        </div>
      </div>
      <UserAccounts userData={userData} loading={loading} />
    </div>
  );
}

const UserAccounts = React.memo(({ userData, loading }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();
  const toggleDropdown = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-3/4 ml-14">
      <div className="w-full font-semibold text-left">
        <div className="grid grid-cols-1 p-3 border-b border-gray-300">
          <div>Names</div>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : userData.length > 0 ? (
        userData.map((user) => (
          <div key={user.userId} className="border-b border-gray-200">
            <div
              className="flex justify-between items-center p-3 cursor-pointer"
              onClick={() => toggleDropdown(user.userId)}
            >
              <span>{user.fullName}</span>
              <span
                className={`text-xl transform duration-500 ${
                  expandedIndex === user.userId
                    ? "rotate-45 text-red-500"
                    : "rotate-0"
                }`}
              >
                +
              </span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedIndex === user.userId ? "max-h-40" : "max-h-0"
              }`}
            >
              <div className="p-3">
                {user.accountNumbers.length > 0 ? (
                  user.accountNumbers.map((account, idx) => (
                    <div key={account} className="flex justify-between">
                      <div className="text-blue-500 flex gap-1 text-sm">
                        <span className="text-black">•</span>
                        <span>{account}</span>
                      </div>
                      <p
                        className="hover:text-blue-500 duration-300 cursor-pointer text-xs text-end"
                        onClick={() => {
                          navigate("/user/account/transferMoney", {
                            state: { receiverAccountNumber: account },
                          });
                        }}
                      >
                        Send Money
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center">-</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No users found</p>
      )}
    </div>
  );
});

export default SearchPersons;
