import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchannounceById, editAnnounce } from "../../../../services/operations/announceApi";
import { useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";

const EditAnnounce = () => {
    const { announceId } = useParams();
    const { token } = useSelector((state) => state.profile);

    const [announcement, setAnnouncement] = useState({
        title: "",
        content: "",
        Highlight: [],
        priority: 1,
        attachments: "",
        category: "",
    });
    const [file, setFile] = useState(null); // For attachments
    const [errors, setErrors] = useState({}); // Validation errors

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEditData = async () => {
            try {
                const result = await fetchannounceById({ announceId }, token);
                if (result.success) {
                    setAnnouncement(result.data);
                }
            } catch (error) {
                console.error("Error fetching announcement:", error.message);
            }
        };
        fetchEditData();
    }, [announceId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnouncement((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!announcement.title.trim()) newErrors.title = "Title is required.";
        if (!announcement.content.trim()) newErrors.content = "Content is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("id", announceId);
        if (announcement.title) formData.append("title", announcement.title);
        if (announcement.content) formData.append("content", announcement.content);
        if (announcement.priority) formData.append("priority", announcement.priority);
        if (announcement.category) formData.append("category", announcement.category);
        if (file) formData.append("attachments", file);

        try {
            const response = await editAnnounce(formData, token);
            if (response.success) {
                alert("Announcement updated successfully");
                navigate("/dashboard/announce");
            } else {
                alert("Failed to update announcement");
            }
        } catch (error) {
            console.error("Error updating announcement:", error.message);
        }
    };

    return (
        <div className="min-h-screen bg-black/90 p-4 md:p-8">
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
            <div className="relative z-10 max-w-4xl mx-auto">
                <IconBtn
                    text="Back"
                    onclick={() => navigate("/dashboard/announce")}
                    customClasses="w-full sm:w-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                        py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                />

                <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Edit Announcement</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="col-span-2">
                                <label className="block mb-2 text-white/70">Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={announcement.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                                        focus:outline-none focus:border-purple-500 transition-all duration-300"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            <div className="col-span-2">
                                <label className="block mb-2 text-white/70">Content *</label>
                                <textarea
                                    name="content"
                                    value={announcement.content}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                                        focus:outline-none focus:border-purple-500 transition-all duration-300"
                                />
                                {errors.content && (
                                    <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-white/70">Priority</label>
                                <input
                                    type="number"
                                    name="priority"
                                    value={announcement.priority}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                                        focus:outline-none focus:border-purple-500 transition-all duration-300"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-white/70">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={announcement.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                                        focus:outline-none focus:border-purple-500 transition-all duration-300"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block mb-2 text-white/70">Attachments</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white
                                        focus:outline-none focus:border-purple-500 transition-all duration-300"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 
                                    rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                            >
                                Update Announcement
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard/announce")}
                                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white/5 border border-white/10 
                                    text-white hover:bg-white/10 transition-all duration-300"
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

export default EditAnnounce;
