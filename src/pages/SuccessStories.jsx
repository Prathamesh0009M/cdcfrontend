import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/common/Navbar";
import { fetchSuccessStory } from "../services/operations/successStoryApi";
import { AnimatePresence, motion } from "framer-motion";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsBriefcase, BsCalendarDate, BsCurrencyDollar } from "react-icons/bs";
import { FaGraduationCap, FaBuilding } from "react-icons/fa";

const PlacementCard = ({ story }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        layout="position"
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative cursor-pointer w-full md:layout-transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Expanded Card */}
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsExpanded(false);
              }
            }}
          >
            <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
              <motion.div className="relative w-full max-w-7xl bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl overflow-hidden mx-auto">
                <div className="p-4 sm:p-8 h-full">
                  <div className="flex flex-col h-full">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex gap-8 h-[70vh]">
                      {/* Left Side - Profile */}
                      <div className="w-1/3 flex flex-col gap-6">
                        <div className="w-full aspect-square rounded-2xl border-2 border-white/20 overflow-hidden">
                          <img
                            src={story.photo}
                            alt={story.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-white">
                            {story.name}
                          </h3>
                          <p className="text-lg text-white/70">
                            {story.course}
                          </p>
                          <p className="text-white/70">
                            Batch of {story.batch}
                          </p>
                        </div>
                      </div>

                      {/* Right Side - Details */}
                      <div className="w-2/3 flex flex-col h-full">
                        {/* Career Info */}
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-white">
                                Company
                              </h4>
                              <p className="text-white/70">{story.company}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">
                                Position
                              </h4>
                              <p className="text-white/70">{story.position}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">
                                Package
                              </h4>
                              <p className="text-white/70">{story.package}</p>
                            </div>
                          </div>

                          {/* Achievement Section */}
                          <div className="space-y-2">
                            <h4 className="text-lg font-semibold text-white">
                              Achievement
                            </h4>
                            <p className="text-white/70">{story.achievement}</p>
                          </div>

                          {/* Success Story */}
                          <div className="space-y-2">
                            <h4 className="text-lg font-semibold text-white">
                              Success Story
                            </h4>
                            <p className="text-white/70">{story.story}</p>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {story.tags?.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden flex flex-col gap-6 max-h-[70vh] overflow-y-auto">
                      {/* Profile Section */}
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 rounded-xl border-2 border-white/20 overflow-hidden flex-shrink-0">
                          <img
                            src={story.photo}
                            alt={story.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {story.name}
                          </h3>
                          <p className="text-white/70">{story.course}</p>
                          <p className="text-white/70">
                            Batch of {story.batch}
                          </p>
                        </div>
                      </div>

                      {/* Career Details */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <h4 className="font-semibold text-white">
                              Company
                            </h4>
                            <p className="text-white/70">{story.company}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">
                              Position
                            </h4>
                            <p className="text-white/70">{story.position}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">
                              Package
                            </h4>
                            <p className="text-white/70">{story.package}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-white">
                            Achievement
                          </h4>
                          <p className="text-white/70">{story.achievement}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-white">
                            Success Story
                          </h4>
                          <p className="text-white/70">{story.story}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {story.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
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
            className="h-full cursor-pointer relative backdrop-blur-xl bg-white/10 border-2 border-white/20 rounded-3xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-6">
              {/* Desktop Layout */}
              <div className="hidden md:block">
                <div className="flex flex-col gap-4">
                  {/* Profile Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl border-2 border-white/20 overflow-hidden flex-shrink-0">
                      <img
                        src={story.photo}
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {story.name}
                      </h3>
                      <p className="text-white/70">{story.course}</p>
                      <p className="text-white/70">Batch of {story.batch}</p>
                    </div>
                  </div>

                  {/* Career Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-white">
                        {story.position}
                      </h4>
                      <span className="text-white/70">at</span>
                      <h4 className="text-lg font-bold text-white">
                        {story.company}
                      </h4>
                    </div>
                    <p className="text-white/70 line-clamp-2">
                      {story.achievement}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm">
                      Package: {story.package}
                    </span>
                    {story.tags?.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl border-2 border-white/20 overflow-hidden flex-shrink-0">
                    <img
                      src={story.photo}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {story.name}
                    </h3>
                    <p className="text-white/70 text-sm">{story.course}</p>
                    <p className="text-white/70 text-sm">
                      Batch of {story.batch}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-base font-bold text-white">
                      {story.position}
                    </h4>
                    <span className="text-white/70 text-sm">at</span>
                    <h4 className="text-base font-bold text-white">
                      {story.company}
                    </h4>
                  </div>
                  <p className="text-white/70 text-sm line-clamp-2 mt-1">
                    {story.achievement}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                    Package: {story.package}
                  </span>
                  {story.tags?.slice(0, 1).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

const SortingMenu = ({ stories, setStories, originalStories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    course: "All",
    batch: "All",
    package: "All",
  });
  const [isOpen, setIsOpen] = useState({
    course: false,
    batch: false,
    package: false,
  });
  const menuRef = useRef(null);

  // Generate batch options dynamically
  const generateBatchOptions = () => {
    const currentYear = new Date().getFullYear();
    const batchOptions = ["All"];

    // Add last 9 years plus current year
    for (let i = 0; i < 10; i++) {
      batchOptions.push((currentYear - i).toString());
    }
    // Add "Older" option for earlier batches
    batchOptions.push("Older");

    return batchOptions;
  };

  const filterOptions = {
    course: ["All", "B-Tech", "M-Tech"],
    batch: generateBatchOptions(),
    package: ["All", "0-10 LPA", "10-20 LPA", "20+ LPA"],
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    applyFilters(value, selectedFilters);
  };

  const handleFilter = (type, value) => {
    const newFilters = { ...selectedFilters, [type]: value };
    setSelectedFilters(newFilters);
    setIsOpen((prev) => ({ ...prev, [type]: false }));
    applyFilters(searchTerm, newFilters);
  };

  const applyFilters = (search, filters) => {
    let filtered = [...originalStories];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((story) => {
        // Check all available fields
        return (
          // Personal Info
          story.name?.toLowerCase().includes(searchLower) ||
          story.course?.toLowerCase().includes(searchLower) ||
          story.batch?.toLowerCase().includes(searchLower) ||
          // Professional Info
          story.company?.toLowerCase().includes(searchLower) ||
          story.position?.toLowerCase().includes(searchLower) ||
          story.package?.toLowerCase().includes(searchLower) ||
          // Achievements and Story
          story.achievement?.toLowerCase().includes(searchLower) ||
          story.story?.toLowerCase().includes(searchLower) ||
          // Tags
          (story.tags &&
            Array.isArray(story.tags) &&
            story.tags.some((tag) =>
              tag.toLowerCase().includes(searchLower)
            )) ||
          // Date Info (convert to readable format)
          new Date(story.datePosted)
            ?.toLocaleDateString()
            ?.toLowerCase()
            .includes(searchLower) ||
          // Additional Fields
          (story.isFeatured && "featured".includes(searchLower)) ||
          // Last Change Info
          story.lastChange?.firstName?.toLowerCase().includes(searchLower) ||
          story.lastChange?.lastName?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Apply course filter
    if (filters.course !== "All") {
      filtered = filtered.filter((story) => story.course === filters.course);
    }

    // Apply batch filter
    if (filters.batch !== "All") {
      if (filters.batch === "Older") {
        const currentYear = new Date().getFullYear();
        const cutoffYear = currentYear - 10;
        filtered = filtered.filter(
          (story) => parseInt(story.batch) < cutoffYear
        );
      } else {
        filtered = filtered.filter((story) => story.batch === filters.batch);
      }
    }

    // Apply package filter
    if (filters.package !== "All") {
      const [min, max] = filters.package
        .split("-")
        .map((val) => parseInt(val.replace(/[^0-9]/g, "")));
      filtered = filtered.filter((story) => {
        const packageValue = parseInt(story.package.replace(/[^0-9]/g, ""));
        return max
          ? packageValue >= min && packageValue <= max
          : packageValue >= min;
      });
    }

    setStories(filtered);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen({
          course: false,
          batch: false,
          package: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="mb-8">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-center gap-4">
        {/* Search Bar integrated in the row */}
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search success stories..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
          />
          <BiSearchAlt2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 text-xl" />
        </div>

        {/* Filter Buttons */}
        {Object.entries(filterOptions).map(([type, options]) => (
          <div key={type} className="relative">
            <button
              onClick={() =>
                setIsOpen((prev) => ({
                  ...Object.fromEntries(
                    Object.keys(prev).map((k) => [k, false])
                  ),
                  [type]: !prev[type],
                }))
              }
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white hover:bg-white/20 transition-all duration-200"
            >
              {type === "course" && <FaGraduationCap />}
              {type === "batch" && <BsCalendarDate />}
              {type === "package" && <BsCurrencyDollar />}
              <span className="capitalize">
                {type}: {selectedFilters[type]}
              </span>
            </button>

            {isOpen[type] && (
              <div className="absolute top-full left-0 mt-2 w-48 max-h-60 overflow-y-auto rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 shadow-xl z-50 scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilter(type, option)}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-white hover:bg-white/20 transition-all duration-200 ${
                      selectedFilters[type] === option ? "bg-white/20" : ""
                    }`}
                  >
                    <span>{option}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile View - Similar updates for mobile view */}
      <div className="md:hidden space-y-4">
        {/* Search Bar for Mobile */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search success stories..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
          />
          <BiSearchAlt2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 text-xl" />
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {Object.entries(filterOptions).map(([type, options]) => (
            <div key={type} className="relative w-[calc(50%-0.5rem)]">
              <button
                onClick={() =>
                  setIsOpen((prev) => ({
                    ...Object.fromEntries(
                      Object.keys(prev).map((k) => [k, false])
                    ),
                    [type]: !prev[type],
                  }))
                }
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white hover:bg-white/20 transition-all duration-200"
              >
                {type === "course" && <FaGraduationCap />}
                {type === "batch" && <BsCalendarDate />}
                {type === "package" && <BsCurrencyDollar />}
                <span className="capitalize truncate">
                  {type}: {selectedFilters[type]}
                </span>
              </button>

              {isOpen[type] && (
                <div
                  className={`absolute top-full mt-2 w-48 max-h-60 overflow-y-auto py-2 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 shadow-xl z-50 scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30 ${
                    type === "course" ? "left-0" : "right-0"
                  }`}
                >
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

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [originalStories, setOriginalStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSuccessStory();
        setStories(response);
        setOriginalStories(response);
      } catch (error) {
        console.error("Error fetching success stories:", error);
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
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        background: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 60 + 40}%`,
        animation: `pulse ${5 + Math.random() * 5}s ease-in-out infinite`,
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
            Success Stories
          </h1>

          <SortingMenu
            stories={stories}
            originalStories={originalStories}
            setStories={setStories}
          />

          {/* Success Stories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
            {stories
              .filter((story) => story.photo)
              .map((story) => (
                <PlacementCard key={story._id} story={story} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;