import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { useNavigate, Link } from "react-router-dom";
import { sendOtp, signup } from "../services/operations/authApi";
import { motion } from "framer-motion";
import { ReactComponent as CDCLogo } from "../asset/CDCLogo.svg";

const VerifyEmail = () => {
  const { signUpData, loading } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signUpData) {
      navigate("/signup");
    }
  }, [signUpData, navigate]);

  const {
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    collegeId,
    YearAndBranch,
  } = signUpData || {};

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signup(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        YearAndBranch,
        otp,
        collegeId,
        navigate
      )
    );
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
            Verify Your Email
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
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gray-900 w-full max-w-md px-8"
          >
            <h1 className="text-gray-100 font-bold text-3xl mb-1">
              Verify Your Email
            </h1>
            <p className="text-sm font-normal text-gray-400 mb-7">
              A verification code has been sent to your email. Enter the code
              below:
            </p>

            <form onSubmit={handleOnSubmit} className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex justify-center mb-4"
              >
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  renderSeparator={<span className="w-4"></span>}
                  renderInput={(props) => (
                    <motion.input
                      {...props}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-700 rounded-xl bg-gray-800 text-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                      style={{ caretColor: "transparent" }}
                    />
                  )}
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 py-2 rounded-2xl text-gray-100 font-semibold hover:bg-blue-700 transition-colors"
              >
                Verify Email
              </motion.button>

              <div className="flex flex-col items-center gap-2 mt-6">
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 transition-all duration-300"
                >
                  Back to Login
                </Link>
                <button
                  onClick={() => dispatch(sendOtp(email, navigate))}
                  className="text-blue-400 hover:text-blue-300 transition-all duration-300"
                  type="button"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail;