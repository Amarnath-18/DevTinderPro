import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constraints";
import { useDispatch, useSelector } from "react-redux";
import { removeConnection } from "../utils/connectionsSlice";

const ConnectionCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfirm , setShowConfirm] = useState(false);
  const { name, lastName, photoUrl, _id } = user;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/user/deleteConnection`, {
        data: { _id },
        withCredentials: true,
      });
      console.log("Deleted user:", response.data);
      dispatch(removeConnection(_id));
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center p-4 rounded-xl h-fit bg-base-300 shadow-md">
      <div className="avatar">
        <div className="w-16 sm:w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={photoUrl} alt={name} />
        </div>
      </div>
      <div className="card-body text-center sm:text-left w-full">
        <h2 className="text-lg sm:text-xl font-bold">
          {name} {lastName}
        </h2>
        <div className="flex flex-wrap justify-center sm:justify-end gap-2">
          {showConfirm ? (
            <div className="flex gap-2">
              <button onClick={handleDelete} className="btn btn-error btn-sm">
                Confirm
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="btn btn-outline btn-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="btn btn-secondary btn-sm"
            >
              Delete
            </button>
          )}
          <button
            onClick={() => navigate(`/viewConnectionProfile/${_id}?`)}
            className="btn btn-primary btn-sm sm:btn-md"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
