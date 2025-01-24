import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from "../components/core/Dashboard/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUsers } from "../slices/profileSlice";

const Dashboard = () => {
    const gradientAnimation = {
        background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
    };

   
    
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background with animation */}
            <div className="absolute inset-0 z-0 bg-black"  />
            {/* <div className="absolute inset-0 z-0" style={gradientAnimation} /> */}

            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 z-10 backdrop-blur-[120px]" />

            {/* Content */}
            <div className="relative z-20  flex min-h-screen">
                <Sidebar />
                <div className="flex-grow h-full overflow-auto">
                    <div className="mx-auto w-full md:w-11/12 max-w-[1000px] py-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
