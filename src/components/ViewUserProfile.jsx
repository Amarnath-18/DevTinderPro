import React, { useEffect } from "react";
import Profile from "./Profile";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewUserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const feedUsers = useSelector((state) => state.feed);

  useEffect(() => {
    if (!feedUsers || feedUsers.length === 0) {
      navigate("/");
    }
  }, [feedUsers, navigate]);

  if (!feedUsers || feedUsers.length === 0) {
    return <h2 className="text-center text-red-600">Loading...</h2>;
  }

  const userProfile = feedUsers.find((u) => String(u._id) === String(id));

  if (!userProfile) {
    return <h2 className="text-center text-red-600">User not found</h2>;
  }

  return (
    <div>
      <Profile reqUser={userProfile} />
    </div>
  );
};

export default ViewUserProfile;
