import React from "react";

const ProfileShimmer = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 p-6">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl border rounded-lg p-6 animate-pulse">
        
        {/* Profile Header (Shimmer Effect) */}
        <div className="flex items-center gap-6 border-b pb-4">
          <div className="w-28 h-28 bg-gray-300 rounded-full"></div>
          <div>
            <div className="h-6 w-40 bg-gray-300 rounded-md mb-2"></div>
            <div className="h-4 w-32 bg-gray-300 rounded-md mb-2"></div>
            <div className="h-4 w-20 bg-gray-300 rounded-md"></div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-4">
          <div className="h-5 w-24 bg-gray-300 rounded-md mb-2"></div>
          <div className="h-16 w-full bg-gray-300 rounded-md"></div>
        </div>

        {/* Skills Section */}
        <div className="mt-4">
          <div className="h-5 w-24 bg-gray-300 rounded-md mb-2"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-16 bg-gray-300 rounded-md"></div>
            <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
            <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6">
          <div className="h-10 w-24 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileShimmer;
