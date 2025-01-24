import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createAnnounce } from "../../../../services/operations/announceApi";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";

const CreateAnnounce = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    Highlight: "",
    priority: 1,
    attachments: null,
    category: "",
  });

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.profile);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, attachments: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert("Please fill out the required fields.");
      return;
    }

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("content", formData.content);
    submitData.append("Highlight", formData.Highlight);
    submitData.append("priority", formData.priority);
    submitData.append("category", formData.category);

    if (formData.attachments) {
      submitData.append("attachments", formData.attachments);
    }

    const response = await createAnnounce(formData, token);
    // console.log(response);
    navigate("/dashboard/announce")

  };

  return (
    <div className="min-h-screen bg-black/90 p-4 md:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="animated-blob w-[600px] h-[600px] bg-blue-600/20 -left-[20%] top-[20%]"
          style={{ animationDelay: "0s", filter: "blur(60px)" }} />
        <div className="animated-blob w-[500px] h-[500px] bg-purple-600/20 -right-[10%] top-[40%]"
          style={{ animationDelay: "-5s", filter: "blur(60px)" }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <IconBtn 
          text="Back" 
          onclick={() => navigate("/dashboard/announce")}
          customClasses="w-full sm:w-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
            py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
        />

        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Create Announcement</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Title */}
              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter announcement title"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    focus:outline-none focus:border-purple-500 transition-all duration-300"
                  required
                />
              </div>

              {/* Content */}
              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Enter announcement details"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    focus:outline-none focus:border-purple-500 transition-all duration-300"
                  rows="4"
                  required
                />
              </div>

              {/* Highlight */}
              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Highlight</label>
                <input
                  type="text"
                  name="Highlight"
                  value={formData.Highlight}
                  onChange={handleChange}
                  placeholder="Enter highlights separated by commas"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    focus:outline-none focus:border-purple-500 transition-all duration-300"
                />
              </div>

              {/* Priority */}
              <div className="col-span-1">
                <label className="block mb-2 text-white/70">Priority</label>
                <input
                  type="number"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    focus:outline-none focus:border-purple-500 transition-all duration-300"
                />
              </div>

              {/* Category */}
              <div className="col-span-1">
                <label className="block mb-2 text-white/70">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    focus:outline-none focus:border-purple-500 transition-all duration-300"
                />
              </div>

              {/* Attachments */}
              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Attachment</label>
                <input
                  type="file"
                  name="attachments"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                    file:bg-purple-500/20 file:text-purple-200
                    hover:file:bg-purple-500/30 file:transition-all file:duration-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 
                  rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Create Announcement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnounce;
