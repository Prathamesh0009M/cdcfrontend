import React, { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import { fetchAnnounce } from "../services/operations/announceApi";

const Blogs = () => {
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
        <div className="max-w-6xl mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            Announcements
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcement.map((item) => (
              <div
                key={item._id}
                className="bg-richblack-700 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-xl relative"
              >
                {/* Attachments */}
                {item.attachments && item.attachments.trim() !== "" && (
                  <div className="mb-4">
                    <div className="relative w-full h-56 bg-gray-200 rounded-md overflow-hidden">
                      <img
                        src={item.attachments}
                        alt="Attachment"
                        className="w-full h-full object-cover"
                        style={{
                          objectFit: "contain", // Ensures vertical images fit
                        }}
                      />
                    </div>
                  </div>
                )}
                {/* Title */}
                <h2 className="text-xl font-semibold mb-2 text-richblack-5">
                  {item.title}
                </h2>
                {/* Content */}
                <p className="text-richblack-50 mb-4">{item.content}</p>
                {/* Highlights */}
                {item.Highlight && item.Highlight.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(() => {
                      try {
                        // Check if Highlight is a string and parse it
                        const highlightsArray = typeof item.Highlight === "string"
                          ? JSON.parse(item.Highlight)
                          : item.Highlight;
                        
                        return highlightsArray.map((highlight, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-sm font-medium py-1 px-3 rounded-full"
                          >
                            {highlight}
                          </span>
                        ));
                      } catch (error) {
                        console.error("Error parsing highlight:", error);
                        return <span>Invalid highlight data</span>;
                      }
                    })()}
                  </div>
                )}
                {/* Category and Date */}
                <div className="text-sm text-richblack-5">
                  <span className="block mb-1">Category: {item.category}</span>
                  <span>
                    Posted on:{" "}
                    {new Date(item.datePosted).toLocaleDateString("en-US")}
                  </span>
                </div>
                {/* Priority */}
                <div
                  className={`absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full ${
                    item.priority === 1
                      ? "bg-red-500"
                      : item.priority === 2
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  Priority: {item.priority}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
