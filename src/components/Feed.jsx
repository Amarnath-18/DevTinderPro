import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constraints";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const feedUsers = useSelector((state) => state.feed);
  const navigate = useNavigate();
  const [isLoadingIgnore, setIsLoadingIgnore] = useState(false);
  const [isLoadingInterested, setIsLoadingInterested] = useState(false);


  // const [index, setIndex] = useState(() => {
  //   let currentIndex = parseInt(localStorage.getItem("currentIndex")) || 0;
  //   if (currentIndex >= feedUsers.length) {
  //     currentIndex = 0;
  //     localStorage.setItem("currentIndex", currentIndex);
  //   }
  //   return currentIndex;
  // });

  // useEffect(() => {
  //   localStorage.setItem("currentIndex", index);
  // }, [index]);

  const handleInterested = async () => {
    try {
      setIsLoadingInterested(true);
      const toUserId = feedUsers[0]._id;
      const url = `${BASE_URL}/request/send/interested/${toUserId}`;

      // console.log("Making request to:", url); // Debugging log

      const data = await axios.post(url, {}, { withCredentials: true });
      console.log("This  is handleinterested data :", data);
      dispatch(addFeed(feedUsers.slice(1)));
      // handleIndex();
    } catch (error) {
      alert(error.response?.data?.error || error.message);
      console.log("Error:", error.response?.data?.error || error.message);
    }finally{setIsLoadingInterested(false);}
  };
  const handleIgnored = async () => {
    try {
      setIsLoadingIgnore(true);
      const toUserId = feedUsers[0]._id;
      const data = await axios.post(
        `${BASE_URL}/request/send/ignored/${toUserId}`,
        {},
        { withCredentials: true }
      );
      console.log("This is handleIgnored Data ", data);
      dispatch(addFeed(feedUsers.slice(1)));
      // handleIndex();
    } catch (error) {
      alert(error.response?.data?.error || error.message);
      console.error(error);
    }finally{setIsLoadingIgnore(false)}
  };

  // const handleIndex = () => {
  //   if (index >= feedUsers.length - 1) {
  //     alert("There are no more users.");
  //     window.location.reload();
  //     return;
  //   }
  //   setIndex(index + 1);
  // };

  const getFeed = async () => {
    try {
      const feedData = await axios.get(`${BASE_URL}/request/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(feedData.data));
      console.log("this is feed data : ", feedData.data);
    } catch (error) {
      navigate("/login");
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, [dispatch]);

  console.log("This is feedUsers ", feedUsers);
  // console.log("this is index " + index);

  if (!feedUsers || feedUsers.length === 0 || !feedUsers[0]) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-800 text-xl">Loading...</p>
      </div>
    );
  }

  const { photoUrl, name, lastName, about, _id } = feedUsers[0];

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-6">
      <div className="card w-full max-w-xl bg-white shadow-xl border rounded-lg p-8 text-center">
        {/* Profile Image */}
        <div className="photoCard w-40 sm:w-60 aspect-square mx-auto rounded-full border-4 border-gray-400 overflow-hidden shadow-md bg-gray-200">
          {photoUrl ? (
            <img
              className="w-full h-full object-cover"
              src={photoUrl}
              alt="Profile"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* User Name */}
        <div className="mt-6">
          <h2 className="text-4xl font-bold text-gray-900">
            {name + " " + lastName || "Unknown User"}
          </h2>
          <p className="text-lg text-gray-700">{about || "No bio provided"}</p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap w-full justify-center  gap-4  ">
          <button
            onClick={handleIgnored}
            className="btn btn-outline btn-error hover:bg-red-600 hover:border-red-600 text-lg px-6 py-3"
          >
           {isLoadingIgnore ? <span className="loading loading-spinner" ></span> : "Ignore"}
          </button>
          <button
            onClick={handleInterested}
            className="btn btn-primary text-lg px-6 py-3"
          >
            {isLoadingInterested? <span className="loading loading-spinner" ></span> :  "Interested"}
          </button>
          <button
            onClick={() => navigate(`/viewprofile/${_id}`)}
            className="btn btn-success text-lg px-6 py-3"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
