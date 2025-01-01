import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "api/auth/send-verify-otp");
      
      if (data.success) {
        navigate('/email-verify')
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="absolute top-0 flex items-center justify-between w-full p-4 sm:p-6 sm:px-24">
      <img src={assets.logo} alt="" className="w-28 sm:w-32" />
      {userData ? (
        <div className="relative flex items-center justify-center w-8 h-8 text-white bg-black rounded-full group">
          {userData.name[0].toUpperCase()}
          <div className="absolute top-0 right-0 z-10 hidden pt-10 text-black rounded group-hover:block">
            <ul className="p-2 m-0 text-sm bg-gray-100 list-nont">
              {!userData.isAccountVerified && (
                <li onClick={sendVerificationOtp} className="px-2 py-1 cursor-pointer hover:bg-gray-200">
                  Verify email
                </li>
              )}

              <li
                onClick={logout}
                className="px-2 py-1 pr-10 cursor-pointer hover:bg-gray-200"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 px-6 py-2 text-gray-800 transition-all border border-gray-500 rounded-full hover:bg-gray-100"
        >
          Login <img src={assets.arrow_icon} alt="" />{" "}
        </button>
      )}
    </div>
  );
};

export default Navbar;
