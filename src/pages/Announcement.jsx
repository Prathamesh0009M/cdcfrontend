import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/common/Navbar";
import { fetchAnnounce } from "../services/operations/announceApi";
import { AnimatePresence, motion } from "framer-motion";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaBuilding } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";

const AnnouncementCard = ({ announcement }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        layout="position"
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative cursor-pointer w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, layout: { duration: 0.3 } }}
      >
        {/* Expanded Card */}
        {isExpanded && (
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50">
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
                      {/* Left Side - Image */}
                      <div className="w-1/3 flex items-center">
                        {announcement.attachments ? (
                          <img
                            src={announcement.attachments}
                            alt={announcement.title}
                            className="w-full h-64 rounded-2xl border-2 border-white/20 object-cover"
                          />
                        ) : (
                          <div className="w-full h-64 rounded-2xl border-2 border-white/20 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500" />
                        )}
                      </div>

                      {/* Right Side - Details */}
                      <div className="w-2/3 space-y-6">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2">
                            {announcement.title}
                          </h3>
                          <p className="text-xl text-white/70">
                            Posted on:{" "}
                            {new Date(
                              announcement.datePosted
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="text-lg font-semibold text-white">
                              Content
                            </h4>
                            <p className="text-white/70">
                              {announcement.content}
                            </p>
                          </div>

                          {/* Additional Details */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-white">
                                Category
                              </h4>
                              <p className="text-white/70">
                                {announcement.category}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">
                                Priority
                              </h4>
                              <p className="text-white/70">
                                {announcement.priority}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden space-y-6">
                      <div className="text-center">
                        {announcement.attachments && (
                          <img
                            src={announcement.attachments}
                            alt={announcement.title}
                            className="w-full h-48 rounded-xl object-cover mb-4"
                          />
                        )}
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {announcement.title}
                        </h3>
                        <p className="text-white/70">
                          Posted on:{" "}
                          {new Date(
                            announcement.datePosted
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-white">
                            Content
                          </h4>
                          <p className="text-white/70">
                            {announcement.content}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-white">
                            Category
                          </h4>
                          <p className="text-white/70">
                            {announcement.category}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-white">
                            Priority
                          </h4>
                          <p className="text-white/70">
                            {announcement.priority}
                          </p>
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
            className="h-full cursor-pointer content-center relative backdrop-blur-xl bg-white/10 border-2 border-white/20 rounded-3xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-4">
              {/* Desktop Layout */}
              <div className="hidden md:block">
                <div className="flex flex-col gap-4">
                  {/* Announcement Image */}
                  <div className="flex items-center gap-4">
                    {announcement.attachments ? (
                      <img
                        src={announcement.attachments}
                        alt={announcement.title}
                        className="w-24 h-24 rounded-lg border-2 border-white/20 object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-lg border-2 border-white/20 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0" />
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-white truncate">
                        {announcement.title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        Posted:{" "}
                        {new Date(announcement.datePosted).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Content Preview */}
                  <div className="space-y-2">
                    <p className="text-white/70 text-sm line-clamp-2">
                      {announcement.content}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                      {announcement.category}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                      Priority: {announcement.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden space-y-3">
                <div className="flex items-center gap-4">
                  {announcement.attachments ? (
                    <img
                      src={announcement.attachments}
                      alt={announcement.title}
                      className="w-20 h-20 rounded-lg border-2 border-white/20 object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-lg border-2 border-white/20 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {announcement.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      Posted:{" "}
                      {new Date(announcement.datePosted).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-white/70 line-clamp-2">
                    {announcement.content}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                      {announcement.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

const SortingMenu = ({
  announcements,
  setAnnouncements,
  originalAnnouncements,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const menuRef = useRef(null);

  const handleSearch = (value) => {
    setSearchTerm(value);
    applyFilters(value);
  };

  const applyFilters = (search) => {
    let filtered = [...originalAnnouncements];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (announcement) =>
          // Title
          announcement.title?.toLowerCase().includes(searchLower) ||
          // Category
          announcement.category?.toLowerCase().includes(searchLower) ||
          // Priority (convert to string for search)
          announcement.priority
            ?.toString()
            .toLowerCase()
            .includes(searchLower) ||
          // Date Posted
          new Date(announcement.datePosted)
            ?.toLocaleDateString()
            ?.toLowerCase()
            .includes(searchLower) ||
          // Last Change - First Name
          announcement.lastChange?.firstName
            ?.toLowerCase()
            .includes(searchLower) ||
          // Last Change - Last Name
          announcement.lastChange?.lastName
            ?.toLowerCase()
            .includes(searchLower) ||
          // Highlights/Tags (handle array)
          (announcement.Highlight &&
            (Array.isArray(announcement.Highlight)
              ? announcement.Highlight.some((tag) =>
                  tag.toLowerCase().includes(searchLower)
                )
              : announcement.Highlight.toLowerCase().includes(searchLower))) ||
          // Attachments URL
          announcement.attachments?.toLowerCase().includes(searchLower)
      );
    }

    setAnnouncements(filtered);
  };

  return (
    <div ref={menuRef} className="mb-8">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-center">
        {/* Search Bar */}
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
          />
          <BiSearchAlt2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 text-xl" />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {/* Search Bar */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
          />
          <BiSearchAlt2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 text-xl" />
        </div>
      </div>
    </div>
  );
};

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [originalAnnouncements, setOriginalAnnouncements] = useState([]);

  const gradientAnimation = {
    background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
    backgroundSize: "400% 400%",
    animation: "gradient 15s ease infinite",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAnnounce();
        setAnnouncements(response);
        setOriginalAnnouncements(response);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchData();
  }, []);

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
            Announcements
          </h1>

          <SortingMenu
            announcements={announcements}
            originalAnnouncements={originalAnnouncements}
            setAnnouncements={setAnnouncements}
          />

          {/* Announcements Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {announcements
              .filter((announcement) => announcement.attachments)
              .map((announcement) => (
                <AnnouncementCard
                  key={announcement._id}
                  announcement={announcement}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;