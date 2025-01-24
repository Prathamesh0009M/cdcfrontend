import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AddJob } from "../../../../services/operations/opportunity";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";

const JobForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { token } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const [eligibleBranches, setEligibleBranches] = useState([]);
  const [eligibleYears, setEligibleYears] = useState([]);

  const onSubmit = async (data) => {
    console.log("Form data from react-hook-form:", data);

    // Include selected eligible branches and years
    data.eligibleBranch = eligibleBranches; // Use state for eligible branches
    data.eligibleYear = eligibleYears; // Use state for eligible years

    // Convert qualifications and tags to arrays
    if (data.qualifications) {
      data.qualifications = data.qualifications.split(",");
    }
    if (data.tags) {
      data.tags = data.tags.split(",");
    }

    const result = await AddJob(data, token);
    // console.log("Response from backend:", result);
    navigate("/dashboard/Job_Form");
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

      {/* Background Effects */}

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="animated-blob w-[600px] h-[600px] bg-blue-600/20 -left-[20%] top-[20%]"
          style={{ animationDelay: "0s", filter: "blur(60px)" }} />
        <div className="animated-blob w-[500px] h-[500px] bg-purple-600/20 -right-[10%] top-[40%]"
          style={{ animationDelay: "-5s", filter: "blur(60px)" }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">

        <div className="mb-6">
          <IconBtn
            text="Back"
            customClasses="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                            py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            onclick={() => navigate("/dashboard/Job_Form")}
          />
        </div>
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 md:p-8">
          <h2 className="text-3xl font-bold text-white mb-8">Post a Job</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Title */}
              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Job Title *</label>
                <input
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    focus:outline-none focus:border-purple-500 transition-all duration-300"
                  {...register("title", { required: "Job Title is required" })}
                />
                {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>}
              </div>

              {/* Company */}
              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Company Name *</label>
                <input
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    focus:outline-none focus:border-purple-500 transition-all duration-300"
                  {...register("company", { required: "Company name is required" })}
                />
                {errors.company && <p className="mt-1 text-red-500 text-sm">{errors.company.message}</p>}
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Job Description *</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    focus:outline-none focus:border-purple-500 transition-all duration-300"
                  {...register("description", { required: "Job description is required" })}
                />
                {errors.description && <p className="mt-1 text-red-500 text-sm">{errors.description.message}</p>}
              </div>

              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Location *</label>
                <input
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    focus:outline-none focus:border-purple-500 transition-all duration-300"
                  {...register("location",)}
                />
                {errors.location && <p className="mt-1 text-red-500 text-sm">{errors.location.message}</p>}
              </div>

              {/* Job Type */}
              <div>
                <label className="block mb-2 text-white/70">Job Type *</label>
                <select
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    focus:outline-none focus:border-purple-500 transition-all duration-300"
                  {...register("jobType", { required: "Job type is required" })}
                >
                  <option value="" className="bg-gray-900">Select Job Type</option>
                  <option value="Full-Time" className="bg-gray-900">Full-Time</option>
                  <option value="Part-Time" className="bg-gray-900">Part-Time</option>
                  <option value="Internship" className="bg-gray-900">Internship</option>
                  <option value="Temporary" className="bg-gray-900">Temporary</option>
                  <option value="Contract" className="bg-gray-900">Contract</option>
                </select>
                {errors.jobType && <p className="mt-1 text-red-500 text-sm">{errors.jobType.message}</p>}
              </div>

              {/* Salary Range */}
              <div>
                <label className="block mb-2 text-white/70">Salary Range</label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-1/2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                      focus:outline-none focus:border-purple-500 transition-all duration-300"
                    {...register("salaryRange.min", { valueAsNumber: true })}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-1/2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                      focus:outline-none focus:border-purple-500 transition-all duration-300"
                    {...register("salaryRange.max", { valueAsNumber: true })}
                  />
                </div>
              </div>

              {/* Contact Email */}
              <div>
                <label className="block mb-2 text-white/70">Contact Email *</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    focus:outline-none focus:border-purple-500 transition-all duration-300"
                  {...register("contactEmail", { required: "Contact Email is required" })}
                />
                {errors.contactEmail && <p className="mt-1 text-red-500 text-sm">{errors.contactEmail.message}</p>}
              </div>

              {/* Application Deadline */}
              <div>
                <label className="block mb-2 text-white/70">Application Deadline *</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    focus:outline-none focus:border-purple-500 transition-all duration-300"
                  {...register("applicationDeadline", { required: "Application Deadline is required" })}
                />
                {errors.applicationDeadline &&
                  <p className="mt-1 text-red-500 text-sm">{errors.applicationDeadline.message}</p>}
              </div>

              {/* Eligible Branches */}
              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Eligible Branches *</label>
                <div className="flex flex-col">
                  {["IT", "CSE", "CE", "EXTC", "VLSI", "CHEMICAL", "PETRO-CHEMICAL", "Mechanical", "Civil"].map((branch) => (
                    <label key={branch} className="flex items-center">
                      <input
                        type="checkbox"
                        value={branch}
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
                <div className="flex flex-col">
                  {["1st", "2nd", "3rd", "4th"].map((year) => (
                    <label key={year} className="flex items-center">
                      <input
                        type="checkbox"
                        value={year}
                        onChange={handleYearChange}
                        className="form-checkbox rounded text-purple-500 focus:ring-purple-500 bg-white/5 border-white/10"
                      />
                      <span className="ml-2 text-white">{year} Year</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Tags</label>
                <input
                  placeholder="Comma-separated, e.g., Remote,Full-Time,Internship"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    focus:outline-none focus:border-purple-500 transition-all duration-300"
                  {...register("tags")}
                />
              </div>

              {/* Is Urgent */}
              <div className="col-span-2">
                <label className="flex items-center space-x-2 text-white/70">
                  <input
                    type="checkbox"
                    className="form-checkbox rounded text-purple-500 focus:ring-purple-500
                      bg-white/5 border-white/10"
                    {...register("isUrgent")}
                  />
                  <span>Mark as Urgent</span>
                </label>
              </div>

              <div className="col-span-2">
                <label className="block mb-2 text-white/70">Application Link *</label>
                <input
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                    focus:outline-none focus:border-purple-500 transition-all duration-300"
                  {...register("applyLink", { required: "Application Link is required" })}
                />
                {errors.applyLink && <p className="mt-1 text-red-500 text-sm">{errors.applyLink.message}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg
                  hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Submit Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
