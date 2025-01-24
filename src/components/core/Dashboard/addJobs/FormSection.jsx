import React, { useState, useEffect } from "react";
import { deletedJobs, fetchOpportunity } from "../../../../services/operations/opportunity";
import IconBtn from "../../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../../common/ConfirmationModal";

const FormSection = () => {
    const [jobData, setJobData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmationModal, setconfirmationModal] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchOpportunity();
                setJobData(response || []);
                console.log("Fetched data: ", response);
            } catch (err) {
                setError("Failed to fetch opportunities. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        console.log(`Edit job with ID: ${id}`);
        // Implement your edit functionality here
        navigate(`/dashboard/Job_Form/edit-form/${id}`);
    };
    const { token } = useSelector((state) => state.profile);

    const handleDelete = async (id) => {
        console.log(`Delete job with ID: ${id}`);
        // Implement your delete functionality here
        const response = await deletedJobs({ id }, token);
        setJobData(jobData.filter(item => item._id !== id));
        setconfirmationModal(null);
    };

    const handleNew = () => {
        console.log("Create a new job opportunity");
        // Redirect or open modal for new opportunity creation
        navigate(`/dashboard/Job_Form/fillForm`);
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
            <div className="relative z-10 max-w-7xl mx-auto mt-10ann">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">Job Opportunities</h1>
                    <IconBtn
                        text="+ New Job"
                        onclick={handleNew}
                        customClasses="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                            py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                    />
                </div>

                {loading && (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-500 bg-red-500/10 border border-red-500/20 
                        rounded-lg p-4 backdrop-blur-sm">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
                        <div className="overflow-x-auto">
                            <div className="min-w-[800px]">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="py-4 px-6 text-left text-white/70">Company</th>
                                            <th className="py-4 px-6 text-left text-white/70">Deadline</th>
                                            <th className="py-4 px-6 text-left text-white/70">	Last Modified By</th>
                                            <th className="py-4 px-6 text-center text-white/70">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jobData.map((job, index) => (
                                            <tr key={job._id}
                                                className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="py-4 px-6 text-white">{job.company || "Not specified"}</td>
                                                <td className="py-4 px-6 text-white">
                                                    {job.applicationDeadline
                                                        ? new Date(job.applicationDeadline).toLocaleDateString()
                                                        : "Not specified"}
                                                </td>
                                                <td className="py-4 px-6 text-white">
                                                    {job.lastChange.firstName && job.lastChange.lastName
                                                        ? `${job.lastChange.firstName} ${job.lastChange.lastName}`
                                                        : "Not specified"}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex justify-center gap-4">
                                                        <button
                                                            onClick={() => handleEdit(job._id)}
                                                            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white 
                                                                py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-orange-600 
                                                                transition-all duration-300"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => setconfirmationModal({
                                                                text1: "Are you Sure?",
                                                                text2: "This Job will be deleted permanently",
                                                                btn1Text: "Delete",
                                                                btn2Text: "Cancel",
                                                                btn1Handler: () => handleDelete(job._id),
                                                                btn2Handler: () => setconfirmationModal(null),
                                                            })}
                                                            className="bg-gradient-to-r from-red-500 to-pink-500 text-white 
                                                                py-2 px-4 rounded-lg hover:from-red-600 hover:to-pink-600 
                                                                transition-all duration-300"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {jobData.length === 0 && (
                                    <div className="text-center text-white/50 py-8">
                                        No opportunities available.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

        </div>
    );
};

export default FormSection;
