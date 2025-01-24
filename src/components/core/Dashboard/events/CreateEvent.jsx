import React, { useState } from 'react';
import { createEvents } from '../../../../services/operations/eventApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';

const CreateEvent = () => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.profile);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        location: '',
        type: '',
        registrationRequired: false,
        tags: '',
        isFeatured: false,
        attachments: null,
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle image file upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                attachments: file,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description || !formData.date || !formData.location) {
            alert('Please fill out all required fields.');
            return;
        }

        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'attachments' && formData[key]) {
                submitData.append(key, formData[key]);
            } else if (key !== 'attachments') {
                submitData.append(key, formData[key]);
            }
        });

        try {
            const result = await createEvents(submitData, token);
            if (result) {
                navigate('/dashboard/Events');
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
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

            {/* Content Container - Added padding for mobile sidebar */}
            <div className="relative z-10 max-w-4xl mx-auto pl-0 md:pl-0">
                {/* Back Button - Made responsive */}
                <div className="mb-6">
                    <IconBtn
                        text="Back"
                        customClasses="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                            py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                        onclick={() => navigate("/dashboard/Events")}
                    />
                </div>

                {/* Form Container */}
                <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 md:p-8">
                    <h2 className="text-2xl font-bold mb-6 text-white">Create New Event</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* Name */}
                            <div className="col-span-2">
                                <label className="block mb-2 text-white/70">Event Name *</label>
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

                            {/* Description */}
                            <div className="col-span-2">
                                <label className="block mb-2 text-white/70">Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
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
                                    value={formData.date}
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
                                    value={formData.time}
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
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                                        focus:outline-none focus:border-purple-500 transition-all duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-white/70">Event Type</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    placeholder="Enter Event Type"
                                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
      focus:outline-none focus:border-purple-500 transition-all duration-300"
                                />
                            </div>


                            {/* Tags and Attachments */}
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

                            <div className="col-span-2">
                                <label className="block mb-2 text-white/70">Attachment</label>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                                        focus:outline-none focus:border-purple-500 transition-all duration-300"
                                />
                            </div>

                            {/* Checkboxes */}
                            <div>
                                <label className="flex items-center space-x-2 text-white/70">
                                    <input
                                        type="checkbox"
                                        name="registrationRequired"
                                        checked={formData.registrationRequired}
                                        onChange={handleChange}
                                        className="form-checkbox rounded text-purple-500 focus:ring-purple-500"
                                    />
                                    <span>Registration Required</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center space-x-2 text-white/70">
                                    <input
                                        type="checkbox"
                                        name="isFeatured"
                                        checked={formData.isFeatured}
                                        onChange={handleChange}
                                        className="form-checkbox rounded text-purple-500 focus:ring-purple-500"
                                    />
                                    <span>Featured Event</span>
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg
                                hover:from-blue-600 hover:to-purple-600 transition-all duration-300 
                                shadow-lg shadow-purple-500/25"
                        >
                            Create Event
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
