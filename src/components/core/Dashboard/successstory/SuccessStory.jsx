import React, { useState } from "react";
import { addSuccessStory } from "../../../../services/operations/successStoryApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";

const SuccessStoryForm = ({
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      encType="multipart/form-data"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Name */}
        <div className="w-full">
          <label className="block mb-2 text-white/70">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            onChange={handleInputChange}
            className="w-full px-4 py-3 lg:py-2 rounded-lg bg-white/5 border border-white/10 text-white
              focus:outline-none focus:border-purple-500 transition-all duration-300
              text-sm lg:text-base"
            required
          />
        </div>

        {/* Course */}
        <div className="w-full">
          <label className="block mb-2 text-white/70">
            Course<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="course"
            placeholder="Enter your course name"
            onChange={handleInputChange}
            className="w-full px-4 py-3 lg:py-2 rounded-lg bg-white/5 border border-white/10 text-white
              focus:outline-none focus:border-purple-500 transition-all duration-300
              text-sm lg:text-base"
            required
          />
        </div>

        {/* Batch */}
        <div className="w-full">
          <label className="block mb-2 text-white/70">Batch</label>
          <input
            type="text"
            name="batch"
            placeholder="Enter your batch (e.g., 2023-24)"
            onChange={handleInputChange}
            className="w-full px-4 py-3 lg:py-2 rounded-lg bg-white/5 border border-white/10 text-white
              focus:outline-none focus:border-purple-500 transition-all duration-300
              text-sm lg:text-base"
          />
        </div>

        {/* Company */}
        <div className="w-full">
          <label className="block mb-2 text-white/70">Company</label>
          <input
            type="text"
            name="company"
            placeholder="Enter company name"
            onChange={handleInputChange}
            className="w-full px-4 py-3 lg:py-2 rounded-lg bg-white/5 border border-white/10 text-white
              focus:outline-none focus:border-purple-500 transition-all duration-300
              text-sm lg:text-base"
          />
        </div>

        {/* Position */}
        <div className="w-full">
          <label className="block mb-2 text-white/70">Position</label>
          <input
            type="text"
            name="position"
            placeholder="Enter your job position"
            onChange={handleInputChange}
            className="w-full px-4 py-3 lg:py-2 rounded-lg bg-white/5 border border-white/10 text-white
              focus:outline-none focus:border-purple-500 transition-all duration-300
              text-sm lg:text-base"
          />
        </div>

        {/* Package */}
        <div className="w-full">
          <label className="block mb-2 text-white/70">Package</label>
          <input
            type="text"
            name="package"
            placeholder="Enter package (e.g., 12 LPA)"
            onChange={handleInputChange}
            className="w-full px-4 py-3 lg:py-2 rounded-lg bg-white/5 border border-white/10 text-white
              focus:outline-none focus:border-purple-500 transition-all duration-300
              text-sm lg:text-base"
          />
        </div>

        {/* Achievement - Full width on both mobile and desktop */}
        <div className="col-span-1 lg:col-span-2">
          <label className="block mb-2 text-white/70">
            Achievement<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="achievement"
            placeholder="Enter your key achievement"
            onChange={handleInputChange}
            className="w-full px-4 py-3 lg:py-2 rounded-lg bg-white/5 border border-white/10 text-white
              focus:outline-none focus:border-purple-500 transition-all duration-300
              text-sm lg:text-base"
            required
          />
        </div>

        {/* Success Story - Full width on both mobile and desktop */}
        <div className="col-span-1 lg:col-span-2">
          <label className="block mb-2 text-white/70">
            Success Story<span className="text-red-500">*</span>
          </label>
          <textarea
            name="story"
            placeholder="Share your success story..."
            onChange={handleInputChange}
            className="w-full px-4 py-3 lg:py-2 rounded-lg bg-white/5 border border-white/10 text-white
              focus:outline-none focus:border-purple-500 transition-all duration-300
              text-sm lg:text-base"
            required
            rows="4"
          />
        </div>

        {/* Tags */}
        <div className="w-full">
          <label className="block mb-2 text-white/70">Tags</label>
          <input
            type="text"
            name="tags"
            placeholder="Enter tags separated by commas"
            onChange={handleInputChange}
            className="w-full px-4 py-3 lg:py-2 rounded-lg bg-white/5 border border-white/10 text-white
              focus:outline-none focus:border-purple-500 transition-all duration-300
              text-sm lg:text-base"
          />
        </div>

        {/* Featured */}
        <div className="w-full">
          <label className="block mb-2 text-white/70">Featured</label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleInputChange({
                  target: {
                    name: "isFeatured",
                    type: "checkbox",
                    checked: !formData.isFeatured,
                  },
                });
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black
                ${formData.isFeatured ? "bg-purple-500" : "bg-white/10"}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out
                  ${formData.isFeatured ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
            <span className="ml-3 text-sm text-white/70">
              {formData.isFeatured ? "Featured" : "Not Featured"}
            </span>
          </div>
        </div>

        {/* File Input - Full width on both mobile and desktop */}
        <div className="col-span-1 lg:col-span-2">
          <label className="block mb-2 text-white/70">Photo (Optional)</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-3 lg:py-2 rounded-lg bg-white/5 border border-white/10 text-white
              file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
              file:bg-purple-500/20 file:text-purple-200
              hover:file:bg-purple-500/30 file:transition-all file:duration-300
              text-sm lg:text-base"
            accept="image/*"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
            py-4 lg:py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 
            transition-all duration-300 text-sm lg:text-base"
        >
          Create Success Story
        </button>
      </div>
    </form>
  );
};

const SuccessStory = () => {
  const [formData, setFormData] = useState({
    isFeatured: false,
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.profile);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();

    // Append all form data
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        submissionData.append(key, formData[key]);
      }
    });

    if (file) {
      submissionData.append("attachments", file);
    }

    const response = await addSuccessStory(submissionData, token);
    // console.log(response);
    navigate("/dashboard/success-stories")

  };

  return (
    <div className="min-h-screen bg-black/90 p-4 md:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="animated-blob w-[600px] h-[600px] bg-blue-600/20 -left-[20%] top-[20%]"
          style={{ animationDelay: "0s", filter: "blur(60px)" }}
        />
        <div
          className="animated-blob w-[500px] h-[500px] bg-purple-600/20 -right-[10%] top-[40%]"
          style={{ animationDelay: "-5s", filter: "blur(60px)" }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <IconBtn
          text="Back"
          onclick={() => navigate("/dashboard/success-stories")}
          customClasses="w-full sm:w-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
            py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
        />

        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
            Create Success Story
          </h2>

          <SuccessStoryForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessStory;