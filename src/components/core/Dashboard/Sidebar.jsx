import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink, useLocation, matchPath } from 'react-router-dom';
import { sidebarlink } from "../../../data/dashboard-link";
import { logout } from '../../../services/operations/authApi';
import ConfirmationModal from '../../common/ConfirmationModal';
import * as Icons from "react-icons/vsc";
import { VscSignOut, VscThreeBars, VscSettingGear } from 'react-icons/vsc';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout(navigate));
        setConfirmationModal(null);
    };

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    // SidebarLink component integrated as a nested component
    const SidebarLink = ({ link, iconName }) => {
        const Icon = Icons[iconName];
        const isActive = matchRoute(link.path);

        return (
            <NavLink
                to={link.path}
                className={`relative px-8 py-3 text-sm font-medium transition-all duration-200
                    ${isActive
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
            >
                <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-gradient-to-b from-blue-500 to-purple-500
                    transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-0"}`}>
                </span>

                <div className='flex items-center gap-x-3'>
                    {Icon && <Icon className={`text-xl transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />}
                    <span>{link.name}</span>
                </div>
            </NavLink>
        );
    };

    return (
        <>
            {/* Mobile Toggle Button - Fixed left position */}
            <div > <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`
                    md:hidden fixed top-4 left-4 z-50 p-3 rounded-lg 
                    bg-white/10 backdrop-blur-lg border border-white/20
                    hover:bg-white/20 transition-all duration-200
                    shadow-lg shadow-black/10 
                `}
            >
                <VscThreeBars className="text-2xl text-white" />
            </button></div>

            {/* Sidebar Container */}
            <div className={`
                fixed md:static top-0 left-0 h-screen 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 w-[250px] 
                bg-black/80 backdrop-blur-xl 
                border-r border-white/10
                transition-all duration-300 ease-in-out 
                z-40
            `}>
                {/* Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="animated-blob w-[400px] h-[400px] bg-blue-600/20 -left-[50%] top-[20%]"
                        style={{ animationDelay: "0s", filter: "blur(60px)" }} />
                    <div className="animated-blob w-[350px] h-[350px] bg-purple-600/20 -right-[50%] top-[50%]"
                        style={{ animationDelay: "-5s", filter: "blur(60px)" }} />
                </div>

                {/* Content Container - Added top padding for mobile */}
                <div className="relative h-full flex flex-col py-8 md:py-8">
                    {/* Added safe area padding for mobile */}
                    <div className="pt-14 md:pt-0">
                        {/* Links Section */}
                        <div className='flex-1 flex flex-col space-y-1 overflow-y-auto'>
                            {sidebarlink.map((link) => (
                                <SidebarLink
                                    key={link.id}
                                    link={link}
                                    iconName={link.icon}
                                />
                            ))}
                        </div>

                        {/* Divider */}
                        <div className='mx-auto my-6 h-[1px] w-10/12 bg-gradient-to-r from-transparent via-white/20 to-transparent'></div>

                        {/* Bottom Section */}
                        <div className='flex flex-col space-y-1'>
                            <SidebarLink
                                link={{ name: "Settings", path: "/dashboard/settings" }}
                                iconName="VscSettingGear"
                            />
                            <button
                                onClick={() =>
                                    setConfirmationModal({
                                        text1: "Are you Sure?",
                                        text2: "You will be logged out of your Account",
                                        btn1Text: "Logout",
                                        btn2Text: "Cancel",
                                        btn1Handler: handleLogout,
                                        btn2Handler: () => setConfirmationModal(null),
                                    })
                                }
                                className='px-8 py-3 text-sm font-medium text-white/70 hover:text-white
                                    hover:bg-white/10 transition-all duration-200'
                            >
                                <div className='flex items-center gap-x-3'>
                                    <VscSignOut className='text-xl' />
                                    <span>Log out</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    );
};

export default Sidebar;
