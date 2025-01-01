import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin,getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "api/auth/regsiter", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        }else{
          toast.error(data.message)
        }
        
        
      } else {

        const { data } = await axios.post(backendUrl + "api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        }else{
          toast.error(data.message)
        }
        
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute cursor-pointer left-5 sm:left:20 top-5 w-28 sm:w-32 "
      />
      <div className="w-full p-10 text-sm text-indigo-300 rounded-lg shadow-lg bg-slate-900 sm:w-96">
        <h2 className="mb-3 text-3xl font-semibold text-center text-white ">
          {state === "Sign Up" ? "Create Account" : "Login"}{" "}
        </h2>
        <p className="mb-6 text-sm text-center">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="flex items-center mb-4 w-full gap-3 px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                className="bg-transparent outline-none"
                required
              />
            </div>
          )}
          <div className="flex items-center mb-4 w-full gap-3 px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email "
              className="bg-transparent outline-none"
              required
            />
          </div>

          <div className="flex items-center mb-4 w-full gap-3 px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="*******"
              className="bg-transparent outline-none"
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot password?
          </p>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium ">
            {" "}
            {state}{" "}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="mt-4 text-xs text-center text-gray-400">
            Already have an acccount?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-4 text-xs text-center text-gray-400">
            Don't have an acccount?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
