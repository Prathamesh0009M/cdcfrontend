import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchEventById, updateEventById } from "../../../../services/operations/eventApi";
import IconBtn from "../../../common/IconBtn"
const EditEvent = () => {
  const { eventId } = useParams();
  const { token } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [file, setFile] = useState(null); // To handle file attachments

  // Fetch event details on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchEventById({ eventId }, token, navigate);
        setOriginalData(result.data);
        setFormData(result.data);
      } catch (error) {
        console.error("Error fetching event data:", error.message);
      }
    };
    fetchData();
  }, [eventId, token]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file changes
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = new FormData();
    requestData.append("eventId", eventId); // Use eventId from URL params
    requestData.append("name", formData.name || ""); // Ensure default values
    requestData.append("description", formData.description || "");
    requestData.append("date", formData.date || "");
    requestData.append("time", formData.time || "");
    requestData.append("location", formData.location || "");
    requestData.append("eventType", formData.eventType || "");
    requestData.append(
      "registrationRequired",
      formData.registrationRequired === "true"

    );
    requestData.append("isFeatured", formData.isFeatured === "true");

    if (file) {
      requestData.append("attachment", file); // Add file if selected
    }

    try {
      const response = await updateEventById(requestData, token,navigate);
      console.log("ddddddddddddddd", response);

      // if (response.success) {
      //   alert("Event updated successfully!");
      // } else {
      //   alert(response.message || "Failed to update event.");
      // }
    } catch (error) {
      console.error("Error updating event:", error.message);
    }
  };
  const navigate = useNavigate();

  if (!Object.keys(originalData).length) {
    return (
      <div className="min-h-screen bg-black/90 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/90 p-4 md:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="animated-blob w-[600px] h-[600px] bg-blue-600/20 -left-[20%] top-[20%]"
          style={{ animationDelay: "0s", filter: "blur(60px)" }} />
        <div className="animated-blob w-[500px] h-[500px] bg-purple-600/20 -right-[10%] top-[40%]"
          style={{ animationDelay: "-5s", filter: "blur(60px)" }} />
      </div>

      {/* Content Container - Added responsive padding */}
      <div className="relative z-10 max-w-4xl mx-auto pl-0 md:pl-0">
        {/* Back Button - Made responsive */}
        <IconBtn
          text="Back"
          customClasses="w-full sm:w-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
            py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          onclick={() => navigate("/dashboard/Events")}
        />

        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Edit Event</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Name */}
              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Event Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300"
                  required
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Description *</label>
                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300"
                  required
                />
              </div>

              {/* Date and Time */}
              <div>
                <label className="block mb-2 text-white/70">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300
                          [color-scheme:dark]"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-white/70">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300
                          [color-scheme:dark]"
                />
              </div>

              {/* Location and Type */}
              <div>
                <label className="block mb-2 text-white/70">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-white/70">Event Type</label>
                <select
                  name="eventType"
                  value={formData.eventType || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300
                          appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCA2TDggMTBMMTIgNiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=')] 
                          bg-no-repeat bg-[center_right_1rem]"
                >
                  <option value="" className="bg-gray-900">Select Type</option>
                  <option value="Workshop" className="bg-gray-900">Workshop</option>
                  <option value="Webinar" className="bg-gray-900">Webinar</option>
                  <option value="Networking" className="bg-gray-900">Networking</option>
                  <option value="Interview" className="bg-gray-900">Interview</option>
                </select>
              </div>

              {/* Tags and Attachments */}
              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300"
                />
              </div>

              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Attachment</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300
                          file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                          file:text-sm file:font-semibold file:bg-purple-500/20
                          file:text-purple-200 hover:file:bg-purple-500/30"
                />
              </div>

              {/* Checkboxes */}
              <div>
                <label className="flex items-center space-x-2 text-white/70">
                  <input
                    type="checkbox"
                    name="registrationRequired"
                    checked={formData.registrationRequired === "true"}
                    onChange={handleChange}
                    className="form-checkbox rounded text-purple-500 focus:ring-purple-500
                              bg-white/5 border-white/10"
                  />
                  <span>Registration Required</span>
                </label>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-white/70">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured === "true"}
                    onChange={handleChange}
                    className="form-checkbox rounded text-purple-500 focus:ring-purple-500
                              bg-white/5 border-white/10"
                  />
                  <span>Featured Event</span>
                </label>
              </div>
            </div>

            {/* Submit Button - Made responsive */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg
                  hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Update Event
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/Events")}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white
                  hover:bg-white/10 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
