import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constraints";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import RequestCard from "./RequestCard";

const Requests = () => {
  const dispatch = useDispatch();
  const reqUsers = useSelector(state=>state.requests);
    console.log("This is ReqUsers ",reqUsers);
    
  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/received`, {
        withCredentials: true,
      });
      console.log("this is requests ", response.data);
      dispatch(addRequests(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if(reqUsers.length==0) return <div className="text-center text-gray-500">No Request Found</div>;

  return <div>
    {
        reqUsers.map((item)=>(
            <RequestCard key={item._id} user={item} />
        ))
    }
  </div>;
};

export default Requests;
