import React, { useEffect } from "react";
import Profile from "./Profile";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewConnectionProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const connectionUsers = useSelector((state) => state.connections);

  useEffect(() => {
    if (!connectionUsers || connectionUsers.length === 0) {
      navigate("/connections");
    }
  }, [connectionUsers, navigate]);

  if (!connectionUsers || connectionUsers.length === 0) {
    return <h2 className="text-center text-red-600">Loading...</h2>;
  }

  const userProfile = connectionUsers.find((u) => String(u._id) === String(id));

  if (!userProfile) {
    return <h2 className="text-center text-red-600">User not found</h2>;
  }

  return (
    <div>
      <Profile reqUser={userProfile} />
    </div>
  );
};

export default ViewConnectionProfile;
