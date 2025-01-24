import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAnnounce } from "../services/operations/announceApi";
import { fetchEvents } from "../services/operations/eventApi";
import { fetchOpportunity } from "../services/operations/opportunity";
import { fetchSuccessStory } from "../services/operations/successStoryApi"; 
import Navbar from "../components/common/Navbar";
import {
  FaGraduationCap,
  FaBriefcase,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

// Import placeholder images (add your image paths later)
import placementHeadImage from "../asset/CDCLogo.svg"; // You'll replace this path later
import cdcOfficeImage from "../asset/CDCLogo.svg"; // You'll replace this path later
import cdcTeamImage from "../asset/CDCLogo.svg"; // You'll replace this path later

const StatCard = ({ icon: Icon, title, value }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6
               flex flex-col items-center text-center transform hover:scale-105 transition-all"
  >
    <Icon className="text-4xl mb-4 text-blue-400" />
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      {value}
    </p>
  </motion.div>
);

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch data from all sources
        
        const [announcements, opportunities, events, stories] =
          await Promise.all([
            fetchAnnounce(),
            fetchOpportunity(),
            fetchEvents(),
            fetchSuccessStory(),
          ]);
        
        
        

        // Process and prioritize items
        const processedItems = [
          // Priority announcements (priority 1-2)
          ...(announcements?.filter((a) => a.priority <= 2) || []).map(
            (item) => ({
              type: "announcement",
              priority: item.priority,
              title: item.title,
              content: item.content,
              image: item.attachments,
              date: item.datePosted,
            })
          ),

          // Top opportunities (based on salary range)
          ...(opportunities?.slice(0, 2) || []).map((item) => ({
            type: "opportunity",
            title: item.title,
            content: item.description,
            company: item.company,
            image: null, // Opportunities don't have images
            date: item.applicationDeadline,
          })),

          // Featured events
          ...(events?.slice(0, 2) || []).map((item) => ({
            type: "event",
            title: item.name,
            content: item.description,
            image: item.img,
            date: item.date,
          })),

          // Featured success stories
          ...(stories?.filter((s) => s.isFeatured)?.slice(0, 2) || []).map(
            (item) => ({
              type: "success",
              title: item.name,
              content: item.story,
              image: item.attachments,
              achievement: item.achievement,
            })
          ),
        ];

        setItems(processedItems);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    };

    fetchAllData();
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative w-full max-w-[95%] mx-auto">
      {/* Main Carousel Container */}
      <div className="h-[300px] md:h-[400px] overflow-hidden">
        {/* Desktop Version */}
        <div className="hidden md:block relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full overflow-visible">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                {items[currentIndex] && (
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={{
                      enter: (direction) => ({
                        x: direction > 0 ? 1000 : -1000,
                        opacity: 0,
                      }),
                      center: {
                        zIndex: 1,
                        x: 0,
                        opacity: 1,
                      },
                      exit: (direction) => ({
                        zIndex: 0,
                        x: direction < 0 ? 1000 : -1000,
                        opacity: 0,
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="relative min-w-full px-[5%]"
                  >
                    <div
                      className="relative h-[350px] rounded-2xl overflow-hidden backdrop-blur-xl bg-white/10 border-2 border-white/20
                                transform transition-transform duration-500 hover:scale-[1.02]"
                    >
                      <div className="flex h-full">
                        {/* Image Section */}
                        <div className="w-1/2 relative">
                          {items[currentIndex].image ? (
                            <img
                              src={items[currentIndex].image}
                              alt={items[currentIndex].title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-r from-blue-500/30 to-purple-500/30" />
                          )}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full text-sm bg-white/20 text-white backdrop-blur-sm">
                              {items[currentIndex].type}
                            </span>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-1/2 p-6 flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {items[currentIndex].title}
                            </h3>
                            <p className="text-white/70 line-clamp-4">
                              {items[currentIndex].content}
                            </p>
                          </div>

                          <div className="mt-4">
                            {items[currentIndex].type === "opportunity" && (
                              <p className="text-white/90">
                                Company: {items[currentIndex].company}
                              </p>
                            )}
                            {items[currentIndex].type === "success" && (
                              <p className="text-white/90">
                                Achievement: {items[currentIndex].achievement}
                              </p>
                            )}
                            {items[currentIndex].date && (
                              <p className="text-white/70 text-sm mt-2">
                                {new Date(
                                  items[currentIndex].date
                                ).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
                       flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm
                       flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Version */}
        <div className="md:hidden w-full h-full">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {items[currentIndex] && (
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (direction) => ({
                    x: direction > 0 ? 1000 : -1000,
                    opacity: 0,
                  }),
                  center: {
                    zIndex: 1,
                    x: 0,
                    opacity: 1,
                  },
                  exit: (direction) => ({
                    zIndex: 0,
                    x: direction < 0 ? 1000 : -1000,
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="relative h-full rounded-xl overflow-hidden mx-8"
              >
                <div className="absolute inset-0 backdrop-blur-xl bg-white/10 border-2 border-white/20">
                  <div className="h-full flex flex-col">
                    {/* Image Section */}
                    <div className="relative h-1/2">
                      {items[currentIndex].image ? (
                        <img
                          src={items[currentIndex].image}
                          alt={items[currentIndex].title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-500/30 to-purple-500/30" />
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-sm bg-white/20 text-white backdrop-blur-sm">
                          {items[currentIndex].type}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          {items[currentIndex].title}
                        </h3>
                        <p className="text-white/70 text-xs line-clamp-3">
                          {items[currentIndex].content}
                        </p>
                      </div>

                      <div className="mt-2">
                        {items[currentIndex].type === "opportunity" && (
                          <p className="text-white/90 text-xs">
                            Company: {items[currentIndex].company}
                          </p>
                        )}
                        {items[currentIndex].type === "success" && (
                          <p className="text-white/90 text-xs">
                            Achievement: {items[currentIndex].achievement}
                          </p>
                        )}
                        {items[currentIndex].date && (
                          <p className="text-white/70 text-xs mt-1">
                            {new Date(
                              items[currentIndex].date
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm
                     flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm
                     flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                ? "bg-white w-4"
                : "bg-white/50 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [announcement, setAnnouncement] = useState([]);

  const gradientAnimation = {
    background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
    backgroundSize: "400% 400%",
    animation: "gradient 15s ease infinite",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAnnounce(); // Replace with your actual fetch function
        result.sort((a, b) => a.priority - b.priority);
        setAnnouncement(result);
        console.log("Data from announcement:", result);
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

        {/* Hero Section - Adjusted for mobile */}
        <section className="pt-4 pb-2 px-4 sm:pt-8 sm:pb-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-4 sm:mb-6"
            >
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-2 sm:mb-4">
                Career Development Center
              </h1>
              <p className="text-sm sm:text-base md:text-xl text-white/70 max-w-3xl mx-auto">
                Empowering students at Dr. Babasaheb Ambedkar Technological
                University with career guidance, training, and placement
                opportunities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Carousel Section - Adjusted for mobile */}
        <section className="pt-2 pb-8 px-4 sm:pt-4 sm:pb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4 sm:mb-6">
            Featured Updates
          </h2>
          <Carousel />
        </section>

        {/* Statistics Section */}
        <section className="py-12 px-4 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Our Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={FaGraduationCap}
                title="Students Placed"
                value="500+"
              />
              <StatCard
                icon={BsBuildings}
                title="Partner Companies"
                value="100+"
              />
              <StatCard icon={FaHandshake} title="Campus Drives" value="50+" />
              <StatCard
                icon={FaChartLine}
                title="Average Package"
                value="₹8.5 LPA"
              />
            </div>
          </div>
        </section>

        {/* About CDC Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-white">About CDC</h2>
                <p className="text-white/70">
                  The Career Development Center at DBATU is dedicated to
                  bridging the gap between academia and industry. We provide
                  comprehensive career guidance, skill development programs, and
                  placement assistance to help our students achieve their
                  professional goals.
                </p>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3 text-white/70">
                    <FaBriefcase className="text-blue-400" />
                    <span>Industry-aligned training programs</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/70">
                    <FaHandshake className="text-blue-400" />
                    <span>Strong industry connections</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/70">
                    <FaGraduationCap className="text-blue-400" />
                    <span>Expert career counseling</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative h-[400px] rounded-2xl overflow-hidden"
              >
                {cdcOfficeImage ? (
                  <img
                    src={cdcOfficeImage}
                    alt="CDC Office"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Placement Head Section */}
        <section className="py-12 px-4 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:order-2"
              >
                <div className="relative h-[500px] rounded-2xl overflow-hidden">
                  <img
                    src={placementHeadImage}
                    alt="Placement Head"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:order-1 space-y-6"
              >
                <h2 className="text-3xl font-bold text-white">
                  Message from Placement Head
                </h2>
                <p className="text-white/70">
                  "Our mission at CDC is to prepare students for successful
                  careers by providing them with the necessary skills, guidance,
                  and opportunities. We work tirelessly to create strong
                  industry partnerships and ensure our students are
                  well-equipped for the professional world."
                </p>
                <div className="pt-4">
                  <h3 className="text-xl font-bold text-white">
                    Dr. Neeraj Agarwal
                  </h3>
                  <p className="text-white/70">
                    Head, Career Development Center
                  </p>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="flex items-center space-x-3 text-white/70">
                    <MdEmail className="text-blue-400" />
                    <span>placement@dbatu.ac.in</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/70">
                    <MdPhone className="text-blue-400" />
                    <span>+91 1234567890</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/70">
                    <MdLocationOn className="text-blue-400" />
                    <span>DBATU, Lonere, Maharashtra</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Our Team</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Meet the dedicated team working behind the scenes to ensure
                successful placements and career development of our students.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden"
            >
              <img
                src={cdcTeamImage}
                alt="CDC Team"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;