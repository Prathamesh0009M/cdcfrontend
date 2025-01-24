import React, { useState, useEffect } from 'react';
import { deleteEvent, fetchEvents } from '../../../../services/operations/eventApi'; // Assuming fetchEvents fetches the event data
import { Link, useNavigate } from 'react-router-dom'; // If you need to navigate to event creation page
import { useSelector } from 'react-redux';
import ConfirmationModal from '../../../common/ConfirmationModal';

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [confirmationModal, setconfirmationModal] = useState(null);


  // Function to reverse a string
  const reverseString = (str) => {
    return str.split('').reverse().join('');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchEvents(); // Fetch event data from API
        setEvents(result); // Set the fetched events in the state
        console.log("Data from Events:", result);
      } catch (error) {
        console.error("Error fetching Events:", error);
      }
    };
    fetchData();
  }, []);
  const { token } = useSelector((state) => state.profile);

  // Event handler for delete
  const handleDelete = async (id) => {
    // Remove event from the state without an API call for now
    await deleteEvent({ id }, token);

    setconfirmationModal(null);

    setEvents((prevEvents) => prevEvents.filter(event => event._id !== id));
    console.log(`Event with ID ${id} has been deleted`);

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
      <div className="relative z-10 pl-0 md:pl-0 mt-10">
        {/* Header Section - Made responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Events</h1>
          <Link to="/dashboard/Events/new-event">
            <button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white 
              py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
              + New Event
            </button>
          </Link>
        </div>

        {/* Events Table - Made scrollable on mobile */}
        <div className="overflow-x-auto rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
          <div className="min-w-[800px]"> {/* Minimum width to prevent squishing */}
            <table className="w-full table-auto">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-white/70 font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-white/70 font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-white/70 font-medium">Created</th>
                  <th className="px-4 py-3 text-left text-white/70 font-medium">Last Modified By</th>
                  <th className="px-4 py-3 text-left text-white/70 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event._id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-white">{event.name}</td>
                    <td className="px-4 py-3 text-white">{reverseString(event.date)}</td>
                    <td className="px-4 py-3 text-white">{new Date(event.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-white">
                      {event.lastChange ? `${event.lastChange.firstName} ${event.lastChange.lastName}` : 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/dashboard/Events/edit-event/${event._id}`)}
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-1 px-3 rounded-lg
                            hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setconfirmationModal({
                            text1: "Are you Sure?",
                            text2: "This Event will be deleted permanently",
                            btn1Text: "Delete Event",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDelete(event._id),
                            btn2Handler: () => setconfirmationModal(null),
                          })}



                          className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-1 px-3 rounded-lg
                            hover:from-red-600 hover:to-pink-600 transition-all duration-300"
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

export default EventSection;
