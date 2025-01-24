import React from 'react';
import { useLocation } from 'react-router-dom';
import linkedin from "../../asset/linkedin.png";

const Profile = () => {
    const { state: user } = useLocation();

    if (!user) {
        return <p className="text-center text-red-500">No user data available.</p>;
    }

    return (
        <div className="p-4 min-h-screen flex items-center justify-center">
            <div className="max-w-lg w-full bg-richblack-800 shadow-lg rounded-2xl p-6 border-4 border-richblack-5">
                <div className="flex justify-center">
                    <img
                        src={user.image || 'https://via.placeholder.com/150'}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-40 h-40 rounded-full object-cover border-4 border-richblack-200"
                    />
                </div>
                <h1 className="text-3xl font-bold text-center mt-6 text-richblack-5">
                    {user.firstName} {user.lastName}
                </h1>
                <p className="text-center text-richblack-25 text-sm">{user.accountType}</p>
                <div className="mt-6 space-y-4 text-richblack-100 text-sm">
                    <p><strong>Pursuing:</strong> {user.YearAndBranch}</p>
                    <p><strong>About:</strong> {user.additionaldetail.about}</p>

                    <p><strong>Designation:</strong> {user.additionaldetail.Designation}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Contact Number:</strong> {user.additionaldetail.contactNumber}</p>
                    <p className='flex items-center'>
                        <strong>Connect With LinkedIn:</strong>{' '}
                        <a
                            href={user?.additionaldetail?.linkedinProfile || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-blue-500 underline flex items-center gap-2"
                        >
                            <img className="w-6 h-6" src={linkedin} alt="LinkedIn" />
                            <span>View Profile</span>
                        </a>
                    </p>
                    {/* <p><strong>Date of Birth:</strong> {new Date(user.additionaldetail.dateOfBirth).toLocaleDateString()}</p> */}
                </div>
            </div>
        </div>
    );
};

export default Profile;
