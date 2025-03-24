import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constraints";
import { useDispatch } from "react-redux";
import { deleteRequest } from "../utils/requestSlice";

const RequestCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { fromUserId, _id } = user;
  const { name, lastName, photoUrl } = fromUserId;

  const onAccept = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/request/review/accepted/${_id}`, {}, { withCredentials: true });
      console.log("Accepted:", response.data);
      dispatch(deleteRequest(_id));
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const onReject = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/request/review/rejected/${_id}`, {}, { withCredentials: true });
      console.log("Rejected:", response.data);
      dispatch(deleteRequest(_id));
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-fit bg-base-200 shadow-md p-4 m-2">
      <div className="w-36 h-fit">
        <img className="w-28 h-fit rounded-full" src={photoUrl} alt="User" />
      </div>
      <div className="w-fit">
        <h2 className="text-lg font-bold">{name} {lastName}</h2>
        <div className="flex gap-2 mt-2">
          <button onClick={() => navigate(`/viewReqProfile/${_id}`)} className="btn btn-primary">See Profile</button>
          <button className="btn btn-success" onClick={onAccept}>Accept</button>
          <button className="btn btn-error" onClick={onReject}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
