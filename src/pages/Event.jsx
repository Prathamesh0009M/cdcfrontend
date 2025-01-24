import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/common/Navbar";
import { fetchEvents } from "../services/operations/eventApi";
import { BiSearchAlt2 } from "react-icons/bi";

const EventCard = ({ event, isExpanded, onClick, onClose }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, onClose]);

  return (
    <>
      {/* Add overlay when card is expanded */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
      )}
      <div
        ref={cardRef}
        onClick={onClick}
        className={`rounded-2xl p-4 cursor-pointer ${
          isExpanded
            ? "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] md:w-[80%] max-w-4xl backdrop-blur-xl bg-white/10 border-2 border-white/20"
            : "hover:bg-white/10 bg-white/5 w-full"
        }`}
      >
        {isExpanded ? (
          <>
            {/* Mobile Layout */}
            <div className="md:hidden h-full flex flex-col max-h-[80vh] w-[90%] mx-auto">
              {/* Header - Fixed at top */}
              <div className="sticky top-0 p-3 z-10">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {event.name}
                </h3>
                <p className="text-lg text-white/70">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 pb-16">
                {/* Event Image */}
                <div className="w-full aspect-video rounded-xl overflow-hidden">
                  <img
                    src={event.img}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">
                    Description
                  </h4>
                  <p className="text-white/70 text-sm line-clamp-4">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Footer - Fixed at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add registration logic here
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform"
                >
                  Register Now
                </button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex gap-6 h-[60vh]">
              {/* Left Side - Event Image */}
              <div className="w-1/3 flex items-start pt-8">
                <div className="w-full aspect-video rounded-xl overflow-hidden">
                  <img
                    src={event.img}
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Side - Details */}
              <div className="w-2/3 flex flex-col h-full">
                {/* Header - Fixed at top */}
                <div className="sticky top-0 p-2">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {event.name}
                  </h3>
                  <p className="text-lg text-white/70">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
                  <div className="space-y-3">
                    <h4 className="text-base font-semibold text-white">
                      Description
                    </h4>
                    <p className="text-white/70 text-sm line-clamp-6">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Footer - Fixed at bottom */}
                <div className="sticky bottom-0 p-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add registration logic here
                    }}
                    className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Collapsed Card View - Made Smaller
          <div className="space-y-2">
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <img
                src={event.img}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-1">
              <h3 className="text-base font-bold text-white mb-0.5">
                {event.name}
              </h3>
              <p className="text-xs text-white/70 mb-0.5">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-xs text-white/50 line-clamp-2">
                {event.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const SortingMenu = ({ events, setEvents, originalEvents }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const menuRef = useRef(null);

  const handleSearch = (value) => {
    setSearchTerm(value);

    // If search is empty, restore original events
    if (!value.trim()) {
      setEvents(originalEvents);
      return;
    }

    // Apply filters on original events
    const searchLower = value.toLowerCase();
    const filtered = originalEvents.filter(
      (event) =>
        // Event Name
        event.name?.toLowerCase().includes(searchLower) ||
        // Location
        event.location?.toLowerCase().includes(searchLower) ||
        // Date
        event.date?.toLowerCase().includes(searchLower) ||
        // Time
        event.time?.toLowerCase().includes(searchLower) ||
        // Tags (handle array)
        (event.tags &&
          Array.isArray(event.tags) &&
          event.tags.some((tag) => tag.toLowerCase().includes(searchLower))) ||
        // Featured status
        (event.isFeatured && "featured".includes(searchLower)) ||
        // Registration status
        (event.registrationRequired &&
          "registration required".includes(searchLower)) ||
        // Last Change Info
        event.lastChange?.firstName?.toLowerCase().includes(searchLower) ||
        event.lastChange?.lastName?.toLowerCase().includes(searchLower) ||
        // Created Date
        new Date(event.createdAt)
          ?.toLocaleDateString()
          ?.toLowerCase()
          .includes(searchLower)
    );

    setEvents(filtered);
  };

  return (
    <div ref={menuRef} className="mb-8">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-center">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-xl bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
          />
          <BiSearchAlt2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 text-xl" />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search events..."
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

const Event = () => {
  const gradientAnimation = {
    background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
    backgroundSize: "400% 400%",
    animation: "gradient 15s ease infinite",
  };

  const [events, setEvents] = useState([]);
  const [originalEvents, setOriginalEvents] = useState([]);
  const [expandedEventId, setExpandedEventId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEvents();
        setEvents(response);
        setOriginalEvents(response);
        console.log("Events fetched:", response);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
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
                height:` ${Math.random() * 2 + 1}px`,
                background: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60 + 40}%`,
                animation: `pulse ${
                  5 + Math.random() * 5
                }s ease-in-out infinite`,
                animationDelay:` ${Math.random() * 5}s`,
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
            Events
          </h1>

          <SortingMenu
            events={events}
            originalEvents={originalEvents}
            setEvents={setEvents}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {events
              .filter((event) => event.img)
              .map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  isExpanded={expandedEventId === event._id}
                  onClick={() =>
                    setExpandedEventId(
                      expandedEventId === event._id ? null : event._id
                    )
                  }
                  onClose={() => setExpandedEventId(null)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;