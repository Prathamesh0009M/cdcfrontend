import React, { useState } from 'react';
import { updateProfileInfo } from '../../../../services/operations/authApi';
import { setUsers } from '../../../../slices/profileSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Setting = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    YearAndBranch: '',
    Designation: '',
    about: '',
    dateOfBirth: '',
    contactNumber: '',
    linkedinProfile: '',
    batch:''
  });
    const { token } = useSelector((state) => state.profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();

      // Send the form data to the API
      const result = await updateProfileInfo(formData, token);
    setUsers(result);
    navigate("/dashboard/my-profile")
      console.log(result);
   
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-richblack-800 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-richblack-5">Update Profile Settings</h1>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="mb-4">
          <label className="block text-richblack-5">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your first name"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-richblack-5">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your last name"
          />
        </div>

        {/* Year and Branch */}
        <div className="mb-4">
          <label className="block text-richblack-5">Year and Branch</label>
          <input
            type="text"
            name="YearAndBranch"
            value={formData.YearAndBranch}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your year and branch"
          />
        </div>

        {/* Designation */}
        <div className="mb-4">
          <label className="block text-richblack-5">Designation</label>
          <input
            type="text"
            name="Designation"
            value={formData.Designation}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your designation"
          />
        </div>

        {/* Batch */}
        <div className="mb-4">
          <label className="block text-richblack-5">Batch</label>
          <input
            type="text"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your batch"
          />
        </div>

        {/* About */}
        <div className="mb-4">
          <label className="block text-richblack-5">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Tell something about yourself"
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-richblack-5">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label className="block text-richblack-5">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your contact number"
          />
        </div>

        {/* LinkedIn Profile */}
        <div className="mb-4">
          <label className="block text-richblack-5">LinkedIn Profile</label>
          <input
            type="url"
            name="linkedinProfile"
            value={formData.linkedinProfile}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your LinkedIn profile URL"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
