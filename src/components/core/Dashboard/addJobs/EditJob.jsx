import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchJbById, updateJob } from "../../../../services/operations/opportunity";
import IconBtn from "../../../common/IconBtn";

const EditJob = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.profile);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [data, setData] = useState({});
  const [eligibleBranches, setEligibleBranches] = useState([]);
  const [eligibleYears, setEligibleYears] = useState([]);
  const [qualifications, setQualifications] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchJbById({ formId }, token,navigate);
        
        // Check if response exists and has data
        if (!response) {
          throw new Error("No data received from server");
        }

        console.log("API Response:", response); // Debug log
        
        setData(response);

        // Set form values with null checks
        setValue("title", response?.title || "");
        setValue("company", response?.company || "");
        setValue("description", response?.description || "");
        setValue("jobType", response?.jobType || "");
        setValue("location", response?.location || "");
        setValue("salaryRange.min", response?.salaryRange?.min || "");
        setValue("salaryRange.max", response?.salaryRange?.max || "");
        setValue("contactEmail", response?.contactEmail || "");
        setValue("applicationDeadline", response?.applicationDeadline || "");
        setValue("applyLink", response?.applyLink || "");
        setValue("isUrgent", response?.isUrgent || false);
        
        setEligibleBranches(response?.eligibleBranch || []);
        setEligibleYears(response?.eligibleYear || []);
        setQualifications(response?.qualifications?.join(", ") || "");
        setTags(response?.tags?.join(", ") || "");

      } catch (err) {
        console.error("Error fetching job data:", err);
        setError(err.message || "Failed to fetch job data");
      } finally {
        setLoading(false);
      }
    };

    if (formId && token) {
      fetchData();
    }
  }, [formId, token, setValue]);

  const onSubmit = async (formData) => {
    try {
      // Include all form data
      const updatedData = {
        ...formData,
        id: formId, 
        eligibleBranch: eligibleBranches,
        eligibleYear: eligibleYears,
        qualifications: qualifications.split(",").map(item => item.trim()).filter(Boolean),
        tags: tags.split(",").map(item => item.trim()).filter(Boolean),
      };

      
      const result = await updateJob(updatedData, token,navigate);
      console.log("Response from backend:", result);
      navigate("/dashboard/Job_Form");
    } catch (err) {
      console.error("Error updating job:", err);
      setError(err.message || "Failed to update job");
    }
  };

  const handleBranchChange = (e) => {
    const value = e.target.value;
    setEligibleBranches((prev) => 
      prev.includes(value) ? prev.filter(branch => branch !== value) : [...prev, value]
    );
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    setEligibleYears((prev) => 
      prev.includes(value) ? prev.filter(year => year !== value) : [...prev, value]
    );
  };

  return (
    <div className="min-h-screen bg-black/90 p-4 md:p-8">
      <IconBtn 
          text="Back" 
          onclick={() => navigate("/dashboard/announce")}
          customClasses="w-full sm:w-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
            py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
      />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 md:p-8">
          {loading ? (
            <div className="text-center text-white py-4">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">{error}</div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div className="col-span-2">
                  <label className="block mb-2 text-white/70">Job Title *</label>
                  <input
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    {...register("title", { required: "Job title is required" })}
                  />
                  {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Company */}
                <div className="col-span-2">
                  <label className="block mb-2 text-white/70">Company Name *</label>
                  <input
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    {...register("company", { required: "Company name is required" })}
                  />
                  {errors.company && <p className="mt-1 text-red-500 text-sm">{errors.company.message}</p>}
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="block mb-2 text-white/70">Description *</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    rows="4"
                    {...register("description", { required: "Description is required" })}
                  />
                  {errors.description && <p className="mt-1 text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                {/* Location */}
                <div className="col-span-2">
                  <label className="block mb-2 text-white/70">Location *</label>
                  <input
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    {...register("location", { required: "Location is required" })}
                  />
                  {errors.location && <p className="mt-1 text-red-500 text-sm">{errors.location.message}</p>}
                </div>

                {/* Job Type */}
                <div>
                  <label className="block mb-2 text-white/70">Job Type *</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    {...register("jobType", { required: "Job type is required" })}
                  >
                    <option value="">Select Job Type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                  {errors.jobType && <p className="mt-1 text-red-500 text-sm">{errors.jobType.message}</p>}
                </div>

                {/* Salary Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-white/70">Min Salary *</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                      {...register("salaryRange.min", { required: "Min salary is required" })}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-white/70">Max Salary *</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                      {...register("salaryRange.max", { required: "Max salary is required" })}
                    />
                  </div>
                </div>

                {/* Contact Email */}
                <div className="col-span-2">
                  <label className="block mb-2 text-white/70">Contact Email *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    {...register("contactEmail", { required: "Contact email is required" })}
                  />
                  {errors.contactEmail && <p className="mt-1 text-red-500 text-sm">{errors.contactEmail.message}</p>}
                </div>

                {/* Application Deadline */}
                <div className="col-span-2">
                  <label className="block mb-2 text-white/70">Application Deadline *</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    {...register("applicationDeadline", { required: "Application deadline is required" })}
                  />
                  {errors.applicationDeadline && <p className="mt-1 text-red-500 text-sm">{errors.applicationDeadline.message}</p>}
                </div>

                {/* Apply Link */}
                <div className="col-span-2">
                  <label className="block mb-2 text-white/70">Apply Link *</label>
                  <input
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    {...register("applyLink", { required: "Apply link is required" })}
                  />
                  {errors.applyLink && <p className="mt-1 text-red-500 text-sm">{errors.applyLink.message}</p>}
                </div>

                {/* Qualifications */}
                <div className="col-span-2">
                  <label className="block mb-2 text-white/70">Qualifications (comma-separated)</label>
                  <input
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    value={qualifications}
                    onChange={(e) => setQualifications(e.target.value)}
                  />
                </div>

                {/* Tags */}
                <div className="col-span-2">
                  <label className="block mb-2 text-white/70">Tags (comma-separated)</label>
                  <input
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>

                {/* Eligible Branches */}
                <div className="col-span-2">
                  <label className="block mb-2 text-white/70">Eligible Branches *</label>
                  <div className="flex flex-wrap gap-4">
                    {["IT", "CSE", "ECE", "Mechanical", "Civil"].map((branch) => (
                      <label key={branch} className="flex items-center">
                        <input
                          type="checkbox"
                          value={branch}
                          checked={eligibleBranches.includes(branch)}
                          onChange={handleBranchChange}
                          className="form-checkbox rounded text-purple-500 focus:ring-purple-500 bg-white/5 border-white/10"
                        />
                        <span className="ml-2 text-white">{branch}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Eligible Years */}
                <div className="col-span-2">
                  <label className="block mb-2 text-white/70">Eligible Years *</label>
                  <div className="flex flex-wrap gap-4">
                    {["1st", "2nd", "3rd", "4th"].map((year) => (
                      <label key={year} className="flex items-center">
                        <input
                          type="checkbox"
                          value={year}
                          checked={eligibleYears.includes(year)}
                          onChange={handleYearChange}
                          className="form-checkbox rounded text-purple-500 focus:ring-purple-500 bg-white/5 border-white/10"
                        />
                        <span className="ml-2 text-white">{year} Year</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Is Urgent */}
                <div className="col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register("isUrgent")}
                      className="form-checkbox rounded text-purple-500 focus:ring-purple-500 bg-white/5 border-white/10"
                    />
                    <span className="text-white">Mark as Urgent</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/Job_Form")}
                  className="px-6 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                >
                  Update Job
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditJob;
