import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import { contactus } from "../services/operations/authApi";
import toast from "react-hot-toast";
const About = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    yearBranch: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      console.log("formdata", formData);
      const result = await contactus(formData);
      // console.log(result);
      // if(!result.data.success)
      // {
      //   toast.error("could not Submit form");
      // }
      setModalOpen(false);

    
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const gradientAnimation = {
    background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
    backgroundSize: "400% 400%",
    animation: "gradient 15s ease infinite",
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
       <div className="relative z-20">
        <Navbar />

        {/* Main Content Container */}
        <div className="container mx-auto px-4 pt-24 pb-12">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300">
                CDC DBATU
              </span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Empowering careers, bridging dreams, and fostering excellence.
            </p>
          </div>

          {/* Info Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Vision Card */}
            <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 shadow-xl hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Our Vision
              </h3>
              <p className="text-white/80">
                To be the premier facilitator of career opportunities and
                professional growth for our students.
              </p>
            </div>

            {/* Mission Card */}
            <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 shadow-xl hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-white/80">
                Creating pathways to success through industry connections, skill
                development, and personalized guidance.
              </p>
            </div>

            {/* Values Card */}
            <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 shadow-xl hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Our Values
              </h3>
              <p className="text-white/80">
                Excellence, integrity, innovation, and student-centric approach
                in all our endeavors.
              </p>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="backdrop-blur-lg bg-white/10 p-12 rounded-3xl border border-white/20 shadow-xl mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">50+</div>
                <div className="text-white/80">Companies</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">95%</div>
                <div className="text-white/80">Placement Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">5LPA+</div>
                <div className="text-white/80">Highest Package</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">1000+</div>
                <div className="text-white/80">Students Placed</div>
              </div>
            </div>
          </div>

           {/* Contact Section */}
           <div className="max-w-2xl mx-auto text-center backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-white/80 mb-6">
              Have questions? We're here to help guide you through your career journey.
            </p>
            <button
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-full font-semibold hover:opacity-90 transition-opacity duration-300"
              onClick={() => setModalOpen(true)}
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Contact Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="yearBranch">
                    Year-Branch (Optional)
                  </label>
                  <input
                    type="text"
                    id="yearBranch"
                    name="yearBranch"
                    value={formData.yearBranch}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
