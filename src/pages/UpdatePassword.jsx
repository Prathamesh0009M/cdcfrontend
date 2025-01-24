import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { IoEye, IoEyeOffOutline } from "react-icons/io5";
import { resetPassword } from '../services/operations/authApi';
import IconBtn from '../components/common/IconBtn';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { loading } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen text-white'>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className='w-full max-w-md p-6 bg-richblack-800 rounded-lg shadow-md'>
                    <p className='text-center mb-4'>Almost done. Enter your new password and you are all set.</p>

                    <form onSubmit={handleOnSubmit} className='space-y-6'>
                        <label className='block'>
                            <p className='mb-2'>New Password *</p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name='password'
                                value={password}
                                    onChange={handleOnChange}
                                    placeholder='Enter Password'
                                className='w-full p-4 bg-richblack-700 text-richblack-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className='absolute inset-y-0 right-0 pr-3 mt-2 cursor-pointer'
                            >
                                {showPassword ? <IoEye fontSize={24} /> : <IoEyeOffOutline fontSize={24} />}
                            </span>
                        </label>
                        <label className='block'>
                            <p className='mb-2'>Confirm New Password *</p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder='Confirm New Password'
                                className='w-full p-4 bg-richblack-700 text-richblack-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <span
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className='absolute inset-y-0 right-0 pr-3 mt-2 cursor-pointer'
                            >
                                {showConfirmPassword ? <IoEye fontSize={24} /> : <IoEyeOffOutline fontSize={24} />}
                            </span>
                        </label>


                        <IconBtn
                                text={'Reset Password'}
                                type={"submit"}
                                customClasses={'w-full flex item-center justify-center'}

                        />

                        <div className='text-center'>
                            <Link to="/login" className='text-blue-400 hover:text-blue-300'>
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdatePassword;
