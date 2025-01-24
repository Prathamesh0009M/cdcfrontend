import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { fetchAnnounce, deleteAnnouncement } from "../../../../services/operations/announceApi";
import IconBtn from "../../../common/IconBtn";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../../common/ConfirmationModal";

const AnnounceSection = () => {
  const [announcement, setAnnouncement] = useState([]);
  const navigate = useNavigate();
  const [confirmationModal, setconfirmationModal] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAnnounce(); // Replace with your actual fetch function
        result.sort((a, b) => a.priority - b.priority); // Sort by priority
        setAnnouncement(result);
        console.log("Data from announcement:", result);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    // Navigate to the edit page for the selected announcement
    navigate(`/dashboard/announce/edit-form/${id}`);
  };

  const { token } = useSelector((state) => state.profile);

  const handleDelete = async (id) => {
    try {
      // Replace with your delete function
      await deleteAnnouncement({ id }, token);
      // Update state after deletion
      setAnnouncement(announcement.filter(item => item._id !== id));
      console.log("Announcement deleted successfully");
      setconfirmationModal(null);

    } catch (error) {
      console.error("Error deleting announcement:", error);
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

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Announcements</h1>
          <IconBtn
            text="+ New Announcement"
            onclick={() => navigate("/dashboard/create-announcement")}
            customClasses="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white 
              py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          />
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 px-6 text-left text-white/70">Title</th>
                  <th className="py-4 px-6 text-left text-white/70">Date Posted</th>
                  <th className="py-4 px-6 text-left text-white/70">Last Change By</th>
                  <th className="py-4 px-6 text-center text-white/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcement.map((item) => (
                  <tr key={item._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 text-white">{item.title}</td>
                    <td className="py-4 px-6 text-white">
                      {new Date(item.datePosted).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-white">
                      {item.lastChange ? `${item.lastChange.firstName} ${item.lastChange.lastName}` : 'N/A'}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleEdit(item._id)}
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white 
                            py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-orange-600 
                            transition-all duration-300"
                        >
                          Edit
                        </button>
                        <button
                           onClick={() => setconfirmationModal({
                            text1: "Are you Sure?",
                            text2: "This Announcement will be deleted permanently",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDelete(item._id),
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
          </div>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

    </div>
  );
};

export default AnnounceSection;
