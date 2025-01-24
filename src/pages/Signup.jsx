import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../services/operations/authApi.js";
import { setSignupData } from "../slices/authSlice.js";
import { IoEye, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import IconBtn from "../components/common/IconBtn.jsx";
import { motion } from "framer-motion";
import { ReactComponent as CDCLogo } from "../asset/CDCLogo.svg";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signUpData } = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.auth.loading);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
    contactNumber: "",
    collegeId: "",
    YearAndBranch: "",
  });

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!["CDC Coordinator", "Staff"].includes(formData.accountType)) {
      alert(
        "Invalid account type. Please select 'CDC Coordinator' or 'Staff'."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const signupDetails = { ...formData };
    dispatch(setSignupData(signupDetails));
    dispatch(sendOtp(formData.email, navigate));
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
            Join Us to Shape Your Future
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
            className="bg-gray-900 w-full max-w-md px-4 md:px-8"
          >
            <h2 className="text-gray-100 font-bold text-3xl mb-1">
              Create Account
            </h2>
            <p className="text-sm font-normal text-gray-400 mb-7">
              Join our community and start your journey
            </p>

            <div className="space-y-4">
              {/* Name Fields */}
              <div className="flex flex-col md:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.02 }} className="flex-1">
                  <input
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleOnChange}
                    placeholder="First Name"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500 focus:border-blue-500 transition-colors outline-none"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="flex-1">
                  <input
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleOnChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500 focus:border-blue-500 transition-colors outline-none"
                  />
                </motion.div>
              </div>

              {/* Email Field */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center border-2 border-gray-700 py-2 px-3 rounded-xl hover:border-blue-500 transition-colors bg-gray-800"
              >
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Email Address"
                  className="w-full px-1 bg-transparent text-gray-200 placeholder-gray-500 outline-none"
                />
              </motion.div>

              {/* Account Type */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center border-2 border-gray-700 rounded-xl hover:border-blue-500 transition-colors bg-gray-800"
              >
                <select
                  required
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleOnChange}
                  className="w-full px-4 py-2 bg-transparent text-gray-200 rounded-xl outline-none"
                >
                  <option value="" disabled className="bg-gray-800">
                    Select Account Type
                  </option>
                  <option value="CDC Coordinator" className="bg-gray-800">
                    CDC Coordinator
                  </option>
                  <option value="Staff" className="bg-gray-800">
                    Staff
                  </option>
                </select>
              </motion.div>

              {/* Password Fields */}
              <div className="flex flex-col md:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 relative"
                >
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="Password"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500 focus:border-blue-500 transition-colors outline-none pr-10"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-300"
                  >
                    {showPassword ? <IoEye /> : <IoEyeOffOutline />}
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 relative"
                >
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleOnChange}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500 focus:border-blue-500 transition-colors outline-none pr-10"
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-300"
                  >
                    {showConfirmPassword ? <IoEye /> : <IoEyeOffOutline />}
                  </span>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 py-2 rounded-xl text-gray-100 font-semibold hover:bg-blue-700 transition-colors mt-6"
              >
                Create Account
              </motion.button>
            </div>

            {/* Login Link */}
            <div className="text-sm text-gray-400 text-center mt-6">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-400 cursor-pointer hover:text-blue-300 transition-all duration-300"
              >
                Sign in here
              </span>
            </div>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default Signup;