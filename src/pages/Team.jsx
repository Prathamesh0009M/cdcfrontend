import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import linkedin from "../asset/linkedin.png"; // Assuming this image is available
import { fetchAllUser } from "../services/operations/announceApi";
import IconBtn from "../components/common/IconBtn";
import { motion, AnimatePresence } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { IoSchoolOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaIdCard, FaLinkedin } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";

const TeamCard = ({ member }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        layout="position"
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, layout: { duration: 0.3 } }}
      >
        {/* Overlay when expanded */}
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
          >
            {/* Centered expanded card */}
            <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
              <motion.div
                className="relative w-full max-w-7xl bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl overflow-hidden mx-auto"
                style={{
                  height: {
                    sm: "35rem",
                    base: "90vh",
                  },
                  overflowY: {
                    sm: "auto",
                    base: "auto",
                  },
                  margin: {
                    sm: "2rem",
                    base: "1rem",
                  },
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-8 h-full">
                  <div className="flex flex-col h-full">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex gap-8 items-start">
                      {/* Left Side - Image/Profile */}
                      <div className="w-1/3 flex items-center">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-64 rounded-2xl border-2 border-white/20 object-cover"
                          />
                        ) : (
                          <div className="w-full h-64 rounded-2xl border-2 border-white/20 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <CgProfile className="w-32 h-32 text-white/80" />
                          </div>
                        )}
                      </div>

                      {/* Right Side - Details */}
                      <div className="w-2/3 space-y-6">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2">
                            {member.name}
                          </h3>
                          <div className="flex items-center gap-2 text-white/70">
                            <MdWork className="w-5 h-5 flex-shrink-0" />
                            <p className="text-xl">
                              {member.Designation || "No Designation"}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="text-lg font-semibold text-white">
                              About
                            </h4>
                            <p className="text-white/70">{member.about}</p>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-white">
                                Education
                              </h4>
                              <p className="text-white/70">
                                {member.branch} • {member.year}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">
                                College ID
                              </h4>
                              <p className="text-white/70">
                                {member.collegeId}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">
                                Email
                              </h4>
                              <p className="text-white/70">{member.email}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">
                                Contact
                              </h4>
                              <p className="text-white/70">{member.phone}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">
                                LinkedIn
                              </h4>
                              <a
                                href={member.linkedinProfile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 flex items-center"
                              >
                                <FaLinkedin className="text-blue-500 mr-2" />
                                Connect on LinkedIn
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-6">
                      <div className="text-center">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                          />
                        ) : (
                          <CgProfile className="w-32 h-32 text-white/80 mx-auto mb-4" />
                        )}
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {member.name}
                        </h3>
                        <p className="text-xl text-white/70">
                          {member.Designation || "No Designation"}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-white">
                            About
                          </h4>
                          <p className="text-white/70">{member.about}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-white">
                            Education
                          </h4>
                          <p className="text-white/70">
                            {member.branch} • {member.year}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-white">
                            College ID
                          </h4>
                          <p className="text-white/70">{member.collegeId}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-white">
                            Contact
                          </h4>
                          <p className="text-white/70">{member.email}</p>
                          <p className="text-white/70">{member.phone}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-white">
                            LinkedIn
                          </h4>
                          <a
                            href={member.linkedinProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/70 flex items-center"
                          >
                            <FaLinkedin className="text-blue-500 mr-2" />
                            Connect on LinkedIn
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Collapsed Card */}
        {!isExpanded && (
          <motion.div
            layout="position"
            className="relative backdrop-blur-xl bg-white/10 border-2 border-white/20 rounded-3xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
            transition={{ layout: { duration: 0.2 } }}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-6">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <CgProfile className="w-20 h-20 text-white/80 flex-shrink-0" />
                )}
                <div className="space-y-2 min-w-0">
                  <h3 className="text-2xl font-bold text-white truncate">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80">
                    <MdWork className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">
                      {member.Designation || "No Designation"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <IoSchoolOutline className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">
                      {member.branch} • {member.year}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-white/70">
                <div className="flex items-center gap-2">
                  <MdOutlineEmail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaIdCard className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{member.collegeId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaLinkedin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="truncate">
                    <a
                      href={member.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70"
                    >
                      Connect on LinkedIn
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence >
    
  );
};

const SortingMenu = ({ events, setEvents, originalEvents }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    year: "All",
    branch: "All",
  });
  const [isOpen, setIsOpen] = useState({
    year: false,
    branch: false,
  });
  const menuRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen({
          year: false,
          branch: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = (type) => {
    setIsOpen((prev) => {
      // Close all other dropdowns and toggle the clicked one
      const newState = {
        year: false,
        branch: false,
      };
      newState[type] = !prev[type];
      return newState;
    });
  };

  const filterOptions = {
    year: ["All", "2nd", "3rd", "4th"],
    branch: [
      "All",
      "IT",
      "Computer",
      "CE",
      "EXTC",
      "VLSI",
      "CHEMICAL",
      "PETRO-CHEMICAL",
      "Mechanical",
      "Civil",
    ],
  };

  const handleSearch = (value) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setEvents(originalEvents);
      return;
    }

    const searchLower = value.toLowerCase();
    const filtered = originalEvents.filter(
      (member) =>
        member.firstName?.toLowerCase().includes(searchLower) ||
        member.lastName?.toLowerCase().includes(searchLower) ||
        member.email?.toLowerCase().includes(searchLower) ||
        member.YearAndBranch?.toLowerCase().includes(searchLower) ||
        member.batch?.toLowerCase().includes(searchLower) ||
        (member.additionaldetail?.Designation &&
          member.additionaldetail.Designation.toLowerCase().includes(
            searchLower
          )) ||
        (member.additionaldetail?.about &&
          member.additionaldetail.about.toLowerCase().includes(searchLower))
    );

    setEvents(filtered);
  };

  const handleFilter = (type, value) => {
    const newFilters = { ...selectedFilters, [type]: value };
    setSelectedFilters(newFilters);
    setIsOpen((prev) => ({ ...prev, [type]: false }));

    let filtered = [...originalEvents];

    if (newFilters.year !== "All") {
      filtered = filtered.filter((member) =>
        member.YearAndBranch?.toLowerCase().includes(
          newFilters.year.toLowerCase()
        )
      );
    }
    if (newFilters.branch !== "All") {
      filtered = filtered.filter((member) =>
        member.YearAndBranch?.toLowerCase().includes(
          newFilters.branch.toLowerCase()
        )
      );
    }

    setEvents(filtered);
  };

  return (
    <div ref={menuRef} className="mb-8">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-center gap-4">
        {/* Search Bar */}
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onClick={() => setIsOpen({ year: false, branch: false })}
            className="w-full px-4 py-2 pl-10 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
          />
          <BiSearchAlt2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 text-xl" />
        </div>

        {/* Filter Buttons */}
        {Object.entries(filterOptions).map(([type, options]) => (
          <div key={type} className="relative">
            <button
              onClick={() => handleDropdownClick(type)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white hover:bg-white/20 transition-all duration-200"
            >
              <span className="capitalize truncate">
                {type}: {selectedFilters[type]}
              </span>
            </button>

            {isOpen[type] && (
              <div className="absolute top-full mt-2 w-48 max-h-60 overflow-y-auto rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 shadow-xl z-50">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilter(type, option)}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-white/20 transition-all duration-200 ${
                      selectedFilters[type] === option ? "bg-white/20" : ""
                    }`}
                  >
                    <span className="truncate">{option}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {/* Search Bar */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onClick={() => setIsOpen({ year: false, branch: false })}
            className="w-full px-4 py-2 pl-10 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
          />
          <BiSearchAlt2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 text-xl" />
        </div>

        {/* Filter Buttons for Mobile */}
        <div className="flex gap-4">
          {Object.entries(filterOptions).map(([type, options]) => (
            <div key={type} className="relative flex-1">
              <button
                onClick={() => handleDropdownClick(type)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white hover:bg-white/20 transition-all duration-200"
              >
                <span className="capitalize truncate">
                  {type}: {selectedFilters[type]}
                </span>
              </button>

              {isOpen[type] && (
                <div className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 shadow-xl z-50">
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilter(type, option)}
                      className={`flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-white/20 transition-all duration-200 ${
                        selectedFilters[type] === option ? "bg-white/20" : ""
                      }`}
                    >
                      <span className="truncate">{option}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const navigate = useNavigate();

  const gradientAnimation = {
    background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
    backgroundSize: "400% 400%",
    animation: "gradient 15s ease infinite",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAllUser();
        setAllUsers(result);
        setOriginalUsers(result);
        console.log("team is ", result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleViewProfile = (user) => {
    navigate("/profile", { state: user });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with animation */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        {/* Animated blobs */}
        <div
          className="animated-blob w-[600px] h-[600px] bg-blue-600/40 left-[10%] top-[30%]"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="animated-blob w-[700px] h-[700px] bg-purple-600/40 right-[15%] top-[40%]"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="animated-blob w-[500px] h-[500px] bg-pink-600/40 left-[20%] bottom-[15%]"
          style={{ animationDelay: "-10s" }}
        />
        <div
          className="animated-blob w-[550px] h-[550px] bg-emerald-600/40 right-[25%] bottom-[25%]"
          style={{ animationDelay: "-15s" }}
        />
        {/* Additional blobs for better coverage */}
        <div
          className="animated-blob w-[650px] h-[650px] bg-indigo-600/40 left-[40%] top-[35%]"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="animated-blob w-[450px] h-[450px] bg-violet-600/40 left-[-5%] top-[45%]"
          style={{ animationDelay: "-12s" }}
        />
        <div
          className="animated-blob w-[580px] h-[580px] bg-cyan-600/40 right-[-10%] top-[50%]"
          style={{ animationDelay: "-3s" }}
        />

        {/* Particles effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 2 + 1 + "px",
                height: Math.random() * 2 + 1 + "px",
                background: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60 + 40}%`,
                animation: `pulse ${
                  5 + Math.random() * 5
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-14 relative z-20">
        <Navbar />
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            Team
          </h1>
          <SortingMenu
            events={allUsers}
            setEvents={setAllUsers}
            originalEvents={originalUsers}
          />
          <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allUsers.map((user) => (
              <TeamCard
                key={user._id}
                member={{
                  name: `${user.firstName} ${user.lastName}`,
                  branch: user.YearAndBranch?.split(",")[1] || "N/A",
                  year: user.YearAndBranch?.split(",")[0] || "N/A",
                  email: user.email,
                  collegeId: user.accountType,
                  about: user.additionaldetail?.about,
                  Designation: user.additionaldetail?.Designation,
                  phone: user.additionaldetail?.contactNumber,
                  image: user.image,
                  linkedinProfile: user.additionaldetail?.linkedinProfile,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;