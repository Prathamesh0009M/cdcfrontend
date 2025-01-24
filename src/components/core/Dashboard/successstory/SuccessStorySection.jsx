import React, { useState, useEffect } from 'react';
import { fetchSuccessStory, deleteStory } from '../../../../services/operations/successStoryApi';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainSuccessStory = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
    const [confirmationModal, setconfirmationModal] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSuccessStory();
        setStories(response);
        console.log("Response at dashboard of success story: ", response);
      } catch (error) {
        console.error("Error fetching success stories: ", error);
      }
    };
    fetchData();
  }, []);

  const { token } = useSelector((state) => state.profile);
  // Handle delete story (for future feature)
  const handleDelete = async (id) => {
    // Logic for deleting story (API integration)
    const result = await deleteStory({ id }, token);

    setStories((prevStories) => prevStories.filter(story => story._id !== id));
    console.log(`Success story with ID ${id} deleted`);
    setconfirmationModal(null);


  };

  return (
    <div className="min-h-screen bg-black/90 p-4 md:p-8">
      {/* Background effects */}
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

      <div className="relative z-10 mt-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Success Stories</h1>
          <button
            onClick={() => navigate('/dashboard/Add-success-story')}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            + New Story
          </button>
        </div>

        {/* Success Stories Table */}
        <div className="overflow-x-auto rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
          <div className="min-w-[800px]">
            <table className="w-full table-auto">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-white/70 font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-white/70 font-medium">Date Posted</th>
                  <th className="px-4 py-3 text-left text-white/70 font-medium">Last Change By</th>
                  <th className="px-4 py-3 text-left text-white/70 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stories.map((story) => (
                  <tr
                    key={story._id}
                    className="border-t border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3 text-white">{story.name}</td>
                    <td className="px-4 py-3 text-white">
                      {new Date(story.datePosted).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-white">
                      {story.lastChange
                        ? `${story.lastChange.firstName} ${story.lastChange.lastName}`
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/dashboard/successtories/edit-story/${story._id}`)}
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-1 px-3 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
                        >
                          Edit
                        </button>
                        <button
                           onClick={() => setconfirmationModal({
                            text1: "Are you Sure?",
                            text2: "This SuccessStory will be deleted permanently",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDelete(story._id),
                            btn2Handler: () => setconfirmationModal(null),
                        })}
                          className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-1 px-3 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300"
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

export default MainSuccessStory;
