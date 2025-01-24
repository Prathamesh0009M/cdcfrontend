import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authApi";
import { motion } from "framer-motion";
import { ReactComponent as CDCLogo } from "../asset/CDCLogo.svg";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [emailSent, setemailSent] = useState(false);
    const [email, setemail] = useState("");
    const { loading } = useSelector((state) => state.auth);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setemailSent));
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
                        Reset Your Password
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
                            {!emailSent ? "Reset your Password" : "Check your Email"}
                        </h1>

                        <p className="text-sm font-normal text-gray-400 mb-7">
                            {!emailSent
                                ? "Don't worry, we'll send you instructions to reset your password. If you don't have access to your email, we can help with account recovery."
                                : `We have sent a password reset email to ${email}`}
                        </p>

                        <form onSubmit={handleOnSubmit} className="space-y-6">
                            {!emailSent && (
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
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="pl-2 outline-none border-none w-full bg-transparent text-gray-200 placeholder-gray-500"
                                    />
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full bg-blue-600 py-2 rounded-2xl text-gray-100 font-semibold hover:bg-blue-700 transition-colors"
                            >
                                {!emailSent ? "Reset Password" : "Resend Email"}
                            </motion.button>

                            <div className="text-center mt-6">
                                <Link
                                    to="/login"
                                    className="text-blue-400 hover:text-blue-300 transition-all duration-300"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default ForgotPassword;