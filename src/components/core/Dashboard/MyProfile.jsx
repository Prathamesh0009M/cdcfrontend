import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MyProfile = () => {
    const navigate = useNavigate();
    const { users } = useSelector((state) => state.profile);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (users) {
            setIsLoading(false);
        }
    }, [users]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-black/90">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="animated-blob w-[600px] h-[600px] bg-blue-600/20 -left-[20%] top-[20%]"
                    style={{ animationDelay: "0s", filter: "blur(60px)" }} />
                <div className="animated-blob w-[500px] h-[500px] bg-purple-600/20 -right-[10%] top-[40%]"
                    style={{ animationDelay: "-5s", filter: "blur(60px)" }} />
                <div className="animated-blob w-[400px] h-[400px] bg-pink-600/20 left-[30%] bottom-[10%]"
                    style={{ animationDelay: "-10s", filter: "blur(60px)" }} />
                
                {/* Additional particle effects */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full animate-pulse"
                        style={{
                            width: Math.random() * 3 + 1 + "px",
                            height: Math.random() * 3 + 1 + "px",
                            background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 3 + 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-4 sm:p-8
                        hover:border-white/30 transition-all duration-300"
                >
                    <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
                        {/* Profile Image Section - Enhanced */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex-shrink-0 mb-6 md:mb-0 w-full md:w-auto"
                        >
                            <div className="relative group mx-auto md:mx-0 w-32 h-32 sm:w-40 sm:h-40">
                                <img
                                    src={users?.image || 'default-profile-image-url'}
                                    alt={`profile-${users?.firstName}`}
                                    className="w-full h-full rounded-2xl object-cover border-2 border-white/20 
                                        transition-all duration-300 group-hover:scale-105 group-hover:border-white/40"
                                />
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                                    opacity-0 group-hover:opacity-100 transition-all duration-300
                                    group-hover:backdrop-blur-sm"/>
                            </div>
                        </motion.div>

                        {/* Profile Details Section - Enhanced */}
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 
                                        bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                                        {users?.firstName} {users?.lastName}
                                    </h1>
                                    <p className="text-white/70 text-base sm:text-lg">{users?.email}</p>
                                    <p className="text-white/70">{users?.YearAndBranch}</p>
                                </div>
                                <IconBtn
                                    text="Edit Profile"
                                    onclick={() => navigate("/dashboard/settings")}
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                                        hover:from-blue-600 hover:to-purple-600 transition-all duration-300
                                        transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                                />
                            </div>

                            {/* About Section - Enhanced */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mb-8 p-6 bg-white/5 rounded-xl backdrop-blur-sm
                                    hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-white">About</h2>
                                    <IconBtn
                                        text="Edit"
                                        onclick={() => navigate("/dashboard/settings")}
                                        className="bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                                    />
                                </div>
                                <p className="text-white/70">
                                    {users?.additionaldetail?.about || 
                                        <span className="text-white/50 italic">Write something about yourself...</span>
                                    }
                                </p>
                            </motion.div>

                            {/* Personal Details Section - Enhanced */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white/5 rounded-xl backdrop-blur-sm p-6
                                    hover:bg-white/10 transition-all duration-300"
                            >
                                <h2 className="text-xl font-semibold text-white mb-4">Personal Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DetailItem label="First Name" value={users?.firstName} />
                                    <DetailItem label="Last Name" value={users?.lastName} />
                                    <DetailItem label="College Id" value={users?.collegeId} />
                                    <DetailItem label="Email" value={users?.email} />
                                    <DetailItem label="Designation" value={users?.additionaldetail?.Designation || "Add Designation"} />
                                    <DetailItem label="Phone Number" value={users?.additionaldetail?.contactNumber || "Add Contact Number"} />
                                    <DetailItem label="Date of Birth" value={users?.additionaldetail?.dateOfBirth || "Add Date of Birth"} />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <motion.div 
        whileHover={{ scale: 1.02 }}
        className="p-4 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 
            transition-all duration-300 border border-white/10 hover:border-white/20"
    >
        <p className="text-white/50 text-sm mb-1">{label}</p>
        <p className="text-white font-medium">{value}</p>
    </motion.div>
);

export default MyProfile;
