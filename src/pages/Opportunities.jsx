import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/common/Navbar";
import { fetchOpportunity } from "../services/operations/opportunity";
import IconBtn from "../components/common/IconBtn";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BiSortAlt2, BiSearchAlt2 } from "react-icons/bi";
import { BsCalendarDate, BsCurrencyDollar, BsBriefcase } from "react-icons/bs";
import { FaBuilding } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { MdWorkspacesFilled } from "react-icons/md";

const JobCard = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const navigate = useNavigate();
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
        {/* Expanded Job Card */}
        {isExpanded && !showApplicationForm && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsExpanded(false);
              }
            }}
          >
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
              >
                <div className="p-4 sm:p-8 h-full">
                  <div className="flex flex-col h-full">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex gap-8 h-[70vh]">
                      {/* Left Side - Thumbnail */}
                      <div className="w-1/3 flex items-center">
                        <div className="w-full h-64 rounded-2xl border-2 border-white/20 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500" />
                      </div>

                      {/* Right Side - Details */}
                      <div className="w-2/3 flex flex-col h-full">
                        {/* Header - Fixed at top */}
                        <div className="sticky top-0 p-3">
                          <h3 className="text-3xl font-bold text-white mb-2">
                            {job.title}
                          </h3>
                          <p className="text-xl text-white/70">{job.company}</p>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {job.tags?.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <h4 className="text-lg font-semibold text-white">
                                Description
                              </h4>
                              <p className="text-white/70">{job.description}</p>
                            </div>

                            <div className="space-y-2">
                              <h4 className="text-lg font-semibold text-white">
                                Qualifications
                              </h4>
                              <p className="text-white/70">
                                {job.qualification}
                              </p>
                            </div>

                            {/* 2x3 Grid for Job Details */}
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <h4 className="font-semibold text-white">
                                  Location
                                </h4>
                                <p className="text-white/70">{job.location}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-white">
                                  Job Type
                                </h4>
                                <p className="text-white/70">{job.jobType}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-white">
                                  Salary
                                </h4>
                                <p className="text-white/70">{job.salary}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-white">
                                  Application Deadline
                                </h4>
                                <p className="text-white/70">
                                  {new Date(
                                    job.applicationDeadline
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-white">
                                  Last Date to Apply
                                </h4>
                                <p className="text-white/70">
                                  {new Date(
                                    job.lastDateToApply
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-white">
                                  Contact Email
                                </h4>
                                <p className="text-white/70">
                                  {job.contactEmail}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-white">
                                  Eligible Branches
                                </h4>
                                <p className="text-white/70">
                                  {job.eligibleBranches}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-white">
                                  Eligible Years
                                </h4>
                                <p className="text-white/70">
                                  Year: {job.eligibleYears}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Footer - Fixed at bottom */}
                        <div className="sticky bottom-0 p-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(job.applyLink, "_blank");
                            }}
                            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform"
                          >
                            Apply Now
                          </button>
                          <div className="text-sm text-white/50 text-center mt-4">
                            Posted on:{" "}
                            {new Date(job.postedOn).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden h-full flex flex-col max-h-[70vh] w-[90%] mx-auto">
                      {/* Header - Fixed at top */}
                      <div className="sticky top-0 p-3">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {job.title}
                        </h3>
                        <p className="text-lg text-white/70">{job.company}</p>
                      </div>

                      {/* Scrollable Content */}
                      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {job.tags?.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Thumbnail */}
                        <div className="w-full aspect-video rounded-2xl border-2 border-white/20 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500" />

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-white">
                            Description
                          </h4>
                          <p className="text-white/70 text-sm">
                            {job.description}
                          </p>
                          <h4 className="text-lg font-semibold text-white">
                            Qualifications
                          </h4>
                          <p className="text-white/70">{job.qualification}</p>
                          <h4 className="text-lg font-semibold text-white">
                            Location
                          </h4>
                          <p className="text-white/70">{job.location}</p>
                          <h4 className="text-lg font-semibold text-white">
                            Salary
                          </h4>
                          <p className="text-white/70">{job.salary}</p>
                          <h4 className="text-lg font-semibold text-white">
                            Application Deadline
                          </h4>
                          <p className="text-white/70">
                            {new Date(
                              job.applicationDeadline
                            ).toLocaleDateString()}
                          </p>
                          <h4 className="text-lg font-semibold text-white">
                            Contact Email
                          </h4>
                          <p className="text-white/70">{job.contactEmail}</p>
                          <h4 className="text-lg font-semibold text-white">
                            Eligible Branches
                          </h4>
                          <p className="text-white/70">
                            {job.eligibleBranches}
                          </p>
                          <h4 className="text-lg font-semibold text-white">
                            Eligible Years
                          </h4>
                          <p className="text-white/70">
                            Year: {job.eligibleYears}
                          </p>
                        </div>
                      </div>

                      {/* Footer - Fixed at bottom */}
                      <div className="sticky bottom-0 p-3">
                        <div className="flex justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(job.applyLink, "_blank");
                            }}
                            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform"
                          >
                            Apply Now
                          </button>
                        </div>
                        <div className="text-xs text-white/50 text-center mt-2">
                          Posted on:{" "}
                          {new Date(job.postedOn).toLocaleDateString()}
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
                  {/* Company Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg border-2 border-white/20 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-white truncate">
                        {job.company}
                      </h3>
                      <p className="text-white/70 text-sm">{job.location}</p>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">
                      {job.title}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  {/* Add tags */}
                  <div className="flex flex-wrap gap-2">
                    {job.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                      {job.jobType}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                      {job.salary}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(job.applyLink, "_blank"); // Opens the link in a new tab
                      }}
                      className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold hover:scale-105 transition-transform"
                    >
                      Quick Apply
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(true);
                      }}
                      className="flex-1 py-2 px-3 rounded-lg border-2 border-white/20 text-white text-sm font-semibold hover:scale-105 transition-transform"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Collapsed Card - Mobile Layout */}
              <div className="md:hidden space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg border-2 border-white/20 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {job.title}
                    </h3>
                    <p className="text-white/70">{job.company}</p>
                    <p className="text-white/70 text-sm">{job.location}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-white/70 line-clamp-2">
                    {job.description}
                  </p>
                  {/* Single tags section */}
                  <div className="flex flex-wrap gap-2">
                    {job.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                      {job.jobType}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-white/10 text-white/70 text-xs">
                      {job.salary}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(job.applyLink, "_blank");
                    }}
                    className="flex-1 py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold"
                  >
                    Quick Apply
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(true);
                    }}
                    className="flex-1 py-2 px-4 rounded-lg border-2 border-white/20 text-white text-sm font-semibold"
                  >
                    View Details
                  </button>
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
  opportunities,
  setOpportunities,
  originalOpportunities,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    jobType: "All",
    salary: "All",
    branch: "All",
    year: "All",
  });
  const [isOpen, setIsOpen] = useState({
    jobType: false,
    salary: false,
    branch: false,
    year: false,
  });
  const menuRef = useRef(null);

  const filterOptions = {
    jobType: [
      "All",
      "Full-Time",
      "Part-Time",
      "Internship",
      "Temporary",
      "Contract",
    ],
    salary: ["All", "0-5000", "5000-10000", "10000+"],
    branch: [
      "All",
      "IT",
      "CSE",
      "CE",
      "EXTC",
      "VLSI",
      "CHEMICAL",
      "PETRO-CHEMICAL",
      "Mechanical",
      "Civil",
    ],
    year: ["All", "2nd", "3rd", "4th"],
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
    let filtered = [...originalOpportunities];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (opp) =>
          opp.title?.toLowerCase().includes(searchLower) ||
          opp.company?.toLowerCase().includes(searchLower) ||
          opp.location?.toLowerCase().includes(searchLower) ||
          opp.jobType?.toLowerCase().includes(searchLower) ||
          opp.contactEmail?.toLowerCase().includes(searchLower) ||
          (opp.eligibleBranch &&
            opp.eligibleBranch.some((branch) =>
              branch.toLowerCase().includes(searchLower)
            )) ||
          (opp.eligibleYear &&
            opp.eligibleYear.some((year) =>
              year.toLowerCase().includes(searchLower)
            )) ||
          (opp.tags &&
            opp.tags.some((tag) => tag.toLowerCase().includes(searchLower))) ||
          (opp.salaryRange &&
            (
              `${opp.salaryRange.min}-${opp.salaryRange.max}`.includes(searchLower) ||
              `${opp.salaryRange.min}`.includes(searchLower) ||
              `${opp.salaryRange.max}`.includes(searchLower)
            ))
      );
    }
    

    // Apply job type filter
    if (filters.jobType !== "All") {
      filtered = filtered.filter((opp) => opp.jobType === filters.jobType);
    }

    // Apply salary filter
    if (filters.salary !== "All") {
      const [min, max] = filters.salary.split("-").map(Number);
      filtered = filtered.filter((opp) => {
        const salary = opp.salaryRange?.max || 0;
        return salary >= min && (max ? salary <= max : true);
      });
    }

    // Apply branch filter
    if (filters.branch !== "All") {
      filtered = filtered.filter((opp) =>
        opp.eligibleBranch?.includes(filters.branch)
      );
    }

    // Apply year filter
    if (filters.year !== "All") {
      filtered = filtered.filter((opp) =>
        opp.eligibleYear?.includes(filters.year)
      );
    }

    setOpportunities(filtered);
  };

  // Enhanced click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen({
          jobType: false,
          salary: false,
          branch: false,
          year: false,
        });
      }
    };

    // Add event listener to both mousedown and touchstart for mobile support
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
            placeholder="Search opportunities..."
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
              {type === "jobType" && <BsBriefcase />}
              {type === "salary" && <BsCurrencyDollar />}
              {type === "branch" && <MdWorkspacesFilled />}
              {type === "year" && <BsCalendarDate />}
              <span className="capitalize">
                {type.replace(/([A-Z])/g, " $1").trim()}:{" "}
                {selectedFilters[type]}
              </span>
            </button>

            {isOpen[type] && (
              <div className="absolute top-full left-0 mt-2 w-48 py-2 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 shadow-xl z-50">
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

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {/* Search Bar for Mobile */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
          />
          <BiSearchAlt2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 text-xl" />
        </div>

        {/* Filter Buttons for Mobile */}
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
                {type === "jobType" && <BsBriefcase />}
                {type === "salary" && <BsCurrencyDollar />}
                {type === "branch" && <MdWorkspacesFilled />}
                {type === "year" && <BsCalendarDate />}
                <span className="capitalize truncate">
                  {type.replace(/([A-Z])/g, " $1").trim()}:{" "}
                  {selectedFilters[type]}
                </span>
              </button>

              {isOpen[type] && (
                <div
                  className={`absolute top-full mt-2 w-48 py-2 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 shadow-xl z-50 ${
                    type === "jobType"
                      ? "left-0"
                      : type === "salary"
                      ? "right-0"
                      : type === "branch"
                      ? "left-0"
                      : "right-0" // for year
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

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [originalOpportunities, setOriginalOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchOpportunity();
        setOpportunities(response || []);
        setOriginalOpportunities(response || []);
      } catch (err) {
        setError("Failed to fetch opportunities. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
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
            Opportunities
          </h1>

          {/* Add SortingMenu component */}
          <SortingMenu
            opportunities={opportunities}
            originalOpportunities={originalOpportunities}
            setOpportunities={setOpportunities}
          />

          {/* Loading Spinner */}
          {loading && (
            <div className="text-center text-white text-lg">Loading...</div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-center text-red-500 text-lg">{error}</div>
          )}

          {/* Updated Grid Layout */}
          {!loading && !error && opportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {opportunities.map((opportunity) => (
                <JobCard
                  key={opportunity._id}
                  job={{
                    title: opportunity.title || "Untitled Opportunity",
                    applyLink: opportunity.applyLink || "Not specified",
                    company: opportunity.company || "Not specified",
                    description: opportunity.description || "",
                    qualification: opportunity.qualification || "",
                    location: opportunity.location || "Not specified",
                    jobType: opportunity.jobType || "Not specified",
                    salary: `${opportunity.salaryRange?.min ?? "N/A"} - ${
                      opportunity.salaryRange?.max ?? "N/A"
                    }`,
                    applicationDeadline: opportunity.applicationDeadline,
                    postedOn: opportunity.createdAt,
                    email: opportunity.email || "Not specified",
                    eligibleBranches:
                      opportunity.eligibleBranch?.join(", ") || "Not Specified",
                    eligibleYears:
                      opportunity.eligibleYear?.join(", ") || "Not Specified",
                    isUrgent: opportunity.isUrgent || false,
                    tags: opportunity.tags || [],
                    lastDateToApply: opportunity.lastDateToApply || "",
                    contactEmail: opportunity.contactEmail || "Not specified",
                  }}
                />
              ))}
            </div>
          ) : (
            // No Opportunities Found
            !loading &&
            !error && (
              <div className="text-center text-white text-lg">
                No opportunities available.
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Opportunities;