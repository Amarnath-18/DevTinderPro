import React, { useEffect } from "react";
import Profile from "./Profile";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewReqProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const Requests = useSelector((state) => state.requests);
  useEffect(() => {
    if (!Requests || Requests.length === 0) {
      return navigate("/");
    }
  }, [Requests]);
  if (!Requests || Requests.length === 0) {
    return <div>Loading...</div>
  }

  const currRequests = Requests.find((u) => String(u._id) === String(id));

  console.log("this is formuser id ", currRequests);

  const { fromUserId } = currRequests;

  const userProfile = fromUserId;
  console.log("This is req user ", userProfile);

  if (!userProfile) {
    return <h2 className="text-center text-red-600">User not found</h2>;
  }

  return (
    <div>
      <Profile reqUser={userProfile} />
    </div>
  );
};

export default ViewReqProfile;
