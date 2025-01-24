import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSuccessById, updateSuccessStory } from "../../../../services/operations/successStoryApi";
import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";

const EditSuccessStory = () => {
  const { storyId } = useParams();
  const { token } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    batch: "",
    company: "",
    package: "",
    photo: "",
    story: "",
    tags: "",
    isFeatured: false,
  });

  // Fetch story data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSuccessById({ storyId }, token, navigate);
        setFormData({
          ...result.data,
          tags: result.data.tags.join(", "), // Convert tags array to a comma-separated string
        });
      } catch (error) {
        console.error("Error fetching story data:", error.message);
      }
    };
    fetchData();
  }, [storyId, token]);

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedStory = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert back to an array
      id: storyId, // Include the story ID in the request body
    };

    try {
      await updateSuccessStory(updatedStory, token, navigate);
      navigate("/dashboard/success-stories");
    } catch (error) {
      console.error("Error updating success story:", error.message);
      alert("Failed to update success story.");
    }
  };

  return (
    <div className="min-h-screen bg-black/90 p-4 md:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="animated-blob w-[600px] h-[600px] bg-blue-600/20 -left-[20%] top-[20%]" />
        <div className="animated-blob w-[500px] h-[500px] bg-purple-600/20 -right-[10%] top-[40%]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto pl-0 md:pl-0">
        {/* Back Button */}
        <IconBtn
          text="Back"
          customClasses="w-full sm:w-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
            py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          onclick={() => navigate("/dashboard/success-stories")}
        />

        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Edit Success Story</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="col-span-2">
              <label className="block mb-2 text-white/70">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300"
                required
              />
            </div>

            {/* Course */}
            <div className="col-span-2">
              <label className="block mb-2 text-white/70">Course *</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300"
                required
              />
            </div>

            {/* Batch */}
            <div className="col-span-2">
              <label className="block mb-2 text-white/70">Batch *</label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300"
                required
              />
            </div>

            {/* Company */}
            <div className="col-span-2">
              <label className="block mb-2 text-white/70">Company *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300"
                required
              />
            </div>

            {/* Package */}
            <div className="col-span-2">
              <label className="block mb-2 text-white/70">Package *</label>
              <input
                type="text"
                name="package"
                value={formData.package}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300"
                required
              />
            </div>

            {/* Photo */}
            <div className="col-span-2">
              <label className="block mb-2 text-white/70">Photo URL *</label>
              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300"
                required
              />
            </div>

            {/* Story */}
            <div className="col-span-2">
              <label className="block mb-2 text-white/70">Success Story *</label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300"
                required
              />
            </div>

            {/* Tags */}
            <div className="col-span-2">
              <label className="block mb-2 text-white/70">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                          focus:outline-none focus:border-purple-500 transition-all duration-300"
              />
            </div>

            {/* Featured Story */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label className="text-white/70">Featured Story</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white
                        hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Update Story
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSuccessStory;
