import React, { useEffect } from "react";
import ConnectionCard from "./ConnectionCard";
import axios from "axios";
import { BASE_URL } from "../utils/constraints";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice.js";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionUsers = useSelector((state) => state.connections);

  const FetchConnections = async () => {
    try {
      const respone = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      console.log(respone.data.data);
      dispatch(addConnections(respone.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchConnections();
  }, []);

  if (connectionUsers.length == 0)
    return (
      <div className="flex justify-center items-center">
        <p className="text-red-700 font-bold  ">
          You Dont have any connections
        </p>
      </div>
    );
  console.log(connectionUsers);

  return (
    <div className="min-h-screen pt-10 w-full flex flex-col justify-center items-center">
      <div className="w-full sm:w-4/5 md:w-3/5 lg:w-1/2 xl:w-1/3 flex flex-col items-center border-cyan-200 border gap-5 p-4 bg-base-200 shadow-lg rounded-lg">
        {connectionUsers.map((user) => (
          <ConnectionCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Connections;
