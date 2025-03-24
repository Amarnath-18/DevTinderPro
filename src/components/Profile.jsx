import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileShimmer from "./ProfileShimmer"
const Profile = ({reqUser}) => {
  const defaultUser = useSelector((state) => state.user); // Get user details from Redux
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = reqUser || defaultUser;
   console.log("this is user " ,  user );
  
  if (!user) return <ProfileShimmer />;

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 p-6">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl border rounded-lg p-6">
        
        {/* Profile Header */}
        <div className="flex items-center gap-6 border-b pb-4">
          <img
            src={user.photoUrl || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 cursor-pointer hover:opacity-80 transition"
            onClick={() => setIsModalOpen(true)} // Open modal when clicked
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name} {user.lastName || ""}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-600 capitalize">{user.gender}</p>
            <p className="text-gray-600">{user.age ? `Age: ${user.age}` : "Age not provided"}</p>
          </div>
        </div>

        {/* About Section */}
        {user.about && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">About Me</h3>
            <p className="text-gray-700 p-2 bg-gray-100 rounded-md">{user.about}</p>
          </div>
        )}

        {/* Skills Section */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.skills?.length > 0 ? (
              user?.skills?.map((skill, index) => (
                <span key={index} className="badge badge-primary badge-outline">
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-400">No skills added</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        {!reqUser && <div className="flex justify-end mt-6 gap-3">
          <button onClick={() => navigate("/editProfile")} className="btn btn-primary">
            Edit Profile
          </button>
        </div>}
      </div>

      {/* Profile Picture Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={user.photoUrl || "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"}
              alt="Profile Large"
              className="w-[90vw] max-w-lg h-auto rounded-lg shadow-lg"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
