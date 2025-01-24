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
        const result = await fetchSuccessById({ storyId }, token,navigate);
        console.log("Data to update:", result.data);
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedStory = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert back to an array
      id: storyId, // Include the story ID in the request body
    };

    try {
      const response = await updateSuccessStory(updatedStory, token,navigate);
      console.log("Update response:", response);
      navigate("/dashboard/success-stories")
        

    } catch (error) {
      console.error("Error updating success story:", error.message);
      alert("Failed to update success story.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <IconBtn 
          text="Back" 
          onclick={() => navigate("/dashboard/success-stories")}
          customClasses="w-full sm:w-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
            py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
      />
      
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Success Story</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="input-field border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Course"
            className="input-field border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            placeholder="Batch"
            className="input-field border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="input-field border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="package"
            value={formData.package}
            onChange={handleChange}
            placeholder="Package (e.g., 36 LPA)"
            className="input-field border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="Photo URL"
            className="input-field border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="story"
            value={formData.story}
            onChange={handleChange}
            placeholder="Success Story"
            className="textarea-field border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma-separated)"
            className="input-field border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Featured Story</span>
          </label>
          <button type="submit" className="btn-primary bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-200">
            Update Story
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSuccessStory;
