import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/operations/authApi";
import { IoEye, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import IconBtn from "../components/common/IconBtn";
import { motion } from "framer-motion";
import { ReactComponent as CDCLogo } from "../asset/CDCLogo.svg";

const Login = () => {
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password, navigate));
  };

  return (
    <div className="min-h-screen md:flex bg-gray-900">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden md:flex w-full md:w-1/2 bg-gradient-to-tr from-blue-900 to-purple-900 justify-around items-center min-h-[300px]"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-20 w-full flex flex-col items-center px-4 py-12"
        >
          <CDCLogo className="h-24 md:h-40 w-auto text-white fill-white stroke-white" />
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-white mt-4 font-bold text-center text-lg md:text-xl"
          >
            Empowering Careers, Enabling Futures
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex md:w-1/2 justify-center py-10 items-center bg-gray-900"
      >
        {loading ? (
          <div className="text-gray-200">Loading...</div>
        ) : (
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onSubmit={handleOnSubmit}
            className="bg-gray-900 w-full max-w-md px-8"
          >
            <h1 className="text-gray-100 font-bold text-3xl mb-1">
              Hello Again!
            </h1>
            <p className="text-sm font-normal text-gray-400 mb-7">
              Discover the easiest way to buy and sell Used items within your
              campus!
            </p>

            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl hover:border-blue-500 transition-colors bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  className="pl-2 outline-none border-none w-full bg-transparent text-gray-200 placeholder-gray-500"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-2xl hover:border-blue-500 transition-colors relative bg-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  className="pl-2 outline-none border-none w-full bg-transparent text-gray-200 placeholder-gray-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 cursor-pointer hover:text-gray-300"
                >
                  {showPassword ? (
                    <IoEye fontSize={24} />
                  ) : (
                    <IoEyeOffOutline fontSize={24} />
                  )}
                </span>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="block w-full bg-blue-600 mt-4 py-2 rounded-2xl text-gray-100 font-semibold mb-2 hover:bg-blue-700 transition-colors"
              >
                Sign In
              </motion.button>
            </div>

            <div
              className="mt-4 text-center text-blue-400 cursor-pointer hover:text-blue-300"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </div>
            <div className="text-sm text-gray-400 text-center mt-2">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-400 cursor-pointer hover:text-blue-300 transition-all duration-300"
              >
                Sign up here.
              </span>
            </div>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default Login;